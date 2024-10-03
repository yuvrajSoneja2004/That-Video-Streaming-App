export const videoPlayerReducer = (state, action) => {
  switch (action.type) {
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
      return { ...state, currentBitrate: action.payload };
    default:
      return state;
  }
};
