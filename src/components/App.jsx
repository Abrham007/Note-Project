import React, { useState } from "react";
import InputCard from "./InputNote/InputCard";
import FlipCard from "./ShowNote/FlipCard";

function App() {
  const [isInput, setIsInput] = useState(true);

  function showNote(event) {
    setIsInput((prevValue) => !prevValue);
    event.preventDefault();
  }

  return isInput ? (
    <InputCard showNote={showNote} />
  ) : (
    <FlipCard showNote={showNote} />
  );
}

export default App;
