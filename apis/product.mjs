import express from 'express';
import { userModel, productModel } from './../dbRepo/models.mjs'
const router = express.Router()


router.post("/api/v1/product", (req, res) => {

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
  
router.get("/api/v1/products", (req, res) => {
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
  
router.delete('/api/v1/product/:id', (req, res) => {
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
  
router.put('/api/v1/product/:id', async (req, res) => {
  
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
              data: data
          });
  
      } catch (error) {
          res.status(500).send({
              message: "update error"
          })
      }
  })
  






export default router