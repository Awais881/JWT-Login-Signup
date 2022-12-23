import { useState } from "react";
import axios from 'axios';



const baseUrl = 'http://localhost:5001'


function Signup() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");     
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");








    return (
<>

      <div class="form signup">
                <span class="title">Registration</span>

                <form  onsubmit="sign(); return false;">
                    <div class="input-field">
                        <input type="text" placeholder="Enter your name" required id="name"/>
                        <i class="uil uil-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="email" placeholder="Enter your email" required id="email"/>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Create a password" required id="password"/>
                        <i class="uil uil-lock icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Confirm a password" required id="comPassword"/>
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" id="gender" placeholder="Enter Your gender" required id="gender"/>
                        <i class="fa-solid fa-mercury"></i>
                        
                    </div>

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="termCon"/>
                            <label for="termCon" class="text">I accepted all terms and conditions</label>
                        </div>
                    </div> 
                 

                    <div class="input-field button">
                      <button> <input type="button" value="Signup" / ></button> 
                    </div> 

                 
                   
                 
                </form>

                <div class="login-signup" >
                    <span class="text">Already a member?
                        <a href="#" class="text login-link">Login Now</a>
                    </span>
                </div>
                
            </div>
        </div>
    </div>
</>
   
   
        
        );
    }