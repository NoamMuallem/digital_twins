import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "rgb(24, 199, 70)",
      boxShadow: "0 0 0 0.2rem rgba(24, 199, 70, 0.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects({
  items,
  value,
  onChange,
}) {
  const classes = useStyles();
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <FormControl className={classes.margin}>
      <FormControlLabel
        value="Day"
        control={
          <Select
            style={{ marginLeft: "5px" }}
            labelId="demo-customized-select-label"
            value={value}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {items.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        }
        label="Day"
        labelPlacement="start"
      />
    </FormControl>
  );
}
