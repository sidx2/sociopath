import React, {useState} from 'react'
import axios from 'axios'
export const LoginPage = () => {

    
    const [pw, setPw] = useState("")
    const [em, setEm] = useState("")

    const postData = async (url = '', data = {}) => {
        // const post = { userName: userName }
        try {
          const res = await axios.post(url, data)
          console.log(res.data)
        } catch (e) {
          alert(e)
        }
    }

    const hsub = () => {
        postData('http://localhost:8800/api/auth/login/', {
            email: em,
            password: pw
        }).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
    }
    return (
        <div>
            <h1>Login Page</h1>
            <br></br> email : <input type="text" onChange={(e) => setPw(e.target.value)} />
            <br></br> password : <input type="text" onChange={(e) => setEm(e.target.value)} />
            <br /> <button onClick={hsub}>Login</button>
        </div>
    )
}
