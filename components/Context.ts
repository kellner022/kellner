import React from 'react';

interface AuthContextInterface {
    signIn: (foundUser: any) => void;
    signOut: () => void;
    signUp: () => void;
    toggleTheme: () => void;
  }
  
  export const AuthContext = React.createContext<AuthContextInterface | null>(null);