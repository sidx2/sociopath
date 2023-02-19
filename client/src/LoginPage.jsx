import React, { useState } from 'react'
import axios from 'axios'
import useAuth from './hooks/useAuth';
import { useContext } from 'react';
import { LoginContext } from './App';
import { Button } from '@nextui-org/react';

export const LoginPage = () => {
    const [state, setState] = useContext(LoginContext)
    
    const [pw, setPw] = useState("")
    const [em, setEm] = useState("")

    const postData = async (url = '', data = {}) => {
        
        try {
            const res = await axios.post(url, data)
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setState({
                isLoggedIn: true,
                username: "",
                email: ""
            
              })
        } catch (e) {
            console.log(e)
        }
    }

    const hsub = () => {
        console.log(em, pw)
        postData('http://localhost:8800/api/auth/user/login/', {
            "email": em,
            "password": pw
        })
        // .then((data) => {
        //     console.log(data); // JSON data parsed by `data.json()` call
        //     // localStorage.setItem('token', data.token)
        // });
    }

    const Logout = () => {
        localStorage.removeItem('token')
        setState({
            isLoggedIn: false,
            username: "",
            email: ""
        
          })
    }
    return (
        <div>
            {state.isLoggedIn ?
                <>
                    <Button shadow color="gradient" auto>
                        LoggedIn
                    </Button>
                    <Button shadow color="error" auto onClick={Logout}>
                        LogOut
                    </Button>
                </>

                :
                <>
                    <h1>Login Page</h1>
                    <br></br> email : <input type="text" onChange={(e) => setEm(e.target.value)} />
                    <br></br> password : <input type="text" onChange={(e) => setPw(e.target.value)} />
                    <br /> <button onClick={hsub}>Login</button>
                </>}

        </div>
    )
}
