import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collabhireAPI } from '../services/api';

function ChatPanel({ messages, setMessages, recruiterType }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await collabhireAPI.chat(
        [...messages, userMessage],
        recruiterType
      );
      
      setMessages([
        ...messages,
        userMessage,
        { role: 'assistant', content: response.data.content }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...messages,
        userMessage,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please check your OpenAI API key and try again.' 
        }
      ]);
    }
    
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          AI Recruitment Assistant
        </h2>
        <p className="text-sm text-gray-600">
          Ask me anything about talent sourcing, candidate evaluation, or recruitment strategy!
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.role}`}
          >
            {message.role === 'assistant' && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  CH
                </div>
                <span className="text-xs font-medium text-gray-600">CollabHire</span>
              </div>
            )}
            
            <div className="prose prose-gray max-w-none text-gray-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="chat-message assistant">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                CH
              </div>
              <span className="text-xs font-medium text-gray-600">CollabHire</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about talent sourcing, candidate evaluation, or recruitment strategy..."
            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none min-h-[52px] max-h-32"
            rows={1}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 bottom-2 p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin text-white" />
            ) : (
              <Send size={20} className="text-white" />
            )}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}

export default ChatPanel;
