import React from "react";

function FlipCardFront() {
  return (
    <div class="flip-card-front">
      <h1>NOTE</h1>
      <div className="flip-card-front__title">
        <div>
          <h2>Title</h2>
          <p>Lorem ipsum dolor</p>
        </div>
        <div>
          <h2>Date</h2>
          <p>quam a sodales viverra</p>
        </div>
      </div>
      <div>
        <h2>Questions/Keywords</h2>
        <p className="indent">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          eleifend sodales justo, id rhoncus metus vehicula vehicula. Morbi
          interdum, quam a sodales viverra, sapien est blandit risus,
        </p>
      </div>
      <div className="flip-card-front__answer">
        <h2>Notes/Answers</h2>
        <p className="indent" tabIndex={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          eleifend sodales justo, id rhoncus metus vehicula vehicula. Morbi
          interdum, quam a sodales viverra, sapien est blandit risus, nec tempus
          neque dolor quis erat. Sed placerat ultrices leo, et facilisis arcu
          interdum eget. Aliquam erat volutpat. Donec luctus fermentum nisl ac
          semper. Integer ut nulla ac nunc elementum laoreet id ac nisi.
        </p>
      </div>
    </div>
  );
}

export default FlipCardFront;
