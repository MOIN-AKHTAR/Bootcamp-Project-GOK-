import React from "react";
import Classes from "../DropDown/DropDown.module.css";
export default function YearDropDown({
  onChangeHandler,
  value,
  name,
  id,
  title,
}) {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(25), (val, index) => year - index);
  return (
    <div className={Classes.dropDownWrapper}>
      <label htmlFor={id} className={Classes.label}>
        {title}
      </label>
      <select
        value={value}
        onChange={onChangeHandler}
        className={Classes.dropDown}
        name={name}
      >
        {years.map((year, index) => {
          return (
            <option key={index} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
