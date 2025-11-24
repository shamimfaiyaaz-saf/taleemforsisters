
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateIslamicResponse } from '../services/geminiService';
import { useSettings } from '../context/SettingsContext';

const AIHelp: React.FC = () => {
  const { t } = useSettings();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Use a ref to initialize messages with translation once available
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
        setMessages([
            {
              role: 'model',
              text: t.ai_greeting
            }
        ]);
        initialized.current = true;
    }
  }, [t.ai_greeting]);


  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const responseText = await generateIslamicResponse(userText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
        console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: t.ai_error, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-block p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-4">
            <Sparkles className="text-emerald-600 dark:text-emerald-400" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-emerald-900 dark:text-white">{t.ai_title}</h1>
          <p className="text-stone-600 dark:text-gray-400 mt-2 text-sm">
            {t.ai_desc}
            <br />
            <span className="text-xs text-stone-400 dark:text-gray-500 italic">{t.ai_note}</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-stone-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px] animate-slide-up">
          
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/50 dark:bg-gray-900/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-700 text-white rounded-br-none' 
                      : msg.isError 
                        ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-stone-100 dark:border-gray-600 rounded-bl-none'
                  }`}
                >
                  {msg.isError && <AlertCircle size={16} className="inline mr-1 -mt-0.5" />}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-stone-100 dark:border-gray-600 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm flex items-center gap-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs">{t.ai_loading}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-stone-200 dark:border-gray-700">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.ai_placeholder}
                className="flex-1 px-4 py-3 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIHelp;
