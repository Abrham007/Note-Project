import React, { useState } from "react";
import InputCard from "./InputNote/InputCard";
import FlipCard from "./ShowNote/FlipCard";

function App() {
  const [isInput, setIsInput] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function showNote(event) {
    setIsLoading(true);
    event.preventDefault();
    fetchNote().then(() => {
      setIsLoading(false);
      setIsInput((prevValue) => !prevValue);
    });
  }

  async function showCustomNote(module_id) {
    setIsLoading(true);
    try {
      let response = await fetch(
        `http://localhost:4000/custom_note/${module_id}`
      );
      response.json().then((notesArray) => {
        console.log(notesArray);
        setNotes(
          notesArray.map((note, index) => (
            <FlipCard
              key={note.id}
              note={note}
              showNote={showNote}
              deleteNote={deleteNote}
            />
          ))
        );
        setIsLoading(false);
        setIsInput((prevValue) => !prevValue);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id) {
    try {
      const response = await fetch(`http://localhost:4000/${id}`, {
        method: "DELETE",
      });
      await fetchNote();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchNote() {
    try {
      let response = await fetch("http://localhost:4000");
      response.json().then((notesArray) => {
        console.log(notesArray);
        setNotes(
          notesArray.map((note, index) => (
            <FlipCard
              key={note.id}
              note={note}
              showNote={showNote}
              deleteNote={deleteNote}
            />
          ))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  return isInput ? (
    <InputCard
      showNote={showNote}
      showCustomNote={showCustomNote}
      isLoading={isLoading}
    />
  ) : (
    notes
  );
}

export default App;
