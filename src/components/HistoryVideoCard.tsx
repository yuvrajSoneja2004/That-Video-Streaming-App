import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Clock4, MoreVertical } from "lucide-react";

function HistoryVideoCard({ item }: { item: any }) {
  console.log("Yarr...logo ki na gaand jalti h", item);
  // Extract Video info
  const { thumbnailUrl, title, views } = item?.video;
  const { avatarUrl, name } = item?.user;

  // Extracting User Info

  return (
    <div
      key={item.id}
      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start lg:gap-6 w-full"
    >
      <div className="relative aspect-video w-full max-w-[240px] flex-none overflow-hidden rounded-lg sm:w-40 lg:w-60">
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt=""
          className="object-cover"
          loading="lazy"
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 160px, 100vw"
        />
        <div className="absolute bottom-1 right-1 rounded bg-background/80 px-1 text-xs font-medium">
          {item.duration}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-base font-medium leading-tight lg:text-lg">
            {title}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-m-2 flex-none">
                <MoreVertical className="size-5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Clock4 className="mr-2 size-4" />
                Remove from history
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>{name}</span>
          {item.verified && (
            <svg
              className="size-4 fill-current"
              viewBox="0 0 24 24"
              aria-label="Verified"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
            </svg>
          )}
        </div>
        <div className="text-sm text-muted-foreground">{views}k views</div>
        {item.timestamp && (
          <div className="text-sm text-muted-foreground">
            First Time in the History of Palwal {item.timestamp}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryVideoCard;
