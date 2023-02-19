import React from 'react'
import { useState } from 'react'
import axios from "axios"

const RegisterPage = () => {

    const [un, setun] = useState("")
    const [pw, setPw] = useState("")
    const [em, setEm] = useState("")

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const hsub = async () => {
        // await axios.post('http://localhost:8800/api/auth/register/', {
        //     usernae: un,
        //     email: em,
        //     password: pw
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        postData('http://localhost:8800/api/auth/user/', {
            "username": un,
            "email": em,
            "password": pw
        }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });

        
        console.log("submitted");
    }
    return (
        <div>
            <h1>Register Page</h1>
            username : <input type="text" onChange={(e) => setun(e.target.value)} />
            <br></br> password : <input type="text" onChange={(e) => setEm(e.target.value)} />
            <br></br> email : <input type="text" onChange={(e) => setPw(e.target.value)} />
            <br /> <button onClick={hsub}>Submit</button>
        </div>
    )
}

export default RegisterPage