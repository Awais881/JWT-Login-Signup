import { useState, useContext } from "react";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { GlobalContext } from '../context/context';
import { Facebook, Twitter} from '@mui/icons-material';
let baseUrl = ``;
if (window.location.href.split(":")[0] === "http") {
    baseUrl = `http://localhost:5001`;
}

function Login() {

    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


 const loginHandler =async (e) =>{
      
    e.preventDefault();

    try {
        let response = await axios.post(`${baseUrl}/login`, {
            email: email,
            password: password
        }, {
            withCredentials: true
        })
        toast('Login Succuesful ', {
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
            type: 'USER_LOGIN',
                payload: null
        })
       
        console.log("Login  successful");
       

    }
    catch (err) {
        console.log("err: ", err);
        toast.error('Error', {
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



  return (



   <>
   <div className='contianer'>
      <div className='image'>
  <img src="https://colorlib.com/etc/lf/Login_v18/images/bg-01.jpg" alt="Pic" className="image"/>
      </div>
        <div>
            <p className='h1'>Login to continue</p>
        </div>
       <div>
        <form onSubmit={loginHandler} >
 
   
         <input type="email" onChange={(e) => { setEmail(e.target.value) }}
          placeholder='First Name' 
          className='field email' /> <br />
           
            <input type="password" placeholder='Password'   onChange={(e) => { setPassword(e.target.value) }}
        className='field pass'/> <br />
          <div className='checkbox'> <input type="checkbox" 
         className='check'/> <p>Remember</p> <p className='forget'>Forget 
            Password?</p></div>
          <button className='submit' type="submit">Submit</button>
       </form>
       <div className='signup'>or login with using</div>
  <div className='social'> 
     <span className="facebook"><Facebook /></span>
     <span className="twitter"><Twitter /></span>
     </div>
       {/* <div className='social'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-7y4cEij0T78S2WxMp6RA5foiJCUp089Zq-Gcy1JobI49LPSoxsceBedd7kTYg8tZ2r8&usqp=CAU" className='facebook' alt="" />
        <img src="https://e7.pngegg.com/pngimages/708/311/png-clipart-icon-logo-twitter-logo-twitter-logo-blue-social-media-thumbnail.png" className='twitter' alt="" />
       </div> */}
</div>
        </div>
   
        <ToastContainer />
   </>



  );
}

export default Login;
