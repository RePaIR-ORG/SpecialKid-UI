/**
 * useStudentStore — lightweight auth state for SpecialKid-UI
 * Persists the JWT and student profile in localStorage so the
 * student stays logged in across refreshes.
 */

import { useState, useEffect } from 'react';

export interface StudentProfile {
  id: string;
  name: string;
  username: string;
  mood: string;
  taskCompletion: string;
  assessmentStatus: string;
}

interface StudentStore {
  token: string | null;
  student: StudentProfile | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'sk_student_token';
const STUDENT_KEY = 'sk_student_profile';

export function useStudentStore(): StudentStore {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    const raw = localStorage.getItem(STUDENT_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync to localStorage on changes
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (student) {
      localStorage.setItem(STUDENT_KEY, JSON.stringify(student));
    } else {
      localStorage.removeItem(STUDENT_KEY);
    }
  }, [student]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/student-auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      setToken(data.token);
      setStudent(data.student);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setStudent(null);
  };

  return {
    token,
    student,
    isLoading,
    login,
    logout,
    isAuthenticated: !!token && !!student,
  };
}
