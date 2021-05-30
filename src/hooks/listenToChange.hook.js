import React from "react";

const useValueChangeListener = (ov, cv, changeCB, sameCB) => {
  React.useEffect(() => {
    if (ov) {
      //if there is an original value:
      if (ov === cv) {
        sameCB();
      } else {
        changeCB();
      }
    } else if (cv) {
      changeCB();
    } else {
      sameCB();
    }
  }, [ov, cv, changeCB, sameCB]);
};

export default useValueChangeListener;
