
import React, { useState } from 'react';
import { SAMPLE_VIDEOS, YOUTUBE_CHANNEL_URL } from '../constants';
import { VideoCategory } from '../types';
import VideoCard from '../components/VideoCard';
import { ExternalLink, Filter } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Videos: React.FC = () => {
  const { t } = useSettings();
  const [filter, setFilter] = useState<VideoCategory | 'All'>('All');

  // Since categories in enum are in Bangla, we need to handle the 'All' logic carefully regarding translations
  // For simplicity, we compare with the string 'All' or the specific enum value.
  // Ideally, VideoCategory values should be keys, but they are display values in the current setup.
  
  const filteredVideos = filter === 'All' 
    ? SAMPLE_VIDEOS 
    : SAMPLE_VIDEOS.filter(v => v.category === filter);

  // We construct the list dynamically. The enum values are Bengali text.
  const categories = ['All', ...Object.values(VideoCategory)];

  return (
    <div className="bg-stone-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl font-serif font-bold text-emerald-900 dark:text-white mb-4">{t.videos_title}</h1>
          <p className="text-stone-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.videos_desc}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center text-stone-400 dark:text-gray-500 mr-2">
            <Filter size={18} />
            <span className="text-sm ml-1">{t.filter_label}</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as VideoCategory | 'All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === cat
                  ? 'bg-emerald-700 text-white shadow-md transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-stone-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 border border-stone-200 dark:border-gray-700'
              }`}
            >
              {cat === 'All' ? t.filter_all : cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, idx) => (
              <div key={video.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-500 dark:text-gray-400">
            {t.no_videos_found}
          </div>
        )}

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
          <a 
            href={YOUTUBE_CHANNEL_URL}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-emerald-700 dark:text-emerald-400 font-bold hover:text-emerald-900 dark:hover:text-emerald-200 border-b-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-700 dark:hover:border-emerald-400 pb-1 transition-colors"
          >
            {t.visit_youtube} <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videos;
