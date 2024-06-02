const express = require('express');
const DbConnect = require('./mongodb');
const SigninDB = require('./signin');
const DBlist = require('./list');
const DBlistGet = require('./Getlist');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let result = await DbConnect(email, password, name);

    if (result === "Email already exists") {
      return res.status(200).json({ success: false, message: "Email already exists" });
    }

    res.status(200).json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let result = await SigninDB(email, password);

    if (result === "Email is not registered") {
      return res.status(200).json({ success: false, message: "Email is not registered" });
    } else if (result === "Password wrong") {
      return res.status(200).json({ success: false, message: "Password wrong" });
    }

    res.status(200).json({ success: true, message: "Sign in successful", user: result });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ success: false, message: "Error signing in" });
  }
});
app.post('/list', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let result = await DBlist(id);

    if (result === "list already exists") {
      return res.status(200).json({ success: false, message: "list already exists" });
    } 

    res.status(200).json({ success: true, message: "List created successfully" });
  } catch (error) {
    console.error("Error List Created :", error);
    res.status(500).json({ success: false, message: "Error List Created" });
  }
});

app.get('/getlist', async (req,res)=>{
  try {
    let result = await DBlistGet();
    res.status(200).json(result);
    
  } catch (error) {
    console.error("Error List :", error);
    res.status(500).json({ success: false, message: "Error List " });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
