import React from "react";
import Textarea from "@mui/joy/Textarea";

function InputQuestion() {
  return (
    <div className="input-card__question">
      <Textarea
        color="neutral"
        minRows={2}
        variant="outlined"
        placeholder="Question/Keywords"
      />
    </div>
  );
}

export default InputQuestion;
