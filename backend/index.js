const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace <your_connection_string> with your actual connection string)
mongoose.connect('mongodb+srv://Pratik3311:Pratik3311@cluster0.9kkj7.mongodb.net/farmersDashboardData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Schema and Model
const postSchema = new mongoose.Schema({
  farmer_name: String,
  photo_link: String,
  caption: String,
  category: String,
  location: String,
  phone_number: String,
  email: String
});

const Post = mongoose.model('Post', postSchema);

// API Endpoints
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
