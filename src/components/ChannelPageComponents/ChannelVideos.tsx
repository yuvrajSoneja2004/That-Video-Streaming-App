import React from "react";
import VideoCard from "../VideoCard";

function ChannelVideos() {
  // Generate dummy data with more realistic content
  const videos = Array.from({ length: 20 }, (_, index) => ({
    id: crypto.randomUUID(),
    title: `Video Title ${index + 1} - Amazing Content`,
    description: `This is a description for video ${
      index + 1
    }. It contains interesting information about the video content.`,
    thumbnail: `https://picsum.photos/seed/${index}/300/200`, // Using picsum for random thumbnails
    views: Math.floor(Math.random() * 1000000) + 1000, // Random view count between 1k and 1M
    uploadedAt: new Date(
      Date.now() - Math.random() * 10000000000
    ).toISOString(), // Random date within recent past
  }));

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-6">
      {/* Filters Section - Similar to YouTube's */}
      <div className="mb-6 flex items-center space-x-4 border-b pb-4">
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
          Latest
        </button>
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
          Popular
        </button>
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200">
          Oldest
        </button>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="w-full">
            <VideoCard
              videoInfo={{
                id: video.id,
                title: video.title,
                description: video.description,
                thumbnail: video.thumbnail,
                views: video.views,
                uploadedAt: video.uploadedAt,
              }}
              isStatic={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelVideos;
