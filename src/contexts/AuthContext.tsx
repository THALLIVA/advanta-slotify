<<<<<<< HEAD

=======
>>>>>>> source-repo/main
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
<<<<<<< HEAD
=======
import { Tables } from "@/integrations/supabase/types";
>>>>>>> source-repo/main

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, organizationName: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
=======
// Create a broadcast channel for syncing auth state
const authChannel = typeof window !== 'undefined' ? new BroadcastChannel('auth_channel') : null;

// Create a storage key for the last auth update timestamp
const LAST_AUTH_UPDATE_KEY = 'lastAuthUpdate';
const SESSION_KEY = 'supabase.auth.token';

>>>>>>> source-repo/main
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

<<<<<<< HEAD
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out successfully."
          });
        } else if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in",
            description: "Welcome back to Advanta!"
          });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Set up session expiry check
    const checkSessionExpiry = () => {
      if (session && session.expires_at) {
        const expiryTime = session.expires_at * 1000; // Convert to milliseconds
        const now = Date.now();
        
        if (expiryTime < now) {
          supabase.auth.signOut();
=======
  // Function to handle auth state updates
  const handleAuthStateChange = async (currentSession: Session | null, event?: string) => {
    setSession(currentSession);
    setUser(currentSession?.user ?? null);

    // Store the session in localStorage
    if (currentSession) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }

    // Broadcast the auth state change to other tabs
    if (event && authChannel) {
      const timestamp = Date.now();
      localStorage.setItem(LAST_AUTH_UPDATE_KEY, timestamp.toString());
      authChannel.postMessage({
        type: event,
        session: currentSession,
        timestamp
      });
    }
  };

  // Initialize auth state
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const initializeAuth = async () => {
      try {
        // Check for existing session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        // If we have a session in localStorage but no active session, try to recover it
        if (!initialSession) {
          const storedSession = localStorage.getItem(SESSION_KEY);
          if (storedSession) {
            try {
              const parsedSession = JSON.parse(storedSession);
              if (parsedSession?.expires_at && parsedSession.expires_at * 1000 > Date.now()) {
                await supabase.auth.setSession(parsedSession);
              } else {
                localStorage.removeItem(SESSION_KEY);
              }
            } catch (e) {
              localStorage.removeItem(SESSION_KEY);
            }
          }
        }

        // Set up auth state listener
        const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            await handleAuthStateChange(currentSession, event);
            
            if (event === 'SIGNED_OUT') {
              toast({
                title: "Signed out",
                description: "You have been signed out successfully."
              });
            } else if (event === 'SIGNED_IN' && currentSession) {
              toast({
                title: "Signed in",
                description: "Welcome back to Advanta!"
              });
            }
          }
        );

        subscription = sub;
        await handleAuthStateChange(initialSession);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    // Handle auth messages from other tabs
    const handleAuthMessage = async (event: MessageEvent) => {
      const { type, session: broadcastSession, timestamp } = event.data;
      
      // Check if this is the most recent update
      const lastUpdate = parseInt(localStorage.getItem(LAST_AUTH_UPDATE_KEY) || '0');
      if (timestamp <= lastUpdate) {
        return;
      }

      localStorage.setItem(LAST_AUTH_UPDATE_KEY, timestamp.toString());

      if (type === 'SIGNED_OUT') {
        await handleAuthStateChange(null);
        // Force refresh the page to ensure clean state
        window.location.reload();
      } else if (type === 'SIGNED_IN' && broadcastSession) {
        await handleAuthStateChange(broadcastSession);
      }
    };

    // Set up auth state synchronization
    if (authChannel) {
      authChannel.addEventListener('message', handleAuthMessage);
    }

    // Initialize auth
    initializeAuth();

    // Check session expiry periodically
    const checkSessionExpiry = async () => {
      if (session?.expires_at) {
        const expiryTime = session.expires_at * 1000;
        if (Date.now() >= expiryTime) {
          await supabase.auth.signOut();
>>>>>>> source-repo/main
          toast({
            title: "Session expired",
            description: "Your session has expired. Please sign in again.",
            variant: "destructive"
          });
        }
      }
    };

<<<<<<< HEAD
    const interval = setInterval(checkSessionExpiry, 1000 * 60); // Check every minute

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [session, toast]);
=======
    const interval = setInterval(checkSessionExpiry, 1000 * 30); // Check every 30 seconds

    // Cleanup
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (authChannel) {
        authChannel.removeEventListener('message', handleAuthMessage);
      }
      clearInterval(interval);
    };
  }, [toast]);
>>>>>>> source-repo/main

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, organizationName: string, role: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            organization_name: organizationName,
            role: role
          }
        }
      });
      if (error) throw error;
      
      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account."
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
<<<<<<< HEAD
=======
      localStorage.removeItem(SESSION_KEY);
>>>>>>> source-repo/main
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link."
      });
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
<<<<<<< HEAD
}
=======
}
>>>>>>> source-repo/main
