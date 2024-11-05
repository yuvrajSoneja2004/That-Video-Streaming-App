import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FaFileUpload } from "react-icons/fa";
import InputField from "../ui/InputField";
import { RiUploadCloudLine } from "react-icons/ri";
import { Stack, styled } from "@mui/material";
import { videoCategories } from "../../constants/categories";
import { BsStars } from "react-icons/bs";
import { useMutation } from "react-query";
import { generateVideoThumbnails } from "../../helpers/generateVideoThumbnails";
import { SERVER_BASE_URL } from "../../utils/axiosInstance";
import VideoCard from "../VideoCard";
import SelectOptions from "../ui/SelectOptions";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

function UploadVideoModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const selectVideoRef = React.useRef<HTMLInputElement>(null);
  const [isVideoSelected, setIsVideoSelected] = React.useState<boolean>(false);
  const [previewURL, setPreviewURL] = React.useState<string>("");

  const [selectedVideo, setSelectedVideo] = React.useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedVideo(file);
      setIsVideoSelected(true);
      const prevUrl = URL.createObjectURL(file);
      setPreviewURL(prevUrl);
    }
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "8px",
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          borderRadius: 20,
          background: "#fff",
          color: "#000",
          textTransform: "none",
        }}
        onClick={handleOpen}
      >
        <FileUploadOutlinedIcon sx={{ marginRight: 0.7, fontSize: 20 }} />
        Upload
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!isVideoSelected ? (
            <div className="flex flex-col items-center justify-center bg-gray-900 text-gray-300 p-[100px]">
              <div className="bg-gray-800 rounded-full p-6 inline-block">
                <FaFileUpload className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-semibold my-5">
                Drag and drop video files to upload
              </h2>
              <label className="block">
                <span className="sr-only">Choose video files</span>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="video/*"
                  onChange={handleFileSelect}
                  ref={selectVideoRef}
                />
              </label>
              <Button onClick={() => selectVideoRef.current?.click()}>
                Choose files
              </Button>
            </div>
          ) : (
            <VideoDetails prevUrl={previewURL} selectedVideo={selectedVideo} />
          )}
        </Box>
      </Modal>
    </div>
  );
}

type VideoDetailsProps = {
  prevUrl: string;
  selectedVideo: File | null;
};

function VideoDetails({ prevUrl, selectedVideo }: VideoDetailsProps) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [thumbnail, setThumbnail] = React.useState<string>(""); // To hold the selected thumbnail URL
  const thumbnailRef = React.useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState(
    videoCategories[0]
  ); // Default to first category

  const style = {
    display: "grid",
    gridTemplateColumns: "60% auto",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2937",
    color: "white",
    height: "100%",
    padding: "19px",
    paddingBottom: "39px",
    paddingTop: "39px",
  };

  const leftGridStyle = {
    maxHeight: "400px", // Set a fixed height for the left section
    overflowY: "auto", // Enable vertical scrolling
    paddingRight: "10px", // Optional: add some space for scrollbar
    paddingTop: "10px",
  };

  const { data, isLoading, mutate } = useMutation((formData: FormData) =>
    generateVideoThumbnails(formData)
  );

  const generateThumbnails = () => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append("video", selectedVideo);
      mutate(formData);
    }
  };

  const handleThumbnailClick = (thumbUrl: string) => {
    setThumbnail(`${SERVER_BASE_URL}/video${thumbUrl}`); // Set the selected thumbnail from auto-generated ones
  };

  const handleThumbnailSelection = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.click();
    }
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value); // Update selected category
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a URL for the selected file
      setThumbnail(fileUrl); // Set the manually selected thumbnail
    }
  };

  return (
    <Box sx={style}>
      <div style={leftGridStyle}>
        <Stack gap={2}>
          <InputField
            label="Title"
            placeholder="Add title that describes your video."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <InputField
            label="Description"
            placeholder="Tell viewers about your video."
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
          <h2>Thumbnail</h2>
          <div className="flex gap-3">
            <input
              type="file"
              ref={thumbnailRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }} // Hidden input field for file selection
            />
            <div
              className="p-4 px-8 border-2 border-dotted border-gray-400 flex justify-center items-center flex-col gap-2 text-sm hover:cursor-pointer"
              onClick={handleThumbnailSelection}
            >
              <RiUploadCloudLine size={27} />
              <span>Upload file</span>
            </div>
            <div
              className="p-4 px-8 border-2 border-dotted border-gray-400 flex justify-center items-center flex-col gap-2 text-sm hover:cursor-pointer"
              onClick={generateThumbnails}
            >
              <BsStars size={27} />
              <span>Auto-generate</span>
            </div>
          </div>
          {!isLoading &&
            "Select an image from your video to use as a thumbnail"}
          <div className="flex gap-2">
            {isLoading ? (
              <h1>Generating....</h1>
            ) : (
              data?.map((thumb: string, i: number) => (
                <img
                  src={`${SERVER_BASE_URL}/video${thumb}`}
                  key={i}
                  alt="Thumbnail"
                  width={123}
                  height={66}
                  className={`rounded-md cursor-pointer ${
                    thumbnail === thumb
                      ? "outline outline-2 outline-blue-500"
                      : ""
                  }`} // Add outline when the thumbnail is selected
                  onClick={() => handleThumbnailClick(thumb)} // Set the clicked thumbnail
                />
              ))
            )}
          </div>
          <span>Category</span>
          <SelectOptions
            value={selectedCategory} // Pass current selected category
            onChange={handleCategoryChange} // Pass handler function
            options={videoCategories} // Pass video categories array
          />
        </Stack>
      </div>
      <VideoCard
        videoInfo={{
          id: crypto.randomUUID(),
          title,
          description,
          thumbnail: thumbnail ? thumbnail : "default-thumbnail.jpg", // Use the manually selected thumbnail or default
          views: 23, // This can be a dynamic value if you have it
        }}
        isStatic={thumbnail ? false : true}
      />
    </Box>
  );
}



export default UploadVideoModel;
