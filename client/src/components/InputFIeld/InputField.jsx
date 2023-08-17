// InputField.js
import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ label, id, name, value, onChange, error, type }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}:
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default InputField;
