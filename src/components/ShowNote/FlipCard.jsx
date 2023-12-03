import React from "react";
import FlipCardFront from "./FlipCardFront";
import FlipCardBack from "./FlipCardBack";

function FlipCard(props) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <FlipCardFront
          title={props.note.title}
          question={props.note.question}
          answer={props.note.answer}
          date={props.note.date}
        />
        <FlipCardBack
          id={props.id}
          audio={props.note.audio}
          images={props.note.images}
          showNote={props.showNote}
        />
      </div>
    </div>
  );
}

export default FlipCard;
