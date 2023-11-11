import React, { useState } from "react";
import InputCard from "./InputNote/InputCard";
import FlipCard from "./ShowNote/FlipCard";

function App() {
  const [isInput, setIsInput] = useState(true);
  const [notes, setNotes] = useState([]);

  function showNote(event) {
    setIsInput((prevValue) => !prevValue);
    event.preventDefault();
    fetchNote();
  }

  async function fetchNote() {
    try {
      let response = await fetch("http://localhost:4000");
      let notesArray = await response.json();
      setNotes(notesArray);
    } catch (error) {
      console.log(error);
    }
  }

  return isInput ? (
    <InputCard showNote={showNote} />
  ) : (
    notes.map((note) => <FlipCard note={note} showNote={showNote} />)
  );
}

export default App;
