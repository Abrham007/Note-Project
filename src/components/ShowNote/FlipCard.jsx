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
          notes={props.note.notes}
          date={props.note.date}
        />
        <FlipCardBack
          id={props.note.id}
          audio={props.note.audio}
          image={props.note.image}
          showNote={props.showNote}
        />
      </div>
    </div>
  );
}

export default FlipCard;
