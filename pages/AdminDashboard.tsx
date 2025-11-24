
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BlogPost, Testimonial, User } from '../types';
import { 
    Shield, Check, X, AlertTriangle, Trash2, FileText, 
    MessageSquare, Users, BarChart2, Search, Filter, Lock, Unlock,
    MoreHorizontal, RefreshCw
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'users' | 'reports'>('overview');
  
  // Data States
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const storedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setBlogs(storedBlogs);
    setTestimonials(storedTestimonials);
    setUsers(storedUsers);
  };

  const saveBlogs = (updatedBlogs: BlogPost[]) => {
    setBlogs(updatedBlogs);
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));
  };

  const saveTestimonials = (updatedTestimonials: Testimonial[]) => {
    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
  };

  const saveUsers = (updatedUsers: User[]) => {
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // --- Actions ---

  // Blog Actions
  const handleApproveBlog = (id: string) => {
    const updated = blogs.map(b => b.id === id ? { ...b, status: 'approved' as const, isFlagged: false, reportReason: undefined } : b);
    saveBlogs(updated);
  };
  
  const handleRejectBlog = (id: string) => {
    const updated = blogs.map(b => b.id === id ? { ...b, status: 'rejected' as const } : b);
    saveBlogs(updated);
  };

  const handleDeleteBlog = (id: string) => {
    if(window.confirm('আপনি কি নিশ্চিত যে আপনি এই পোস্টটি মুছে ফেলতে চান?')) {
        const updated = blogs.filter(b => b.id !== id);
        saveBlogs(updated);
    }
  };

  // Bulk Blog Actions
  const toggleSelectPost = (id: string) => {
      setSelectedPosts(prev => 
        prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
      );
  };

  const handleBulkDelete = () => {
      if(selectedPosts.length === 0) return;
      if(window.confirm(`আপনি কি ${selectedPosts.length} টি পোস্ট মুছে ফেলতে চান?`)) {
          const updated = blogs.filter(b => !selectedPosts.includes(b.id));
          saveBlogs(updated);
          setSelectedPosts([]);
      }
  };

  const handleBulkApprove = () => {
    if(selectedPosts.length === 0) return;
    const updated = blogs.map(b => selectedPosts.includes(b.id) ? { ...b, status: 'approved' as const } : b);
    saveBlogs(updated);
    setSelectedPosts([]);
    alert('নির্বাচিত পোস্টগুলো প্রকাশিত হয়েছে।');
  };

  // User Actions
  const toggleUserBlock = (userId: string) => {
      const updated = users.map(u => {
          if (u.id === userId) {
              return { ...u, isBlocked: !u.isBlocked };
          }
          return u;
      });
      saveUsers(updated);
  };

  const deleteUser = (userId: string) => {
      if(window.confirm('আপনি কি এই ব্যবহারকারীকে মুছে ফেলতে চান?')) {
          const updated = users.filter(u => u.id !== userId);
          saveUsers(updated);
      }
  };

  const changeUserRole = (userId: string, newRole: string) => {
      const updated = users.map(u => u.id === userId ? { ...u, role: newRole as any } : u);
      saveUsers(updated);
  };

  // Review Actions
  const handleApproveReview = (id: string) => {
    const updated = testimonials.map(t => t.id === id ? { ...t, status: 'approved' as const, isFlagged: false } : t);
    saveTestimonials(updated);
  };

  const handleDeleteReview = (id: string) => {
     if(window.confirm('Are you sure?')) {
        const updated = testimonials.filter(t => t.id !== id);
        saveTestimonials(updated);
     }
  };


  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  // Analytics Calculations
  const totalPosts = blogs.length;
  const pendingPostsCount = blogs.filter(b => b.status === 'pending').length;
  const totalViews = blogs.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);
  const totalUsers = users.length;
  const flaggedCount = blogs.filter(b => b.isFlagged).length + testimonials.filter(t => t.isFlagged).length;

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
                <div className="bg-emerald-900 p-3 rounded-lg text-white shadow-lg">
                    <Shield size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-serif font-bold text-emerald-900">অ্যাডমিন ড্যাশবোর্ড</h1>
                    <p className="text-stone-600 text-sm">সিস্টেম ওভারভিউ এবং ম্যানেজমেন্ট</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={loadData} className="p-2 bg-white rounded border border-stone-200 hover:bg-emerald-50 text-emerald-700">
                    <RefreshCw size={20} />
                </button>
            </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-8 bg-white p-1 rounded-xl shadow-sm border border-stone-200">
            {[
                { id: 'overview', icon: BarChart2, label: 'ওভারভিউ' },
                { id: 'content', icon: FileText, label: 'কন্টেন্ট ম্যানেজমেন্ট' },
                { id: 'users', icon: Users, label: 'ব্যবহারকারী' },
                { id: 'reports', icon: AlertTriangle, label: `রিপোর্ট (${flaggedCount})` },
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all whitespace-nowrap flex-1 justify-center
                        ${activeTab === tab.id 
                            ? 'bg-emerald-800 text-white shadow-md' 
                            : 'text-stone-500 hover:bg-stone-100 hover:text-emerald-700'}`}
                >
                    <tab.icon size={18} /> {tab.label}
                </button>
            ))}
        </div>

        {/* --- OVERVIEW TAB --- */}
        {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">মোট ব্যবহারকারী</p>
                            <h3 className="text-3xl font-bold text-emerald-900 mt-1">{totalUsers}</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Users size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">মোট পোস্ট</p>
                            <h3 className="text-3xl font-bold text-emerald-900 mt-1">{totalPosts}</h3>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                            <FileText size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">ব্লগ ভিউ</p>
                            <h3 className="text-3xl font-bold text-emerald-900 mt-1">{totalViews}</h3>
                        </div>
                        <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                            <BarChart2 size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-stone-500 text-sm uppercase font-bold tracking-wider">পেন্ডিং কাজ</p>
                            <h3 className="text-3xl font-bold text-gold-500 mt-1">{pendingPostsCount}</h3>
                        </div>
                        <div className="bg-gold-100 p-3 rounded-full text-gold-600">
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                </div>

                {/* Recent Activity / Pending List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <h3 className="font-bold text-lg text-emerald-900 mb-4 border-b border-stone-100 pb-2">অপেক্ষমান পোস্ট</h3>
                        {blogs.filter(b => b.status === 'pending').length > 0 ? (
                            <div className="space-y-4">
                                {blogs.filter(b => b.status === 'pending').slice(0, 5).map(blog => (
                                    <div key={blog.id} className="flex justify-between items-center p-3 bg-stone-50 rounded border border-stone-100">
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-800 line-clamp-1">{blog.title}</h4>
                                            <p className="text-xs text-stone-500">{blog.author} • {blog.date}</p>
                                        </div>
                                        <button 
                                            onClick={() => setActiveTab('content')}
                                            className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded font-bold hover:bg-emerald-200"
                                        >
                                            রিভিউ
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-stone-400 italic text-sm">কোনো পেন্ডিং পোস্ট নেই।</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                        <h3 className="font-bold text-lg text-emerald-900 mb-4 border-b border-stone-100 pb-2">সাম্প্রতিক ব্যবহারকারী</h3>
                        {users.length > 0 ? (
                            <div className="space-y-4">
                                {users.slice(-5).reverse().map(u => (
                                    <div key={u.id} className="flex items-center gap-3 p-3 border-b border-stone-50 last:border-0">
                                        <div className="bg-stone-200 h-8 w-8 rounded-full flex items-center justify-center text-stone-500 font-bold text-xs">
                                            {u.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-800">{u.name}</h4>
                                            <p className="text-xs text-stone-500">{u.email}</p>
                                        </div>
                                        <span className={`ml-auto text-xs px-2 py-0.5 rounded ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-600'}`}>
                                            {u.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <p className="text-stone-400 italic text-sm">কোনো ব্যবহারকারী নেই।</p>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* --- CONTENT MANAGEMENT TAB --- */}
        {activeTab === 'content' && (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-xl font-bold text-emerald-900">সব পোস্ট ({blogs.length})</h2>
                    
                    {selectedPosts.length > 0 && (
                        <div className="flex items-center gap-2 animate-fade-in">
                            <span className="text-sm font-bold text-stone-600">{selectedPosts.length} নির্বাচিত</span>
                            <button onClick={handleBulkApprove} className="bg-emerald-600 text-white px-3 py-1.5 rounded text-sm hover:bg-emerald-700">
                                সব অ্যাপ্রুভ
                            </button>
                            <button onClick={handleBulkDelete} className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600">
                                সব ডিলিট
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-xs">
                            <tr>
                                <th className="p-4 w-10">
                                    <input 
                                        type="checkbox" 
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedPosts(blogs.map(b => b.id));
                                            else setSelectedPosts([]);
                                        }}
                                        checked={blogs.length > 0 && selectedPosts.length === blogs.length}
                                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                </th>
                                <th className="p-4">শিরোনাম</th>
                                <th className="p-4">লেখক</th>
                                <th className="p-4">স্ট্যাটাস</th>
                                <th className="p-4">তারিখ</th>
                                <th className="p-4 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {blogs.map(blog => (
                                <tr key={blog.id} className="hover:bg-stone-50 transition-colors">
                                    <td className="p-4">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedPosts.includes(blog.id)}
                                            onChange={() => toggleSelectPost(blog.id)}
                                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </td>
                                    <td className="p-4 font-bold text-gray-800 max-w-xs truncate" title={blog.title}>{blog.title}</td>
                                    <td className="p-4">{blog.author}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            blog.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            blog.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="p-4">{blog.date}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {blog.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleApproveBlog(blog.id)} className="text-green-600 hover:bg-green-50 p-1 rounded" title="Approve">
                                                        <Check size={18} />
                                                    </button>
                                                    <button onClick={() => handleRejectBlog(blog.id)} className="text-red-600 hover:bg-red-50 p-1 rounded" title="Reject">
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button onClick={() => handleDeleteBlog(blog.id)} className="text-stone-400 hover:text-red-600 p-1 rounded">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-stone-400">কোনো পোস্ট পাওয়া যায়নি</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- USERS MANAGEMENT TAB --- */}
        {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-stone-200">
                    <h2 className="text-xl font-bold text-emerald-900">ব্যবহারকারী ব্যবস্থাপনা</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-stone-50 text-stone-500 uppercase font-bold text-xs">
                            <tr>
                                <th className="p-4">নাম</th>
                                <th className="p-4">ইমেইল</th>
                                <th className="p-4">রোল (Role)</th>
                                <th className="p-4">স্ট্যাটাস</th>
                                <th className="p-4 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-stone-50">
                                    <td className="p-4 font-bold text-gray-800">{u.name}</td>
                                    <td className="p-4">{u.email}</td>
                                    <td className="p-4">
                                        <select 
                                            value={u.role}
                                            onChange={(e) => changeUserRole(u.id, e.target.value)}
                                            disabled={u.email === 'taleemforsisters@gmail.com'}
                                            className="bg-white border border-stone-300 text-stone-700 text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        >
                                            <option value="user">User</option>
                                            <option value="editor">Editor</option>
                                            <option value="moderator">Moderator</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        {u.isBlocked ? (
                                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">Blocked</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">Active</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        {u.email !== 'taleemforsisters@gmail.com' && (
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => toggleUserBlock(u.id)}
                                                    className={`p-1.5 rounded transition-colors ${u.isBlocked ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                                                    title={u.isBlocked ? "আনব্লক করুন" : "ব্লক করুন"}
                                                >
                                                    {u.isBlocked ? <Unlock size={16} /> : <Lock size={16} />}
                                                </button>
                                                <button 
                                                    onClick={() => deleteUser(u.id)} 
                                                    className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                                    title="মুছে ফেলুন"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center p-8 text-stone-400">কোনো ব্যবহারকারী পাওয়া যায়নি</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- REPORTS TAB --- */}
        {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 animate-fade-in">
                 <h2 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
                    <AlertTriangle size={20} /> রিপোর্ট করা কন্টেন্ট
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Flagged Blogs */}
                    <div>
                        <h3 className="font-bold text-stone-700 mb-4 border-b pb-2">ব্লগ পোস্ট</h3>
                        {blogs.filter(b => b.isFlagged).length === 0 ? (
                            <p className="text-stone-400 italic text-sm">কোনো রিপোর্ট নেই</p>
                        ) : (
                            <div className="space-y-4">
                                {blogs.filter(b => b.isFlagged).map(blog => (
                                    <div key={blog.id} className="border border-red-200 bg-red-50 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-900">{blog.title}</h4>
                                        <p className="text-sm text-stone-600 mt-1 mb-2"><strong>রিপোর্ট এর কারণ:</strong> {blog.reportReason || 'উল্লেখ করা হয়নি'}</p>
                                        <div className="flex gap-2 mt-3">
                                            <button onClick={() => handleApproveBlog(blog.id)} className="bg-white border border-stone-300 text-stone-600 px-3 py-1 rounded text-xs hover:bg-stone-50">
                                                রিপোর্ট বাতিল করুন (Keep)
                                            </button>
                                            <button onClick={() => handleDeleteBlog(blog.id)} className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                                                পোস্ট মুছুন
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Flagged Reviews */}
                    <div>
                        <h3 className="font-bold text-stone-700 mb-4 border-b pb-2">রিভিউ / মন্তব্য</h3>
                         {testimonials.filter(t => t.isFlagged).length === 0 ? (
                            <p className="text-stone-400 italic text-sm">কোনো রিপোর্ট নেই</p>
                        ) : (
                            <div className="space-y-4">
                                {testimonials.filter(t => t.isFlagged).map(review => (
                                    <div key={review.id} className="border border-red-200 bg-red-50 p-4 rounded-lg">
                                        <p className="italic text-stone-600 text-sm mb-2">"{review.text}"</p>
                                        <p className="text-xs font-bold text-red-800 mb-3">- {review.name}</p>
                                        <div className="flex gap-2">
                                             <button onClick={() => handleApproveReview(review.id)} className="bg-white border border-stone-300 text-stone-600 px-3 py-1 rounded text-xs hover:bg-stone-50">
                                                রিপোর্ট বাতিল করুন
                                            </button>
                                            <button onClick={() => handleDeleteReview(review.id)} className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                                                রিভিউ মুছুন
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
