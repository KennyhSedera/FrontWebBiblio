import React, { useState } from "react";
// import axios from "axios";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { upload } from "../services/livreService";
const FileUpload = () => {

    const [name, setName] = useState('');
    const [file, setFile] = useState({});

    const handleFileUpload = (event) => {
        // get the selected file from the input
        const file = event.target.files[0];
        setFile(file);
        setName(file.name);
    }
    const handleClick=()=>{
        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append("photo_livre", file);
        formData.append("name", 'Kennyh');
        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        upload(formData)
            .then((response) => {
                // handle the response
                console.log(response.data.succee);
        setFile({})
        setName('')
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });
    };
    // render a simple input element with an onChange event listener that calls the handleFileUpload function
    return (
        <Layout>
            <div style={{display:'flex', flexDirection:'row', alignItems:'end'}}>
            <input style={{ display: 'none' }} type="file" onChange={handleFileUpload} id="myfile" />
            <label htmlFor="myfile">
                <img src="photo.gif" alt="" style={{ width: 100, height: 100, cursor:'pointer' }} />
                </label>
                <span>{ name ? name:'Ajouter un photo.'}</span>
            </div>
            <div style={{width:100,}}>
                <Button title='Upload' onClick={handleClick} />
            </div>
            
        </Layout>
    );
};
export default FileUpload;