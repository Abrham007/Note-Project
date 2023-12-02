import React from "react";

function MainSlides(props) {
  let imgArray = new Uint8Array(props.image);
  let imgBlob = new Blob([props.image.buffer], { type: "image/png" });
  const image = URL.createObjectURL(imgBlob);
  return (
    <div className="mySlides">
      <div className="numbertext">1 / 6</div>
      <img className="main-slides__img" src={image} alt=""></img>
    </div>
  );
}

export default MainSlides;
