import React, { useState } from "react";

import InputTitle from "./InputTitle";
import InputQuestion from "./InputQuestion";
import InputMedia from "./InputMedia";
import InputAnswer from "./InputAnswers";

function InputCard(props) {
  const [newNote, setNewNote] = useState({
    title: "",
    question: "",
    images: null,
    audio: null,
    answer: "",
  });

  function addNote(event) {
    const { name, value } = event.target;
    setNewNote((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function addFiles(event) {
    const { name, files } = event.target;
    setNewNote((prevValue) => ({ ...prevValue, [name]: files }));
  }

  function createFormData() {
    const formData = new FormData();
    for (const [key, value] of Object.entries(newNote)) {
      if (key === "images") {
        [...value].forEach((image) => {
          formData.append("images", image);
        });
      } else if (key === "audio") {
        [...value].forEach((audio) => {
          formData.append("audio", audio);
        });
      } else {
        formData.append(key, value);
      }
    }
    return formData;
  }

  async function sendFormData(formData) {
    try {
      const response = await fetch("https://localhost:4000", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function submitNote(event) {
    event.preventDefault();
    let formData = createFormData();
    sendFormData(formData);
    setNewNote({
      title: "",
      question: "",
      images: null,
      audio: null,
      answer: "",
    });
  }
  return (
    <form onSubmit={(event) => submitNote(event)} enctype="multipart/form-data">
      <div className="input-card">
        <h1>Notes</h1>

        <InputTitle addNote={addNote} noteTitle={newNote.title} />
        <InputQuestion addNote={addNote} noteQuestion={newNote.question} />
        <InputMedia
          addFiles={addFiles}
          noteImages={newNote.images}
          noteAudio={newNote.audio}
        />
        <InputAnswer addNote={addNote} noteAnswer={newNote.answer} />

        <div className="input-card__btn-group">
          <button type="submit" className="btn">
            Submit
          </button>
          <button
            type="button"
            className="btn"
            onClick={(event) => props.showNote(event)}
          >
            Show
          </button>
        </div>
      </div>
    </form>
  );
}

export default InputCard;
