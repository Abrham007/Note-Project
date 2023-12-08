import React, { useState } from "react";

function ShowModule(props) {
  const [moduleList, setModuleList] = useState();

  setModuleList(props.moduleList.map((module) => {}));
  return <div></div>;
}

export default ShowModule;
