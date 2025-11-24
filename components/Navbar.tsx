
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Search, User, LogOut, Video as VideoIcon, FileText, ChevronRight, Moon, Sun, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { SAMPLE_BLOGS, SAMPLE_VIDEOS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme, language, setLanguage, t } = useSettings();

  const navLinks = [
    { name: t.nav_home, path: '/' },
    { name: t.nav_videos, path: '/videos' },
    { name: t.nav_blog, path: '/blog' },
    { name: t.nav_about, path: '/about' },
    { name: t.nav_contact, path: '/contact' },
    { name: t.nav_ai, path: '/ai-companion', special: true },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const filteredBlogs = SAMPLE_BLOGS.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.content.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredVideos = SAMPLE_VIDEOS.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const hasResults = searchQuery.trim() !== '' && (filteredBlogs.length > 0 || filteredVideos.length > 0);

  return (
    <>
    <nav className="bg-emerald-900 dark:bg-gray-800 text-white sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-800 dark:bg-gray-700 p-1.5 rounded-full border border-emerald-600 dark:border-gray-600">
                <Heart size={20} className="text-gold-400 fill-current" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide text-emerald-50">
                তালিম<span className="text-gold-400 font-light"> ফর সিস্টার্স</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                    ${isActive(link.path) 
                      ? 'bg-emerald-800 dark:bg-gray-700 text-gold-400' 
                      : 'text-emerald-100 hover:bg-emerald-800 dark:hover:bg-gray-700 hover:text-white'}
                    ${link.special ? 'border border-gold-500/50 shadow-sm' : ''}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

           {/* Icons & Actions */}
           <div className="flex items-center gap-3">
             
             {/* Theme Toggle */}
             <button 
                onClick={toggleTheme}
                className="p-2 text-emerald-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors hover:bg-emerald-800 dark:hover:bg-gray-700 rounded-full"
                title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
             >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
             </button>

             {/* Language Toggle */}
             <button 
                onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                className="flex items-center gap-1 p-2 text-emerald-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors hover:bg-emerald-800 dark:hover:bg-gray-700 rounded-full text-xs font-bold"
                title="Switch Language"
             >
                <Globe size={18} />
                <span>{language === 'bn' ? 'EN' : 'BN'}</span>
             </button>

            <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-emerald-200 hover:text-white dark:text-gray-400 dark:hover:text-white transition-colors hover:bg-emerald-800 dark:hover:bg-gray-700 rounded-full" 
                aria-label="Search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="relative group">
                  <Link to="/profile" className="flex items-center gap-2 bg-emerald-800 dark:bg-gray-700 hover:bg-emerald-700 dark:hover:bg-gray-600 px-3 py-1.5 rounded-full transition-colors">
                     <User size={16} className="text-gold-400" />
                     <span className="text-sm font-medium truncate max-w-[100px]">{user.name}</span>
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="text-sm font-bold bg-gold-500 text-emerald-900 px-4 py-1.5 rounded hover:bg-gold-400 transition-colors"
                >
                  {t.nav_login}
                </Link>
              )}
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-emerald-800 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-700 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-xl z-40 border-t border-emerald-100 dark:border-gray-700 animate-fade-in-down">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="relative">
                    <input 
                        ref={searchInputRef}
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.search_placeholder}
                        className="w-full pl-12 pr-4 py-3 bg-stone-50 dark:bg-gray-900 border border-stone-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-gray-500" size={20} />
                </div>
                
                {searchQuery.trim() && (
                    <div className="mt-4 max-h-[60vh] overflow-y-auto">
                        {!hasResults ? (
                            <div className="text-center py-8 text-stone-500 dark:text-gray-400">
                                {t.no_results}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredBlogs.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold text-stone-400 dark:text-gray-500 uppercase tracking-wider mb-2">{t.nav_blog}</h3>
                                        <div className="space-y-2">
                                            {filteredBlogs.map(blog => (
                                                <button 
                                                    key={blog.id}
                                                    onClick={() => { navigate('/blog'); setIsSearchOpen(false); }}
                                                    className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors text-left border border-transparent hover:border-emerald-100 dark:hover:border-gray-600 group"
                                                >
                                                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300 line-clamp-1">{blog.title}</h4>
                                                        <p className="text-xs text-stone-500 dark:text-gray-400 line-clamp-1">{blog.excerpt}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {filteredVideos.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold text-stone-400 dark:text-gray-500 uppercase tracking-wider mb-2">{t.nav_videos}</h3>
                                        <div className="space-y-2">
                                            {filteredVideos.map(video => (
                                                <a 
                                                    key={video.id}
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors text-left border border-transparent hover:border-emerald-100 dark:hover:border-gray-600 group"
                                                >
                                                    <div className="bg-gold-100 dark:bg-yellow-900/30 p-2 rounded text-gold-700 dark:text-yellow-500 group-hover:bg-gold-200 dark:group-hover:bg-yellow-900/50">
                                                        <VideoIcon size={18} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-300 line-clamp-1">{video.title}</h4>
                                                        <p className="text-xs text-stone-500 dark:text-gray-400">{video.category}</p>
                                                    </div>
                                                    <ChevronRight size={16} className="ml-auto text-stone-300 dark:text-gray-600 group-hover:text-emerald-500" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800 dark:bg-gray-800 animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-emerald-900 dark:bg-gray-900 text-white'
                    : 'text-emerald-100 hover:bg-emerald-700 dark:hover:bg-gray-700 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-emerald-700 dark:border-gray-700 mt-4 pt-4">
               {user ? (
                 <>
                  <Link 
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-emerald-100 hover:text-white"
                  >
                    <User size={18} /> {t.nav_profile}
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-emerald-100 hover:text-red-300"
                  >
                    <LogOut size={18} /> {t.nav_logout}
                  </button>
                 </>
               ) : (
                 <Link 
                   to="/login"
                   onClick={() => setIsOpen(false)}
                   className="block text-center w-full bg-gold-500 text-emerald-900 font-bold py-2 rounded"
                 >
                   {t.nav_login}
                 </Link>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
