import React from "react";
import Classes from "./Input.module.css";

export default function Input({
  id,
  name,
  type = "text",
  title,
  placeholder,
  error,
  value = "",
  onChange,
  valid,
  touched,
}) {
  const inputClasses = [Classes.input];
  if (!valid && touched) {
    inputClasses.push(Classes.invalidInput);
  }
  return (
    <React.Fragment>
      <div className={Classes.wrapper}>
        <label className={Classes.label} htmlFor={id}>
          {title}
        </label>
        <input
          onChange={onChange}
          value={value}
          className={inputClasses.join(" ")}
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
        />
        {error ? <label className={Classes.errorLabel}>{error}</label> : null}
      </div>
    </React.Fragment>
  );
}
