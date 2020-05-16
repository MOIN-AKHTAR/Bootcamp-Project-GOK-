import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import Classes from "./Model.module.css";

export default function Model(props) {
  return (
    <div>
      <BackDrop />
      <div
        className={Classes.Model}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-200vh)",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
