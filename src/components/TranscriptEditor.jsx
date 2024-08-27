import { useState, useEffect, useMemo } from "react";
import TranscriptVideo from "./TranscriptVideo";
import { FaPlay, FaPause } from "react-icons/fa"; // Import icons
import { initialTranscript } from "../utils/initialTranscript";

const TranscriptEditor = () => {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editWord, setEditWord] = useState(null);
  const [editText, setEditText] = useState("");

  // Handle playback
  const maxTime = useMemo(() => {
    return (
      initialTranscript[initialTranscript.length - 1].start_time +
      initialTranscript[initialTranscript.length - 1].duration +
      100
    );
  }, [initialTranscript]);
  useEffect(() => {
    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 100;
          return newTime >= maxTime ? 0 : newTime;
        });
      }, 100);
    } else if (!isPlaying && currentTime !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  const handleWordClick = (word, index) => {
    setEditWord(index);
    setEditText(word.word);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (index) => {
    if (editText.length > 0) {
      const newTranscript = [...transcript];
      newTranscript[index].word = editText;
      setTranscript(newTranscript);
    }
    else{
        alert('Please enter a valid word');
    }
    setEditWord(null);
  };

  return (
    <div className="App max-w-2xl mx-auto  p-2 bg-gray-700 rounded-lg text-white shadow-lg">
      <div className="relative bg-gray-800 p-2 rounded-lg shadow-md">
        <div className="flex items-center  py-3 px-1 ">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center bg-gray-600 m-1 mr-2 px-2 py-1 rounded-sm text-white font-semibold shadow "
          >
            {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
          </button>
          <span className="text-sm font-semibold">
            {`${(currentTime / 1000).toFixed(1)}s`}
          </span>
        </div>
        <TranscriptVideo
          transcript={transcript}
          currentTime={currentTime}
          onWordClick={handleWordClick}
          editWord={editWord}
          editText={editText}
          onEditChange={handleEditChange}
          onEditSubmit={handleEditSubmit}
        />
      </div>
    </div>
  );
};

export default TranscriptEditor;
