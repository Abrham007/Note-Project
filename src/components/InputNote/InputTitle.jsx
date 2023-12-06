import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function InputTitle(props) {
  return (
    <div className="input-card__title-box">
      <div className="input-card__title">
        <Select
          {...props.register("title", { required: true })}
          placeholder="Title"
          size="md"
          variant="outlined"
        >
          <Option value="Web Development">Web Development</Option>
          <Option value="Python Development">Python Development</Option>
        </Select>
      </div>

      <div className="input-card__module">
        <Select
          {...props.register("module", { required: true })}
          placeholder="Module"
          size="md"
          variant="outlined"
        >
          <Option value="CSS">CSS</Option>
          <Option value="JavaScript">JavaScript</Option>
        </Select>
      </div>

      <div className="input-card__ref">
        <Select
          {...props.register("referance", { required: true })}
          placeholder="Ref"
          size="md"
          variant="outlined"
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
        </Select>
      </div>
    </div>
  );
}

export default InputTitle;
