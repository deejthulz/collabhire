import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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

  scoreCandidateWithFile: (jobDescription, file, recruiterType = 'internal') => {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('candidateFile', file);
    formData.append('recruiterType', recruiterType);
    return api.post('/score-candidate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

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

  analyzeCareerPathWithFile: (employeeName, currentRole, file, careerGoals, recruiterType = 'internal') => {
    const formData = new FormData();
    formData.append('employeeName', employeeName);
    formData.append('currentRole', currentRole);
    formData.append('employeeFile', file);
    if (careerGoals) formData.append('careerGoals', careerGoals);
    formData.append('recruiterType', recruiterType);
    return api.post('/skillpath', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export default api;
