import { useState } from 'react';
import { 
  Search, MessageSquare, UserCheck, HelpCircle, 
  TrendingUp, FileText, Menu, X, Users 
} from 'lucide-react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import SmartTools from './SmartTools';

function Dashboard() {
  const recruiterType = 'internal'; // Fixed as internal
  const [activeTool, setActiveTool] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "G'day! I'm CollabHire, your AI recruitment assistant. How can I help you find and engage top talent today?\n\nI can help you with:\n• Creating Boolean search strings for LinkedIn, SEEK, GitHub\n• Writing personalised outreach messages\n• Scoring candidates against job descriptions\n• Generating interview questions and screening guides\n• Providing market insights and salary data\n• Internal hiring metrics and scorecards\n• SkillPath for internal career mobility\n\n**Just ask me anything** or choose a quick action from the sidebar! 👈"
    }
  ]);

  const quickActions = [
    {
      id: 'search',
      label: 'Boolean Search',
      icon: Search,
      description: 'Create search strings for talent platforms'
    },
    {
      id: 'outreach',
      label: 'Outreach Message',
      icon: MessageSquare,
      description: 'Generate personalised messages'
    },
    {
      id: 'score',
      label: 'Score Candidate',
      icon: UserCheck,
      description: 'Evaluate candidate fit'
    },
    {
      id: 'questions',
      label: 'Screening Questions',
      icon: HelpCircle,
      description: 'Create interview questions'
    },
    {
      id: 'insights',
      label: 'Market Insights',
      icon: TrendingUp,
      description: 'Salary data & talent pool info'
    },
    {
      id: 'pipeline',
      label: 'Pipeline Report',
      icon: FileText,
      description: 'Track candidate progress'
    },
    {
      id: 'skillpath',
      label: 'SkillPath',
      icon: Users,
      description: 'Internal career mobility & skill development'
    }
  ];

  const handleQuickAction = (actionId) => {
    setActiveTool(actionId);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:relative z-30 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar
          quickActions={quickActions}
          onActionClick={handleQuickAction}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="#991b1b"/>
                    <circle cx="50" cy="30" r="8" fill="white"/>
                    <circle cx="35" cy="50" r="8" fill="white"/>
                    <circle cx="65" cy="50" r="8" fill="white"/>
                    <circle cx="50" cy="70" r="8" fill="white"/>
                    <path d="M50 30 L35 50 M35 50 L50 70 M50 70 L65 50 M65 50 L50 30" stroke="white" strokeWidth="3"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CollabHire</h1>
                  <p className="text-xs text-gray-500">by Collab Pathways</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">AI Connected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatPanel 
            messages={messages} 
            setMessages={setMessages}
            recruiterType={recruiterType}
          />
        </div>
      </div>

      {activeTool && (
        <SmartTools
          activeTool={activeTool}
          onClose={() => setActiveTool(null)}
          recruiterType={recruiterType}
        />
      )}
    </div>
  );
}

export default Dashboard;
