import './products.css';
import axios from "axios";
import {useEffect, useState, useContext } from "react";
import { EmojiEmotions,  Home, Image, Share, Mail, Notifications,
   PersonAdd,  YouTube, Favorite, MoreVert,
    StarBorder, ExpandLess, LiveTv, SportsEsports, VideoCameraBack, PlayCircle,Inbox,
   FavoriteBorder, ModeNight,PeopleAlt, Logout} from '@mui/icons-material'
   import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system'
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Avatar, AvatarGroup, Badge, Button, ButtonGroup, Card, CardActions, CardContent,
   CardHeader, CardMedia, Checkbox, Collapse, Divider, FormControl, Icon, IconButton, ImageList,
    ImageListItem, Input,InputBase, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, 
    ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Select, Stack, styled, Switch, TextField, 
    Toolbar, Typography
} from '@mui/material'
import { GlobalContext } from '../context/context';





function Products() {
  let { state, dispatch } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [toggleReload, setToggleReload] = useState(false);
    const [editProduct, setEditProduct] = useState(
      { editingId: null,
        editingName: "",
        editingPrice: "",
        editingDescription: ""
      }
    );
   
    const [open, setOpen] = useState(false);
       // Get All Products

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
            theme: "light",
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
    

       const getAllProducts = () => {
        axios.get(`${state.baseUrl}/products`)
          .then(response => {
            console.log("AllProducts", response.data.data);
            setProducts(response.data.data.reverse())
          })
          .catch(err => {
            console.log("err", err);
          })
      };
    
       
    useEffect(() => {


      getAllProducts();


  }, [toggleReload])







let editObj=   {
         name: editProduct.editingName,
         price: editProduct.editingPrice,
         description: editProduct.editingDescription
}



    let object ={
      name: name,
      price: price,
      description: description
    }
               // Add Products
  
          
           
          const saveProduct = async (e) => {
            e.preventDefault();
            try {
              const response = await axios.post(`${state.baseUrl}/product`, object)
             
              //  {
              //   name: name,
              //   price: price,
              //   description: description,
              // });
              setToggleReload(!toggleReload)
              console.log(object)
            toast.success('Added Sucessfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            } catch (err) {
              console.log("err", err);
            }
          };
           
       
          
        
        
  




  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${state.baseUrl}/product/${editProduct.editingId}`, editObj);
        console.log(editProduct.editingId);
           setToggleReload(!toggleReload);
    
      setEditProduct({
        editingId: null,
        editingName: "",
        editingPrice: "",
        editingDescription: "",
      });
      toast.success('Update Sucessfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (err) {
      console.log("err", err);
    }
  };

  const deleted = (id) => {
    // console.log(postId);
    setToggleReload(!toggleReload);
    axios.delete(`${state.baseUrl}/product/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success('Deleted Sucessfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          getAllProducts();
      })
 
      .catch((err) => {
        console.log("err", err);
        toast.error('Error', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      });
  }
  
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
  })


  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
  }))
  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { display: "flex" }
  })) 
  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: { display: "none" }
  }))
  const UserBox1 = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
  })
  
    return (
     <>
       <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{display: {xs: "none ", sm:"block"}  }} className="logo"> 
         E-Commerce 
        </Typography> 
    <HomeIcon sx={{display: {xs: "block ", sm:"none"}  }}  className="logo" />
    <Search><InputBase placeholder='Search' sx={{ width: "100%" }} /></Search>
    <Icons>

    <Badge badgeContent={4} color="secondary" className="icon">
     <Mail  />
</Badge>
<Badge badgeContent={4} color="secondary" className="icon">
     <Notifications   />
