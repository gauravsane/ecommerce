const express = require("express");
const router = new express.Router();
const multer = require("multer");
const backend = require("../model/schema");
const practice = require("../model/schema1");
const fs = require("fs");
const path = require("path");
// const signup = require("../model/signupSchema");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');
const auth = require("../middleware/auth");

// --------------------------------------------------
// Set storage engine
// const uploadDirectory = path.join(__dirname, '../../frontend/public/Images'); // Define the upload directory path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const directory = "./public/Images";
    // const directory = path.join(__dirname, "./upload");
    const directory = path.join(__dirname, "../../frontend/src/Images");
    // Create directory if it doesn't exist
    fs.mkdirSync(directory, { recursive: true });
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Initialize multer upload middleware
// const upload = multer({
//   storage: storage,
// }).single("image"); // 'image' is the name attribute of your file input field in the form

//--------------------------------------------------------------------------

//Insert Data
// router.post("/insert", async (req, res) => {
//   const { name, category, image, new_price, old_price } = req.body;

//   try {
//     const productData = new backend({
//       name: name,
//       category: category,
//       old_price: old_price,
//       new_price: new_price,
//       // image: image,
//     });
//     if (!name) {
//       res.status(404).send({
//         success: false,
//         message: "Name is Required",
//       });
//     }
//     if (!category) {
//       res.status(404).send({
//         success: false,
//         message: "Category is Required",
//       });
//     }
//     if(!image){
//       res.status(404).send({
//         success: false,
//         message : "Image is Required"
//       })
//     }
//     if (!old_price) {
//       res.status(404).send({
//         success: false,
//         message: "Old Price is Required",
//       });
//     }
//     if (!new_price) {
//       res.status(404).send({
//         success: false,
//         message: "New Price is Required",
//       });
//     }
//     await productData.save();
//     res.status(200).json({
//       success: true,
//       message: "Insert Data Successfully",
//       data: productData,
//     });
//   } catch (error) {
//     res.status(400).json(error);
//     console.log(error);
//   }
// });
// router.post("/insert", async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({
//         success: false,
//         message: "Multer error",
//         error: err
//       });
//     } else if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Unknown error",
//         error: err
//       });
//     }

//     const { name, category, new_price, old_price } = req.body;
//     const image = req.file; // multer stores the uploaded file in req.file

//     try {
//       if (!name ) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill name"
//         });
//       }
//       if (!category ) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill category"
//         });
//       }
//       if (!image ) {
//         return res.status(400).json({
//           success: false,
//           message: "Image is required"
//         });
//       }
//       if (!old_price ) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill old price"
//         });
//       }
//       if (!new_price ) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill new price"
//         });
//       }

//       const productData = new backend({
//         name: name,
//         category: category,
//         image: image.path, // save the path of the uploaded image to your schema
//         old_price: old_price,
//         new_price: new_price
//       });

//       await productData.save();

//       res.status(200).json({
//         success: true,
//         message: "Insert Data Successfully",
//         data: productData
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: "Error inserting data",
//         error: error
//       });
//     }
//   });
// });

// router.post("/insert", upload.single("image"), async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({
//         success: false,
//         message: "Multer error",
//         error: err,
//       });
//     } else if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Unknown error",
//         error: err,
//       });
//     }

//     const { name, category, new_price, old_price } = req.body;
//     const image = req.file; // multer stores the uploaded file in req.file

//     try {
//       if (!name) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill name",
//         });
//       }
//       if (!category) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill category",
//         });
//       }
//       if (!image) {
//         return res.status(400).json({
//           success: false,
//           message: "Image is required",
//         });
//       }
//       if (!old_price) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill old price",
//         });
//       }
//       if (!new_price) {
//         return res.status(400).json({
//           success: false,
//           message: "Please fill new price",
//         });
//       }

//       const productData = new backend({
//         name: name,
//         category: category,
//         image: image.path, // save the path of the uploaded image to your schema
//         old_price: old_price,
//         new_price: new_price,
//       });

//       await productData.save();

//       res.status(200).json({
//         success: true,
//         message: "Insert Data Successfully",
//         data: productData,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: "Error inserting data",
//         error: error,
//       });
//     }
//   });

// });

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

//Insert data

router.post("/insert", upload.single("image"), async (req, res) => {
  try {
    const { name, category, new_price, old_price } = req.body;
    const image = req.file; // multer stores the uploaded file in req.file

    if (!name) {
      return res.status(404).send({
        success: false,
        message: "Name is Required",
      });
    }
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category is Required",
      });
    }
    if (!image) {
      return res.status(404).send({
        success: false,
        message: "Image is Required",
      });
    }
    if (!old_price) {
      return res.status(404).send({
        success: false,
        message: "Old Price is Required",
      });
    }
    if (!new_price) {
      return res.status(404).send({
        success: false,
        message: "New Price is Required",
      });
    }

    const productData = new practice({
      name: name,
      category: category,
      image: image.filename, // save the path of the uploaded image to your schema
      old_price: old_price,
      new_price: new_price,
    });

    await productData.save();

    res.status(200).json({
      success: true,
      message: "Insert Data Successfully",
      data: productData,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message,
    });
  }
});

router.put("/update/:id", upload.single("image"), async (req, res) => {
  // console.log(req.params.id);

  try {
    const image = req.file;
    await practice.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category,
        image: image?.filename,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Product Updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await practice.deleteOne({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(402).send({
      success: false,
      message: error,
    });
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

router.get("/practice", async (req, res) => {
  try {
    const getUser = await practice.find();
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
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(401).send({
        success: false,
        message: "Please provide username",
      });
    }
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!email.match(emailPattern)) {
      return res.status(400).send({
        success: false,
        message: "Enter valid email address",
      });
    }
    if (!password) {
      return res.status(401).send({
        success: false,
        message: "Please provide password",
      });
    }
    //check if user already exists - username
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already sign in with this username",
      });
    }
    const existingEmail = await user.findOne({ email });
    if (existingEmail) {
      return res.status(401).send({
        success: false,
        message: "User already sign in with this email",
      });
    }
    // Hash password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    // const data = new user({username, email, password: hashedPassword });
    // await data.save();
    const data = await user.create({
      username,
      email,
      password: hashedPassword,
    });
    // res.status(201).send("User registered successfully");

    // const token = jwt.sign(
    //   {id: data._id, username},
    //   JWT_SECRET, //process.env.jwtsecret
    //   {
    //     expiresIn: "1h"
    //   }
    // )
    // data.token = token
    data.password = undefined;
    return res.status(200).send({
      success: true,
      message: "User Registration Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(401).send({
        success: false,
        message: "Please provide username",
      });
    }
    if (!password) {
      return res.status(401).send({
        success: false,
        message: "Please provide password",
      });
    }
    const data = await user.findOne({ username });
    if (!data) {
      return res.status(401).send({
        success: false,
        message: "Username not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "password does not match",
      });
    }
    const token = jwt.sign(
      { userId: data._id },
      JWT_SECRET, //process.env.jwtsecret
      {
        expiresIn: "1h",
      }
    );
    if (username === "Admin" && passwordMatch === "admin786") {
      return res.status(401).send({
        success: false,
        message: "Admin login successfully",
      });
    }
    data.token = token;
    data.password = undefined;

    //cookie section
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login successfully",
      token,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//middleware add to the shop category
router.get("/shop", auth, (req, res) => {
  // console.log(req.user);
  res.send("Welcome to shop page");
});

module.exports = router;
