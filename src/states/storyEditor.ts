import { create } from "zustand";

interface StoryEditorState {
  currentOptionSelected: string;
  createText: number;
  selectedImage: null | string;
  selectedSticker: null | String;
  filterPreviewImage: null | string;
  setFilterPreviewImage: (image: string) => void;
  textStyles: TextStylesTypes;
  isPenSelected: boolean;
  setSelectedImage: (image: string) => void;
  updateCreateText: () => void;
}

interface TextStylesTypes {
  selectedFont: string;
  textColor: string;
}
export const useStoryEditorState = create<StoryEditorState>((set) => ({
  currentOptionSelected: "Stickers",
  createText: 0,
  selectedImage: null,
  selectedSticker: null,
  filterPreviewImage: null,
  setFilterPreviewImage: (image: string) =>
    set(() => ({ filterPreviewImage: image })),
  textStyles: {
    selectedFont: "Arial",
    textColor: "#000", // Maybe for the future feature :p
  },
  isPenSelected: false,
  setSelectedImage: (image: string) => set(() => ({ selectedImage: image })),
  updateCreateText: () =>
    set((state) => ({
      createText: state.createText + 1,
    })),
}));
