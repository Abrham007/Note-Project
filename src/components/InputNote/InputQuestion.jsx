import React from "react";
import Textarea from "@mui/joy/Textarea";

function InputQuestion(props) {
  return (
    <div className="input-card__question">
      <Textarea
        onChange={(event) => props.addNote(event)}
        color="neutral"
        minRows={2}
        variant="outlined"
        placeholder="Question/Keywords"
        name="question"
        value={props.noteQuestion}
      />
    </div>
  );
}

export default InputQuestion;
