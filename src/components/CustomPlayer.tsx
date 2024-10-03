import { useState, useRef, useEffect, useReducer } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoIosPause,
  IoIosPlay,
  IoIosSkipBackward,
  IoIosSkipForward,
  IoMdSettings,
} from "react-icons/io";
import {
  IoContractOutline,
  IoExpandOutline,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { BsPip } from "react-icons/bs";
import { LuRectangleHorizontal } from "react-icons/lu";
import screenfull from "screenfull";
import { videoPlayerReducer } from "../reducers/videoPlayerReducer";
import { formatTime } from "../utils/formatTime";
import { THEME } from "../constants/theme";
import { VIDEO_PLAYER_OPTIONS } from "../constants/options";

const CustomVideoPlayer = () => {
  const ICON_SIZE = 24;
  const initialState = {
    // currentBitrate:
    //   "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa_video_180_250000.m3u8",
    currentBitrate:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    playing: false,
    paused: false,
    playbackRate: 1,
    volume: 1,
    muted: false,
    controlsVisible: false,
    isOptionsOpen: false,
    showVolumeRange: false,
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    currentSelectedOption: "",
    availableVideoBitrates: {},
  };

  const [state, dispatch] = useReducer(videoPlayerReducer, initialState);
  const [volume, setVolume] = useState(1);
  const [activeMenu, setActiveMenu] = useState("main");
  const [direction, setDirection] = useState(0);
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const settingsRef = useRef(null);
  // Ref to store bitrates and avoid re-fetching
  const bitrateRef = useRef(null);

  const menuVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  const handlePlayPause = () => {
    dispatch({ type: "HANDLE_PLAY_PAUSE", payload: !state.playing });
  };

  const handleSpeedChange = (speed) => {
    dispatch({ type: "HANDLE_SPEED_CHANGE", payload: speed });
    dispatch({
      type: "SET_IS_OPTIONS_OPEN",
      payload: !state.isOptionsOpen,
    });
    setActiveMenu("main");
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

  const handleQualityChange = (quality) => {
    // Save the current playback time (currentTime) instead of duration
    let savedTime = state.currentTime;

    // Dispatch quality change (this will trigger the video to reload)
    dispatch({
      type: "HANDLE_QUALITY_CHANGE",
      payload: Object.values(quality)[0],
    });

    setActiveMenu("main");

    // After the quality change, seek back to the saved time
    // Wait for the video to reload before seeking to the saved time
    setTimeout(() => {
      playerRef.current?.seekTo(savedTime, "seconds");
    }, 500);

    dispatch({
      type: "SET_IS_OPTIONS_OPEN",
      payload: !state.isOptionsOpen,
    });
  };

  const getVideoBitrates = () => {
    // If bitrates have already been fetched, use them from ref
    if (bitrateRef.current) {
      dispatch({ type: "SET_VIDEO_BITRATES", payload: bitrateRef.current });
      return;
    }

    const bitrates = playerRef.current
      ?.getInternalPlayer("hls")
      ?.levels?.map((bitrate) => ({
        [bitrate?.width]: bitrate?.url[0],
      }))
      ?.reverse();

    console.log(bitrates);

    if (bitrates && bitrates.length > 0) {
      bitrateRef.current = bitrates; // Store the fetched bitrates in the ref
      dispatch({ type: "SET_VIDEO_BITRATES", payload: bitrates });
    }
  };
  useEffect(() => {
    if (screenfull.isEnabled) {
      const handleFullscreenChange = () => {
        dispatch({
          type: "SET_FULLSCREEN",
          payload: screenfull.isFullscreen,
        });
      };

      screenfull.on("change", handleFullscreenChange);

      return () => {
        screenfull.off("change", handleFullscreenChange);
      };
    }
  }, []);

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

  console.log("Send help 😭", Object.keys(state.availableVideoBitrates));

  const VideoOptions = ({ isOptionsOpen }) => {
    if (!isOptionsOpen) return null;

    return (
      <div className="absolute bottom-[60px] right-0 bg-[#1a1a1a] rounded-lg overflow-hidden w-[200px]">
        <AnimatePresence initial={false} custom={direction}>
          {activeMenu === "main" && (
            <motion.div
              key="main"
              custom={direction}
              variants={menuVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {VIDEO_PLAYER_OPTIONS.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 hover:bg-black cursor-pointer"
                  onClick={() => {
                    if (option.slug === "quality") {
                      setDirection(1);
                      setActiveMenu("quality");
                    } else if (option.slug === "playspeed") {
                      setDirection(1);
                      setActiveMenu("playspeed");
                    }
                  }}
                >
                  {option.icon}
                  <span>{option.title}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeMenu === "quality" && (
            <motion.div
              key="quality"
              custom={direction}
              variants={menuVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="p-2 border-b border-gray-700">
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    setDirection(-1);
                    setActiveMenu("main");
                  }}
                >
                  <IoMdSettings size={20} />
                  <span>Quality</span>
                </button>
              </div>
              {state.availableVideoBitrates?.map((quality, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 hover:bg-black cursor-pointer"
                  onClick={() => handleQualityChange(quality)}
                >
                  <span>{Object.keys(quality)[0]}p</span>
                </div>
              ))}
            </motion.div>
          )}
          {/* Playback speed  */}
          {activeMenu === "playspeed" && (
            <motion.div
              key="playspeed"
              custom={direction}
              variants={menuVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="p-2 border-b border-gray-700">
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    setDirection(-1);
                    setActiveMenu("main");
                  }}
                >
                  <IoMdSettings size={20} />
                  <span>Playback Speed</span>
                </button>
              </div>
              {VIDEO_PLAYER_OPTIONS[0].speedList?.map((speed, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 hover:bg-black cursor-pointer"
                  onClick={() => handleSpeedChange(speed)}
                >
                  <span>{speed}x</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      className="relative max-w-3xl mx-auto w-[723px] h-[412px] rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      onDoubleClick={toggleFullScreen}
    >
      <ReactPlayer
        ref={playerRef}
        url={state.currentBitrate}
        width="100%"
        height="auto"
        playing={state.playing}
        playbackRate={state.playbackRate}
        volume={volume}
        muted={state.muted}
        pip={true}
        onDuration={handleDuration}
        onProgress={handleProgress}
        style={{ borderRadius: "20px" }}
        onReady={getVideoBitrates}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          state.controlsVisible || !state.playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <input
          type="range"
          min="0"
          max={state.duration}
          value={state.currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 mb-4"
        />
        <div className="flex items-center justify-between text-white relative">
          <div className="flex gap-5 w-full">
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
            <div className="flex items-center flex-1 mx-4 relative w-full">
              <span className="text-sm">{formatTime(state.currentTime)}</span>
              <span className="text-sm mx-1">/</span>
              <span className="text-sm">{formatTime(state.duration)}</span>
            </div>
          </div>
          <div className="flex gap-5">
            <button onClick={handleOptions} ref={settingsRef}>
              <IoMdSettings size={ICON_SIZE} />
            </button>
            <button
              onClick={async () => {
                playerRef.current?.requestPictureInPicture();
              }}
            >
              <BsPip size={ICON_SIZE} />
            </button>
            <button>
              <LuRectangleHorizontal size={ICON_SIZE} />
            </button>
            <button onClick={toggleFullScreen}>
              {state.isFullscreen ? (
                <IoContractOutline size={ICON_SIZE} />
              ) : (
                <IoExpandOutline size={ICON_SIZE} />
              )}
            </button>
          </div>
        </div>
      </div>
      <VideoOptions isOptionsOpen={state.isOptionsOpen} />
    </div>
  );
};

export default CustomVideoPlayer;
