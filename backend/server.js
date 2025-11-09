const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'CollabHire API',
    version: '1.0.0',
    status: 'running',
    message: 'Premium AI for Talent Acquisition'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     CollabHire Backend Running         ║
╠════════════════════════════════════════╣
║  Port: ${PORT}                            ║
║  Status: ✅ Active                     ║
║  API: http://localhost:${PORT}/api      ║
╚════════════════════════════════════════╝
  `);
  
  // Check for OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  WARNING: OPENAI_API_KEY not found in environment variables');
    console.warn('   Add your API key to backend/.env file');
  }
});

module.exports = app;
