
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '../constants';
import { useSettings } from '../context/SettingsContext';

const Contact: React.FC = () => {
  const { t } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.contact_success);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-stone-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 animate-fade-in-down">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-emerald-700 dark:text-emerald-400" size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-emerald-900 dark:text-white mb-4">{t.contact_title}</h1>
          <p className="text-stone-600 dark:text-gray-400">
            {t.contact_desc}
          </p>
        </div>

        {/* Direct Email Display */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-8 text-center border border-emerald-100 dark:border-gray-700 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <p className="text-stone-600 dark:text-gray-400 mb-2 text-sm">{t.contact_direct_email}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl font-bold text-emerald-700 dark:text-emerald-400 hover:text-gold-500 transition-colors">
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 border-gold-500 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact_label_name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact_label_email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact_label_subject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.contact_label_message}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-800 transition-colors shadow-md"
              >
                {t.contact_btn_send} <Send size={18} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
