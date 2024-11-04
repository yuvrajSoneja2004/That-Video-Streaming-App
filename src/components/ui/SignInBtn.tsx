import { FaRegUserCircle } from "react-icons/fa";
import { auth, googleAuthProvider } from "../../utils/firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMutation } from "react-query";
import { createUser } from "../../helpers/createUser";

interface UserData {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
}

function SignInBtn() {
  const [user, loading, error] = useAuthState(auth);

  const { mutate, isLoading, isError } = useMutation<void, Error, UserData>({
    mutationFn: (userData: UserData) => createUser(userData),
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const signInWithGoogle = async () => {
    try {
      const result: UserCredential = await signInWithPopup(
        auth,
        googleAuthProvider
      );

      console.log(result, "tum ho");

      const userData: UserData = {
        userId: result.user.uid,
        name: result.user.displayName || "Anonymous",
        email: result.user.email || "",
        avatarUrl: result.user.photoURL || "",
      };

      await mutate(userData);
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <button
      className="rounded-3xl border-2 border-solid border-gray-300 px-5 py-2 flex items-center gap-2 text-md"
      onClick={signInWithGoogle}
      disabled={isLoading}
    >
      <FaRegUserCircle size={26} />
      {isLoading ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default SignInBtn;