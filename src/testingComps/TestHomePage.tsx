import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Mic as MicIcon,
  Search as SearchIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material'

export default function TestHome() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All', 'Sport', 'Music', 'Design', 'Rapping', 'Behzad Leito', 
    'Zed Bazi', 'Alireza JJ', 'Cbiwar', 'Talkshow', 'News', 'Fun'
  ]

  const channels = Array(15).fill(null).map((_, i) => ({
    id: i,
    avatar: `/placeholder.svg?height=40&width=40`,
  }))

  const videos = Array(12).fill(null).map((_, i) => ({
    id: i,
    thumbnail: `/placeholder.svg?height=200&width=360`,
    title: `Video Title ${i + 1}`,
    channel: `Channel ${i + 1}`,
    views: '10K views',
    time: '2 weeks ago',
  }))

  return (
    <Box className="min-h-screen bg-[#F9F9F9]">
      {/* Top Navigation */}
      <AppBar position="sticky" className="bg-white shadow-none">
        <Toolbar className="px-4">
          <IconButton edge="start" className="text-black">
            <MenuIcon />
          </IconButton>
          
          <img src="/placeholder.svg?height=20&width=90" alt="YouTube" className="h-5 ml-4" />
          
          <Box className="flex-grow mx-4 lg:mx-20">
            <Box className="flex max-w-2xl mx-auto">
              <Box className="flex flex-grow items-center px-4 rounded-l-full border border-gray-300">
                <SearchIcon className="text-gray-400 mr-2" />
                <InputBase
                  placeholder="Search"
                  className="flex-grow"
                />
              </Box>
              <IconButton className="bg-gray-100 rounded-r-full border border-l-0 border-gray-300">
                <MicIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<VideoCallIcon />}
            className="mr-4 bg-black hover:bg-gray-900 normal-case"
          >
            New Video
          </Button>
          
          <Avatar className="w-8 h-8">U</Avatar>
        </Toolbar>

        {/* Categories */}
        <Box className="px-4 py-2 overflow-x-auto flex gap-2 border-b border-gray-200">
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            />
          ))}
        </Box>
      </AppBar>

      {/* Main Content */}
      <Box className="p-4">
        {/* Channel Avatars */}
        <Box className="flex gap-4 overflow-x-auto mb-6 px-2">
          {channels.map((channel) => (
            <Avatar
              key={channel.id}
              src={channel.avatar}
              className="w-12 h-12 ring-2 ring-red-500 cursor-pointer"
            />
          ))}
        </Box>

        {/* Video Grid */}
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <Box key={video.id} className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <Box className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover"
                />
                <Typography
                  variant="caption"
                  className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded"
                >
                  10:30
                </Typography>
              </Box>
              <Box className="p-3">
                <Box className="flex gap-3">
                  <Avatar className="w-9 h-9">C</Avatar>
                  <Box>
                    <Typography variant="subtitle2" className="font-medium line-clamp-2">
                      {video.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {video.channel}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                      {video.views} • {video.time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}