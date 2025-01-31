import NoVidoesLogo from "../assets/no-videos.png";
function NoVideos({ message = "No Videos Found" }: { message?: string }) {
  return (
    <div
      className="w-full flex justify-center items-center flex-col gap-2"
      style={{ minHeight: "calc(100vh - 137.45px)" }}
    >
      <img src={NoVidoesLogo} alt="no videos" width={180} height={180} />
      <h1 className="text-bold text-2xl">{message}</h1>
    </div>
  );
}

export default NoVideos;
