

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"
import { CameraIcon, CloudUploadIcon, Pencil, X } from 'lucide-react'
import { useMutation } from "react-query"
import {
  updateChannelInfo,
  uploadToImgBB,
} from "../../helpers/updateChannelInfo"
import { useChannelState } from "../../states/channel"

// Types remain the same as in the original code

export default function ChannelCustomizeModal({
  open,
  handleClose,
  handleOpen,
  bannerUrl,
  channelId,
  onSuccess,
}: ChannelCustomizeModalProps) {
  const [channelName, setChannelName] = useState("")
  const [channelDescription, setChannelDescription] = useState("")
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<File | null>(null)
  const [previewBanner, setPreviewBanner] = useState(bannerUrl)
  const [previewProfile, setPreviewProfile] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { setIsChannelInfoUpdated } = useChannelState()

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedBanner(file)
      setPreviewBanner(URL.createObjectURL(file))
    }
  }

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedProfile(file)
      setPreviewProfile(URL.createObjectURL(file))
    }
  }

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () => {
      setIsUploading(true)
      try {
        // Upload images first if they exist
        const uploadPromises: Promise<string>[] = []
        let newBannerUrl = bannerUrl
        let newProfileUrl = ""

        if (selectedBanner) {
          uploadPromises.push(
            uploadToImgBB(selectedBanner, setIsChannelInfoUpdated)
          )
        }
        if (selectedProfile) {
          uploadPromises.push(
            uploadToImgBB(selectedProfile, setIsChannelInfoUpdated)
          )
        }

        // Wait for all uploads to complete
        if (uploadPromises.length > 0) {
          const urls = await Promise.all(uploadPromises)
          if (selectedBanner) newBannerUrl = urls[0]
          if (selectedProfile) newProfileUrl = urls[selectedBanner ? 1 : 0]
        }

        // Send final update request with all data
        const channelData: ChannelUpdateRequest = {
          name: channelName,
          description: channelDescription,
          bannerUrl: newBannerUrl,
          avatarUrl: newProfileUrl,
        }

        return await updateChannelInfo(channelData, channelId)
      } finally {
        setIsUploading(false)
      }
    },
    onSuccess: (data) => {
      onSuccess?.(data)
      handleClose()
    },
    onError: (error) => {
      console.error("Error updating channel:", error)
    },
  })

  const isSubmitDisabled = isLoading || isUploading

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleOpen}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Customize channel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Channel {channelId}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Art</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[180px] overflow-hidden rounded-md">
                <img
                  src={previewBanner || bannerUrl}
                  alt="Channel Art"
                  className="h-full w-full object-cover"
                />
                <Label
                  htmlFor="channel-art-upload"
                  className="absolute bottom-2 right-2"
                >
                  <Input
                    id="channel-art-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleBannerChange}
                  />
                  <Button variant="secondary" size="sm">
                    <CloudUploadIcon className="mr-2 h-4 w-4" />
                    Change Art
                  </Button>
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={previewProfile || undefined} />
                    <AvatarFallback>
                      <CameraIcon className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="profile-picture-upload"
                    className="absolute -bottom-2 -right-2"
                  >
                    <Input
                      id="profile-picture-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleProfileChange}
                    />
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <CameraIcon className="h-4 w-4" />
                    </Button>
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your profile picture will appear where your channel is
                  presented on YouTube
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="channel-name">Name</Label>
                  <Input
                    id="channel-name"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel-description">Description</Label>
                  <Textarea
                    id="channel-description"
                    value={channelDescription}
                    onChange={(e) => setChannelDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error.message}</p>
                )}
                <Button
                  onClick={() => mutate()}
                  disabled={isSubmitDisabled}
                >
                  {isUploading
                    ? "Uploading..."
                    : isLoading
                    ? "Saving..."
                    : "Save"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

