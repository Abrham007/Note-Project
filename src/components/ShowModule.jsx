import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SaveIcon from "@mui/icons-material/Save";

function ShowModule(props) {
  const [isExtended, setIsExtended] = useState(false);
  const [module, setModule] = useState();
  const [sectionId, setSectionId] = useState(1);
  const [currentModuleList, setCurrentModuleList] = useState(
    props.moduleList.filter((module) => module.section_id == sectionId)
  );
  const newModule = useRef(null);

  function handelExtending() {
    setIsExtended((prevValue) => !prevValue);
  }

  function chooseSection(event) {
    const s = event.currentTarget.value;
    setSectionId(s);
  }

  async function handleSubmit() {
    const data = { newModule: newModule.current.value, sectionId: sectionId };
    const response = await fetch("http://localhost:4000/module", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    newModule.current.value = "";
  }

  useEffect(() => {
    setModule(
      currentModuleList.map((item, index) => (
        <button
          className="module-btn"
          key={index}
          onClick={() => {
            props.showCustomNote(item.id);
          }}
        >
          {item.module}
        </button>
      ))
    );
  }, [sectionId]);
  return (
    <div
      className="module-box"
      style={isExtended ? { right: "-185px" } : { right: "0px" }}
    >
      <div className="module-section">
        <select
          className="module-input"
          defaultValue={1}
          onChange={chooseSection}
        >
          {props.sectionList.map((section, index) => (
            <option value={section.id} key={index}>
              {section.title}
            </option>
          ))}
        </select>
      </div>
      <div className="module-list">
        {module}
        <div className="module-form">
          <input className="module-text" type="text" ref={newModule}></input>
          <button className="btn modulesave-btn" onClick={handleSubmit}>
            <SaveIcon></SaveIcon>
          </button>
        </div>
      </div>

      <button className="btn moduleon-btn" onClick={handelExtending}>
        {isExtended ? (
          <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
        ) : (
          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
        )}
      </button>
    </div>
  );
}

export default ShowModule;
