import { useQuery } from "react-query";
import { useState, useEffect, ReactNode } from "react";
import { fetchUserInfo } from "../helpers/fetchUserInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useUserStore } from "../states/user";

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
      retry: 2, // Retry twice if it fails
      enabled: !!user?.uid, // Only run query if user.uid is defined
    }
  );

  useEffect(() => {
    if (!isInitialized) setIsInitialized(true);
    console.log("tu bas de de mera staaaath", data);
  }, [isInitialized, data]);

  useEffect(() => {
    if (data) setUserInfo(data);
  }, [data, setUserInfo]);

  // Optional: Show loading state only on initial load
  if (!isInitialized || isLoading) {
    return <div>Loading...</div>;
  }

  // Optional: Handle error state
  if (error) {
    return <div>Error loading user information</div>;
  }

  return <>{children}</>;
};
