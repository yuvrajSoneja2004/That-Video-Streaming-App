import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import screenfull from "screenfull";
import {
  IoIosPause,
  IoIosPlay,
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdSettings,
} from "react-icons/io";

const CustomVideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const settingsRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackRate(speed);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleMouseEnter = () => {
    setControlsVisible(true);
  };

  const handleMouseLeave = () => {
    if (playing) {
      setControlsVisible(false);
    }
  };

  const toggleFullScreen = (event) => {
    // Prevent fullscreen toggle if the click is on the settings button
    console.log("gaand meh danda.", event.target);
    if (settingsRef.current && settingsRef.current.contains(event.target)) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
  };

  const handleOptions = (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the container
    setIsOptionsOpen(!isOptionsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setControlsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      onDoubleClick={toggleFullScreen}
    >
      <ReactPlayer
        ref={playerRef}
        url="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
        width="100%"
        height="auto"
        playing={playing}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          controlsVisible || !playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex gap-5">
            <button>
              <IoIosSkipBackward size={24} />
            </button>
            <button onClick={handlePlayPause} className="">
              {playing ? <IoIosPause size={24} /> : <IoIosPlay size={24} />}
            </button>
            <button>
              <IoIosSkipForward size={24} />
            </button>
          </div>
          <div className="flex items-center flex-1 mx-4 relative">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
            <button onClick={handleMute} className="ml-2">
              {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            {isOptionsOpen && (
              <div className="h-[240px] w-[230px] bg-[#000000bd] rounded-md absolute bottom-8 right-0"></div>
            )}
            <button onClick={handleOptions} ref={settingsRef}>
              <IoMdSettings size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
