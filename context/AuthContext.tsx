
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface LoginResult {
    success: boolean;
    message?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string, rememberMe: boolean) => Promise<LoginResult>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage first (Remember Me), then session storage
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else if (sessionUser) {
        setUser(JSON.parse(sessionUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string, rememberMe: boolean): Promise<LoginResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === pass);
    
    // Hardcoded Admin for demonstration
    let authenticatedUser = foundUser;
    if (email === 'taleemforsisters@gmail.com' && pass === 'admintaleem25') {
        // Ensure admin user exists in local storage list to manage it properly in dashboard if needed
        authenticatedUser = { 
            id: 'admin-main', 
            name: 'Admin Sister', 
            email, 
            role: 'admin',
            isBlocked: false
        };
    }

    if (authenticatedUser) {
      if (authenticatedUser.isBlocked) {
          return { success: false, message: 'আপনার অ্যাকাউন্টটি সাময়িকভাবে ব্লক করা হয়েছে। অনুগ্রহ করে প্রশাসনের সাথে যোগাযোগ করুন।' };
      }

      const { password, ...userWithoutPass } = authenticatedUser;
      setUser(userWithoutPass);
      
      if (rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
          sessionStorage.removeItem('currentUser');
      } else {
          sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
          localStorage.removeItem('currentUser');
      }
      return { success: true };
    }

    return { success: false, message: 'ইমেইল বা পাসওয়ার্ড ভুল।' };
  };

  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      return false; // User exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user', // Default role
      password: pass,
      isBlocked: false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after signup (default to session)
    const { password, ...userWithoutPass } = newUser;
    setUser(userWithoutPass);
    sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
