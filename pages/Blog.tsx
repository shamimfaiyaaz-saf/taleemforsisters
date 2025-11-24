


import React, { useState, useEffect } from 'react';
import { SAMPLE_BLOGS, SPAM_WORDS } from '../constants';
import { Calendar, User as UserIcon, Tag, Trash2, Plus, X, Clock, Flag, AlertTriangle, Eye, ArrowRight, Loader2 } from 'lucide-react';
import { BlogPost } from '../types';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Blog: React.FC = () => {
  const { user } = useAuth();
  const { t } = useSettings();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Modal States
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  const [reportingPost, setReportingPost] = useState<BlogPost | null>(null);
  const [reportReason, setReportReason] = useState('');
  
  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newTags, setNewTags] = useState('');

  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const initializedSamples = SAMPLE_BLOGS.map(b => ({...b, status: 'approved' as const}));
      setPosts(initializedSamples);
      localStorage.setItem('blogPosts', JSON.stringify(initializedSamples));
    }
  }, []);

  const handleLoadMore = () => {
      setIsLoadingMore(true);
      setTimeout(() => {
          setVisibleCount(prev => prev + 5);
          setIsLoadingMore(false);
      }, 600);
  };

  const checkForSpam = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return SPAM_WORDS.some(word => lowerText.includes(word));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    }
  };

  const openReportModal = (post: BlogPost) => {
      if (!user) {
          alert("Please login to report.");
          return;
      }
      setReportingPost(post);
      setReportReason('');
  };

  const submitReport = () => {
      if (!reportingPost) return;
      const updatedPosts = posts.map(post => 
          post.id === reportingPost.id 
          ? { ...post, isFlagged: true, reportReason: reportReason || 'No reason' } 
          : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setReportingPost(null);
      alert("Report submitted.");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrorMessage('');

    if (checkForSpam(newTitle) || checkForSpam(newContent) || checkForSpam(newExcerpt)) {
        setErrorMessage('Spam detected.');
        return;
    }

    const isAdmin = user.role === 'admin';
    const status = isAdmin ? 'approved' : 'pending';

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      excerpt: newExcerpt || newContent.substring(0, 100) + '...',
      author: user.name,
      authorEmail: user.email,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/800/500`,
      tags: newTags.split(',').map(t => t.trim()).filter(t => t !== ''),
      status: status,
      viewCount: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    
    setShowForm(false);
    setNewTitle('');
    setNewContent('');
    setNewExcerpt('');
    setNewTags('');

    if (status === 'pending') {
        alert('Post submitted for review.');
    }
  };

  const handleReadFull = (post: BlogPost) => {
      // Increment view count
      const updatedPosts = posts.map(p => {
          if (p.id === post.id) {
              return { ...p, viewCount: (p.viewCount || 0) + 1 };
          }
          return p;
      });
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      
      setViewingPost(post);
  };

  const displayedPosts = posts.filter(post => 
    post.status === 'approved' || (user && post.authorEmail === user.email)
  );

  const visiblePosts = displayedPosts.slice(0, visibleCount);

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen py-12 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-emerald-900 dark:text-white mb-4">{t.blog_section_title}</h1>
          <p className="text-stone-600 dark:text-gray-400">
            {t.blog_desc}
          </p>
        </div>

        {/* Create Post Button */}
        {user && (
          <div className="mb-12 text-center">
            {!showForm ? (
              <button 
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition-colors font-bold shadow-md"
              >
                <Plus size={20} /> {t.create_post}
              </button>
            ) : (
              <div className="bg-stone-50 dark:bg-gray-700 p-8 rounded-xl border border-stone-200 dark:border-gray-600 shadow-inner text-left max-w-3xl mx-auto animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-emerald-900 dark:text-white">{t.create_post}</h3>
                   <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-red-500">
                     <X size={24} />
                   </button>
                </div>
                {errorMessage && (
                    <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200 mb-4 flex items-center gap-2 text-sm">
                        <AlertTriangle size={16} /> {errorMessage}
                    </div>
                )}
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 dark:text-gray-300 mb-1">{t.post_title_label}</label>
                    <input 
                      type="text" 
                      value={newTitle} 
                      onChange={e => setNewTitle(e.target.value)} 
                      required 
                      placeholder={t.post_title_placeholder}
                      className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:border-emerald-500 placeholder-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 dark:text-gray-300 mb-1">{t.post_excerpt_label}</label>
                    <input 
                      type="text" 
                      value={newExcerpt} 
                      onChange={e => setNewExcerpt(e.target.value)} 
                      placeholder={t.post_excerpt_placeholder}
                      className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:border-emerald-500 placeholder-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 dark:text-gray-300 mb-1">{t.post_content_label}</label>
                    <textarea 
                      value={newContent} 
                      onChange={e => setNewContent(e.target.value)} 
                      required 
                      rows={6}
                      placeholder={t.post_content_placeholder}
                      className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:border-emerald-500 placeholder-stone-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 dark:text-gray-300 mb-1">{t.post_tags_label}</label>
                    <input 
                      type="text" 
                      value={newTags} 
                      onChange={e => setNewTags(e.target.value)} 
                      placeholder={t.post_tags_placeholder}
                      className="w-full px-4 py-2 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded focus:outline-none focus:border-emerald-500 placeholder-stone-400"
                    />
                  </div>
                  <div className="pt-2">
                    <button type="submit" className="w-full bg-gold-500 text-emerald-900 font-bold py-2 rounded hover:bg-gold-400 transition-colors">
                      {t.btn_submit}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        <div className="space-y-12">
          {visiblePosts.length > 0 ? visiblePosts.map((blog, idx) => (
            <article key={blog.id} className={`flex flex-col md:flex-row gap-8 items-start border-b border-stone-100 dark:border-gray-700 pb-12 last:border-0 relative group animate-slide-up ${blog.status === 'pending' ? 'opacity-80' : ''}`} style={{ animationDelay: `${idx * 100}ms` }}>
              
              {blog.status === 'pending' && (
                  <div className="absolute top-0 right-0 z-10 bg-gold-500 text-emerald-900 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
                      <Clock size={12} /> Pending
                  </div>
              )}

              <div className="w-full md:w-1/3 h-64 md:h-56 rounded-lg overflow-hidden shrink-0 bg-stone-200 dark:bg-gray-700">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=Islamic+Art';
                  }}
                />
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-gray-400 uppercase tracking-wide">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold"><UserIcon size={12} /> {blog.author}</span>
                      <span className="flex items-center gap-1"><Eye size={12} /> {blog.viewCount || 0}</span>
                   </div>
                   
                   <div className="flex gap-2">
                       {user && user.email !== blog.authorEmail && blog.status === 'approved' && (
                           <button
                                onClick={() => openReportModal(blog)}
                                className="text-stone-300 hover:text-red-500 p-1 transition-colors flex items-center gap-1 text-xs"
                           >
                               <Flag size={14} /> Report
                           </button>
                       )}
                       {user && (user.role === 'admin' || user.email === blog.authorEmail) && (
                         <button 
                           onClick={() => handleDelete(blog.id)}
                           className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                         >
                           <Trash2 size={18} />
                         </button>
                       )}
                   </div>
                </div>

                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-stone-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <button 
                        onClick={() => handleReadFull(blog)}
                        className="text-emerald-700 dark:text-emerald-400 font-bold hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors flex items-center gap-1 text-sm"
                    >
                        {t.blog_read_more} <ArrowRight size={16} />
                    </button>
                    <div className="flex gap-2">
                        {blog.tags.map(tag => (
                            <span key={tag} className="flex items-center text-xs bg-stone-100 dark:bg-gray-700 text-stone-600 dark:text-gray-300 px-2 py-1 rounded">
                                <Tag size={10} className="mr-1" /> {tag}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </article>
          )) : (
              <div className="text-center py-20 text-stone-500 dark:text-gray-400">
                  No posts found.
              </div>
          )}
        </div>

        {/* Load More Button */}
        {visiblePosts.length < displayedPosts.length && (
            <div className="mt-12 text-center">
                <button 
                    onClick={handleLoadMore} 
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-700 border border-stone-200 dark:border-gray-600 rounded-full font-bold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-600 transition-all shadow-sm"
                >
                    {isLoadingMore ? <Loader2 className="animate-spin" size={20} /> : null}
                    {isLoadingMore ? t.loading : t.load_more}
                </button>
            </div>
        )}
      </div>

      {/* Full Article Modal */}
      {viewingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-fade-in-down">
                <div className="relative h-64 md:h-80">
                    <img src={viewingPost.imageUrl} alt={viewingPost.title} className="w-full h-full object-cover" />
                    <button 
                        onClick={() => setViewingPost(null)}
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                        <div className="flex gap-2 mb-2">
                             {viewingPost.tags.map(tag => (
                                <span key={tag} className="bg-gold-500 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded">
                                    {tag}
                                </span>
                             ))}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">{viewingPost.title}</h2>
                    </div>
                </div>
                <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between text-sm text-stone-500 dark:text-gray-400 mb-8 border-b border-stone-100 dark:border-gray-700 pb-4">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400"><UserIcon size={16} /> {viewingPost.author}</span>
                            <span className="flex items-center gap-1"><Calendar size={16} /> {viewingPost.date}</span>
                        </div>
                        <div className="flex items-center gap-1"><Eye size={16} /> {viewingPost.viewCount || 0} views</div>
                    </div>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none font-serif text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed">
                        {viewingPost.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-stone-100 dark:border-gray-700 text-center">
                        <p className="text-stone-500 dark:text-gray-400 italic mb-4">Did you find this article helpful?</p>
                        <button 
                            onClick={() => setViewingPost(null)}
                            className="bg-emerald-700 text-white px-8 py-2 rounded-full font-bold hover:bg-emerald-800 transition-colors"
                        >
                            Close Article
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Report Modal */}
      {reportingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow-xl p-6 animate-fade-in-down border border-stone-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
                      <AlertTriangle /> Report Content
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-gray-300 mb-2">
                      Why are you reporting <strong>"{reportingPost.title}"</strong>?
                  </p>
                  <textarea 
                      className="w-full p-3 border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
                      rows={4}
                      placeholder="Describe the issue..."
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                      <button 
                          onClick={() => setReportingPost(null)}
                          className="px-4 py-2 text-stone-500 dark:text-gray-400 hover:bg-stone-100 dark:hover:bg-gray-700 rounded"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={submitReport}
                          className="px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700"
                      >
                          Submit Report
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Blog;
