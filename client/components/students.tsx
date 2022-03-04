import React from "react";
import { Input } from "@nextui-org/react";

// Styles
import styles from "../styles/components/Students.module.css";

const InputsRow = () => {
  return (
    <div className={styles.inputsWrapper}>
      <div className={styles.inputWrapper}>
        <Input placeholder="Full Name" fullWidth />
      </div>
      <div className={styles.inputWrapper}>
        <Input placeholder="Wallet Address" fullWidth />
      </div>
      <div>
        <Input type="date" fullWidth />
      </div>
    </div>
  );
};

export default function Students() {
  return (
    <div className={styles.wrapper}>
      <h4 className="main-title">Students Data</h4>
      <ul>
        <li>
          <InputsRow />
        </li>
      </ul>
    </div>
  );
}
