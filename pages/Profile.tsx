
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Shield, PenTool, LogOut, LayoutDashboard, Clock, CheckCircle, XCircle } from 'lucide-react';
import { BlogPost } from '../types';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [myPosts, setMyPosts] = useState<BlogPost[]>([]);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    if (user) {
        // Fetch user posts
        const allPosts: BlogPost[] = JSON.parse(localStorage.getItem('blogPosts') || '[]');
        const userPosts = allPosts.filter(p => p.authorEmail === user.email);
        setMyPosts(userPosts);

        // Fetch user reviews count
        const allReviews = JSON.parse(localStorage.getItem('testimonials') || '[]');
        const userReviews = allReviews.filter((r: any) => r.email === user.email);
        setReviewCount(userReviews.length);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const approvedCount = myPosts.filter(p => p.status === 'approved').length;
  const pendingCount = myPosts.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-200">
          <div className="bg-emerald-900 h-32 relative">
             <div className="absolute -bottom-12 left-8">
                <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md">
                   <div className="h-full w-full rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                      <User size={48} />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
               <div>
                 <h1 className="text-3xl font-serif font-bold text-emerald-900">{user.name}</h1>
                 <p className="text-stone-500 flex items-center gap-2 mt-1">
                   {user.email}
                   {user.role === 'admin' && (
                     <span className="bg-gold-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full border border-gold-300 font-bold flex items-center gap-1">
                       <Shield size={12} /> অ্যাডমিন
                     </span>
                   )}
                 </p>
               </div>
               <button 
                 onClick={logout}
                 className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded transition-colors flex items-center gap-2 font-medium text-sm self-end sm:self-auto"
               >
                 <LogOut size={16} /> লগআউট
               </button>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-center">
                    <span className="block text-2xl font-bold text-emerald-700">{myPosts.length}</span>
                    <span className="text-xs text-stone-500 uppercase">মোট পোস্ট</span>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-center">
                    <span className="block text-2xl font-bold text-emerald-600">{approvedCount}</span>
                    <span className="text-xs text-stone-500 uppercase">প্রকাশিত</span>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-center">
                    <span className="block text-2xl font-bold text-gold-500">{pendingCount}</span>
                    <span className="text-xs text-stone-500 uppercase">পেন্ডিং</span>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-center">
                    <span className="block text-2xl font-bold text-emerald-800">{reviewCount}</span>
                    <span className="text-xs text-stone-500 uppercase">রিভিউ</span>
                </div>
            </div>

            <div className="mt-10 border-t border-stone-100 pt-8">
              <h2 className="text-xl font-bold text-emerald-900 mb-6">কুইক অ্যাকশন</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Link to="/blog" className="block p-6 bg-stone-50 rounded-lg border border-stone-200 hover:border-emerald-500 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                          <PenTool size={20} />
                       </div>
                       <h3 className="font-bold text-gray-900">ব্লগ লিখুন</h3>
                    </div>
                    <p className="text-sm text-stone-600">আপনার চিন্তা ও অভিজ্ঞতা শেয়ার করুন কমিউনিটির সাথে।</p>
                 </Link>

                 {user.role === 'admin' && (
                    <Link to="/admin" className="block p-6 bg-stone-50 rounded-lg border border-gold-300 hover:border-gold-500 transition-colors group">
                        <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gold-100 rounded-lg text-emerald-900 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                            <LayoutDashboard size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড</h3>
                        </div>
                        <p className="text-sm text-stone-600">পেন্ডিং পোস্ট অ্যাপ্রুভ করুন এবং রিপোর্ট চেক করুন।</p>
                    </Link>
                 )}
              </div>
            </div>

            {/* My Posts List */}
            <div className="mt-10 border-t border-stone-100 pt-8">
                <h2 className="text-xl font-bold text-emerald-900 mb-6">আমার পোস্টসমূহ</h2>
                <div className="space-y-4">
                    {myPosts.length > 0 ? (
                        myPosts.map(post => (
                            <div key={post.id} className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-lg shadow-sm">
                                <div>
                                    <h3 className="font-bold text-gray-800">{post.title}</h3>
                                    <p className="text-xs text-stone-500">{post.date}</p>
                                </div>
                                <div>
                                    {post.status === 'approved' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                            <CheckCircle size={12} /> প্রকাশিত
                                        </span>
                                    )}
                                    {post.status === 'pending' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-full">
                                            <Clock size={12} /> পেন্ডিং
                                        </span>
                                    )}
                                    {post.status === 'rejected' && (
                                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                            <XCircle size={12} /> বাতিল
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-stone-500 italic text-center py-4">আপনি এখনো কোনো পোস্ট করেননি।</p>
                    )}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
