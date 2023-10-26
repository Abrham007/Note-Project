import React from "react";
import Textarea from "@mui/joy/Textarea";

function InputAnswer(props) {
  return (
    <div className="input-card__answer">
      <Textarea
        onChange={(event) => props.addNote(event)}
        color="neutral"
        minRows={4}
        variant="outlined"
        placeholder="Notes/Answers"
        name="answer"
        value={props.noteAnswer}
      />
    </div>
  );
}

export default InputAnswer;
