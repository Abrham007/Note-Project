import React, { useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function InputTitle(props) {
  return (
    <div className="input-card__title-box">
      <div className="input-card__title">
        <Select
          {...props.register("sectionId", { required: true })}
          placeholder="Title"
          size="md"
          variant="outlined"
        >
          {props.sectionList &&
            props.sectionList.map((section, index) => (
              <Option value={section.id} key={index}>
                {section.title}
              </Option>
            ))}
        </Select>
      </div>

      <div className="input-card__module">
        <Select
          {...props.register("moduleId", { required: true })}
          placeholder="Module"
          size="md"
          variant="outlined"
        >
          {props.moduleList &&
            props.moduleList.map((item, index) => (
              <Option value={item.module} key={index}>
                {item.module}
              </Option>
            ))}
        </Select>
      </div>
    </div>
  );
}

export default InputTitle;
