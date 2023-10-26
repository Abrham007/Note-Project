import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function InputTitle(props) {
  function handleChange(e, value) {
    const customEvent = {};
    customEvent.target = { name: "title", value: value };
    props.addNote(customEvent);
  }
  return (
    <div className="input-card__title">
      <Select
        onChange={(e, value) => handleChange(e, value)}
        placeholder="Title"
        size="md"
        variant="outlined"
        value={props.noteTitle}
      >
        <Option value="Web Development">Web Development</Option>
        <Option value="Python Development">Python Development</Option>
      </Select>
    </div>
  );
}

export default InputTitle;
