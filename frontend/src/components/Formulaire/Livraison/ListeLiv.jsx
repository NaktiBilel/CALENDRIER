import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
const LISTELIV = () => 
{

    

    const columns= [
        {
            name:"Code",
            selector:(row)=>row.code,
            
        },
        {
            name:"Expediteur",
            selector:(row)=>row.expediteur,
        },
        {
            name:"Client",
            selector:(row)=>row.nom_client,
        },
        {
            name:"Adresse Livraison",
            selector:(row)=>row.adresse_liv,
        },
        {
            name:"Telephone 1",
            //selector:(row)=><img  height ={70} width={80} src={ row.image}/>,
            selector:(row)=>row.numtel1,
        },
        {
            name:"Action",
            cell:(row)=>(
                <button className="btn btn-danger" onClick={()=>handleDelete(row.id)}>Delete</button>
            )
        }

    ];
    const [data, setData]= useState([]);
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);

    const getProduct=async()=>{
    try{
        const response = await axios.get('http://localhost:3002/livraisons');
            //const ruesWithId = response.data.livraisons.map(livraison => ({ ...livraison, id: livraison._id }));
            console.log(response.data);
        //const req= await fetch("https://fakestoreapi.com/products");
        //const res= await req.json();
        setData(response.data);
        setFilter(response.data);
    } catch(error){
       console.log(error);
    }
    }
    useEffect(()=>{
        getProduct();
    }, []);

    useEffect(()=>{
        console.log(search);
        const result= data.filter((item)=>{
            return item.code.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    },[search]);

   const handleDelete=(val)=>{
    const newdata= data.filter((item)=>item.id!==val);
    setFilter(newdata);
   }
   
   const tableHeaderstyle={
    headCells:{
        style:{
            fontWeight:"bold",
            fontSize:"14px",
            backgroundColor:"#ccc"

        },
    },
   }

    return(
        <React.Fragment>
            <h1>Liste Livraisons</h1>
            <DataTable 
            customStyles={ tableHeaderstyle}
            columns={columns}
            data={filter}
            pagination
            selectableRows
            sort
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            actions={
                <button className="btn btn-success">Export Pdf</button>
            }
            subHeader
             subHeaderComponent={
                <input type="text"
                className="w-25 form-control"
                placeholder="Search..."
                value={ search}
                onChange={(e)=>SetSearch(e.target.value)}
                
                />
             }
             subHeaderAlign="right"
            
            />
        </React.Fragment>
    );
};
export default LISTELIV;
