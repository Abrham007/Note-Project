import React from "react";

import InputTitle from "./InputTitle";
import InputQuestion from "./InputQuestion";
import InputMedia from "./InputMedia";
import InputAnswer from "./InputAnswers";

function InputCard(props) {
  return (
    <form action="#" method="post" enctype="multipart/form-data">
      <div className="input-card">
        <h1>Notes</h1>

        <InputTitle />
        <InputQuestion />
        <InputMedia />
        <InputAnswer />

        <div className="btn-group input-card__btn-group">
          <button type="submit" className="btn">
            Submit
          </button>
          <button
            type="button"
            className="btn"
            onClick={(event) => props.showNote(event)}
          >
            Show
          </button>
        </div>
      </div>
    </form>
  );
}

export default InputCard;
