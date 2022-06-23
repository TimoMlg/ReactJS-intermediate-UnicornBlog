import React from "react";
import Button from "@mui/material/Button";

const Upload = (props) => {
  return (
    <form className="form-section">
    <div className="title-div">
      <h3>Title</h3>
      <input
        value={props.title}
        onChange={props.handleTitle}
        type="text"
        name="title"
      />
      </div>
        <div className="body-div">
        <h3>Content</h3>
        <input
          value={props.body}
          onChange={props.handleBody}
          type="textarea"
          name="body"
          className="textArea" />
        </div>
        <Button onClick={props.handleNewPost} variant="contained">
        Post
      </Button>
    </form>
  );
};

export default Upload;
