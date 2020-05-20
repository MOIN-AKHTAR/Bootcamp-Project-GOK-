import React from "react";
import Classes from "./Model.module.css";
import BackDrop from "../BackDrop/BackDrop";

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
