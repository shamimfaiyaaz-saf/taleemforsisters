import React, { useState } from 'react';
import { Youtube, Instagram, Twitter, Mail, Heart, Loader2, CheckCircle } from 'lucide-react';
import { YOUTUBE_CHANNEL_URL, CONTACT_EMAIL } from '../constants';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      // Reset status after showing success message
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-emerald-900 text-emerald-100 py-12 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-serif font-bold text-white">
              <Heart className="text-gold-400 fill-current" size={24} />
              <span>তালিম<span className="text-gold-400 font-light"> ফর সিস্টার্স</span></span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-200">
              জ্ঞান অর্জনের মাধ্যমে বোনদের ক্ষমতায়নে নিবেদিত। কুরআন ও সুন্নাহর আলোকে শিক্ষা, আধ্যাত্মিক বৃদ্ধি এবং বোনদের পারস্পরিক সম্পর্কের যাত্রায় আমাদের সাথে যোগ দিন।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-serif border-b border-emerald-700 inline-block pb-1">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/" className="hover:text-gold-400 transition-colors">হোম</a></li>
              <li><a href="#/videos" className="hover:text-gold-400 transition-colors">সর্বশেষ ভিডিও</a></li>
              <li><a href="#/blog" className="hover:text-gold-400 transition-colors">প্রবন্ধ</a></li>
              <li><a href="#/about" className="hover:text-gold-400 transition-colors">আমাদের গল্প</a></li>
              <li><a href="#/ai-companion" className="hover:text-gold-400 transition-colors">এআই সহযোগী</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-serif border-b border-emerald-700 inline-block pb-1">আমাদের সাথে যুক্ত হন</h3>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex space-x-4">
                <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="bg-emerald-800 p-2 rounded-full hover:bg-red-600 transition-colors text-white" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="#" className="bg-emerald-800 p-2 rounded-full hover:bg-pink-600 transition-colors text-white" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="bg-emerald-800 p-2 rounded-full hover:bg-blue-400 transition-colors text-white" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-200">
                <Mail size={16} />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold-400 transition-colors">{CONTACT_EMAIL}</a>
              </div>
            </div>
            
            <h4 className="text-sm font-semibold text-white mb-2">নিউজলেটার</h4>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <label htmlFor="email-subscribe" className="sr-only">আপনার ইমেইল ঠিকানা</label>
                <input 
                  id="email-subscribe"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল ঠিকানা" 
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-white border border-transparent text-emerald-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:opacity-70 placeholder-emerald-800/60"
                  aria-label="আপনার ইমেইল ঠিকানা"
                />
                {status === 'success' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                    <CheckCircle size={18} />
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className={`
                  flex items-center justify-center gap-2 text-sm font-bold py-2 px-4 rounded transition-all duration-200
                  ${status === 'success' 
                    ? 'bg-emerald-700 text-white cursor-default' 
                    : 'bg-gold-500 text-emerald-900 hover:bg-gold-400'}
                  disabled:opacity-80
                `}
                aria-live="polite"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> প্রক্রিয়াধীন...
                  </>
                ) : status === 'success' ? (
                  'সফলভাবে সাবস্ক্রাইব করা হয়েছে!'
                ) : (
                  'সাবস্ক্রাইব'
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-emerald-800 text-center text-xs text-emerald-400">
          <p>&copy; {new Date().getFullYear()} তালিম ফর সিস্টার্স। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;