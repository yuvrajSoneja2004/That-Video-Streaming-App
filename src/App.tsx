import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "./utils/firebase";
import {
  signInWithRedirect,
  signOut,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";
import Routing from "./Routing";
import { THEME } from "./constants/theme";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });

  //   // Check if there's a result from the redirect sign-in
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result) {
  //         // User is signed in after the redirect
  //         setUser(result.user);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error during redirect result handling:", error);
  //     });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, googleAuthProvider)
  //     .then(() => {
  //       // The redirection will handle the sign-in process
  //     })
  //     .catch((error) => {
  //       console.error("Error during sign in:", error);
  //     });
  // };

  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful
  //       console.log("User signed out");
  //     })
  //     .catch((error) => {
  //       console.error("Error during sign out:", error);
  //     });
  // };

  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ background: THEME.dark.background }}>
        {/* {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <img src={user.photoURL} alt="Profile" />
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )} */}
        <Routing />
      </div>
    </QueryClientProvider>
  );
}

export default App;
