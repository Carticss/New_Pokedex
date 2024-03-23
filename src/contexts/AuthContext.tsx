import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const login = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.trim() === '') {
      throw new Error('Please enter your password');
    }

    try {
      const userData = await AsyncStorage.getItem('users');
      const users: User[] = userData ? JSON.parse(userData) : [];
      const foundUser = users.find(
        user => user.email === email && user.password === password,
      );

      if (foundUser) {
        setUser(foundUser);
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        throw new Error('User not found or incorrect password');
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (password.trim() === '') {
      throw new Error('Please enter your password');
    }

    try {
      const userData = await AsyncStorage.getItem('users');
      const users: User[] = userData ? JSON.parse(userData) : [];
      const existingUser = users.find(user => user.email === email);

      if (existingUser) {
        throw new Error('Email already exists');
      }

      const newUser: User = { email, password };
      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error: any) {
      console.error('Error registering:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
