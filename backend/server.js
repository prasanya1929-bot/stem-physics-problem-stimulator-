const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const parsePhysicsProblem = require('./parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/parse', async (req, res) => {
  try {
    const { problem } = req.body;
    
    if (!problem) {
      return res.status(400).json({ error: 'Problem text is required' });
    }

    const parsedData = await parsePhysicsProblem(problem);
    res.json(parsedData);
  } catch (error) {
    console.error('Error parsing problem:', error);
    res.status(500).json({ 
      error: 'Failed to parse problem',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
