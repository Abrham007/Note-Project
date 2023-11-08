import React from "react";
import Textarea from "@mui/joy/Textarea";

function InputQuestion(props) {
  return (
    <div className="input-card__question">
      <Textarea
        {...props.register("question", { required: true })}
        color="neutral"
        minRows={2}
        variant="outlined"
        placeholder="Question/Keywords"
        name="question"
      />
    </div>
  );
}

export default InputQuestion;
