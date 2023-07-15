import {  useRouter, useSegments } from 'expo-router';
import React from 'react';

export type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  user: User | null;
}

const initAuthValues = { signIn: Function, signOut: Function, user: null}

const AuthContext = React.createContext<AuthContextType>(initAuthValues);

// This hook can be used to access the user info.
export function useAuth(): AuthContextType {
  return React.useContext(AuthContext);
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
} | null

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User) {
  const segments = useSegments();
  const router = useRouter();
  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if ( !user && !inAuthGroup) {
      console.warn({user, inAuthGroup})
      router.replace('/');
    } else if (user && inAuthGroup) {
    console.warn("ELS IFE GIRDI")
      router.replace('(tabs)/two');
    }
  }, [user, segments]);
}

export function Provider(props: any) {
  const [user, setAuth] = React.useState<User>(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({email: "", firstName:"", lastName: ""}),
        signOut: () => setAuth(null),
        user,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
