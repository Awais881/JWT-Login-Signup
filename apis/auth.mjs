import express from 'express';
import { userModel, productModel } from './../dbRepo/models.mjs';
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || "topsecret";


const router = express.Router()




router.post("/api/v1/signup", (req ,res) =>{

    const body = req.body
   
    if( !body.firstName
       || !body.lastName
       || !body.email
       || !body.password
   
       )
   
       {
           res.status(400).send(
               `required fields missing, request example: 
                   {
                       "firstName": "John",
                       "lastName": "Doe",
                       "email": "abc@abc.com",
                       "password": "12345"
                   }`
           );
           return;
       }
   
       // check if user already exist // query email user
   
      req.body.email = req.body.email.toLowerCase();
   
      userModel.findOne({email : body.email},  (err, user) => {
   
          if(!err){
           console.log("user: ", user);
          
           // user already exist
          if(user){
           console.log("user already exist: ", user);
   
           res.status(400).send ({message : "user already exist, try different email" });
           return;
          }
      // user not  already exist
      else  { 
       
         // bcrypt hash
         stringToHash(body.password).then (hashString =>{ 
   
           userModel.create ({
               firstName: body.firstName,
               lastName: body.lastName,
               email: body.email,
               password: hashString
           },
           (err, result) =>{
             
               if(!err){
                   if (!err) {
                       console.log("data saved: ", result);
                       res.status(201).send({ message: "user is created" });
               }
               else {
                   console.log("db error: ", err);
                   res.status(500).send({ message: "internal server error" });
                     }
           
           } 
       
           })
       
          })
       
        }
       }
        else {
           console.log("db error: ", err);
           res.status(500).send({ message: "db error in query" });
           return;
       }
       
      
   })
   });
   
router.post("/api/v1/login", (req, res) =>{
        
       let body = req.body;
       body.email = body.email.toLowerCase();
   
       if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
           res.status(400).send(
               `required fields missing, request example: 
                   {
                       "email": "abc@abc.com",
                       "password": "12345"
                   }`
           );
           return;
       }
   
      // check if user exist
   
      userModel.findOne({email: body.email},
       "firstName lastName email password ",
       (err, data) =>{
           if(!err){
               console.log("data: ", data);
           
           //user found
           if(data) {
               varifyHash(body.password, data.password).then(isMatched =>{
                   console.log("isMatched: ", isMatched);
   
                   if(isMatched){
                       const token = jwt.sign ({
                         _id : data._id,
                          email: data.email,
                          iat: Math.floor(Date.now() / 1000) - 30,
                          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
   
   
                       },SECRET)
                       console.log("token: ", token);
                       res.cookie("Token", token,{
                           maxAge: 86_400_000,
                           httpOnly: true
                       });
   
                       res.send({
                           message: "Login Succesful",
                           profile: {
                               email: data.email,
                               firstName: data.firstName,
                               lastName: data.lastName,
                               age: data.age,
                               _id: data._id
                           }
                        });
                        return;
   
                   } else{
                       console.log("password did not match");
                       res.status(401).send({ message: "Incorrect email or password" });
                       return;
                   }
                   
   
               });
   
           } else{
               console.log("user not found");
               res.status(401).send({ message: "user not found" });
               return;
           }
           }
           else {
               console.log("db error: ", err);
               res.status(500).send({ message: "login failed, please try later" });
               return;
           }
       });
   
   
   });
   
router.post("/api/v1/logout", (req, res) =>{
       res.cookie('Token', '', {
           maxAge: 1,
           httpOnly: true,
           sameSite: 'none',
           secure: true
       }); 
       res.send({message: "logout successfully"})
   });

   export default router