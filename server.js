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

// 5. Schema Definition
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

// 6. Routes

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

// 7. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});