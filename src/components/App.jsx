import React, { useState } from "react";
import InputCard from "./InputCard";
import FlipCard from "./FlipCard";

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
