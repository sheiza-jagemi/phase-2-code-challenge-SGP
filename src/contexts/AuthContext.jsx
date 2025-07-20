import { createContext, useContext } from 'react';

// Create context with default value
const AuthContext = createContext(null);

// Context provider component
export function AuthProvider({ children }) {
  const value = { /* your auth state here */ };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}