import React from "react";

import Classes from "./Spinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && Classes.loading_spinner__overlay}`}>
      <div className={Classes.lds_dual_ring}></div>
    </div>
  );
};

export default LoadingSpinner;
