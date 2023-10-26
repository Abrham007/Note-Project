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
          onChange={(event) => props.addFiles(event)}
          style={{ display: "none" }}
          type="file"
          id="image"
          name="images"
          accept=".jpg, .jpeg, .png"
          multiple
          value={props.noteImages}
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
          onChange={(event) => props.addFiles(event)}
          style={{ display: "none" }}
          type="file"
          id="audio"
          name="audio"
          accept=".mp4, .mp3, .mpeg,.m4a"
          capture="user"
          multiple
          value={props.noteAudio}
        />
      </Button>
    </div>
  );
}

export default InputMedia;
