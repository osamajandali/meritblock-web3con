import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Show, Delete } from "react-iconly";

// Styles
import styles from "../styles/components/Students.module.css";

type StudentData = {
  id: string;
  name: string;
  address: string;
  date: string;
};

type InputRowProps = {
  student: StudentData;
  setStudentsData: Function;
  setPreview: Function;
};
const generateID = () => Math.random().toString(36).slice(2, 9);

const InputsRow = ({ student, setStudentsData, setPreview }: InputRowProps) => {
  function onChangeChatType(value: string, property: string) {
    setStudentsData((oldStudentData: StudentData[]) => {
      let prevStudentData: any = [...oldStudentData];
      const index = prevStudentData.findIndex(
        (element: StudentData) => element.id === student.id
      );
      prevStudentData[index][property] = value;
      return prevStudentData;
    });
  }
  return (
    <div className={styles.inputsWrapper}>
      <div className={styles.inputWrapper}>
        <Input
          aria-label="Full Name"
          placeholder="Full Name"
          fullWidth
          value={student.name}
          onChange={(e) => onChangeChatType(e.target.value, "name")}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          aria-label="Wallet Address"
          placeholder="Wallet Address"
          fullWidth
          value={student.address}
          onChange={(e) => onChangeChatType(e.target.value, "address")}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          aria-label="Completion Date"
          placeholder="Completion Date"
          type="date"
          fullWidth
          value={student.date}
          onChange={(e) => onChangeChatType(e.target.value, "date")}
        />
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          onClick={() => setPreview(student)}
          auto
          light
          color="primary"
          icon={<Show set="bold" />}
        />
        <Button auto light color="error" icon={<Delete set="bold" />} />
        <Button auto color="gradient">
          Mint
        </Button>
      </div>
    </div>
  );
};

type Props = {
  setPreview: Function;
};
export default function Students({ setPreview }: Props) {
  const [studentsData, setStudentsData] = useState<StudentData[]>([]);
  const addStudent = () => {
    setStudentsData((oldData: StudentData[]) => [
      ...oldData,
      {
        id: generateID(),
        name: "",
        address: "",
        date: "",
      },
    ]);
  };
  return (
    <div className={styles.wrapper}>
      <h4 className="main-title">Students Data</h4>
      <ul>
        {studentsData.map((student) => (
          <li key={student.id}>
            <InputsRow
              student={student}
              setStudentsData={setStudentsData}
              setPreview={setPreview}
            />
          </li>
        ))}
      </ul>
      <Button onClick={addStudent} auto bordered>
        Add student
      </Button>
    </div>
  );
}
