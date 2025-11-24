
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Youtube, PlusCircle, Trash2, Clock, Flag, Loader2 } from 'lucide-react';
import { SAMPLE_VIDEOS, SAMPLE_BLOGS, TESTIMONIALS, SPAM_WORDS } from '../constants';
import VideoCard from '../components/VideoCard';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { Testimonial, Video } from '../types';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { t } = useSettings();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newReview, setNewReview] = useState('');
  const [guestName, setGuestName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Infinite Scroll / Load More State
  const [visibleVideos, setVisibleVideos] = useState<Video[]>([]);
  const [videoCount, setVideoCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Initial Load
    setVisibleVideos(SAMPLE_VIDEOS.slice(0, 3));
  }, []);

  const handleLoadMoreVideos = () => {
    setIsLoadingMore(true);
    // Simulate network delay for effect
    setTimeout(() => {
        const nextCount = videoCount + 3;
        setVisibleVideos(SAMPLE_VIDEOS.slice(0, nextCount));
        setVideoCount(nextCount);
        setIsLoadingMore(false);
    }, 800);
  };

  const featuredBlogs = SAMPLE_BLOGS.filter(b => b.status === 'approved').slice(0, 3);

  useEffect(() => {
    const storedTestimonials = localStorage.getItem('testimonials');
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials));
    } else {
      const initialData = TESTIMONIALS.map((t, i) => ({
        id: i.toString(),
        ...t,
        date: 'পূর্বের'
      }));
      setTestimonials(initialData);
      localStorage.setItem('testimonials', JSON.stringify(initialData));
    }
  }, []);

  const checkForSpam = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return SPAM_WORDS.some(word => lowerText.includes(word));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewerName = user ? user.name : guestName;

    if (!reviewerName.trim()) {
        alert(t.form_name + " required");
        return;
    }
    
    if (!newReview.trim()) return;

    if (checkForSpam(newReview) || checkForSpam(userLocation) || checkForSpam(reviewerName)) {
        setMessage({ type: 'error', text: 'Spam detected.' });
        return;
    }

    const isAdmin = user?.role === 'admin';
    const reviewStatus = isAdmin ? 'approved' : 'pending';

    const review: Testimonial = {
      id: Date.now().toString(),
      name: reviewerName,
      email: user?.email,
      text: newReview,
      location: userLocation || 'Online',
      date: new Date().toLocaleDateString('bn-BD'),
      status: reviewStatus
    };

    const updatedList = [review, ...testimonials];
    setTestimonials(updatedList);
    localStorage.setItem('testimonials', JSON.stringify(updatedList));
    
    setNewReview('');
    setGuestName('');
    setUserLocation('');
    setShowReviewForm(false);
    
    if (reviewStatus === 'pending') {
        alert('Review pending approval.');
    } else {
        setMessage({ type: 'success', text: 'Review published!' });
        setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteReview = (id: string) => {
    if (window.confirm('Are you sure?')) {
      const updatedList = testimonials.filter(t => t.id !== id);
      setTestimonials(updatedList);
      localStorage.setItem('testimonials', JSON.stringify(updatedList));
    }
  };

  const handleFlagReview = (id: string) => {
    if (!user) {
        alert("Please login to report.");
        return;
    }
    if (window.confirm('Report this review?')) {
        const updatedList = testimonials.map(t => t.id === id ? { ...t, isFlagged: true } : t);
        setTestimonials(updatedList);
        localStorage.setItem('testimonials', JSON.stringify(updatedList));
        alert("Reported.");
    }
  };
  
  const displayedTestimonials = testimonials.filter(t => 
    t.status === 'approved' || (user && t.email === user.email)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 dark:bg-gray-900 text-white py-20 lg:py-32 overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-800 dark:bg-gray-800 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-gold-500 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              {t.hero_title} <span className="text-gold-400">{t.hero_title_highlight}</span> {t.hero_welcome}
            </h1> 
            <p className="text-lg md:text-xl text-emerald-100 dark:text-gray-300 mb-8 font-light leading-relaxed">
              {t.hero_desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.youtube.com/@TaleemforSisters" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-900 bg-gold-400 hover:bg-gold-500 transition-colors shadow-lg"
              >
                <Youtube className="mr-2" size={20} />
                {t.btn_channel}
              </a>
              <Link 
                to="/videos" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                {t.btn_watch}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos (Infinite Scroll / Load More) */}
      <section className="py-16 bg-stone-50 dark:bg-gray-800 islamic-pattern transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-emerald-900 dark:text-white mb-2">{t.section_latest_lessons}</h2>
              <p className="text-stone-600 dark:text-gray-400">{t.section_latest_desc}</p>
            </div>
            <Link to="/videos" className="hidden md:flex items-center text-emerald-700 dark:text-emerald-400 font-semibold hover:text-emerald-900 dark:hover:text-emerald-300">
              {t.btn_view_all} <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleVideos.map((video, index) => (
              <div key={video.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <VideoCard video={video} />
              </div>
            ))}
          </div>

          {videoCount < SAMPLE_VIDEOS.length && (
              <div className="mt-12 text-center">
                  <button 
                    onClick={handleLoadMoreVideos} 
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-100 dark:bg-gray-700 text-emerald-800 dark:text-emerald-400 rounded-full font-bold hover:bg-emerald-200 dark:hover:bg-gray-600 transition-colors"
                  >
                      {isLoadingMore ? <Loader2 className="animate-spin" size={20} /> : null}
                      {isLoadingMore ? t.loading : t.load_more}
                  </button>
              </div>
          )}
        </div>
      </section>

      {/* CTA Section (AI) */}
      <section className="py-16 bg-emerald-800 dark:bg-gray-900 border-t border-emerald-700 dark:border-gray-800 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">{t.ai_cta_title}</h2>
          <p className="text-emerald-200 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t.ai_cta_desc}
          </p>
          <Link 
            to="/ai-companion" 
            className="inline-block bg-white text-emerald-900 font-bold px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors shadow-lg"
          >
            {t.ai_cta_btn}
          </Link>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-emerald-900 dark:text-white mb-10 text-center">{t.blog_section_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, idx) => (
              <div key={blog.id} className="flex flex-col group animate-fade-in" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="h-48 overflow-hidden rounded-lg mb-4 relative bg-stone-200 dark:bg-gray-700">
                   <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                   <div className="absolute bottom-0 left-0 bg-gold-500 text-emerald-900 text-xs font-bold px-3 py-1 rounded-tr-lg">
                    {blog.tags[0]}
                   </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-stone-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
                  {blog.excerpt}
                </p>
                <Link to="/blog" className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:text-emerald-800 dark:hover:text-emerald-300 mt-auto">
                  {t.blog_read_more} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-stone-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-emerald-900 dark:text-white">{t.testimonials_title}</h2>
            
            {!showReviewForm && (
            <button 
                onClick={() => setShowReviewForm(true)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gold-600 hover:text-gold-700 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gold-200 dark:border-gray-700 transition-all hover:shadow-md"
            >
                <PlusCircle size={16} /> {t.btn_give_review}
            </button>
            )}
            
            {message && (
                <div className={`mt-4 p-3 rounded text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            {showReviewForm && (
              <div className="max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-left animate-fade-in border border-stone-200 dark:border-gray-700">
                <form onSubmit={handleAddReview}>
                  {!user && (
                    <div className="mb-3">
                      <label className="block text-xs font-bold text-stone-500 dark:text-gray-400 mb-1">{t.form_name}</label>
                      <input 
                        type="text"
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        placeholder={t.form_name}
                        className="w-full p-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="block text-xs font-bold text-stone-500 dark:text-gray-400 mb-1">{t.form_location}</label>
                    <input 
                      type="text"
                      value={userLocation}
                      onChange={e => setUserLocation(e.target.value)}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full p-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-stone-500 dark:text-gray-400 mb-1">{t.form_comment}</label>
                    <textarea 
                      value={newReview}
                      onChange={e => setNewReview(e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => setShowReviewForm(false)}
                      className="px-3 py-1 text-xs text-stone-500 hover:text-red-500"
                    >
                      {t.btn_cancel}
                    </button>
                    <button 
                      type="submit"
                      className="bg-emerald-600 text-white px-4 py-1 rounded text-sm font-bold hover:bg-emerald-700"
                    >
                      {t.btn_submit}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedTestimonials.map((t, i) => (
              <div key={i} className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border ${t.status === 'pending' ? 'border-gold-300 bg-gold-50 dark:bg-yellow-900/10' : 'border-stone-200 dark:border-gray-700'} relative flex flex-col group transition-colors`}>
                
                {t.status === 'pending' && (
                    <div className="absolute top-0 right-0 bg-gold-500 text-emerald-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1 z-10">
                        <Clock size={12} /> Pending
                    </div>
                )}
                
                <div className="absolute -top-4 left-8 bg-emerald-600 text-white p-2 rounded-full">
                   <Star size={16} fill="currentColor" />
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                    {user && user.email !== t.email && t.status === 'approved' && (
                        <button
                            onClick={() => handleFlagReview(t.id)}
                            className="text-stone-300 hover:text-red-500 transition-colors"
                        >
                            <Flag size={16} />
                        </button>
                    )}
                    {user && (user.role === 'admin' || (t.email && user.email === t.email)) && (
                    <button 
                        onClick={() => handleDeleteReview(t.id)}
                        className="text-stone-300 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                    )}
                </div>

                <p className="text-stone-600 dark:text-gray-300 italic mb-6 flex-grow pt-2">"{t.text}"</p>
                <div className="mt-auto">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-400">{t.name}</h4>
                  <p className="text-xs text-stone-500 dark:text-gray-500 uppercase tracking-wide">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
