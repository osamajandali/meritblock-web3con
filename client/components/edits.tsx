import { BlockPicker } from "react-color";
import { Input } from "@nextui-org/react";

// Styles
import styles from "../styles/components/Edits.module.css";

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
};

export default function Edits({
  certificateColor,
  setCertificateColor,
  courseName,
  setCourseName,
}: Props) {
  const handleChangeComplete = (color: any) => {
    setCertificateColor(color.hex);
  };
  return (
    <div className={styles.wrapper}>
      <h4 className="main-title">Edit Certificate</h4>
      <BlockPicker
        color={certificateColor}
        onChangeComplete={handleChangeComplete}
        colors={colors}
      />
      <div>
        <Input
          aria-label="Course Name"
          placeholder="Course Name"
          fullWidth
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
    </div>
  );
}
