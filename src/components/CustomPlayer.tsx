import React, { useState, useRef, useEffect, useReducer } from "react";
import ReactPlayer from "react-player";
import { IoVolumeMute, IoVolumeHigh, IoContractOutline } from "react-icons/io5";

import screenfull from "screenfull";
import {
  IoIosPause,
  IoIosPlay,
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdSettings,
} from "react-icons/io";
import { BsPip } from "react-icons/bs";

import { LuRectangleHorizontal } from "react-icons/lu";
import { videoPlayerReducer } from "../reducers/videoPlayerReducer";

const CustomVideoPlayer = () => {
  const ICON_SIZE = 24;
  const initialState = {
    playing: false,
    playbackRate: 1,
    volume: 1,
    muted: false,
    controlsVisible: false,
    isOptionsOpen: false,
    showVolumeRange: false,
  };

  const [state, dispatch] = useReducer(videoPlayerReducer, initialState);

  // const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [showVolumeRange, setShowVolumeRange] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const settingsRef = useRef(null);

  const handlePlayPause = () => {
    dispatch({ type: "HANDLE_PLAY_PAUSE", payload: !state.playing });
    // setPlaying(!playing);
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
    if (state.playing) {
      setControlsVisible(false);
    }
    if (isOptionsOpen) {
      setControlsVisible(true);
    }
  };

  const toggleFullScreen = (event) => {
    // Prevent fullscreen toggle if the click is on the settings button
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

  const handleVolumeHover = (eventType: "enter" | "leave") => {
    if (eventType === "enter") {
      setShowVolumeRange(true);
    } else {
      setShowVolumeRange(false);
    }
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
        playing={state.playing}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        pip={true}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          controlsVisible || !state.playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between text-white">
          {/* Play / Prev / Pause / Volume Options */}
          <div className="flex gap-5">
            <button>
              <IoIosSkipBackward size={ICON_SIZE} />
            </button>
            <button onClick={handlePlayPause}>
              {state.playing ? (
                <IoIosPause size={ICON_SIZE} />
              ) : (
                <IoIosPlay size={ICON_SIZE} />
              )}
            </button>
            <button>
              <IoIosSkipForward size={24} />
            </button>
            <button
              onClick={handleMute}
              className="ml-2"
              onMouseEnter={() => handleVolumeHover("enter")}
              onMouseLeave={() => handleVolumeHover("leave")}
            >
              {muted ? (
                <IoVolumeMute size={ICON_SIZE} />
              ) : (
                <IoVolumeHigh size={ICON_SIZE} />
              )}
            </button>
            <div className="flex items-center flex-1 mx-4 relative">
              {/* <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="transition"
              style={{ width: showVolumeRange ? 65 : 0 }}
            /> */}
              <span className=" text-sm">00:04 / 30:34</span>
            </div>
          </div>
          <div className="flex gap-5">
            {isOptionsOpen && (
              <div className="h-[240px] w-[230px] bg-[#000000bd] rounded-md absolute bottom-8 right-0"></div>
            )}

            <button onClick={handleOptions} ref={settingsRef}>
              <IoMdSettings size={ICON_SIZE} />
            </button>
            <button>
              <BsPip size={ICON_SIZE} />
            </button>
            <button>
              <LuRectangleHorizontal size={ICON_SIZE} />
            </button>
            <button>
              <IoContractOutline size={ICON_SIZE} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
