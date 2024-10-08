import { useEffect } from "react";
import { useRef } from "react";
const TranscriptVideo = ({
  transcript,
  currentTime,
  onWordClick,
  editWord,
  editText,
  onEditChange,
  onEditSubmit,
}) => {
  // const renderCount = useRef(0);

  // useEffect(() => {
  //   // Increment render count
  //   renderCount.current += 1;
  //   console.log(`TranscriptVideo render count: ${renderCount.current}`);
  // });

  return (
    <div className="text-white gap-[2px] flex flex-wrap">
      {transcript.map(({ word, start_time, duration }, index) => {
        const isActive =
          currentTime >= start_time && currentTime <= start_time + duration;
        const isSelected = editWord === index;

        return (
          <span key={index} className="relative">
            <span
              onClick={() => onWordClick({ word, start_time, duration }, index)}
              className={`cursor-pointer px-2  transition-all duration-200 pb-1 rounded-md ease-in-out ${
                isActive ? "bg-yellow-500 text-black" : "text-white"
              } ${isSelected ? "border-[1px] border-yellow-500" : ""}`}
            >
              {word}
            </span>
            {isSelected && (
              <div className="absolute z-20 flex flex-col w-64 top-full mt-2 left-0 bg-gray-800 p-3 rounded-lg shadow-md border border-gray-700">
                <input
                  type="text"
                  value={editText}
                  onChange={onEditChange}
                  className="w-full px-3 py-1 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150 text-sm"
                  placeholder="Edit word"
                />
                <div className="flex justify-end mt-3 space-x-1">
                  <button
                    onClick={() => {
                      // Define this function later
                    }}
                    className="bg-gray-600 text-white text-xs px-3 py-1 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-150"
                  >
                    Correct All
                  </button>
                  <button
                    onClick={() => onEditSubmit(index)} // Save action
                    className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ease-in-out duration-150"
                  >
                    Correct
                  </button>
                </div>
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default TranscriptVideo;
