
import './App.css';
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from './context/context';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Signup from "./components/signup"
import Login from './components/login';
import Products from './components/products';
import Gallery from './components/gallery';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'
import HomeIcon from '@mui/icons-material/Home';
import About from "./components/about";
import Contact from "./components/contact";
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';






function App() {



  const [open, setOpen] = useState(false);
  let { state, dispatch } = useContext(GlobalContext);
  
  const logoutHandler = async () => {
    
    try {
      let response = await axios.post(`${state.baseUrl}/logout`, {
        withCredentials: true
      })
      console.log("response: ", response);
      toast('Logout Succuesful ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (error) {
      console.log("axios error: ", error);
      toast.error('Logout Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }

  }



  useEffect(() => {

  
    
  
    const getProfile = async () => {

      try {
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true
        })

        console.log("response: ", response);


        dispatch({
          type: 'USER_LOGIN'
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [])






  return (
    <>
  
  {
        (state.isLogin === true) ?
          <ul className='navBar'>
            <li> <Link to={`/`}><Button size="medium"  variant="contained"  >Home</Button></Link> </li>
            <li> <Link to={`/contact`}><Button size="medium" variant="contained"   >Contact</Button></Link> </li>
            <li> <Link to={`/about`}><Button size="medium"  variant="contained" >About</Button></Link> </li>
            <li> <Link to={`/gallery`}><Button size="medium"  variant="contained" >Gallery</Button></Link> </li>
            <li> <Button size="medium"  variant="contained"  onClick={logoutHandler}>Logout</Button> </li> 
            
          </ul>
          : null
      }
      {
        (state.isLogin === false) ?
          <ul className='navBar'>
            <li> <Link to={`/`}>  <Button size="medium" variant="contained" >Login</Button></Link> </li>
            <li> <Link to={`/signup`}><Button size="medium" variant="contained" >Signup</Button></Link> </li>
          </ul> : null
      }

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        : null}

      {(state.isLogin === false) ?
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes> : null
      }

      {(state.isLogin === null) ?

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
          <img width={300} src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" alt="" />
        </div>

        : null}


<ToastContainer />

    </>
  );
}

export default App;
