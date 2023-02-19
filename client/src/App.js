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
  const [state, setState] = useState({
    isLoggedIn: false,
    username: "",
    email: "",
    _id: ""

  });

  useEffect(() => {

    const getUserData = async (url) => {
      const res = await axios.get(url)
      return res

    }
    const token = localStorage.getItem('token')
    if (token) {

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = getUserData("http://localhost:8800/api/auth/user/info/")
      console.log(res);
      setState({
        isLoggedIn: true,
        username: res.username,
        email: res.email,
        _id: res._id
      })

      console.log("state: ", state);
    }

    else {
      console.log("You Are Not Logged In.")
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [])

  return (

    <LoginContext.Provider value={[state, setState]}>
      <NextUIProvider>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route exact path="/feed"       element={<Feed />} />
            <Route exact path="/chat"       element={<Chat />} />
            <Route exact path="/about"      element={<About />} />
            <Route exact path="/contact"    element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </LoginContext.Provider>
  )

}

export default App;