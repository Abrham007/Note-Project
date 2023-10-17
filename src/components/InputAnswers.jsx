import React from "react";
import Textarea from "@mui/joy/Textarea";

function InputAnswer() {
  return (
    <div className="input-card__answer">
      <Textarea
        color="neutral"
        minRows={4}
        variant="outlined"
        placeholder="Notes/Answers"
        classes="text"
      />
    </div>
  );
}

export default InputAnswer;
