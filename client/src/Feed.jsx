import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from './App'
import NavBar from './NavBar/NavBar'
import PostCard from './PostCard'
import Spinner from './Spinner'
import { ProtectedPage } from "./ProtectedPage"
import { Link, redirect, Navigate, useNavigate } from 'react-router-dom'
import PostModal from './PostModal'

const Feed = () => {
  const [state, setState] = useContext(LoginContext)
  const [id, setId] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();
  let postArray = []

  const getTimeline = async ( TimelineUrl) => {
    if(!localStorage.getItem('token')) {
      // alert("u gotta login man")
      navigate("/")
    }
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');
    // let res = null
    // const res = await axios.get(userDataUrl)
    // console.log("res: ", res)
    // if(!res) {
    //   console.log("no res returning homw")
    //   navigate('/home')
    // }
    // console.log("the recived response in feed is : ", res.data.user)
    // setId(res.data.user._id)

    // get the timeline
    const Rposts = await axios.get(`${TimelineUrl}/${state._id}`)
    console.log("posts: ", Rposts)
    setIsLoading(false)
    // setPosts(Rposts)

    // console.log("res: ", res)
    console.log("eof")
    setIsLoading(false)
    setPosts(Rposts.data)
    console.log("Rposts.data: ", Rposts.data)
    // posts.data.map((post) => postArray.push(post))
    console.log("posts: ", posts)
  }


  useEffect(() => {
    // get the timeline
    console.log("the feed component has mounted and the state in it looks like : ", state)
    // get the userid


    getTimeline(`http://localhost:8800/api/posts/timeline`)
  }, [])

  
  if (isLoading) return (
    <Spinner />
  )
  else return (
    <>
      <NavBar />
      <PostModal />
      {posts.map((user, i) => (
        <div className="user" key={i}>
          <PostCard data={user} />
        </div>
      ))}
    </>
  )
}

export default Feed