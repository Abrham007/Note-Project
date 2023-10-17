import React from "react";

function FlipCardBack(props) {
  return (
    <div class="flip-card-back">
      <div className="flip-card-back__img">
        <img src="https://picsum.photos/450/350" alt="Note"></img>
      </div>
      <div>
        <audio></audio>
      </div>
      <div className="btn-group">
        <button className="btn" onClick={(event) => props.showNote(event)}>
          Create Note
        </button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

export default FlipCardBack;
