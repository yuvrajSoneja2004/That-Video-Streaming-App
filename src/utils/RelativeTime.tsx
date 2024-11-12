// src/components/RelativeTime.tsx

import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface RelativeTimeProps {
  createdAt: string;
}

const RelativeTime: React.FC<RelativeTimeProps> = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const updateRelativeTime = () => {
      const date = new Date(createdAt);
      setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
    };

    updateRelativeTime(); // Set initial value
    const intervalId = setInterval(updateRelativeTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};

export default RelativeTime;
