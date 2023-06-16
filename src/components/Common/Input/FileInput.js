import { useState } from "react";
import "./style.css";

const FileInput = ({ accept, id, fileHandleFnc, text }) => {

    const [fileSelected, setFileSelected] = useState("");

  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name)
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <div>
      <label className="custom-input" htmlFor={id}>
        {fileSelected ? `File selected is ${fileSelected}` : text}
      </label>
      <input
        onChange={onChange} 
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
      />
    </div>
  );
};
export default FileInput;
