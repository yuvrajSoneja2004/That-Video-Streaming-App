import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric"; // ✅ Correct import
import { ArrowRight, Search, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EditorSidebar } from "./EditorSidebar";
import { useGlobalState } from "@/states/global";
import { useStoryEditorState } from "@/states/storyEditor";
import FilterSidebar from "./FilterSidebar";
import { useMutation } from "react-query";
import { createStory } from "@/helpers/story/createStory";
import { useUserStore } from "@/states/user";

export default function EditorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const { setShowSidebar } = useGlobalState();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const {
    selectedImage,
    selectedSticker,
    currentOptionSelected,
    textStyles: { selectedFont },
    isPenSelected,
    filterPreviewImage,
    setFilterPreviewImage,
  } = useStoryEditorState();

  const { userInfo } = useUserStore();
  const topImageRef = useRef<fabric.Image | null>(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);

  const { mutate, isLoading, error, isError } = useMutation(
    async (file: File) =>
      createStory({
        image: file,
        userId: userInfo?.userId, // Replace with actual user ID
        title: "Story Title. Coming Soon", // Replace with actual story title
      }),
    {
      onSuccess: () => {
        // Handle success
        console.log("haha");
      },
      onError: (error) => {
        // Handle error
        console.log(error);
      },
    }
  );

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 0, // Reduced width to 60% of screen
        height: window.innerHeight - 120, // Adjust height to fit layout
        backgroundColor: "white",
      });

      // canvasRef.current.isDrawingMode = true;

      setFabricCanvas(canvas);
      setShowSidebar(false);

      // Load and set the background image if available
      if (selectedImage) {
        fabric.Image.fromURL(selectedImage, (img) => {
          // Scale the image to fit the canvas dimensions
          img.scaleToWidth(canvas.getWidth());
          img.scaleToHeight(canvas.getHeight());

          // Make the image draggable and resizable by converting it to a selectable object
          img.set({
            selectable: true,
            hasControls: true, // Enable controls for resizing
            hasBorders: true, // Show borders around the image
            lockMovementX: false, // Allow horizontal movement
            lockMovementY: false, // Allow vertical movement
            lockScalingX: false, // Allow horizontal scaling
            lockScalingY: false, // Allow vertical scaling
            lockRotation: false, // Allow rotation
          });

          img.set({
            left: (canvas.getWidth() - img?.width) / 2,
            top: (canvas.getHeight() - img?.height) / 2,
          });

          // Add the image to the canvas and set it as the background
          // canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          canvas.add(img);
          canvas.sendToBack(img);

          canvas.renderAll();
        });
      }

      const handleResize = () => {
        canvas.setWidth(window.innerWidth * 0.6);
        canvas.setHeight(window.innerHeight - 120);
        canvas.renderAll();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [fabricCanvas, selectedImage]);

  // BS
  useEffect(() => {
    if (fabricCanvas) {
      // Update the drawing mode whenever isPenSelected changes
      fabricCanvas.isDrawingMode = isPenSelected;
    }
  }, [isPenSelected, fabricCanvas]);

  const createStickerOnCanvas = (width: number = 100, height: number = 100) => {
    if (!fabricCanvas) return;
    if (selectedSticker) {
      fabric.Image.fromURL(selectedSticker, (img) => {
        img.scaleToWidth(width || 0);
        img.scaleToHeight(height || 0);
        img.set({
          selectable: true,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
          lockScalingX: false,
          lockScalingY: false,
          lockRotation: false,
        });
        img.set({
          left: (canvasRef.current?.width || 0) / 2,
          top: (canvasRef.current?.height || 0) / 2,
        });
        fabricCanvas?.add(img);
        fabricCanvas?.bringToFront(img);
        topImageRef.current = img;
        fabricCanvas?.setActiveObject(img);

        // Keep it on top when new objects are added
        fabricCanvas?.on("object:added", () => {
          if (topImageRef.current) {
            console.log("Being called", topImageRef.current);

            fabricCanvas?.bringToFront(topImageRef.current);
            fabricCanvas?.setActiveObject(topImageRef.current);
          }
        });

        // Keep it on top when an object is modified
        fabricCanvas?.on("object:modified", () => {
          if (topImageRef.current) {
            fabricCanvas?.bringToFront(topImageRef.current);
            fabricCanvas?.setActiveObject(topImageRef.current);
          }
        });

        // Keep it on top when objects are selected
        fabricCanvas?.on("selection:created", () => {
          if (topImageRef.current) {
            fabricCanvas?.bringToFront(topImageRef.current);
            fabricCanvas?.setActiveObject(topImageRef.current);
          }
        });
      });
      fabricCanvas?.renderAll();
    }
  };

  const createTextOnCanvas = (placeHolderText: string, fontFamily: string) => {
    if (!fabricCanvas) return;
    const text = new fabric.Textbox("Hello World", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "black",
      fontFamily: selectedFont,
      // fontFamily: "JetBrains Mono",
      selectable: true,
    });
    fabricCanvas.add(text);
    fabricCanvas.renderAll();
  };

  useEffect(() => {
    if (currentOptionSelected === "Text") {
      createTextOnCanvas();
    } else {
      createStickerOnCanvas();
    }
  }, [selectedSticker]);

  const getImageFromCanvas = () => {
    if (!canvasRef.current) return;
    setShowFilterSidebar(true);

    const dataURL = canvasRef.current.toDataURL("image/png");
    console.log("hawa", useStoryEditorState.getState().filterPreviewImage);

    // Convert Data URL to Blob
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "canvas-image.png", {
          type: "image/png",
        });

        // Create object URL
        const fileUrl = URL.createObjectURL(file);
        setFilterPreviewImage(fileUrl);
        fabricCanvas?.clear();

        // Add a new image
        fabric.Image.fromURL(fileUrl, (img) => {
          img.scaleToWidth(fabricCanvas?.getWidth() || 0);
          img.scaleToHeight(fabricCanvas?.getHeight() || 0);
          img.set({ left: 50, top: 50 });

          fabricCanvas?.add(img);
          fabricCanvas?.renderAll();
        });

        console.log("Generated File URL:", fileUrl);

        // Do something with fileUrl (e.g., display image, store URL)
      })
      .catch((err) => console.error("Error converting canvas to file:", err));
  };

  const postStory = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "canvas-image.png", {
        type: "image/png",
      });
      mutate(file);
    });
  };

  const applyFilter = (filterName: string) => {
    if (!fabricCanvas) return;

    // Get all objects from the canvas
    const objects = fabricCanvas.getObjects();

    // Find the image object in the canvas
    const image = objects.find((obj) => obj instanceof fabric.Image);

    // If no image is found, return early
    if (!image) {
      console.error("No image found in the canvas.");
      return;
    }

    // Clear all existing filters
    image.filters = [];

    // Apply the new filter based on the filterName
    switch (filterName) {
      case "Brightness":
        image.filters.push(
          new fabric.Image.filters.Brightness({ brightness: 0.5 })
        );
        break;
      case "Contrast":
        image.filters.push(
          new fabric.Image.filters.Contrast({ contrast: 0.5 })
        );
        break;
      case "Saturation":
        image.filters.push(
          new fabric.Image.filters.Saturation({ saturation: 0.5 })
        );
        break;
      case "Grayscale":
        image.filters.push(new fabric.Image.filters.Grayscale());
        break;
      case "Invert":
        image.filters.push(new fabric.Image.filters.Invert());
        break;
      case "Sepia":
        image.filters.push(new fabric.Image.filters.Sepia());
        break;
      case "Blur":
        image.filters.push(new fabric.Image.filters.Blur({ blur: 0.2 }));
        break;
      case "Noise":
        image.filters.push(new fabric.Image.filters.Noise({ noise: 100 }));
        break;
      case "Pixelate":
        image.filters.push(new fabric.Image.filters.Pixelate({ blocksize: 4 }));
        break;
      default:
        break;
    }

    // Apply the filters and re-render the canvas
    image.applyFilters();
    fabricCanvas.renderAll();
  };
  useEffect(() => {
    if (selectedFilter) {
      applyFilter(selectedFilter);
    }
  }, [selectedFilter]);
  return (
    <div className="flex h-screen">
      {showFilterSidebar ? (
        <FilterSidebar onSelectFilter={setSelectedFilter} />
      ) : (
        <EditorSidebar />
      )}
      <main className="flex-1 flex flex-col">
        <div className="bg-muted/10">
          <div
            className={cn(
              "rounded-lg shadow-sm mx-auto",
              "max-w-5xl h-[calc(100vh-8rem)]",
              "flex items-center justify-center"
            )}
          >
            {/* <img
              src={
                filterPreviewImage
                  ? filterPreviewImage
                  : "https://placehold.co/600x400"
              }
              style={{
                display: !showFilterSidebar ? "none" : "block",
              }}
              alt=""
            /> */}

            <canvas
              ref={canvasRef}
              // style={{ display: showFilterSidebar ? "none" : "block" }}
            />
          </div>
          <div className="w-full flex justify-end p-4">
            {!showFilterSidebar ? (
              <Button onClick={getImageFromCanvas}>
                Next
                <ArrowRight />
              </Button>
            ) : (
              <Button onClick={postStory}>
                <Upload />
                Post Story
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
