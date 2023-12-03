import React, { useEffect, useState } from "react";
import FlipCardImage from "./FlipCardImage";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

function FlipCardBack(props) {
  const [noteAudio, setNoteAudio] = useState();
  const [flipCardImage, setFlipCardImage] = useState();
  const [flipCardAudio, setFlipCardAudio] = useState();

  async function fetchMedia() {
    try {
      let responseAudio = await fetch(
        `http://localhost:4000/audio/${props.id}`
      );
      let audioBuffer = await responseAudio.blob();
      console.log(audioBuffer);
      let audio = URL.createObjectURL(audioBuffer);
      let noteAudio = new Audio(audio);
      setNoteAudio(noteAudio);
      setFlipCardAudio(
        <audio className="flip-card-back__audio" controls>
          <source src={audio}></source>
        </audio>
      );

      let responseImg = await fetch(`http://localhost:4000/images/${props.id}`);
      let imgBufferList = await responseImg.blob();
      console.log(imgBufferList);
      let imgURLList = [URL.createObjectURL(imgBufferList)];
      // let imgURLList = imgBufferList.map((imgBuffer) => {
      //   let imgBlob = new Blob([imgBuffer.data], { type: "image/png" });
      //   console.log(imgBlob);
      //   return URL.createObjectURL(imgBlob);
      // });

      setFlipCardImage(<FlipCardImage images={imgURLList} />);
      console.log(imgURLList);
    } catch (error) {
      console.log(error);
    }
  }

  function playAudio() {
    noteAudio.play();
  }
  function pauseAudio() {
    noteAudio.pause();
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="flip-card-back">
      <div className="flip-card-back__img">{flipCardImage}</div>
      <div className="flip-card-back__container">
        <div className="audio-box">{flipCardAudio}</div>
        <div className="btn-dropdown">
          <button className="btn">Note Menu</button>
          <div className="btn-group">
            <button className="btn" onClick={(event) => props.showNote(event)}>
              Create Note
            </button>
            <button className="btn">Delete Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCardBack;
