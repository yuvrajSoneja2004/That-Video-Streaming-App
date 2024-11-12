import Carousel from "react-material-ui-carousel";
import VideoCard from "../VideoCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function VideosSlider({ heading, data }) {
  // Group items into sets of 4
  const groupedItems = data.reduce((resultArray, item, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!resultArray[groupIndex]) {
      resultArray[groupIndex] = [];
    }
    resultArray[groupIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        NavButton={({ onClick, className, style, next, prev }) => {
          return (
            <button
              onClick={onClick as any}
              className={`${className} absolute top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 shadow-md z-10 ${
                next ? "right-0 mr-2" : "left-0 ml-2"
              }`}
              style={{
                ...style,
                backgroundColor: "white",
                color: "#030303",
                fontSize: "24px",
                opacity: 0.8,
              }}
            >
              {next ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </button>
          );
        }}
        autoPlay={false}
        indicators={false}
        cycleNavigation={false}
      >
        {groupedItems.map((group, i) => (
          <div key={i} className="flex justify-between space-x-4 ">
            {group?.map((item: any) => (
              <div key={item.id} className="w-1/3">
                <VideoCard
                  videoInfo={{
                    title: item.title,
                    description: item.description,
                    id: item.videoId,
                    thumbnailUrl: item.thumbnailUrl,
                    views: item.views,
                    channel: item.channel,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default VideosSlider;
