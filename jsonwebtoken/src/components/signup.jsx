import { useState } from "react";
import axios from 'axios';
import './signup.css';
import 'react-toastify/dist/ReactToastify.css';
import { Facebook, Twitter} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';


const baseUrl = 'https://tan-comfortable-badger.cyclic.app'


function Signup() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");     
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${baseUrl}/signup`, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })

            toast('Signup Succuesful ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            console.log("signup successful");
           

        } catch (e) {
            console.log("e: ", e);
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


        // e.reset();
    }






    return (
<>
<div className='contianer'>
      <div className='image'>
  <img src="https://colorlib.com/etc/lf/Login_v18/images/bg-01.jpg" alt="Pic" />
      </div>
        <div>
            <p className='h1'>Signup to continue</p>
        </div>
       <div>
        <form onSubmit={signupHandler}>
 
   
         <input type="text" onChange={(e) => { setFirstName(e.target.value) }}
          placeholder='First Name' 
          className='field email' /> <br />

           <input type="text" placeholder='Last Name' onChange={(e) => { setLastName(e.target.value) }}
            className='field pass'/> <br />
           
         <input type="email"   placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}
          className='field email'/> <br />

        <input type="password" placeholder='Password'   onChange={(e) => { setPassword(e.target.value) }}
        className='field pass'/> <br />
          <div className='checkbox'> <input type="checkbox" 
         className='check'/> <p>Remember</p> <p className='forget'>Forget 
            Password?</p></div>
          <button className='submit' type="submit">Submit</button>
       </form>
       <div className='signup'>or signup with using</div>


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
    export default Signup;