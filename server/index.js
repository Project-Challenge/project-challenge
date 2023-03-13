const express = require("express")
const App = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('./models/users.js')
const ChallengeModel = require('./models/challenges.js')



mongoose.set('strictQuery', false);

const cors = require('cors')

const secret = "5zMJV11Klw6ZWuFYPFmrBJ";

App.use(express.json());
App.use(cors());

mongoose.connect(
    "mongodb+srv://web-access:3Ayrjn3xueogTVA6@challenge-cluster.lmxtinx.mongodb.net/ChallengeDB?retryWrites=true&w=majority"
);

App.post("/createChallenge", async (req, res) => {
  try {
    const newChallenge = new ChallengeModel({
      title: req.body.title,
      description: req.body.description,
      creationDate: new Date(), // Preferably UTC
      createdBy: "placeholder" // getUserId will have to go there
    });
    await newChallenge.save();
    res.json(newChallenge);
    
  } catch (error) {
    res.json(error);
  }
});

App.post("/challenge/pending/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findByIdAndUpdate(
      req.params.id,
      { 
        state: 1, 
        finishedBy: "placeholder", 
        pendingDate: new Date() 
      },
      { new: true }
    );
    if (!challenge) {
      return res.status(404).send("Challenge not found");
    }
    res.send(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

App.post("/challenge/finished/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findByIdAndUpdate(
      req.params.id,
      { 
        state: 2, 
        verifiedBy: "placeholder", 
        finishedDate: new Date() 
      },
      { new: true }
    );
    if (!challenge) {
      return res.status(404).send("Challenge not found");
    }
    res.send(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

App.post("/challenge/revert/:id", async (req, res) => {
  try {
    const challenge = await ChallengeModel.findByIdAndUpdate(
      req.params.id,
      { 
        state: 0, 
        finishedBy: null, 
        pendingDate: null 
      },
      { new: true }
    );
    if (!challenge) {
      return res.status(404).send("Challenge not found");
    }
    res.send(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

App.post("/registerUser", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = {
    username: req.body.username,
    password: hash
    };
    const newUser = new UserModel(user);
    await newUser.save();
    res.json("User was succesfully added");
    
  } catch (error) {
    res.json(error);
  }
});

App.post("/loginUser", async (req, res) => {
  try {
    // Authenticate user and get user data
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      res.json("User not found");
      
    } else {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (isPasswordValid) {
        // Generate JWT
        const payload = {
          id: user.id,
          username: user.username
        };
        const options = {
          expiresIn: "1d"
        };
        const token = jwt.sign(payload, secret, options);
        // Return JWT to client
        res.json({ token });
        
      } else {
        res.json("Wrong password");
      }
    }
  } catch (error) {
    res.json(error);
  }
});

App.get('/verifyToken', async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.verify(token, secret);
    return res.send({ isValid: true, username: decoded.username });
    
  } catch (err) {
    return res.send({ isValid: false, username: null });
  }
});

//not sure 'bout what port to use with vite
App.listen(5174, () => { 
    console.log("server started");
});
