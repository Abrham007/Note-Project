import React from "react";

function DemoSlides(props) {
  return (
    <div>
      <div className="column">
        <img
          className="demo cursor"
          src={props.image}
          alt="The Woods"
          onClick={() => props.changeIndexTo(props.index + 1)}
          height={80}
          width={80}
        ></img>
      </div>
    </div>
  );
}

export default DemoSlides;
