import React, { useEffect, useState } from "react";
import DemoSlides from "./DemoSlides";
import MainSlides from "./MainSlides";

function FlipCardImage(props) {
  const [slideIndex, setSlideIndex] = useState(1);
  const [autoFuncState, setAutoFuncState] = useState();
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
    if (slideIndex === props.images.length) {
      setSlideIndex(1);
    }
  }
  function subtractSlideIndex() {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(props.images.length);
    }
  }

  function changeIndexTo(n) {
    setSlideIndex(n);
  }

  let autoFunc;
  useEffect(() => {
    if (props.isAuto) {
      let interval = props.duration / props.images.length;

      autoFunc = setInterval(() => {
        setSlideIndex((preValue) => {
          if (preValue !== props.images.length) {
            return preValue + 1;
          } else {
            return 1;
          }
        });
      }, interval * 1000);
      setAutoFuncState(autoFunc);
    } else {
      clearInterval(autoFuncState);
      setAutoFuncState();
      autoFunc = null;
    }
  }, [props.isAuto]);

  return (
    <div className="container">
      {props.images.map((image, index, imageList) => (
        <MainSlides
          image={image}
          index={index}
          imageList={imageList}
          key={index}
        />
      ))}

      <a className="prev" onClick={subtractSlideIndex} href="#">
        &#10094;
      </a>
      <a className="next" onClick={addSlideIndex} href="#">
        &#10095;
      </a>

      <div className="row">
        {props.images.map((image, index) => (
          <DemoSlides
            changeIndexTo={changeIndexTo}
            image={image}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default FlipCardImage;
