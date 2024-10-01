import { FaRegUserCircle } from "react-icons/fa";
import { auth, googleAuthProvider } from "../../utils/firebase";
import { getRedirectResult, signInWithPopup, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function SignInBtn() {
  const [user, loading, error] = useAuthState(auth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => {
        // The redirection will handle the sign-in process
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
      });
  };
  console.log("its me", user);

  return (
    <button
      className="rounded-3xl border-2 border-solid border-gray-300 px-5 py-3 flex items-center gap-2 text-md"
      onClick={signInWithGoogle}
    >
      <FaRegUserCircle size={26} />
      Sign in
    </button>
  );
}

export default SignInBtn;
