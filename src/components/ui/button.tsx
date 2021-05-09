import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ColorButton = withStyles((theme) => ({
    root: {
        background: "rgba(24, 199, 70, 0.37)",
        boxShadow: " 0 4px 8px 0 rgba( 24, 199, 70, 0.37 )",
        backdropFilter: " blur( 2.0px )",
        borderRadius: " 4px",
        border: " 1px solid rgba( 255, 255, 255, 0.18 )",
        color: "black",
        //backgroundColor: "#01c5c4",
        "&:hover": {
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(3px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "black",
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

interface buttonProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    style?: { [key: string]: string | Number };
    text: string;
}

export default function CustomizedButtons({
    onClick,
    style,
    text,
}: buttonProps) {
    const classes = useStyles();

    return (
        <ColorButton
            style={{
                fontSize: `0.9rem`,
                paddingTop: "0px",
                paddingBottom: "0px",
                ...style,
            }}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                onClick(e);
            }}
            variant="contained"
            color="primary"
            className={classes.margin}
        >
            {text}
        </ColorButton>
    );
}
