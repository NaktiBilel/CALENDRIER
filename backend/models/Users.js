import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: {
        type: String,
        unique:true,
    },
    image: {
        type: String,
        default: "../../assets/image.png" // Replace this with your actual default URL or path
    },
    telephone: {type: String,
        unique:true,
    },
    password: String,
    role: String,
    code: String
    // other fields as needed
},
{ timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
      const saltRounds = 10;
      update.password = await bcrypt.hash(update.password, saltRounds);
  }
  next();
});

// Create the UserModel based on the schema
const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
