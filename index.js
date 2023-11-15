const express = require("express");
const mongoose = require("mongoose");
const People = require("./model");
const bodyparser=require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}))
const PORT = process.env.PORT || 5141;

mongoose.connect(
    "mongodb+srv://sanjay:sanjay@cluster0.fjcbkym.mongodb.net/test?retryWrites=true&w=majority",
    {
      
      
    }
  );
  

app.use(express.json());
app.get("/",(req,res)=>
{
   
    // res.send("<button href='login.html'>Login</button>")
    res.sendFile(__dirname+'/register.html');
})

app.get("/loginform",(req,res)=>
{
    res.sendFile(__dirname+'/login.html');
})
app.get("/people", async (req, res) => {
  try {
    const data = await People.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/submit", async (req, res) => {
  const { email, password } = req.body;
  try {
    let newData = new People({
      email,
      password,
    });

    await newData.save();
    return res.status(200).send("Added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await People.findOne({ email });

    if (exist && exist.password === password) {
      res.send("Logged in Successfully");
    } else {
      res.send("Incorrect credentials");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
