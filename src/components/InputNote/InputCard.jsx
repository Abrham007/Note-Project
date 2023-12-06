import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputTitle from "./InputTitle";
import InputQuestion from "./InputQuestion";
import InputMedia from "./InputMedia";
import InputAnswer from "./InputAnswers";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from "@mui/icons-material/Preview";

function InputCard(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmited, setIsSubmited] = useState(false);

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

  useEffect(() => {
    if (isSubmited) {
      reset();
    }
  }, [isSubmited]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className="input-card">
        <h1>Notes</h1>

        <InputTitle register={register} />
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
      </div>
    </form>
  );
}

export default InputCard;
