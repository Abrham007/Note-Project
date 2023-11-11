import React from "react";
import FlipCardImage from "./FlipCardImage";

function FlipCardBack(props) {
  return (
    <div className="flip-card-back">
      <div className="flip-card-back__img">
        <FlipCardImage />
      </div>
      <div className="flip-card-back__container">
        <div>
          <audio className="flip-card-back__audio" controls>
            <source
              src="C:\Users\abrha\Documents\Sound Recordings\blockchain intro 1.m4a"
              type="audio/mp4"
            ></source>
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
