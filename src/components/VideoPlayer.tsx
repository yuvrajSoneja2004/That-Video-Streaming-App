// import React from 'react'

// function VideoPlayer() {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     sources: [
//       {
//         src: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
//         type: "application/x-mpegURL",
//       },
//     ],
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;
//   };
//   const [open, setOpen] = React.useState(true);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   return (
//     <div className="p-7">
//       <div className="max-w-3xl mx-auto">
//         {/* <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
//         {/* <ReactPlayer
//           url="http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8"
//           controls
//           width="100%"
//           height="100%"
//           playing={true}
//           muted={true} */}
//         /> */}
//         <CustomVideoPlayer />
//         {/* <BasicModal
//           open={open}
//           handleOpen={handleOpen}
//           handleClose={handleClose}
//         >
//           <UploadVideoModel />
//         </BasicModal> */}
//       </div>
//     </div>
//   )
// }

// export default VideoPlayer
