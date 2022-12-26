import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express()
import jwt from 'jsonwebtoken';
const port = process.env.PORT || 5001;
const mongodbURI = process.env.mongodbURI || "mongodb+srv://abc:awais123@cluster0.h4fc1n7.mongodb.net/Products?retryWrites=true&w=majority";
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import cookieParser from 'cookie-parser';
mongoose.set('strictQuery', true);
app.use(cors({
    origin: ['http://localhost:3000', "*"],
    credentials: true
}));
const SECRET = process.env.SECRET || "topsecret";
app.use(express.json());
app.use(cookieParser());

let products = []; // TODO: connect with mongodb instead

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    description: String,
    createdOn: { type: Date, default: Date.now }
});
const productModel = mongoose.model('products', productSchema);
 

  
let userSchema= new mongoose.Schema({
    firstName : { type: String },
    lastName :{ type: String },
    email : { type: String, required: true }, 
    password :  { type: String, required: true },
})

const userModel= mongoose.model("user", userSchema);


app.post("/signup", (req ,res) =>{

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

app.post("/login", (req, res) =>{
     
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

app.post("/logout", (req, res) =>{
    res.cookie('Token', '', {
        maxAge: 1,
        httpOnly: true
    }); 
    res.send({message: "logout successfully"})
});

app.use((req, res ,next ) =>{
 
    console.log("req.cookies: ", req.cookies);

    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData){
      if(!err){
        console.log("decodedData :", decodedData)
        const nowDate = new Date().getTime() / 1000;

      

      if(decodedData.exp < nowDate){
         res.status(401)
         res.cookie('Token', '', {
            maxAge: 1,
            httpOnly: true
            
        });
        res.send({ message: "token expired" })
      } else{
        
        console.log("token approved");

        req.body.token = decodedData
        next();
      }
    }
    else{
        res.status(401).send("invalid token")
     }

    });

});

app.post("/product", (req, res) => {

  const body = req.body;
  // validation
  if ( 
      !body.name
      || !body.price
      || !body.description
  ) {
      res.status(400).send({
          message: "required parameters missing",
      });
      return;
  }



  

  productModel.create({
      name: body.name,
      price: body.price,
      description: body.description,
  },
      (err, saved) => {
          if (!err) {
              console.log(saved);

              res.send({
                  message: "product added successfully"
              });
          } else {
              res.status(500).send({
                  message: "failed to add product"
              })
          }
      })
})

app.get("/products", (req, res) => {
    productModel.find({}, (err, data) => {
      if (!err) {
        res.send({
          message: "got all products successfully",
          data: data,
        });
      } else {
        res.status(500).send({
          message: "Get request  error",
        });
      }
    });
  });

app.delete('/product/:id', (req, res) => {
    const id = req.params.id;

    productModel.deleteOne({ editingId: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been deleted successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No Product found with this id: " + id,
                })
            }


        } else {
            res.status(500).send({
                message: "delete error"
            })
        }
    });
})

app.put('/product/:id', async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.name ||
       !body.price ||
       !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "  body.name,",
            "price": "body.price",
            "description": "body.description"
        }`)
        return;
    }

    try {
        let data = await productModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
                description: body.description
            },
            { new: true }
        ).exec();

        console.log('updated: ', data);

        res.send({
            message: "product modified successfully",
            data: products
        });

    } catch (error) {
        res.status(500).send({
            message: "update error"
        })
    }
})







const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './jsonwebtoken/build')))
app.use('*', express.static(path.join(__dirname, './jsonwebtoken/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});