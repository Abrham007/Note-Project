import React from "react";

function FlipCardFront(props) {
  return (
    <div className="flip-card-front">
      <h1>NOTE</h1>
      <div className="flip-card-front__title">
        <div>
          <h2>Title</h2>
          <p>{props.title}</p>
        </div>
        <div>
          <h2>Date</h2>
          <p>{props.date}</p>
        </div>
      </div>
      <div className="flip-card-front__question">
        <h2>Questions/Keywords</h2>
        <p className="indent">{props.question}</p>
      </div>
      <div className="flip-card-front__answer">
        <h2>Notes/Answers</h2>
        <p className="indent" tabIndex={1}>
          {props.notes}
        </p>
      </div>
    </div>
  );
}

export default FlipCardFront;
