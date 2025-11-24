
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages
const Home = React.lazy(() => import('./pages/Home'));
const Videos = React.lazy(() => import('./pages/Videos'));
const Blog = React.lazy(() => import('./pages/Blog'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const AIHelp = React.lazy(() => import('./pages/AIHelp'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Profile = React.lazy(() => import('./pages/Profile'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

// Loading Fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-stone-50 dark:bg-gray-900">
    <div className="text-emerald-600 dark:text-emerald-400 flex flex-col items-center">
        <Loader2 size={40} className="animate-spin mb-4" />
        <p className="font-serif animate-pulse">লোড হচ্ছে...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans text-stone-800 dark:text-gray-100 antialiased transition-colors duration-300">
            <Navbar />
            <main className="flex-grow bg-stone-50 dark:bg-gray-900 transition-colors duration-300">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ai-companion" element={<AIHelp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default App;
