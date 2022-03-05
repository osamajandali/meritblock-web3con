import { BlockPicker } from "react-color";
import { Input } from "@nextui-org/react";

// Styles
import styles from "../styles/components/Edits.module.css";
import { useState } from "react";

const colors: string[] = [
  "#EB1422",
  "#F39721",
  "#D9E3F0",
  "#555555",
  "#7381ff",
  "#ff3860",
  "#FFCC33",
  "#D6FF7",
];

type Props = {
  certificateColor: string;
  setCertificateColor: Function;
  courseName: string;
  setCourseName: Function;
  setCourseLogo: Function;
};

const getBase64 = (file: File) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL: any = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      baseURL = reader.result;
      console.log(baseURL);
      resolve(baseURL);
    };
    console.log(fileInfo);
  });
};

export default function Edits({
  certificateColor,
  setCertificateColor,
  courseName,
  setCourseName,
  setCourseLogo,
}: Props) {
  const handleChangeComplete = (color: any) => {
    setCertificateColor(color.hex);
  };
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  const handleFileInputChange = (e: any) => {
    console.log(e.target.files[0]);

    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        setCourseLogo(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h4 className="main-title">Edit Certificate</h4>
      <div className={styles.pickerWrapper}>
        <p>Set template color:</p>
        <button onClick={() => setIsPickerOpen((old) => !old)}>
          <span style={{ backgroundColor: certificateColor }}></span>
        </button>
        {isPickerOpen && (
          <BlockPicker
            className={styles.picker}
            color={certificateColor}
            onChangeComplete={handleChangeComplete}
            colors={colors}
            triangle="hide"
          />
        )}
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input
          id="Course Name"
          aria-label="Course Name"
          placeholder="Course Name"
          fullWidth
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>

      <div>
        <p>Upload course logo:</p>
        <input
          aria-label="Course Logo"
          type="file"
          onChange={(e) => handleFileInputChange(e)}
        />
      </div>
    </div>
  );
}
