import React, { useEffect, useState, useRef } from "react";
import DemoSlides from "./DemoSlides";
import MainSlides from "./MainSlides";

function FlipCardImage(props) {
  const [slideIndex, setSlideIndex] = useState(1);
  const demoRows = useRef(null);
  const autoFunc = useRef(null);

  useEffect(() => {
    if (slideIndex % 5 === 0) {
      demoRows.current.scrollBy(350, 0);
    }

    if (slideIndex === 1) {
      demoRows.current.scrollTo(0, 0);
    }
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

  const imgLength = props.images.length;
  const interval = props.duration / imgLength;

  useEffect(() => {
    if (props.isAuto) {
      autoFunc.current = setInterval(() => {
        setSlideIndex((preValue) => {
          if (preValue !== imgLength) {
            return preValue + 1;
          } else {
            return 1;
          }
        });
      }, interval * 1000);
    } else {
      clearInterval(autoFunc.current);
      autoFunc.current = null;
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
          slideIndex={slideIndex}
        />
      ))}

      <a className="prev" onClick={subtractSlideIndex} href="#">
        &#10094;
      </a>
      <a className="next" onClick={addSlideIndex} href="#">
        &#10095;
      </a>

      <div className="row" ref={demoRows}>
        {props.images.map((image, index) => (
          <DemoSlides
            changeIndexTo={changeIndexTo}
            image={image}
            index={index}
            key={index}
            slideIndex={slideIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default FlipCardImage;
