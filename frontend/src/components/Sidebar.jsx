import { X } from 'lucide-react';

function Sidebar({ quickActions, onActionClick, onClose }) {
  return (
    <div className="w-80 bg-gradient-to-br from-primary-900 to-primary-800 text-white h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">CollabHire</h2>
          <p className="text-sm text-white/70">by Collab Pathways</p>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className="w-full flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group text-left"
            >
              <div className="mt-0.5">
                <action.icon size={20} className="text-white/80 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white mb-1 text-sm">
                  {action.label}
                </div>
                <div className="text-xs text-white/60 leading-relaxed">
                  {action.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
