import { useEffect, useRef, useState } from "react";
import "./style.css";
import {FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from "react-icons/fa"

const AudioPlayer = ({ audioSrc, image }) => {
  const [duration, setDuration] = useState("");
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // useRef hook persists state through re-renders
  const audioRef = useRef();

  useEffect(() => {
    if(isPlaying){
        audioRef.current.play();
    }
    else{
        audioRef.current.pause();
    }

  }, [isPlaying])

  useEffect(() => {
    if(!isMute){
        audioRef.current.volume = 1;
        setVolume(1);
    }
    else{
        audioRef.current.volume = 0;
        setVolume(0);
    }

  }, [isMute])


  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleVolume = () => {
    setVolume(0);
  }

  
  return (
    <div className="custom-audio-player">
      <img className="display-image-player" src={image} alt="podcast-player" />
      <audio ref={audioRef} src={audioSrc}></audio>

      <p onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <FaPause /> : <FaPlay />}</p>

      <div className="duration-flex">
        <p>0:00</p>
        <input onChange={handleDuration} type="range" className="duration-range" />
        <p>-21:00</p>
        <p onClick={() => setIsMute(!isMute)}>{isMute ? <FaVolumeMute /> : <FaVolumeUp />}</p>

        <input onChange={handleVolume} type="range" className="volume-range" />
      </div>

    </div>
  );
};

export default AudioPlayer;
