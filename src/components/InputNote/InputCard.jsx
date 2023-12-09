import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputTitle from "./InputTitle";
import InputQuestion from "./InputQuestion";
import InputMedia from "./InputMedia";
import InputAnswer from "./InputAnswers";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from "@mui/icons-material/Preview";
import ShowModule from "../ShowModule";

function InputCard(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmited, setIsSubmited] = useState(false);
  const [sectionList, setSectionList] = useState();
  const [moduleList, setModuleList] = useState();
  const [moduleReady, setModuleReady] = useState(false);

  async function onSubmit(data) {
    const formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      if (key === "image") {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else if (key === "audio") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await fetch("http://localhost:4000", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmited(true);
    }
  }

  async function fetchSection() {
    try {
      const response = await fetch("http://localhost:4000/section");
      const section = await response.json();

      setSectionList(section);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchModule() {
    try {
      const response = await fetch("http://localhost:4000/module");
      const modules = await response.json();

      setModuleList(modules);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSubmited) {
      reset();
    }
  }, [isSubmited]);

  if (!moduleReady) {
    fetchSection();
    fetchModule().then(() => {
      setModuleReady(true);
    });
  }

  return (
    <form
      className="input-card"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {moduleReady && (
        <ShowModule
          moduleList={moduleList}
          sectionList={sectionList}
          showCustomNote={props.showCustomNote}
        />
      )}
      <h1>Notes</h1>

      <InputTitle
        register={register}
        moduleList={moduleList}
        sectionList={sectionList}
      />
      <InputQuestion register={register} />
      <InputMedia register={register} />
      <InputAnswer register={register} />

      <div className="input-card__btn-group btn-group">
        <button type="submit" className="btn">
          <SaveIcon></SaveIcon>
        </button>
        <button
          className="btn"
          style={props.isLoading ? { border: "none", outline: "none" } : {}}
          onClick={(event) => props.showNote(event)}
        >
          <div
            className="loader"
            style={{
              display: props.isLoading ? "block" : "none",
            }}
          ></div>
          <PreviewIcon></PreviewIcon>
        </button>
      </div>
    </form>
  );
}

export default InputCard;
