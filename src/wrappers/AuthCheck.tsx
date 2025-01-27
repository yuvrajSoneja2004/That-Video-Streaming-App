import { useQuery } from "react-query";
import { useState, useEffect, ReactNode } from "react";
import { fetchUserInfo } from "../helpers/fetchUserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useUserStore } from "../states/user";
import AuthErrorScreen from "../components/AuthErrorScreen";
import AuthLoadingScreen from "../components/AuthLoadingScreen";

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user] = useAuthState(auth);
  const { setUserInfo } = useUserStore();

  const { data, error, isLoading } = useQuery(
    ["user", user?.uid],
    () => fetchUserInfo(user?.uid),
    {
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
      // retry: 2, // Retry twice if it fails
      // enabled: !!user?.uid, // Only run query if user.uid is defined
    }
  );

  useEffect(() => {
    if (!isInitialized) setIsInitialized(true);
  }, [data]);

  useEffect(() => {
    if (data) setUserInfo(data);
  }, [data, setUserInfo]);

  //  Show loading state only on initial load
  if (!isInitialized || isLoading) {
    return <AuthLoadingScreen />;
  }

  if (error?.response?.data?.message == "USER_NOT_FOUND") {
    return (
      <AuthErrorScreen
        onRetry={() => {}}
        errorInfo={{
          title: "User not found in Database",
          code: "USER_NOT_FOUND",
        }}
      />
    );
  }

  // Handle error state
  if (error) {
    return (
      <AuthErrorScreen
        onRetry={() => {}}
        errorInfo={{
          title: "Auth error",
          code: "AUTH_ERROR",
        }}
      />
    );
  }

  return <>{children}</>;
};
