import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(24, 199, 70)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(24, 199, 70)",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(24, 199, 70)",
      },
    },
  },
})(TextField);

const CustomizedInputs = (props) => {
  console.log(props)
  return (
    <CssTextField
      style={{ ...props.style, color: "white" }}
      value={props.value}
      onChange={props.onChange}
      label={props.label}
      inputProps={props.inputProps && { ...props.inputProps }}
    />
  );
};

export default CustomizedInputs;
