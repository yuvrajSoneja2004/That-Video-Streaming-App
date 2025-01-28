import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SingleVideoPageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player Skeleton */}
            <div className="rounded-lg overflow-hidden mb-4">
              <Skeleton height={400} borderRadius="0.5rem" />
            </div>

            {/* Video Info Skeleton */}
            <div className="space-y-4">
              {/* Title Skeleton */}
              <Skeleton height={28} width="70%" />

              {/* Channel Info Skeleton */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Skeleton circle height={40} width={40} />
                  <div className="flex flex-col gap-2">
                    <Skeleton height={20} width={120} />
                    <Skeleton height={16} width={80} />
                  </div>
                  <Skeleton height={36} width={100} />
                </div>

                {/* Like/Share Buttons Skeleton */}
                <div className="flex items-center gap-2">
                  <Skeleton height={36} width={80} />
                  <Skeleton height={36} width={36} />
                  <Skeleton height={36} width={36} />
                </div>
              </div>

              {/* Video Description Skeleton */}
              <div className="bg-gray-900 border-gray-800 rounded-lg p-4">
                <Skeleton height={16} width="50%" className="mb-2" />
                <Skeleton height={14} count={3} />
              </div>

              {/* Comments Section Skeleton */}
              <div className="mt-6">
                <Skeleton height={200} borderRadius="0.5rem" />
              </div>
            </div>
          </div>

          {/* Sidebar - Up Next Skeleton */}
          <div className="lg:w-[360px] space-y-4">
            <Skeleton height={24} width="30%" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex gap-3">
                  <Skeleton height={80} width={120} borderRadius="0.5rem" />
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton height={16} width="80%" />
                    <Skeleton height={14} width="60%" />
                    <Skeleton height={14} width="40%" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleVideoPageSkeleton;
