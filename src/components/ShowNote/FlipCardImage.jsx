import React, { useEffect, useRef, useState } from "react";
import DemoSlides from "./DemoSlides";
import MainSlides from "./MainSlides";

function FlipCardImage() {
  const [slideIndex, setSlideIndex] = useState(1);
  useEffect(() => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }, [slideIndex]);

  function addSlideIndex() {
    setSlideIndex(slideIndex + 1);
  }
  function subtractSlideIndex() {
    setSlideIndex(slideIndex - 1);
  }

  function changeIndexTo(n) {
    setSlideIndex(n);
  }

  return (
    <div className="container">
      <MainSlides />

      <a className="prev" onClick={subtractSlideIndex}>
        &#10094;
      </a>
      <a className="next" onClick={addSlideIndex}>
        &#10095;
      </a>

      <div className="row">
        <DemoSlides changeIndexTo={changeIndexTo} />
        <DemoSlides changeIndexTo={changeIndexTo} />
      </div>
    </div>
  );
}

export default FlipCardImage;
