import {  useRouter, useSegments } from 'expo-router';
import React from 'react';

export type AuthContextType = {
  signIn: () => void;
  signOut: () => void;
  user: User | null;
} | null

const AuthContext = React.createContext<AuthContextType>(null);

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

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
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
