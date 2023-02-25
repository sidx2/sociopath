import './App.css';
import { LoginPage } from './LoginPage';
import RegisterPage from './RegisterPage';
import useAuth from './hooks/useAuth';
import { createContext, useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import { Home } from './Home';
import NavBar from './NavBar/NavBar';
import Feed from './Feed';
import Chat from './Chat';
import Contact from './Contact';
import Profile from './Profile';
import Spinner from './Spinner';
import Messenger from "./pages/messenger/Messenger"
// const GuestGuard = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     alert("not authenticated");
//     return
//   }
//   return <>{children}</>;
// };


export const LoginContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState({
    isLoggedIn: false,
    username: "",
    email: "",
    profilePic: "",
    followings: [],
    _id: ""

  });
  useEffect(() => {

    const getUserData = async (url) => {
      const res = await axios.get(url)
      
      setState({
        isLoggedIn: true,
        username: res.data.user.username,
        email: res.data.user.email,
        profilePic: res.data.user.profilePicture,
        followings: res.data.user.followings,
        _id: res.data.user._id
      })
      setIsLoading(false)
    }

    if (localStorage.getItem('token')) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
      axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');
      getUserData("http://localhost:8800/api/auth/user/info/")
      // setState({
      //   isLoggedIn: true,
      //   username: res.data.user.username,
      //   email: res.data.user.email,
      //   _id: res.data.user._id
      // })
      // setIsLoading(false)
    }
  
    else {
      // console.log("You Are Not Logged In.")
      delete axios.defaults.headers.common["Authorization"];
      setIsLoading(false)
    }
  }, [])

if (isLoading) {return (<Spinner />)}
else return (

  <LoginContext.Provider value={[state, setState]}>
    <NextUIProvider>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/messenger" element={<Messenger />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  </LoginContext.Provider>
)
}
export default App;