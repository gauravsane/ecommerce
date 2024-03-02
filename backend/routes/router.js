const express = require("express");
const router = new express.Router();

const backend = require("../model/schema");

const signup = require("../model/signupSchema");
const user = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser');
const auth = require("../middleware/auth");



//Insert Data
router.post("/insert", async (req, res) => {
  const { name } = req.body;
  const { category } = req.body;
  const { image } = req.body;
  const { new_price } = req.body;
  const { old_price } = req.body;

  try {
    const productData = new backend({
      name: name,
      category: category,
      image: image,
      new_price: new_price,
      old_price: old_price,
    });
    console.log(productData);
    await productData.save();
    res.status(200).json(productData);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

//Get the Data
router.get("/getdata", async (req, res) => {
  try {
    const getUser = await backend.find();
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json(error);
  }
});


//login user
// router.post("/login",async(req,res)=>{
//   const{email,password}=req.body
//   try{
//       const check = await signup.findOne({email:email})
//       if(check){
//           res.json("exist")
//       }
//       else{
//           res.json("not exist")
//       }
//   }
//   catch(e){
//       res.json("fail")
//   }
// })

//register user
// router.post("/register", async (req, res) => {
//   const {name, email, password } = req.body;
//   const data = {
//     name: name,
//     email: email,
//     password: password,
//   };

//   try {
//     const check = await signup.findOne({ email: email });

//     if (check) {
//       res.json("exist");
//     } else {
//       res.json("not exist");
//       await signup.insertMany([data]);
//     }
//   } catch (e) {
//     res.json("fail");
//   }
// });


const JWT_SECRET = "fsfdsds655";
router.post("/register", async (req, res)=>{
  try {
    const { username, email, password } = req.body;
    if(!(username && email && password)){
      res.status(400).send("All Fields are compulsory")
    }
    //check if user already exists - username
    const existingUser = await user.findOne({username})
    if(existingUser){
      res.status(401).send("User already sign in with this username")
    }
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    // const data = new user({username, email, password: hashedPassword });
    // await data.save();
    const data = await user.create({
      username,
      email,
      password: hashedPassword
    })
    // res.status(201).send("User registered successfully");

    // const token = jwt.sign(
    //   {id: data._id, username},
    //   JWT_SECRET, //process.env.jwtsecret
    //   {
    //     expiresIn: "1h"
    //   }
    // )
    // data.token = token
    data.password = undefined
    res.status(201).json(data)
  
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post('/login', async (req, res)=>{
  try {
    const { username, password } = req.body;
    if(!(username && password)){
      res.status(400).send("fill all the data")
    }
    const data = await user.findOne({ username });
    if (!data) {
      return res.status(404).send("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign(
      { userId: data._id },
      JWT_SECRET, //process.env.jwtsecret
      {
        expiresIn: "1h"
      }
    );
    data.token = token
    data.password = undefined
     
    //cookie section
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      data
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


//middleware add to the shop category
router.get('/shop', auth, (req,res)=>{
  // console.log(req.user);
  res.send('Welcome to shop page')
})

module.exports = router;
