import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <a 
      href={video.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-stone-100"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Play size={24} className="text-emerald-600 fill-current" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
            {video.category}
          </span>
        </div>
        <h3 className="font-serif font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-stone-500 mt-3">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{video.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{video.views} ভিউ</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;