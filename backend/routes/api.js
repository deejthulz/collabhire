const express = require('express');
const router = express.Router();
const collabhireService = require('../services/collabhireService');
const upload = require('../middleware/upload');
const fs = require('fs').promises;

/**
 * Chat endpoint
 */
router.post('/chat', async (req, res) => {
  try {
    const { messages, recruiterType } = req.body;
    const result = await collabhireService.chat(messages, { recruiterType });
    res.json(result);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Generate Boolean search strings
 */
router.post('/generate-search', async (req, res) => {
  try {
    const { jobTitle, location, skills, platforms, recruiterType } = req.body;
    
    if (!jobTitle || !location) {
      return res.status(400).json({ 
        success: false, 
        error: 'jobTitle and location are required' 
      });
    }

    const result = await collabhireService.generateSearchStrings({
      jobTitle,
      location,
      skills,
      platforms,
      recruiterType
    });
    
    res.json(result);
  } catch (error) {
    console.error('Search strings error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Score candidate against job description
 * File upload currently disabled - use text input instead
 */
router.post('/score-candidate', upload.single('candidateFile'), async (req, res) => {
  try {
    let { jobDescription, candidateProfile, recruiterType } = req.body;
    
    // If file uploaded, read it as plain text (temporary workaround)
    if (req.file) {
      try {
        const fileContent = await fs.readFile(req.file.path, 'utf-8');
        candidateProfile = fileContent;
        await fs.unlink(req.file.path).catch(() => {});
      } catch (fileError) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(400).json({
          success: false,
          error: 'File upload currently supports text files only. Please paste content directly or use a .txt file.'
        });
      }
    }
    
    if (!jobDescription || !candidateProfile) {
      return res.status(400).json({ 
        success: false, 
        error: 'jobDescription and candidateProfile are required' 
      });
    }

    const result = await collabhireService.scoreCandidate(
      jobDescription,
      candidateProfile,
      recruiterType
    );
    
    res.json(result);
  } catch (error) {
    console.error('Score candidate error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Generate personalised outreach messages
 */
router.post('/generate-outreach', async (req, res) => {
  try {
    const { candidateInfo, jobTitle, companyInfo, recruiterType } = req.body;
    
    if (!candidateInfo || !jobTitle) {
      return res.status(400).json({ 
        success: false, 
        error: 'candidateInfo and jobTitle are required' 
      });
    }

    const result = await collabhireService.generateOutreach({
      candidateInfo,
      jobTitle,
      companyInfo,
      recruiterType
    });
    
    res.json(result);
  } catch (error) {
    console.error('Outreach generation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Generate screening questions
 */
router.post('/generate-questions', async (req, res) => {
  try {
    const { jobTitle, keySkills, recruiterType } = req.body;
    
    if (!jobTitle) {
      return res.status(400).json({ 
        success: false, 
        error: 'jobTitle is required' 
      });
    }

    const result = await collabhireService.generateScreeningQuestions(
      jobTitle,
      keySkills || [],
      recruiterType
    );
    
    res.json(result);
  } catch (error) {
    console.error('Questions generation error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Get market insights
 */
router.post('/market-insights', async (req, res) => {
  try {
    const { jobTitle, location, recruiterType } = req.body;
    
    if (!jobTitle || !location) {
      return res.status(400).json({ 
        success: false, 
        error: 'jobTitle and location are required' 
      });
    }

    const result = await collabhireService.getMarketInsights({
      jobTitle,
      location,
      recruiterType
    });
    
    res.json(result);
  } catch (error) {
    console.error('Market insights error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Create pipeline tracker
 */
router.post('/pipeline-tracker', async (req, res) => {
  try {
    const { jobTitle, recruiterType } = req.body;
    
    if (!jobTitle) {
      return res.status(400).json({ 
        success: false, 
        error: 'jobTitle is required' 
      });
    }

    const result = await collabhireService.createPipelineTracker(
      jobTitle,
      recruiterType
    );
    
    res.json(result);
  } catch (error) {
    console.error('Pipeline tracker error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * SkillPath - Career mobility analysis
 * File upload currently disabled - use text input instead
 */
router.post('/skillpath', upload.single('employeeFile'), async (req, res) => {
  try {
    let { employeeName, currentRole, employeeProfile, careerGoals, recruiterType } = req.body;
    
    // If file uploaded, read it as plain text (temporary workaround)
    if (req.file) {
      try {
        const fileContent = await fs.readFile(req.file.path, 'utf-8');
        employeeProfile = fileContent;
        await fs.unlink(req.file.path).catch(() => {});
      } catch (fileError) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(400).json({
          success: false,
          error: 'File upload currently supports text files only. Please paste content directly or use a .txt file.'
        });
      }
    }
    
    if (!employeeName || !currentRole || !employeeProfile) {
      return res.status(400).json({ 
        success: false, 
        error: 'employeeName, currentRole, and employeeProfile are required' 
      });
    }

    const result = await collabhireService.analyzeCareerPath({
      employeeName,
      currentRole,
      employeeProfile,
      careerGoals,
      recruiterType
    });
    
    res.json(result);
  } catch (error) {
    console.error('SkillPath error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

/**
 * Health check
 */
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'CollabHire API',
    version: '1.0.0'
  });
});

module.exports = router;
