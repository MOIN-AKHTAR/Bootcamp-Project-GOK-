import React from "react";
import Classes from "./Button.module.css";

export default function Button(props) {
  return (
    <div>
      <button className={Classes.btn} disabled={!props.isValid}>
        {props.title}
      </button>
    </div>
  );
}
