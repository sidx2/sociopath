import Spinner from "./Spinner"
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from "./NavBar/NavBar"
import { LoginContext } from "./App"
const Profile = () => {
    const [state, setState] = useContext(LoginContext)
    const {username} = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState(null)

    const FollowUser = async () => {
        const res = await axios.put(`http://localhost:8800/api/users/${username}/follow`, {userId: state.username})
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              alert(error.response.data)
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
        console.log("follow response: ", res)
    }
    const UnFollowUser = async () => {
        const res = await axios.put(`http://localhost:8800/api/users/${username}/unfollow`, {userId: state.username})
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              alert(error.response.data)
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
        
          });
        console.log("follow response: ", res)
    }
    useEffect(() => {
        if(!localStorage.getItem('token')) navigate("/")
      const getUserInfo = async () => {
        const info = await axios.get(`http://localhost:8800/api/users/${username}`);
        // console.log("made an req to: ", )
        console.log("info: ", info);
        setIsLoading(false)
        setUserInfo(info.data)
      }


      getUserInfo()
    }, [])
    
    if (isLoading) return <Spinner/>
  else return (
    <div>
        <NavBar />
        <img src={userInfo.coverPicture} alt="User DP" />
        <h3>{userInfo.name}</h3>
        <h5>{userInfo.followers.length} Followers</h5>
        <h5>{userInfo.followings.length} Following</h5>
        <a href="#" onClick={FollowUser}>Follow</a>
        <a href="#" onClick={UnFollowUser}>Unfollow</a>
    </div>
  )
}

export default Profile