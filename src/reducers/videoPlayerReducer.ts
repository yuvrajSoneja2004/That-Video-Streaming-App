import { SERVER_BASE_URL } from "../utils/axiosInstance";

interface PlayerState {
  currentBitrate: string;
  playing: boolean;
  paused: boolean;
  playbackRate: number;
  volume: number;
  muted: boolean;
  controlsVisible: boolean;
  isOptionsOpen: boolean;
  showVolumeRange: boolean;
  currentTime: number;
  duration: number;
  isFullscreen: boolean;
  currentSelectedOption: string;
  availableVideoBitrates: Record<string, string | number>;
}

type PlayerAction =
  | { type: "HANDLE_PLAY_PAUSE"; payload: boolean }
  | { type: "HANDLE_SPEED_CHANGE"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "HANDLE_MUTE"; payload: boolean }
  | { type: "SET_CONTROLS_VISIBLE"; payload: boolean }
  | { type: "SET_IS_OPTIONS_OPEN"; payload: boolean }
  | { type: "SET_SHOW_VOLUME_RANGE"; payload: boolean }
  | { type: "HANDLE_DURATION"; payload: number }
  | { type: "HANDLE_PROGRESS"; payload: number }
  | { type: "SET_FULLSCREEN"; payload: boolean }
  | { type: "HANDLE_OPTION_PRESS"; payload: string }
  | { type: "SET_VIDEO_BITRATES"; payload: Record<string, string | number> }
  | { type: "HANDLE_QUALITY_CHANGE"; payload: string }
  | { type: "PLAY_VIDEO"; payload: string };

// All necessary initial states of the video player
export const playerInitialState: PlayerState = {
  currentBitrate: `${SERVER_BASE_URL}/video/videos/52478b1e-b361-421a-ba36-1ad1afd0d38a/360p/playlist.m3u8`,
  // "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  playing: true,
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

// handles video player events conditionally
export const videoPlayerReducer = (
  state: PlayerState,
  action: PlayerAction
) => {
  switch (action.type) {
    case "PLAY_VIDEO":
      return {
        ...state,
        currentBitrate: `${SERVER_BASE_URL}/video/videos/${action.payload}/360p/playlist.m3u8`,
      };
    case "HANDLE_PLAY_PAUSE":
      return { ...state, playing: action.payload };
    case "HANDLE_SPEED_CHANGE":
      return { ...state, playbackRate: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "HANDLE_MUTE":
      return { ...state, muted: action.payload };
    case "SET_CONTROLS_VISIBLE":
      return { ...state, controlsVisible: action.payload };
    case "SET_IS_OPTIONS_OPEN":
      return { ...state, isOptionsOpen: action.payload };
    case "SET_SHOW_VOLUME_RANGE":
      return { ...state, showVolumeRange: action.payload };
    case "HANDLE_DURATION":
      return { ...state, duration: action.payload };
    case "HANDLE_PROGRESS":
      return { ...state, currentTime: action.payload };
    case "SET_FULLSCREEN":
      return { ...state, isFullscreen: action.payload };
    case "HANDLE_OPTION_PRESS":
      return { ...state, currentSelectedOption: action.payload };
    case "SET_VIDEO_BITRATES":
      return { ...state, availableVideoBitrates: action.payload };
    case "HANDLE_QUALITY_CHANGE":
      return {
        ...state,
        currentBitrate: `${SERVER_BASE_URL}/video/videos/${action.payload.videoUrlId}/${action.payload.bitrate}p/playlist.m3u8`,
      };
    default:
      return state;
  }
};
