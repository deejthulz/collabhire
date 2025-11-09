import { collabhireAPI } from '../services/api';
import ToolModal from './ToolModal';

function SmartTools({ activeTool, onClose, recruiterType }) {
  const tools = {
    search: { id: 'search', label: 'Boolean Search Builder' },
    outreach: { id: 'outreach', label: 'Outreach Generator' },
    score: { id: 'score', label: 'Candidate Scorer' },
    questions: { id: 'questions', label: 'Screening Questions' },
    insights: { id: 'insights', label: 'Market Insights' },
    pipeline: { id: 'pipeline', label: 'Pipeline Tracker' },
    skillpath: { id: 'skillpath', label: 'SkillPath - Career Mobility' }
  };

  const handleGenerate = async (toolId, formData, recruiterType, uploadedFile) => {
    try {
      let response;
      
      switch (toolId) {
        case 'search':
          const skills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
          response = await collabhireAPI.generateSearchStrings({
            jobTitle: formData.jobTitle,
            location: formData.location,
            skills: skills,
            platforms: formData.platforms || ['LinkedIn']
          }, recruiterType);
          break;
          
        case 'outreach':
          response = await collabhireAPI.generateOutreach({
            candidateInfo: formData.candidateInfo,
            jobTitle: formData.jobTitle,
            companyInfo: formData.companyInfo
          }, recruiterType);
          break;
          
        case 'score':
          // Handle file upload or text input
          if (uploadedFile) {
            response = await collabhireAPI.scoreCandidateWithFile(
              formData.jobDescription,
              uploadedFile,
              recruiterType
            );
          } else {
            response = await collabhireAPI.scoreCandidate(
              formData.jobDescription,
              formData.candidateProfile,
              recruiterType
            );
          }
          break;

        case 'questions':
          response = await collabhireAPI.generateScreeningQuestions(
            formData.jobTitle,
            formData.focus || 'general',
            recruiterType
          );
          break;

        case 'insights':
          response = await collabhireAPI.getMarketInsights({
            jobTitle: formData.jobTitle,
            location: formData.location
          }, recruiterType);
          break;

        case 'pipeline':
          response = await collabhireAPI.createPipelineTracker(
            formData.jobTitle,
            recruiterType
          );
          break;

        case 'skillpath':
          // Handle file upload or text input
          if (uploadedFile) {
            response = await collabhireAPI.analyzeCareerPathWithFile(
              formData.employeeName,
              formData.currentRole,
              uploadedFile,
              formData.careerGoals,
              recruiterType
            );
          } else {
            response = await collabhireAPI.analyzeCareerPath({
              employeeName: formData.employeeName,
              currentRole: formData.currentRole,
              employeeProfile: formData.employeeProfile,
              careerGoals: formData.careerGoals
            }, recruiterType);
          }
          break;
          
        default:
          throw new Error('Unknown tool');
      }
      
      return response.data.content;
    } catch (error) {
      console.error('Generation error:', error);
      throw new Error(error.response?.data?.error || error.message || 'Failed to generate');
    }
  };

  const tool = tools[activeTool];
  if (!tool) return null;

  return (
    <ToolModal
      tool={tool}
      onClose={onClose}
      onGenerate={handleGenerate}
      recruiterType={recruiterType}
    />
  );
}

export default SmartTools;
