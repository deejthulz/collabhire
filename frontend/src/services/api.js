import axios from 'axios';

const API_BASE_URL = 'https://collabhire-production.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export const collabhireAPI = {
  chat: (messages, recruiterType = 'internal') =>
    api.post('/chat', { messages, recruiterType }),

  generateSearchStrings: (data, recruiterType = 'internal') =>
    api.post('/generate-search', { ...data, recruiterType }),

  scoreCandidate: (jobDescription, candidateProfile, recruiterType = 'internal') =>
    api.post('/score-candidate', { jobDescription, candidateProfile, recruiterType }),

  generateOutreach: (data, recruiterType = 'internal') =>
    api.post('/generate-outreach', { ...data, recruiterType }),

  generateScreeningQuestions: (jobTitle, focus = 'general', recruiterType = 'internal') =>
    api.post('/generate-questions', { jobTitle, keySkills: [focus], recruiterType }),

  getMarketInsights: (data, recruiterType = 'internal') =>
    api.post('/market-insights', { ...data, recruiterType }),

  createPipelineTracker: (jobTitle, recruiterType = 'internal') =>
    api.post('/pipeline-tracker', { jobTitle, recruiterType }),

  analyzeCareerPath: (data, recruiterType = 'internal') =>
    api.post('/skillpath', { ...data, recruiterType }),
};

export default api;
