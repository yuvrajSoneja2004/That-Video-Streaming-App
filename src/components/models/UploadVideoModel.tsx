'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useMutation } from "react-query"
import { UploadIcon as FileUpload, Stars, Upload } from 'lucide-react'
import { videoCategories } from "../../constants/categories"
import { generateVideoThumbnails } from "../../helpers/generateVideoThumbnails"
import { SERVER_BASE_URL } from "../../utils/axiosInstance"
import { uploadVideo } from "../../helpers/uploadVideo"
import { useGlobalState } from "@/states/global"
import { useToast } from "@/hooks/use-toast"

function VideoDetails({
  prevUrl,
  selectedVideo,
  name,
  avatarUrl,
  channelId,
}: {
  prevUrl: string
  selectedVideo: File | null
  name: string
  avatarUrl: string
  channelId: string
}) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [thumbnail, setThumbnail] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState(videoCategories[0])
  const [uploadPercentage, setUploadPercentage] = React.useState(0)
  const [currentUploadStage, setCurrentUploadStage] = React.useState("uploading")
  const { setIsVideoUploaded,isVideoUploaded } = useGlobalState()
  const {toast} = useToast()

  const thumbnailRef = React.useRef<HTMLInputElement>(null)

  const { data, isLoading, mutate } = useMutation((formData: FormData) =>
    generateVideoThumbnails(formData)
  )

  const uploadMutation = useMutation({
    mutationFn: async (uploadData: {
      title: string
      description: string
      category: string
      thumbnail: string
      video: File
    }) => {
      const formData = new FormData()
      formData.append("channelId", channelId)
      formData.append("title", uploadData.title)
      formData.append("description", uploadData.description)
      formData.append("category", uploadData.category)
      formData.append("thumbnail", uploadData.thumbnail)
      formData.append("video", uploadData.video)

      return uploadVideo(formData, (progress) => {
        setUploadPercentage(progress.progress)
        if(progress.stage === "complete"){
          setIsVideoUploaded(true);
          toast({
            title: "Uploaded Video Successfully",
            description: "Other people can watch the video now.",
          })

        }
        setCurrentUploadStage(progress.stage)
      })
    },
    onSuccess: (data) => {
      console.log("Video uploaded successfully:", data)
    },
    onError: (error) => {
      console.error("Upload failed:", error)
    },
  })

  const generateThumbnails = () => {
    if (selectedVideo) {
      const formData = new FormData()
      formData.append("video", selectedVideo)
      mutate(formData)
    }
  }

  const handleThumbnailClick = (thumbUrl: string) => {
    setThumbnail(`${SERVER_BASE_URL}/video${thumbUrl}`)
  }

  const handleThumbnailSelection = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setThumbnail(fileUrl)
    }
  }

  const handleUpload = () => {
    if (!selectedVideo) {
      console.error("No video selected")
      return
    }

    if (!title.trim()) {
      console.error("Title is required")
      return
    }

    uploadMutation.mutate({
      title,
      description,
      category: selectedCategory,
      thumbnail,
      video: selectedVideo,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Add title that describes your video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell viewers about your video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Thumbnail</Label>
          <div className="flex gap-3">
            <input
              type="file"
              ref={thumbnailRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button variant="outline" onClick={handleThumbnailSelection}>
              <FileUpload className="mr-2 h-4 w-4" />
              Upload file
            </Button>
            <Button variant="outline" onClick={generateThumbnails}>
              <Stars className="mr-2 h-4 w-4" />
              Auto-generate
            </Button>
          </div>
        </div>
        {!isLoading && (
          <p className="text-sm text-muted-foreground">
            Select an image from your video to use as a thumbnail
          </p>
        )}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {isLoading ? (
            <p>Generating...</p>
          ) : (
            data?.map((thumb: string, i: number) => (
              <img
                src={`${SERVER_BASE_URL}/video${thumb}`}
                key={i}
                alt="Thumbnail"
                className={`w-24 h-auto rounded-md cursor-pointer ${
                  thumbnail === `${SERVER_BASE_URL}/video${thumb}`
                    ? "ring-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThumbnailClick(thumb)}
              />
            ))
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {videoCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleUpload} disabled={uploadMutation.isLoading}>
          {uploadMutation.isLoading ? (
            <>
              Uploading... {Math.round(uploadPercentage)}%
              <Progress value={uploadPercentage} className="w-full mt-2" />
            </>
          ) : (
            "Upload Video"
          )}
        </Button>
      </div>
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Video Preview</h3>
        {thumbnail ? (
          <img src={thumbnail} alt="Video thumbnail" className="w-full h-auto rounded-md" />
        ) : (
          <div className="w-full h-48 bg-secondary flex items-center justify-center rounded-md">
            <p className="text-muted-foreground">No thumbnail selected</p>
          </div>
        )}
        <div className="mt-4">
          <h4 className="font-medium">{title || "Video Title"}</h4>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
      </div>
    </div>
  )
}

export default function UploadVideoModal({ avatarUrl, name, channelId }: { avatarUrl: string; name: string; channelId: string }) {
  const [open, setOpen] = React.useState(false)
  const [isVideoSelected, setIsVideoSelected] = React.useState(false)
  const [previewURL, setPreviewURL] = React.useState("")
  const [selectedVideo, setSelectedVideo] = React.useState<File | null>(null)
  const selectVideoRef = React.useRef<HTMLInputElement>(null)
  const { setIsVideoUploaded,isVideoUploaded } = useGlobalState()


  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      setSelectedVideo(file)
      setIsVideoSelected(true)
      const prevUrl = URL.createObjectURL(file)
      setPreviewURL(prevUrl)
    }
  }

  return (
    <Dialog open={isVideoUploaded} onOpenChange={setIsVideoUploaded}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsVideoUploaded(true)} className="text-black">
          <Upload className="mr-2 h-4 w-4 " color="#000" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogDescription>
            Share your video with the world. Add details and customize your video settings.
          </DialogDescription>
        </DialogHeader>
        {!isVideoSelected ? (
          <div className="flex flex-col items-center justify-center p-12">
            <FileUpload className="w-12 h-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Drag and drop video files to upload</h2>
            <p className="text-sm text-muted-foreground mb-4">Your videos will be private until you publish them.</p>
            <input
              type="file"
              ref={selectVideoRef}
              accept="video/*"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            <Button onClick={() => selectVideoRef.current?.click()}>
              Select Files
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
      </DialogContent>
    </Dialog>
  )
}