import { createContext, useState } from "react";

// initialize a new context object
export const AuthContext = createContext();

// wrapper component that provides value to uts descendents
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); //

  return (
    // Make values available to any component inside {children} without prop drilling
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

/*
Note :- 

-> In prop drilling, data must pass through every layer (or component), even from unused ones, in order to reach the exact layer.

but,

-> Context API lets us "skip" those middle layers by providing data globally to any component that needs it.
*/
