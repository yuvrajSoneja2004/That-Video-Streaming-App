import React, { useState, useRef, useEffect, useReducer } from "react";
import ReactPlayer from "react-player";
import {
  IoVolumeMute,
  IoVolumeHigh,
  IoContractOutline,
  IoIosPause,
  IoIosPlay,
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdSettings,
} from "react-icons/io";
import { BsPip } from "react-icons/bs";
import { LuRectangleHorizontal } from "react-icons/lu";
import screenfull from "screenfull";
import { videoPlayerReducer } from "../reducers/videoPlayerReducer";
import { formatTime } from "../utils/formatTime";
import { THEME } from "../constants/theme";

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
    currentTime: 0,
    duration: 0,
  };

  const [state, dispatch] = useReducer(videoPlayerReducer, initialState);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const settingsRef = useRef(null);

  const handlePlayPause = () => {
    dispatch({ type: "HANDLE_PLAY_PAUSE", payload: !state.playing });
  };

  const handleSpeedChange = (speed) => {
    dispatch({ type: "HANDLE_SPEED_CHANGE", payload: speed });
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleMute = () => {
    dispatch({ type: "HANDLE_MUTE", payload: !state.muted });
  };

  const handleMouseEnter = () => {
    dispatch({ type: "SET_CONTROLS_VISIBLE", payload: true });
  };

  const handleMouseLeave = () => {
    if (state.playing) {
      dispatch({ type: "SET_CONTROLS_VISIBLE", payload: false });
    }
  };

  const toggleFullScreen = (event) => {
    if (settingsRef.current && settingsRef.current.contains(event.target)) {
      return;
    }
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
  };

  const handleOptions = (event) => {
    event.stopPropagation();
    dispatch({ type: "SET_IS_OPTIONS_OPEN", payload: !state.isOptionsOpen });
  };

  const handleDuration = (duration) => {
    dispatch({ type: "HANDLE_DURATION", payload: duration });
  };

  const handleProgress = (progressSoFar) => {
    dispatch({
      type: "HANDLE_PROGRESS",
      payload: progressSoFar.playedSeconds,
    });
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current.seekTo(seekTo, "seconds");
    dispatch({ type: "HANDLE_PROGRESS", payload: seekTo });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        dispatch({ type: "SET_CONTROLS_VISIBLE", payload: false });
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
        playbackRate={state.playbackRate}
        volume={volume}
        muted={state.muted}
        pip={true}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          state.controlsVisible || !state.playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between text-white">
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
              <IoIosSkipForward size={ICON_SIZE} />
            </button>
            <button
              onClick={handleMute}
              onMouseEnter={() =>
                dispatch({ type: "SET_SHOW_VOLUME_RANGE", payload: true })
              }
              onMouseLeave={() =>
                dispatch({ type: "SET_SHOW_VOLUME_RANGE", payload: false })
              }
            >
              {state.muted ? (
                <IoVolumeMute size={ICON_SIZE} />
              ) : (
                <IoVolumeHigh size={ICON_SIZE} />
              )}
            </button>
            <div className="flex items-center flex-1 mx-4 relative">
              <span className="text-sm">{formatTime(state.currentTime)}</span>
              <span className="text-sm mx-1">/</span>
              <span className="text-sm">{formatTime(state.duration)}</span>
              <input
                type="range"
                min="0"
                max={state.duration}
                value={state.currentTime}
                onChange={handleSeek}
                className="ml-4 w-full"
              />
            </div>
          </div>
          <div className="flex gap-5">
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
