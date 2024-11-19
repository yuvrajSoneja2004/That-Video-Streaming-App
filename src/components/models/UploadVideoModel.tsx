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
import { THEME } from "../../constants/theme";
import { uploadVideo } from "../../helpers/uploadVideo";

function UploadVideoModel({ avatarUrl, name, channelId }) {
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
            <div
              className="flex flex-col items-center justify-center  p-[100px]"
              style={{ background: THEME.dark.background }}
            >
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
            <VideoDetails
              prevUrl={previewURL}
              selectedVideo={selectedVideo}
              name={name}
              avatarUrl={avatarUrl}
              channelId={channelId}
            />
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

function VideoDetails({
  prevUrl,
  selectedVideo,
  name,
  avatarUrl,
  channelId,
}: VideoDetailsProps) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [thumbnail, setThumbnail] = React.useState<string>("");
  const thumbnailRef = React.useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState(
    videoCategories[0]
  );

  const [uploadPercentage , setUploadPercentage] = React.useState(0);
  
  const [currentUploadStage,setCurrentUploadStage] = React.useState("uploading")
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
    maxHeight: "400px",
    overflowY: "auto",
    paddingRight: "10px",
    paddingTop: "10px",
  };

  // Existing thumbnail generation mutation
  const { data, isLoading, mutate } = useMutation((formData: FormData) =>
    generateVideoThumbnails(formData)
  );

  console.log("i am going insane", data);
  // New upload video mutation
  const uploadMutation = useMutation({
    mutationFn: async (uploadData: {
      title: string;
      description: string;
      category: string;
      thumbnail: string;
      video: File;
    }) => {
      const formData = new FormData();
      formData.append("channelId", channelId);
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      formData.append("category", uploadData.category);
      formData.append("thumbnail", uploadData.thumbnail);
      formData.append("video", uploadData.video);
  
      return uploadVideo(formData, (progress) => {
        setUploadPercentage(progress.progress);
        setCurrentUploadStage(progress.stage)
        // You can also track the stage if needed
        console.log('Current stage:', progress.stage);
        console.log('Current percent:' , progress.progress);
        
      });
    },
    onSuccess: (data) => {
      console.log("Video uploaded successfully:", data);
      // Close modal or show success message
      handleClose?.(); // Make sure to pass handleClose as prop if needed
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      // Show error message to user
    },
  });

  const generateThumbnails = () => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append("video", selectedVideo);
      mutate(formData);
    }
  };

  const handleThumbnailClick = (thumbUrl: string) => {
    setThumbnail(`${SERVER_BASE_URL}/video${thumbUrl}`);
  };

  const handleThumbnailSelection = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.click();
    }
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setThumbnail(fileUrl);
    }
  };

  const handleUpload = () => {
    if (!selectedVideo) {
      console.error("No video selected");
      return;
    }

    if (!title.trim()) {
      console.error("Title is required");
      return;
    }

    uploadMutation.mutate({
      title,
      description,
      category: selectedCategory,
      thumbnail,
      video: selectedVideo,
    });
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
              style={{ display: "none" }}
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
          <div className="flex gap-2 ml-2">
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
                    thumbnail === `${SERVER_BASE_URL}/video${thumb}`
                      ? "outline outline-2 outline-blue-500"
                      : ""
                  }`}
                  onClick={() => handleThumbnailClick(thumb)}
                />
              ))
            )}
          </div>
          <span>Category</span>
          <SelectOptions
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={videoCategories}
          />
          <Button
            variant="contained"
            onClick={handleUpload}
            // disabled={uploadMutation.isLoading}
          >
            {uploadMutation.isLoading ? `Uploading... ${Math.round(uploadPercentage)}%` : "Upload Video"}
          </Button>
        </Stack>
      </div>
      <VideoCard
        videoInfo={{
          id: crypto.randomUUID(),
          title,
          description,
          avatarUrl,
          creator: name,
          thumbnailUrl: thumbnail ? thumbnail : "default-thumbnail.jpg",
          views: 23,
        }}
        isStatic={true}
      />
    </Box>
  );
}



export default UploadVideoModel;
