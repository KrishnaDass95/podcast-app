import { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // useRef hook persists state through re-renders
  const audioRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isMute) {
      audioRef.current.volume = 1;
      setVolume(1);
    } else {
      audioRef.current.volume = 0;
      setVolume(0);
    }
  }, [isMute]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  }

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }


  const handleDuration = (e) => {
    console.log("audio-change",e.target.value);
    setCurrentTime(e.target.value);
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  return (
    <div className="custom-audio-player">
      <img className="display-image-player" src={image} alt="podcast-player" />
      <audio ref={audioRef} src={audioSrc}></audio>

      <p onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </p>

      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          onChange={handleDuration}
          type="range"
          max={duration}
          value={currentTime}
          step={0.01}
          className="duration-range"
        />
        <p>-{formatTime(duration - currentTime)}</p>
        <p onClick={() => setIsMute(!isMute)}>
          {isMute ? <FaVolumeMute /> : <FaVolumeUp />}
        </p>

        <input
          onChange={handleVolume}
          type="range"
          className="volume-range"
          value={volume}
          max={1}
          min={0}
          step={0.01}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
