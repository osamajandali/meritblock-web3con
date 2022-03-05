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
          onChange={(e) =>
            setCourseLogo(URL.createObjectURL(e.target.files[0]))
          }
        />
      </div>
    </div>
  );
}
