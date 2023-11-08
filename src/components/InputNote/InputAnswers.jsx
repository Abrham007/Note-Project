import React from "react";
import Textarea from "@mui/joy/Textarea";

function InputAnswer(props) {
  return (
    <div className="input-card__answer">
      <Textarea
        {...props.register("answer", { required: true })}
        color="neutral"
        minRows={4}
        variant="outlined"
        placeholder="Notes/Answers"
        name="answer"
      />
    </div>
  );
}

export default InputAnswer;
