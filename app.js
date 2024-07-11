const express = require('express');
const mongoose = require('mongoose');
const port = 6776;
const app = express();
 const model = require("./model.js")

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/login';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

  app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Missing required fields: username, email, password');
      }
    
   const newuser = new model ( {username , email , password} )
   try{
    const saveUser = await newuser.save()
    res.status.json(saveUser)
   }
   catch (err) {
    console.error(err);
    res.status(500).send('Error register in');
}})
  

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }); // Find user by username
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Implement password verification logic (e.g., using bcrypt)
    const isPasswordValid = await user.comparePassword(password); // Example method

    if (!isPasswordValid) {
      return res.status(401).send('Invalid username or password');
    }

    
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Assuming some users exist in the collection
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
});

app.listen(port , () => console.log('Server listening on port 1707'));