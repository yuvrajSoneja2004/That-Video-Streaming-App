import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { FaFileUpload } from "react-icons/fa";
import InputField from "../ui/InputField";
import { RiUploadCloudLine } from "react-icons/ri";
import { Stack } from "@mui/material";
import { BsStars } from "react-icons/bs";
import { useQuery, useMutation } from "react-query";
import { generateVideoThumbnails } from "../../helpers/generateVideoThumbnails";
import { SERVER_BASE_URL } from "../../utils/axiosInstance";

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
      let prevUrl = URL.createObjectURL(file);
      setPreviewURL(prevUrl);
    }
  };

  const style = {
    position: "absolute",
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
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
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

function VideoDetails({ prevUrl, selectedVideo }: any) {
  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2937",
    color: "white",
    height: "100%",
    padding: "100px",
  };

  const { data, isLoading, error, mutate } = useMutation((formData: FormData) =>
    generateVideoThumbnails(formData)
  );

  console.log(data);

  const generateThumbnails = () => {
    if (selectedVideo) {
      const formData = new FormData();
      formData.append("video", selectedVideo);
      mutate(formData);
    }
  };

  return (
    <Box sx={style}>
      <div>
        <Stack gap={2}>
          <InputField
            label="Title"
            placeholder="Add title that describes your video."
          />
          <InputField
            label="Description"
            placeholder="Tell viewers about your video."
          />
          <h2>Thumbnail</h2>
          <div className="flex gap-3">
            <div className="p-4 px-8 border-2 border-dotted border-gray-400 flex justify-center items-center flex-col gap-2 text-sm hover:cursor-pointer">
              <RiUploadCloudLine size={27} />
              <span>Upload file</span>
            </div>
            <div
              className="p-4  px-8 border-2 border-dotted border-gray-400 flex justify-center items-center flex-col gap-2 text-sm hover:cursor-pointer"
              onClick={generateThumbnails}
            >
              <BsStars size={27} />
              <span>Auto-generate</span>
            </div>
          </div>
          {isLoading ? (
            <h1>Generating....</h1>
          ) : (
            data?.map((thumb, i) => (
              <React.Fragment key={i}>
                <img
                  src={`${SERVER_BASE_URL}/video${thumb}`}
                  key={i}
                  alt="lol"
                />
                <a href={`${SERVER_BASE_URL}/video${thumb}`} target="_blank">
                  {`${SERVER_BASE_URL}/video${thumb}`}
                </a>
              </React.Fragment>
            ))
          )}
        </Stack>
      </div>
      <div>
        <video width="320" height="240" controls>
          <source src={prevUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Box>
  );
}

export default UploadVideoModel;
