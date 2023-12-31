import React from "react";
import Button from "@mui/joy/Button";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import AudioFileOutlinedIcon from "@mui/icons-material/AudioFileOutlined";

function InputMedia(props) {
  return (
    <div className="input-card__media">
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="soft"
        color="neutral"
        startDecorator={<PhotoLibraryOutlinedIcon />}
      >
        Upload Image
        <input
          {...props.register("image", { required: true })}
          style={{ display: "none" }}
          type="file"
          id="image"
          name="image"
          accept=".jpg, .jpeg, .png"
          multiple
        />
      </Button>

      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="soft"
        color="neutral"
        startDecorator={<AudioFileOutlinedIcon />}
      >
        Upload Audio
        <input
          {...props.register("audio", { required: true })}
          style={{ display: "none" }}
          type="file"
          id="audio"
          name="audio"
          accept=".mp4, .mp3, .mpeg,.m4a"
          capture="user"
        />
      </Button>
    </div>
  );
}

export default InputMedia;
