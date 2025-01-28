import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="w-full sm:max-w-[330.9px] block">
      <div className="w-full sm:max-w-[330.9px] aspect-video">
        <Skeleton height="100%" borderRadius="0.5rem" />
      </div>
      <div className="flex items-start gap-3 mt-3">
        <div className="w-9 h-9">
          <Skeleton circle height={36} width={36} />
        </div>
        <div className="flex flex-col flex-grow min-w-0">
          <Skeleton height={20} width="80%" />
          <Skeleton height={16} width="60%" className="my-1" />
          <Skeleton height={16} width="40%" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
