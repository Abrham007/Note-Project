import React from "react";

function DemoSlides(props) {
  return (
    <div>
      <div className="column">
        <img
          className="demo cursor"
          src="https://picsum.photos/100/100"
          alt="The Woods"
          onClick={() => props.changeIndexTo(1)}
        ></img>
      </div>
    </div>
  );
}

export default DemoSlides;
