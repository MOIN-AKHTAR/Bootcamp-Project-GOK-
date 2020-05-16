import React from "react";
import Classes from "./DropDown.module.css";

export default function DropDown({ Arr, title, id, name, onChange, value }) {
  let dropDown = null;
  dropDown = Arr.map((element, index) => (
    <option value={element.value} key={index}>
      {element.title}
    </option>
  ));
  return (
    <div className={Classes.dropDownWrapper}>
      <label htmlFor={title} className={Classes.label}>
        {title}
      </label>
      <select
        name={name}
        id={id}
        className={Classes.dropDown}
        value={value}
        onChange={onChange}
      >
        {dropDown}
      </select>
    </div>
  );
}
