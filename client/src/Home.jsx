import { Button } from '@nextui-org/react'
import axios from 'axios'
import React from 'react'
import { useEffect, useContext } from 'react'
import { LoginContext } from './App'
export const Home = () => {

  const [state, setState] = useContext(LoginContext)
  // useEffect(() => {
  //   const GET = async (url) => {
  //     const res = await axios.get(url)
  //     return res

  //   }

  //   const userInfo = GET("http://localhost:8800/api/auth/user/info/")
  //   console.log(userInfo);
  //   // const timeline = GET("http://localhost:8800/api/posts/timeline/")
  // }, [])


  const fetchData = async () => {
    console.log("inside fetchData");
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');
    const userInfo = await axios.get("http://localhost:8800/api/auth/user/info/")
    console.log("userInfo: ", userInfo);
  }
  return (
    <div>
      <h1>This is home page</h1>
      <Button onClick={fetchData}>
        FETCH
      </Button>
    </div>
  )
}
