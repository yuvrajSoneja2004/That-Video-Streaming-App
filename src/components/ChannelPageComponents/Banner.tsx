function Banner({ bannerUrl }: { bannerUrl: string }) {
  return (
    <div
      className="w-full h-[220px] bg-red-400 rounded-lg  bg-cover bg-center"
      style={{
        backgroundImage: `url(${
          !bannerUrl
            ? "https://yt3.googleusercontent.com/ByMxDFJNx82IJQDRVaIHT1Ms2IHk0Ya85c8oAH7BV1J9g9-7GtXUCc-s3ThIuKG1L7UMr-la=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
            : bannerUrl
        })`,
      }}
    ></div>
  );
}

export default Banner;
