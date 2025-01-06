const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Pratik3311:Pratik3311@cluster0.9kkj7.mongodb.net/farmersProfile', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected "))
  .catch((error) => console.error("Error connecting to the database: ", error));

// Define the farmer schema
const profile = new mongoose.Schema({
  farmer_name: String,
  photo_link: String,
  caption: String,
  category: String,
  location: String,
  phone_number: String,
  email: String,
});

const Farmer = mongoose.model("Farmer", profile);

// POST route to add a new farmer profile
app.post("/api/farmers", async (req, res) => {
  try {
    const newFarmer = new Farmer(req.body);
    await newFarmer.save();
    res.json(newFarmer);
  } catch (error) {
    res.status(500).json({ message: "Error adding farmer", error });
  }
});

// GET route to fetch all farmer profiles
app.get('/api/farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching farmers", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
