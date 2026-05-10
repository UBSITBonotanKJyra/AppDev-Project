const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected 💖'))
.catch((err) => console.log('MongoDB Error:', err));

const passwordSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  siteName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isLeaked: {
    type: Boolean,
    default: false
  }
});

const Password = mongoose.model('Password', passwordSchema);

app.get('/', (req, res) => {
  res.send('SafeStash Server is running 💖');
});

app.get('/check-breach/:username', (req, res) => {
  const breachedUsers = ['admin', 'test', 'root', 'user123', 'pwned'];

  const username = req.params.username.toLowerCase();

  const isBreached = breachedUsers.includes(username);

  res.json({
    username,
    isBreached
  });
});

app.post('/save-password', async (req, res) => {
  try {
    const { username, siteName, password } = req.body;

    const newPassword = new Password({
      username,
      siteName,
      password
    });

    await newPassword.save();

    res.json({
      success: true,
      message: 'Password saved successfully 💖',
      data: newPassword
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Error saving password'
    });
  }
});

app.get('/passwords', async (req, res) => {
  try {
    const passwords = await Password.find();

    res.json(passwords);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Error fetching passwords'
    });
  }
});

app.delete('/delete-password/:id', async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Password deleted successfully'
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Error deleting password'
    });
  }
});

app.put('/update-leak/:id', async (req, res) => {
  try {
    const { isLeaked } = req.body;

    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      { isLeaked },
      { new: true }
    );

    res.json(updatedPassword);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Error updating leak status'
    });
  }
});

app.listen(PORT, () => {
  console.log(`SafeStash server running on http://localhost:${PORT}`);
});