import React from "react";
import classes from "./FileInput.module.css";

export default function FileInput({ name, title, id, onChange, value, error }) {
  return (
    <div className={classes.fileWrapper}>
      <label htmlFor={name} className={classes.label}>
        {title}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      />
      {error ? <label className={classes.errorLabel}>{error}</label> : null}
    </div>
  );
}
