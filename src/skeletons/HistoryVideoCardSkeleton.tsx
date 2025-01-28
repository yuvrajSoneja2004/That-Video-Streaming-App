import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HistoryVideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start lg:gap-6 w-full">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video w-full max-w-[240px] flex-none overflow-hidden rounded-lg sm:w-40 lg:w-60">
        <Skeleton height="100%" borderRadius="0.5rem" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col gap-1">
        {/* Title Skeleton */}
        <div className="flex items-start justify-between gap-4">
          <Skeleton height={24} width="70%" />
          <Skeleton circle height={24} width={24} />
        </div>

        {/* Channel Name Skeleton */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Skeleton height={16} width="40%" />
        </div>

        {/* Views Skeleton */}
        <div className="text-sm text-muted-foreground">
          <Skeleton height={16} width="30%" />
        </div>

        {/* Timestamp Skeleton (optional) */}
        <div className="text-sm text-muted-foreground">
          <Skeleton height={16} width="50%" />
        </div>
      </div>
    </div>
  );
}

export default HistoryVideoCardSkeleton;
