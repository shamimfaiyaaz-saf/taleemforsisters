
import React from 'react';
import { Heart, BookOpen, Users } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const About: React.FC = () => {
  const { t } = useSettings();

  return (
    <div className="bg-stone-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-emerald-900 dark:bg-gray-800 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 islamic-pattern"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t.about_title}</h1>
          <p className="text-xl text-emerald-100 leading-relaxed">
            {t.about_quote}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 animate-slide-up border border-stone-100 dark:border-gray-700">
           <h2 className="text-2xl font-serif font-bold text-emerald-900 dark:text-white mb-6">{t.about_who_we_are}</h2>
           <div className="prose prose-emerald dark:prose-invert text-stone-600 dark:text-gray-300 leading-relaxed space-y-4">
             <p>
               {t.about_desc_1}
             </p>
             <p>
               {t.about_desc_2}
             </p>
             <p className="font-bold text-emerald-800 dark:text-emerald-400">
               {t.about_core_topics}
             </p>
             <ul className="list-disc pl-5 space-y-2">
               <li>{t.about_topic_1}</li>
               <li>{t.about_topic_2}</li>
               <li>{t.about_topic_3}</li>
               <li>{t.about_topic_4}</li>
             </ul>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all animate-fade-in border border-stone-100 dark:border-gray-700" style={{ animationDelay: '100ms' }}>
              <div className="bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-emerald-700 dark:text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.about_feature_1_title}</h3>
              <p className="text-stone-600 dark:text-gray-400 text-sm">{t.about_feature_1_desc}</p>
           </div>
           <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all animate-fade-in border border-stone-100 dark:border-gray-700" style={{ animationDelay: '200ms' }}>
              <div className="bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-emerald-700 dark:text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.about_feature_2_title}</h3>
              <p className="text-stone-600 dark:text-gray-400 text-sm">{t.about_feature_2_desc}</p>
           </div>
           <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all animate-fade-in border border-stone-100 dark:border-gray-700" style={{ animationDelay: '300ms' }}>
              <div className="bg-emerald-100 dark:bg-emerald-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-emerald-700 dark:text-emerald-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.about_feature_3_title}</h3>
              <p className="text-stone-600 dark:text-gray-400 text-sm">{t.about_feature_3_desc}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
