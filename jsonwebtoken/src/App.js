
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
import Loader from "./assets/loader.gif"
import axios from 'axios'
import HomeIcon from '@mui/icons-material/Home';
import About from "./components/about";
import Contact from "./components/contact";
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';






function App() {




  let { state, dispatch } = useContext(GlobalContext);
  
 


  useEffect(() => {

  

    const getProfile = async () => {

      try {
        let response = await axios.get(`${state.baseUrl}/api/v1/products`, {
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
            <li> <Link to={`/contact`}><Button size="medium" variant="contained"  >Contact</Button></Link> </li>
            <li> <Link to={`/about`}><Button size="medium"  variant="contained" >About</Button></Link> </li>
            <li> <Link to={`/gallery`}><Button size="medium"  variant="contained" >Gallery</Button></Link> </li>
            {/* <li> <Button size="medium"  variant="contained"  onClick={logoutHandler}>Logout</Button> </li>  */}
            
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
          <img width={300} src={Loader} alt="" />
        </div>

        : null}


<ToastContainer />

    </>
  );
}

export default App;
