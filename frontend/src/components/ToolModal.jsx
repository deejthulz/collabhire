import { useState } from 'react';
import { X, Copy, Check, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ToolModal({ tool, onClose, onGenerate, recruiterType }) {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await onGenerate(tool.id, formData, recruiterType);
      setResult(response);
    } catch (error) {
      setResult('Error: ' + (error.message || 'Failed to generate'));
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderForm = () => {
    switch (tool.id) {
      case 'search':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title (e.g., Senior Software Engineer)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.jobTitle || ''}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location (e.g., Melbourne, Sydney)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.skills || ''}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              {['LinkedIn', 'SEEK', 'GitHub', 'Indeed'].map((platform) => (
                <label key={platform} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={formData.platforms?.includes(platform) || false}
                    onChange={(e) => {
                      const current = formData.platforms || [];
                      const updated = e.target.checked
                        ? [...current, platform]
                        : current.filter(p => p !== platform);
                      setFormData({ ...formData, platforms: updated });
                    }}
                  />
                  <span className="text-sm">{platform}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'outreach':
        return (
          <div className="space-y-4">
            <textarea
              placeholder="Candidate background..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[100px]"
              value={formData.candidateInfo || ''}
              onChange={(e) => setFormData({ ...formData, candidateInfo: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Job Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.jobTitle || ''}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Company Info (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.companyInfo || ''}
              onChange={(e) => setFormData({ ...formData, companyInfo: e.target.value })}
            />
          </div>
        );

      case 'score':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[120px]"
                value={formData.jobDescription || ''}
                onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidate CV/Resume *
              </label>
              <textarea
                placeholder="Paste candidate CV or LinkedIn profile..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[120px]"
                value={formData.candidateProfile || ''}
                onChange={(e) => setFormData({ ...formData, candidateProfile: e.target.value })}
                required
              />
            </div>
          </div>
        );

      case 'questions':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.jobTitle || ''}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.jobTitle || ''}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
        );

      case 'pipeline':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title/Role"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={formData.jobTitle || ''}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              required
            />
          </div>
        );

      case 'skillpath':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 SkillPath - Internal Career Mobility</h4>
              <p className="text-sm text-blue-700">Help employees discover internal career paths and develop missing skills to retain top talent.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Name *
              </label>
              <input
                type="text"
                placeholder="e.g., Sarah Johnson"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.employeeName || ''}
                onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Role *
              </label>
              <input
                type="text"
                placeholder="e.g., Marketing Coordinator"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.currentRole || ''}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Skills & Experience *
              </label>
              <textarea
                placeholder="Paste employee CV, LinkedIn profile, or list key skills and experience..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[120px]"
                value={formData.employeeProfile || ''}
                onChange={(e) => setFormData({ ...formData, employeeProfile: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Goals (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Leadership role, Product Management, Data Analytics"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.careerGoals || ''}
                onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>What you'll get:</strong> Suggested internal career paths, skill gap analysis, and a 90-day development plan.
              </p>
            </div>
          </div>
        );

      default:
        return <p>Form not configured for this tool</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{tool.label}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderForm()}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  tool.id === 'skillpath' ? 'Analyse Career Path' : 'Generate'
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Result</h3>
                  <button
                    onClick={() => copyToClipboard(result)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-gray-100 rounded-lg border"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="prose max-w-none text-gray-800">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border"
                >
                  {tool.id === 'skillpath' ? 'Analyse Another' : 'Generate Another'}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToolModal;
