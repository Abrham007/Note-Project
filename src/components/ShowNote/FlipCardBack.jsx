import React, { useEffect, useRef, useState } from "react";
import FlipCardImage from "./FlipCardImage";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BackHandIcon from "@mui/icons-material/BackHand";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function FlipCardBack(props) {
  const [noteAudio, setNoteAudio] = useState();
  const [imgList, setImgList] = useState();
  const [flipCardImage, setFlipCardImage] = useState();
  // const [flipCardAudio, setFlipCardAudio] = useState();
  const [isAuto, setIsAuto] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState();
  const [audioTime, setAudioTime] = useState("");
  const [audioFullTime, setAudioFullTime] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const autoBtn = useRef(null);
  const playBtn = useRef(null);

  function handleAudio() {
    let audioArray = new Uint8Array(props.audio.data);
    let audioBlob = new Blob([audioArray.buffer], { type: "audio/mp4" });
    let audio = URL.createObjectURL(audioBlob);
    let noteAudio = new Audio(audio);
    setNoteAudio(noteAudio);

    noteAudio.addEventListener("loadeddata", function getAudioTime() {
      // The duration variable now holds the duration (in seconds) of the audio clip
      const minutes = Math.floor(noteAudio.duration / 60);
      const seconds = Math.floor(noteAudio.duration - minutes * 60);
      const minuteValue = minutes < 10 ? `0${minutes}` : minutes;
      const secondValue = seconds < 10 ? `0${seconds}` : seconds;

      const mediaTime = `${minuteValue}:${secondValue}`;
      setAudioTime(mediaTime);
      setAudioFullTime(mediaTime);

      noteAudio.removeEventListener("loadeddata", getAudioTime);
    });
  }

  async function fetchImage() {
    try {
      if (!props.image) {
        let responseImg = await fetch(
          `http://localhost:4000/images/${props.id}`
        );
        let imgBufferList = await responseImg.json();
        let imgURLList = imgBufferList.map((imgBuffer) => {
          let imgArray = new Uint8Array(imgBuffer.data);
          let imgBlob = new Blob([imgArray.buffer], { type: "image/png" });
          return URL.createObjectURL(imgBlob);
        });
        setImgList(imgURLList);
        setFlipCardImage(
          <FlipCardImage
            images={imgURLList}
            isAuto={isAuto}
            duration={duration}
          />
        );
      } else {
        let imgArray = new Uint8Array(props.image.data);
        let imgBlob = new Blob([imgArray.buffer], { type: "image/png" });
        let image = URL.createObjectURL(imgBlob);
        setImgList([image]);
        setFlipCardImage(
          <FlipCardImage images={[image]} isAuto={isAuto} duration={duration} />
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEnd(e) {
    if (autoBtn) {
      autoBtn.current.click();
      autoBtn = null;
    }

    if (playBtn) {
      playBtn.current.click();
      playBtn = null;
    }
  }

  function updateTime() {
    const interval = noteAudio.duration - noteAudio.currentTime;
    const minutes = Math.floor(interval / 60);
    const seconds = Math.floor(interval - minutes * 60);
    const minuteValue = minutes < 10 ? `0${minutes}` : minutes;
    const secondValue = seconds < 10 ? `0${seconds}` : seconds;

    const mediaTime = `${minuteValue}:${secondValue}`;
    setAudioTime(mediaTime);
  }

  function playAudio() {
    noteAudio.play();
    noteAudio.addEventListener("ended", handleEnd);
    setIsPlaying(true);
    noteAudio.addEventListener("timeupdate", updateTime);
  }
  function pauseAudio() {
    noteAudio.pause();
    setIsPlaying(false);
  }

  function stopAudio() {
    noteAudio.pause();
    noteAudio.currentTime = 0;
    noteAudio.removeEventListener("ended", handleEnd);
    noteAudio.removeEventListener("timeupdate", updateTime);
    setAudioTime(audioFullTime);
    setIsPlaying(false);
  }

  function toggleAuto() {
    if (isAuto === false) {
      setDuration(noteAudio.duration);
      playAudio();
      setIsAuto(true);
    } else {
      setDuration(0);
      stopAudio();
      setIsAuto(false);
    }
  }

  function goUp() {
    window.scrollBy(0, -window.innerHeight);
  }

  function goDown() {
    window.scrollBy(0, window.innerHeight);
  }

  async function handleDeleteNote() {
    setIsDeleting(true);
    props.deleteNote(props.id).then(() => {
      setIsDeleting(false);
    });
  }

  useEffect(() => {
    fetchImage();
    handleAudio();
  }, []);

  useEffect(() => {
    if (imgList) {
      setFlipCardImage(
        <FlipCardImage images={imgList} isAuto={isAuto} duration={duration} />
      );
    }
  }, [isAuto]);

  return (
    <div className="flip-card-back">
      <div className="flip-card-back__img">{flipCardImage}</div>
      <div className="flip-card-back__container">
        {/* <div className="audio-box">{flipCardAudio}</div> */}
        <div className="btn-group">
          <div
            className="audio-time"
            style={{
              border: isPlaying ? "6px solid #a29bfe" : "none",
            }}
          >
            {audioTime}
          </div>

          <button
            className="btn"
            onClick={isPlaying ? pauseAudio : playAudio}
            ref={playBtn}
          >
            {isPlaying ? (
              <PauseIcon></PauseIcon>
            ) : (
              <PlayArrowIcon></PlayArrowIcon>
            )}
          </button>
          <button className="btn" onClick={stopAudio}>
            <StopIcon></StopIcon>
          </button>
          <button className="btn" onClick={(event) => props.showNote(event)}>
            <AddIcon></AddIcon>
          </button>
          <button
            className="btn"
            style={props.isLoading ? { border: "none", outline: "none" } : {}}
            onClick={handleDeleteNote}
          >
            <div
              className="loader"
              style={{
                display: isDeleting ? "block" : "none",
              }}
            ></div>
            <DeleteIcon></DeleteIcon>
          </button>
          <button className="btn" ref={autoBtn} onClick={toggleAuto}>
            {isAuto ? (
              <HourglassTopIcon></HourglassTopIcon>
            ) : (
              <BackHandIcon></BackHandIcon>
            )}
          </button>
          <button className="btn" onClick={goUp}>
            <ArrowUpwardIcon></ArrowUpwardIcon>
          </button>
          <button className="btn" onClick={goDown}>
            <ArrowDownwardIcon></ArrowDownwardIcon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlipCardBack;
