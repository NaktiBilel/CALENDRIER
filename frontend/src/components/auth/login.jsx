import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log( email);
        try {
            console.log( email);
            const response = await axios.post("http://localhost:3002/users/login", { email, password });
            console.log(response);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("telephone", response.data.telephone);
                localStorage.setItem("image", response.data.image);
                localStorage.setItem("role", response.data.role);
                onLogin(response.data.token); // Update the parent component's state
                navigate("/");
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred during login");
            console.error(err);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={onSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', margin: '5px 0', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', margin: '5px 0', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1bbd7e', color: 'white', border: 'none', borderRadius: '5px' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
