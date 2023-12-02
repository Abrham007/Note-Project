import React from "react";
import FlipCardImage from "./FlipCardImage";

function FlipCardBack(props) {
  console.log(typeof props.audio);
  let audioArray = new Uint8Array(props.audio);
  let audioBlob = new Blob([props.audio.buffer], { type: "audio/mp4" });
  console.log(typeof audioBlob);
  let audio = URL.createObjectURL(audioBlob);

  return (
    <div className="flip-card-back">
      <div className="flip-card-back__img">
        <FlipCardImage images={props.images} />
      </div>
      <div className="flip-card-back__container">
        <div>
          <audio className="flip-card-back__audio" controls>
            <source src={audio} type="audio/mp4"></source>
          </audio>
        </div>
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
