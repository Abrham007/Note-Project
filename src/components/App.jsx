import React, { useState } from "react";
import InputCard from "./InputNote/InputCard";
import FlipCard from "./ShowNote/FlipCard";

function App() {
  const [isInput, setIsInput] = useState(true);
  const [notes, setNotes] = useState([]);
  const [url, setUrl] = useState();

  async function showNote(event) {
    event.preventDefault();
    fetchNote().then(() => {
      setIsInput((prevValue) => !prevValue);
    });
  }

  async function fetchNote() {
    try {
      let response = await fetch("http://localhost:4000");
      response.json().then((notesArray) => {
        console.log(notesArray);
        setNotes(notesArray);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return isInput ? (
    <InputCard showNote={showNote} />
  ) : (
    notes.map((note, index) => (
      <FlipCard key={note.id} note={note} showNote={showNote} />
    ))
  );
}

export default App;