</Badge>
<Avatar sx={{ width: 30, height: 30 }}
              src="https://avatars.githubusercontent.com/u/102538169?v=4" 
              
         onClick= {e=>setOpen(true)}  
         className="profile"   
              />
    </Icons>
   <UserBox   onClick= {e=>setOpen(true)}  > 
   <Avatar sx={{ width: 30, height: 30 }}
              src="https://avatars.githubusercontent.com/u/102538169?v=4" />
  <Typography variant='span' className="profile">Awais</Typography>
    </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose = {e=>setOpen(false)}  
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem  onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
      </AppBar>    

  {/* leftBAr */}

  <Stack direction="row" spacing={2}>
        <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>

          <Box position={"fixed"}>
            <List
              // sx={{bgcolor:"none"}}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={<ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
              </ListSubheader>}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>



              <ListItemButton>
                <ListItemIcon>
                  <PeopleAlt />
                </ListItemIcon>
                <ListItemText primary="Friends" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>

             

              <ListItemButton>
                <ListItemIcon>
                  <PlayCircle />
                </ListItemIcon>
                <ListItemText primary="Watch" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <SportsEsports />
                </ListItemIcon>
                <ListItemText primary="Fun" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <LiveTv />
                </ListItemIcon>
                <ListItemText primary="Streaming" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Sigout" />
              </ListItemButton>

              {/* Switch */}
              <ListItem disablePadding>
                <ListItemButton component="a" href='#switch'>
                  <ListItemIcon>
                    <ModeNight />
                  </ListItemIcon>
                  <Switch />
                </ListItemButton>
              </ListItem>
            </List>

          </Box>
        </Box>
    
    

      <Box bgcolor={'whitesmoke'} flex={4} p={2}>
          <Box>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              mt: "10px"
            }}>
              <Box flex={1} height={280} bgcolor={"background.default"} color={"text.primary"}
                p={3} border="1px solid black"
                pb={5}
                // sx={{ border: { xs: "none", sm: "block", md: "block" } }}
                borderRadius={5}>
                <Typography variant='h6' color='gray' textAlign='center'>Add Products</Typography>
                <UserBox1>
                  <Avatar sx={{ width: 40, height: 40 }}
                    src="https://avatars.githubusercontent.com/u/102538169?v=4" />
                  <Typography fontWeight={500} variant="span">Awais Ahmed</Typography>
                </UserBox1>
                <div className='form'>
                <form onSubmit={saveProduct} sx={{ width: "100%" }} >
                  <TextField
                    sx={{ width: "100%" }}
                    id="standard-multiline-static"
                    onChange={(e) => { setName(e.target.value) }}
                    multiline
                    rows={1}
                    label="Name"
                    variant="filled" />
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) => { setPrice(e.target.value) }}
                    id="standard-multiline-static"
                    multiline
                    rows={1}
                    label="Price"
                    variant="filled" />
                  <TextField
                   variant="filled"
                    sx={{ width: "100%" }}
                    onChange={(e) => { setDescription(e.target.value) }}
                    id="standard-multiline-static"
                    multiline
                    rows={1}
                    label="Description"
                     />

                  <Stack direction='row' gap={1} mt={2} mb={3}>
                    <EmojiEmotions color='primary' />
                    <Image color='secondary' />
                    <VideoCameraBack color='success' />
                    <PersonAdd color='error' />
                  </Stack>
                  <ButtonGroup fullWidth
                    variant='contained'
                    aria-label='outlined primary button group'>

                    <Button type='submit' >Add</Button>
                    
                 
                  </ButtonGroup>
                </form>
                </div>
              </Box>
            </Box>
            </Box> 
           
          
 

 
     <Box flex={2} mt="20px">
{products?.map((eachProduct, i) => (

    <Card key={i} sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
      {eachProduct?.name}

          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title= {eachProduct?.name}
        subheader={moment(eachProduct.createdOn).fromNow()} 
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b> Description</b>:  {eachProduct?.description}
        </Typography> <br />
        <Typography variant="body2" color="text.secondary">
         <b> Price </b> :  {eachProduct?.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      <div className="editbtn">  
       <Button className="edit"
       variant="outlined" color="success" onClick={() => {
                          setEditProduct({
                            editingId: eachProduct?._id,
                            editingName: eachProduct?.name,
                            editingPrice: eachProduct?.price,
                            editingDescription: eachProduct?.description
                          })
                      }}>
                      Edit</Button> &nbsp; &nbsp;
                    
       {/* <IconButton aria-label="delete" onClick={()=>{
        deleted(eachProduct?.id);
        // setDel()
       }}>   
       <DeleteIcon />
       </IconButton>  */}
        <Button variant="outlined" startIcon={<DeleteIcon />}  onClick={()=>{
        deleted(eachProduct?._id);  }}> 
        Delete
      </Button>
       </div> 


       {
        (eachProduct._id === editProduct.editingId ) ?
           (<div>
           
                <h1>update form</h1>
                     <form onSubmit={updateHandler}>

                     <TextField
                    sx={{ width: "100%" }}
                    id="standard-multiline-static"
                    onChange={(e) =>
                     { setEditProduct({ ...editProduct, editingName: e.target.value }) }}
                     value={editProduct.editingName}
                    multiline
                    rows={1}
                    label="Update Name"
                    variant="filled" />

                   <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) => 
                     { setEditProduct({ ...editProduct, editingPrice: e.target.value }) }}
                     value={editProduct.editingPrice}
                    id="standard-multiline-static"
                    multiline
                    rows={1}
                    label="Update Price"
                    variant="filled" />

                   <TextField
                    sx={{ width: "100%" }}
                    onChange=
                          {(e) => { setEditProduct({ ...editProduct, editingDescription : e.target.value }) }}
                           value={editProduct.editingDescription}
                    id="standard-multiline-static"
                    multiline
                    rows={1}
                    label="Update Description"
                    variant="filled" />
                       
                     
                       <br />
     
                       <Button variant="contained" color="success" type='submit'>
            Proced Update
             </Button>
             </form>
     
           </div>): null 
         }
    </Card>
        ))}
        </Box>
        </Box>
      



{/* 
<div>
 
     {products?.map((eachProduct, i) => (
          <div key={i}>
   <div className="editbtn">  
       <Button 
       variant="contained" color="success" onClick={() => {
                          setEditProduct({
                            editingId: eachProduct?.id,
                            editingName: eachProduct?.name,
                            editingPrice: eachProduct?.price,
                            editingDescription: eachProduct?.description
                          })
                      }}>
                      Edit</Button> 
                    
       <IconButton aria-label="delete" onClick={()=>{
        deleted(eachProduct?.id);
        // setDel()
       }}>   
       <DeleteIcon />
       </IconButton> 
       </div>   
       <div className="card">
<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3SwX529LOk8gikjlCqVSFJ5taynRirQh0qA&usqp=CAU"
        alt="green iguana"
      /> 
      <CardContent> 
        <Typography gutterBottom variant="h5" component="div">
        {eachProduct?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {eachProduct?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{eachProduct?.price}</Button>
        
      </CardActions>
    </Card>
    </div> */}
       {/* <div className="time">{new Date().toDateString()}</div> */}
        {/* <div className="name"><h3>{eachProduct?.name}</h3></div> <br />
          <div className="price">price: {eachProduct?.price}</div>
          
      
         <div className="description">description : {eachProduct?.description}</div>  */}

     
     
                                                 

         
  
     

   
    

    
     
       <ToastContainer />
       </Stack>
     </>
    );
  }
  
  export default Products;