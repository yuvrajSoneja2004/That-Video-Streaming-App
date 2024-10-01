export const videoPlayerReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_PLAY_PAUSE":
      return { ...state, playing: action.payload };
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload };
    case "SET_MUTED":
      return { ...state, muted: action.payload };
    case "SET_CONTROLS_VISIBLE":
      return { ...state, controlsVisible: action.payload };
    case "SET_IS_OPTIONS_OPEN":
      return { ...state, isOptionsOpen: action.payload };
    case "SET_SHOW_VOLUME_RANGE":
      return { ...state, showVolumeRange: action.payload };
    default:
      return state;
  }
};
