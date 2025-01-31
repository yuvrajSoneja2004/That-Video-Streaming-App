import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import {
  ArrowLeft,
  MessageSquare,
  MoreVertical,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Dummy data for shorts
const shortsData = [
  {
    id: 1,
    title: "how to make yt shorts component in react",
    channel: "@contentshark5122",
    videoUrl: "/videos/short1.mp4",
    likes: 3,
    comments: 0,
    description:
      "#shorts Quickly Create a React Component with VS Code in Seconds! 🚀 | CONTENT SHARK",
  },
  {
    id: 2,
    title: "React hooks explained simply",
    channel: "@reactmaster",
    videoUrl: "/videos/short2.mp4",
    likes: 45,
    comments: 12,
    description: "Learn React hooks in 60 seconds! ⚛️ #coding #webdev",
  },
  {
    id: 3,
    title: "CSS tricks you should know",
    channel: "@csswizard",
    videoUrl: "/videos/short3.mp4",
    likes: 89,
    comments: 25,
    description:
      "10 CSS pro tips to improve your designs 🎨 #frontend #webdesign",
  },
];

export default function YoutubeShortsPlayer() {
  return (
    <div className="fixed inset-0 bg-black">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        modules={[Mousewheel, Keyboard]}
        className="h-full w-full"
        onScroll={() => console.log("Scrolled")}
        mousewheel={{
          forceToAxis: true,
          eventsTarget: ".video-container", // 👈 Target only video area
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        onSlideChange={(swiper) => {
          console.log("Scrolled to the next card!");
          if (swiper.progress > 0.4) {
            console.log("Scrolled 40% of the current card");
          }
          console.log("Current slide index:", swiper.activeIndex);
        }}
        onProgress={(swiper) => {
          console.log("Progress:", Math.round(swiper.progress * 100));
        }}
        touchStartPreventDefault={false}
        noSwipingClass="no-swipe" // 👈 Class to exclude elements
      >
        {shortsData.map((short) => (
          <SwiperSlide key={short.id}>
            <div className="relative h-screen max-w-[5000px] mx-auto flex flex-col">
              {/* Top Navigation - Add no-swipe class */}
              <div className=" absolute top-0 left-0 right-0 z-10 p-4 flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  asChild
                >
                  <Link to="#">
                    <ArrowLeft className="h-6 w-6" />
                    <span className="sr-only">Back</span>
                  </Link>
                </Button>
                <h1 className="text-white text-lg font-medium">
                  {short.title}
                </h1>
              </div>

              {/* Video Container - Main swipe area */}
              <div className="video-container relative flex-1 touch-pan-y w-full">
                <video
                  controls
                  className="w-full h-full object-cover touch-pan-y"
                  autoPlay
                  muted
                  loop
                >
                  <source src={short.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Right Sidebar - Add no-swipe class */}
                <div className=" absolute right-4 bottom-20 flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-white">
                      <ThumbsUp className="h-7 w-7" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <span className="text-white text-sm">{short.likes}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-white">
                      <ThumbsDown className="h-7 w-7" />
                      <span className="sr-only">Dislike</span>
                    </Button>
                    <span className="text-white text-sm">Dislike</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-white">
                      <MessageSquare className="h-7 w-7" />
                      <span className="sr-only">Comments</span>
                    </Button>
                    <span className="text-white text-sm">{short.comments}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-white">
                      <Share2 className="h-7 w-7" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <span className="text-white text-sm">Share</span>
                  </div>

                  <Button variant="ghost" size="icon" className="text-white">
                    <MoreVertical className="h-7 w-7" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>

                {/* Bottom Info - Add no-swipe class */}
                <div className=" absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <span className="text-white font-medium">
                      {short.channel}
                    </span>
                    <Button size="sm" variant="secondary" className="ml-auto">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-white text-sm">{short.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
