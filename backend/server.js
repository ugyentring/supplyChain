require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const connectDb = require("./db/db");
const mongoose = require("mongoose");

//models
const Auth = require("./models/authModel");
const Profile = require("./models/profileModel");
const Product = require("./models/productModel");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Auth endpoints
app.get("/authAll", async (req, res) => {
  try {
    const data = await Auth.find();
    res.send(data);
    console.log("Data sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await Auth.find({ username, password });
    res.send(data);
    console.log("Data sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//account add by admin
app.post("/addaccount", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userExist = await Auth.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "Username already exist" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be atleat 6 characters" });
    }

    await Auth.create({ username, password, role });
    res.status(200).json({ msg: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/update", async (req, res) => {
  const { username, password } = req.body;
  try {
    await Auth.updateOne({ username }, { password });
    res.send("Password updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Profile endpoints
app.get("/profileAll", async (req, res) => {
  try {
    const data = await Profile.find();
    res.send(data);
    console.log("Data sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/profile/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const data = await Profile.find({ username });
    res.send(data);
    console.log("Data sent successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addprofile", async (req, res) => {
  const { username, name, description, website, location, image, role } =
    req.body;
  try {
    await Profile.create({
      username,
      name,
      description,
      website,
      location,
      image,
      role,
    });
    res.status(400).json("Profile added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Image upload endpoints
const storageProfile = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads/profile"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.post("/upload/profile", (req, res) => {
  let upload = multer({ storage: storageProfile }).single("image");

  upload(req, res, (err) => {
    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  });
});

// Product endpoints
const storageProduct = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads/product"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.post("/upload/product", (req, res) => {
  let upload = multer({ storage: storageProduct }).single("image");

  upload(req, res, (err) => {
    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  });
});

app.get("/product/serialNumber", async (req, res) => {
  try {
    const data = await Product.find({}, { serialNumber: 1, _id: 0 });
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addproduct", async (req, res) => {
  const { serialNumber, name, brand } = req.body;
  try {
    await Product.create({ serialNumber, name, brand });
    res.send("Data inserted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Static file serving
app.use(express.static("public"));

const port = 5000;
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
