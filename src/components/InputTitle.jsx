import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function InputTitle() {
  return (
    <div className="input-card__title">
      <Select placeholder="Title" size="md" variant="outlined">
        <Option value="Web Development">Web Development</Option>
        <Option value="Python Development">Python Development</Option>
      </Select>
    </div>
  );
}

export default InputTitle;
