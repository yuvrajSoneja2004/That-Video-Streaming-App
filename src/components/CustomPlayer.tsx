import { useState, useRef, useEffect, useReducer, ChangeEvent } from "react";
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
import {
  videoPlayerReducer,
  playerInitialState as initialState,
} from "../reducers/videoPlayerReducer";
import { formatTime } from "../utils/formatTime";
import { VIDEO_PLAYER_OPTIONS } from "../constants/options";
import { useParams } from "react-router-dom";

type BitrateType = {
  width: number;
  url: Array<string>;
};

type ActiveMenuStates = "main" | "playspeed" | "quality";
const CustomVideoPlayer = ({ bitrates }) => {
  // Constant values
  const ICON_SIZE = 24;

  // Initial States
  const [state, dispatch] = useReducer(videoPlayerReducer, initialState);
  const [activeMenu, setActiveMenu] = useState<ActiveMenuStates>("main");
  const [direction, setDirection] = useState<number>(0);

  // Reference states to reference DOM elements
  const playerRef = useRef<ReactPlayer | null>(null);
  const containerRef = useRef<Element | HTMLDivElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const bitrateRef = useRef(null);
  const videoUrlId = useParams<string>();

  // const menuVariants = {
  //   enter: (direction) => ({
  //     x: direction > 0 ? 200 : -200,
  //     opacity: 0,
  //   }),
  //   center: {
  //     x: 0,
  //     opacity: 1,
  //   },
  //   exit: (direction) => ({
  //     x: direction < 0 ? 200 : -200,
  //     opacity: 0,
  //   }),
  // };

  const handlePlayPause = () => {
    dispatch({ type: "HANDLE_PLAY_PAUSE", payload: !state.playing });
  };

  const handleSpeedChange = (speed: number) => {
    dispatch({ type: "HANDLE_SPEED_CHANGE", payload: speed });
    dispatch({
      type: "SET_IS_OPTIONS_OPEN",
      payload: !state.isOptionsOpen,
    });
    setActiveMenu("main");
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_VOLUME", payload: parseFloat(e.target.value) });
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

  const toggleFullScreen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (
      settingsRef.current &&
      settingsRef.current?.contains(event.target as Node)
    ) {
      return;
    }
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  const handleOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch({ type: "SET_IS_OPTIONS_OPEN", payload: !state.isOptionsOpen });
  };

  const handleDuration = (duration: number) => {
    dispatch({ type: "HANDLE_DURATION", payload: duration });
  };

  const handleProgress = (progressSoFar: { playedSeconds: number }) => {
    dispatch({
      type: "HANDLE_PROGRESS",
      payload: progressSoFar.playedSeconds,
    });
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    playerRef.current?.seekTo(seekTo, "seconds");

    dispatch({ type: "HANDLE_PROGRESS", payload: seekTo });
  };

  const handleQualityChange = (quality: number) => {
    // Save the current playback time (currentTime) instead of duration
    let savedTime = state.currentTime;

    // Dispatch quality change (this will trigger the video to reload)
    dispatch({
      type: "HANDLE_QUALITY_CHANGE",
      payload: {
        videoUrlId: videoUrlId?.videoId,
        bitrate: quality,
      },
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

  // const getVideoBitrates = () => {
  //   // If bitrates have already been fetched, use them from ref
  //   if (bitrateRef.current) {
  //     dispatch({ type: "SET_VIDEO_BITRATES", payload: bitrateRef.current });
  //     return;
  //   }

  //   const bitrates = playerRef.current
  //     ?.getInternalPlayer("hls")
  //     ?.levels?.map((bitrate: BitrateType) => ({
  //       [bitrate?.width]: bitrate?.url[0],
  //     }))
  //     ?.reverse();

  //   console.log(bitrates);

  //   if (bitrates && bitrates.length > 0) {
  //     bitrateRef.current = bitrates; // Store the fetched bitrates in the ref
  //     dispatch({ type: "SET_VIDEO_BITRATES", payload: bitrates });
  //   }
  // };
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
    const handleClickOutside = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (
        containerRef.current &&
        !containerRef.current?.contains(event.target)
      ) {
        dispatch({ type: "SET_CONTROLS_VISIBLE", payload: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: "PLAY_VIDEO", payload: videoUrlId?.videoId });
    dispatch({ type: "HANDLE_PLAY_PAUSE", payload: true });
  }, [videoUrlId?.videoId]);

  const VideoOptions = ({
    isOptionsOpen,
    vidBitrates,
  }: {
    isOptionsOpen: boolean;
    vidBitrates: [];
  }) => {
    if (!isOptionsOpen) return null;

    return (
      <div className="absolute bottom-[60px] right-0 bg-[#1a1a1a] rounded-lg overflow-hidden w-[200px]">
        {activeMenu === "main" && (
          <motion.div
            key="main"
            custom={direction}
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
            {vidBitrates?.map((quality: number, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 hover:bg-black cursor-pointer"
                onClick={() => handleQualityChange(quality)}
              >
                <span>{quality}p</span>
              </div>
            ))}
          </motion.div>
        )}
        {/* Playback speed  */}
        {activeMenu === "playspeed" && (
          <motion.div
            key="playspeed"
            custom={direction}
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
      </div>
    );
  };

  if (!videoUrlId?.videoId) return <h1>Loading...</h1>;

  return (
    <div
      className="relative max-w-3xl mx-auto w-[723px] h-[412px] rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      onDoubleClick={toggleFullScreen}
    >
      {/* <h1>{state.currentBitrate}</h1>
      <h1>{String(state.playing)}</h1> */}
      <ReactPlayer
        ref={playerRef}
        url={state.currentBitrate}
        width="100%"
        height="auto"
        playing={state.playing}
        playbackRate={state.playbackRate}
        volume={state.volume}
        muted={state.muted}
        // pip={true}
        onDuration={handleDuration}
        onProgress={handleProgress}
        style={{ borderRadius: "20px" }}
        // onReady={() => }
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
                //PIP logic here.
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
      <VideoOptions
        isOptionsOpen={state.isOptionsOpen}
        vidBitrates={bitrates}
      />
    </div>
  );
};

export default CustomVideoPlayer;


