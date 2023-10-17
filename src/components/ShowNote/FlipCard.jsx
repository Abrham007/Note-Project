import React from "react";
import FlipCardFront from "./FlipCardFront";
import FlipCardBack from "./FlipCardBack";

function FlipCard(props) {
  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <FlipCardFront />
        <FlipCardBack showNote={props.showNote} />
      </div>
    </div>
  );
}

export default FlipCard;
