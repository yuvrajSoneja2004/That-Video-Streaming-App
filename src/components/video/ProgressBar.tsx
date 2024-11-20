import { formatTime } from '@/utils/formatTime';
import React, { useState } from 'react';

const ProgressBar = ({ 
    duration, 
    currentTime, 
    onSeek 
  }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [hoverPosition, setHoverPosition] = useState(0);
  
    const handleMouseMove = (e) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const position = (e.clientX - bounds.left) / bounds.width;
      setHoverPosition(position);
    };
  
    const handleClick = (e) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const position = (e.clientX - bounds.left) / bounds.width;
      // Create a synthetic event object to match the original handleSeek expectation
      const seekEvent = {
        target: {
          value: (position * duration).toString()
        }
      };
      onSeek(seekEvent);
    };
  
    return (
      <div 
        className="group relative w-full h-1 bg-gray-600 cursor-pointer mb-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* Rest of the UI remains the same */}
        <div className="absolute h-full bg-gray-400 opacity-50" style={{ width: '100%' }} />
        
        <div 
          className="absolute h-full bg-yellow-500 transition-all duration-100"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
  
        {isHovering && (
          <>
            <div 
              className="absolute w-0.5 h-6 bg-white -top-2"
              style={{ left: `${hoverPosition * 100}%`, transform: 'translateX(-50%)' }}
            />
            
            <div 
  className="absolute -top-8 px-2 py-1 text-xs bg-black rounded transform -translate-x-1/2"
  style={{ left: `${hoverPosition * 100}%` }}
>
  {formatTime(Math.floor(hoverPosition * duration))}
</div>
          </>
        )}
  
        <div className="absolute w-full h-full opacity-0 group-hover:opacity-100">
          <div className="absolute w-full h-2 -top-0.5 bg-gray-600 transition-all duration-200" />
        </div>
      </div>
    );
  };
export default ProgressBar;