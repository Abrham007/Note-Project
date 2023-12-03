import React from "react";

function MainSlides(props) {
  return (
    <div className="mySlides">
      <div className="numbertext">1 / 6</div>
      <img className="main-slides__img" src={props.image} alt=""></img>
    </div>
  );
}

export default MainSlides;
