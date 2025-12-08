// 1. Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 2. Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB Connection Error:', err));

// 5. User Model for Log in and Register
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 6. Register and Log in
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    await User.create({ email, password: hashed });

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log in
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 7. Schema Definition
const snippetSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true
  },
  language: { 
    type: String, 
    required: true, 
    lowercase: true
  },
  code: { 
    type: String, 
    required: true 
  },
  description: String,
  tags: [String],
  created_at: { 
    type: Date, 
    default: Date.now
  }
});

// Create the Model
const Snippet = mongoose.model('Snippet', snippetSchema);

// 8. Routes

// Test Route
app.get('/', (req, res) => {
  res.send('Snippet API is running!');
});

// Get all Snippets
app.get('/api/snippets', async (req, res) => {
  try {
    const filter = {};
    if (req.query.lang) {
      filter.language = req.query.lang.toLowerCase();
    }

    const limit = parseInt(req.query.limit) || 10;

    const snippets = await Snippet.find(filter)
      .sort({ created_at: -1 })
      .limit(limit);

    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a New Snippet
app.post('/api/snippets', async (req, res) => {
  try {
    const newSnippet = new Snippet(req.body);
    const savedSnippet = await newSnippet.save();
    res.status(201).json(savedSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get One Snippet by ID
app.get('/api/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Not found' });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a Snippet
app.put('/api/snippets/:id', async (req, res) => {
  try {
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSnippet) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(updatedSnippet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Snippet
app.delete('/api/snippets/:id', async (req, res) => {
  try {
    const deletedSnippet = await Snippet.findByIdAndDelete(req.params.id);

    if (!deletedSnippet) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json({ message: 'Snippet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 9. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});