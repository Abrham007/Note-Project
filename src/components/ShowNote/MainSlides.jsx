import React from "react";

function MainSlides(props) {
  return (
    <div className="mySlides">
      <div className="numbertext">
        {props.index + 1} / {props.imageList.length}
      </div>
      <img className="main-slides__img" src={props.image} alt=""></img>
    </div>
  );
}

export default MainSlides;
