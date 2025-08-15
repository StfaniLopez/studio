import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Assuming firebase.ts is in lib directory

// Define the type for the authentication context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
  error: string | null;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email: string, password: string, displayName?: string): Promise<void> => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user && displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      // onAuthStateChanged will update the user state
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-throw to allow component to handle
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will update the user state
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-throw to allow component to handle
    }
  };

  const logout = async (): Promise<void> => {
    setError(null);
    try {
      await signOut(auth);
      // onAuthStateChanged will set user to null
    } catch (err: any) {
      setError(err.message);
      throw err; // Re-throw to allow component to handle
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string): Promise<void> => {
    setError(null);
    if (user) {
      try {
        await updateProfile(user, { displayName, photoURL });
        setUser({ ...user, displayName, photoURL }); // Manually update state as updateProfile might not trigger onAuthStateChanged immediately
      } catch (err: any) {
        setError(err.message);
        throw err; // Re-throw to allow component to handle
      }
    } else {
      setError("No user is logged in.");
      throw new Error("No user is logged in.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUserProfile, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};