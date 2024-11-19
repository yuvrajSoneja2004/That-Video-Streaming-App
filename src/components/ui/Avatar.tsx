import React from "react";

interface AvatarProps {
  size?: number;
  src: string;
  hasRing?: boolean;
}

const DEFAULT_AVATAR =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const Avatar: React.FC<AvatarProps> = ({ size = 50, src = DEFAULT_AVATAR }) => {
  return (
    <div className="avatar">
      <div
        className="rounded-full overflow-hidden"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <img
          src={src}
          alt="Avatar"
          className="w-full h-full object-cover"
          width={size}
          height={size}
          referrerPolicy="no-referrer"

        />
      </div>
    </div>
  );
};

export default Avatar;
