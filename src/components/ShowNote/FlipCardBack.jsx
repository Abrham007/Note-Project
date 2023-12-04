import React, { useEffect, useState } from "react";
import FlipCardImage from "./FlipCardImage";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BackHandIcon from "@mui/icons-material/BackHand";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

function FlipCardBack(props) {
  const [noteAudio, setNoteAudio] = useState();
  const [imgList, setImgList] = useState();
  const [flipCardImage, setFlipCardImage] = useState();
  const [flipCardAudio, setFlipCardAudio] = useState();
  const [isAuto, setIsAuto] = useState(false);
  const [duration, setDuration] = useState();

  async function fetchMedia() {
    try {
      let responseAudio = await fetch(
        `http://localhost:4000/audio/${props.id}`
      );
      let audioBuffer = await responseAudio.blob();
      let audio = URL.createObjectURL(audioBuffer);
      let noteAudio = new Audio(audio);
      setNoteAudio(noteAudio);
      setFlipCardAudio(
        <audio className="flip-card-back__audio" controls>
          <source src={audio}></source>
        </audio>
      );

      let responseImg = await fetch(`http://localhost:4000/images/${props.id}`);
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
    } catch (error) {
      console.log(error);
    }
  }

  function playAudio() {
    noteAudio.play();
    noteAudio.addEventListener("ended", toggleAuto);
  }
  function pauseAudio() {
    noteAudio.pause();
  }

  function stopAudio() {
    noteAudio.pause();
    noteAudio.currentTime = 0;
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

  useEffect(() => {
    fetchMedia();
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
        <div className="audio-box">{flipCardAudio}</div>
        <div className="btn-group">
          <button
            className="btn--secondary"
            onClick={(event) => props.showNote(event)}
          >
            <AddIcon></AddIcon>
          </button>
          <button className="btn--secondary">
            <DeleteIcon></DeleteIcon>
          </button>
          <button className="btn--secondary" onClick={toggleAuto}>
            {isAuto ? (
              <HourglassTopIcon></HourglassTopIcon>
            ) : (
              <BackHandIcon></BackHandIcon>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlipCardBack;
