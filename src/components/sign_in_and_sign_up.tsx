import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import { userBoundery, newUserDetails, Role } from "../interfaces";
import {
    makeStyles,
    Theme,
    createStyles,
} from "@material-ui/core/styles";
import constance from "../constance.json";
//import axios from "axios";
import { signInRequest, signUpRequest } from "../server_api";
import { AxiosResponse } from "axios";

interface ResponsiveDialogProps {
    setUser: (user: userBoundery | null) => void;
    user: userBoundery | null;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            "& svg": {
                margin: theme.spacing(1.5),
            },
            "& hr": {
                margin: theme.spacing(0, 0.5),
            },
        },
        title: {
            width: "100%",
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    })
);

export default function ResponsiveDialog({
    setUser,
    user,
}: ResponsiveDialogProps) {
    //dialog open/ close
    const [open, setOpen] = React.useState(false);
    //sign in detailes
    const [signInEmail, setSignInEmail] = React.useState<string>("");
    //sign up details
    const [signUpEmail, setSignUpEmail] = React.useState<string>("");
    const [
        signUpUserName,
        setSignUpUserName,
    ] = React.useState<string>("");
    const [signUpAvatar, setSignUpAvatar] = React.useState<string>(
        ""
    );
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const matches = useMediaQuery("(min-width:600px)");

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const clearAll = () => {
        setSignUpAvatar("");
        setSignUpUserName("");
        setSignUpEmail("");
        setSignInEmail("");
    };

    React.useEffect(() => {
        setError("");
    }, [signInEmail, signUpEmail, signUpUserName, signUpAvatar]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        clearAll();
        setOpen(false);
    };

    const handleSignIn = () => {
        setLoading(true);
        signInRequest(signInEmail)
            .then((res: AxiosResponse<userBoundery>) => {
                setUser(res.data);
                handleClose();
            })
            .catch((error: Error) => {
                setError(error.name);
            });
        setLoading(false);
    };

    const signUp = (
        signUpEmail: string,
        signUpUserName: string,
        signUpAvatar: string
    ) => {
        const newUser: newUserDetails = {
            email: signUpEmail,
            username: signUpUserName,
            avatar: signUpAvatar,
            role: Role[Role.PLAYER],
        };
        setLoading(true);
        signUpRequest(newUser)
            .then((res: AxiosResponse<userBoundery>) => {
                setUser(res.data);
                handleClose();
            })
            .catch((error: Error) => setError(error.name));
        setLoading(false);
    };

    const signUpComponents = (
        <div
            style={{
                flexBasis: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ...(matches ? { height: "100%" } : { width: "100%" }),
            }}
        >
            <DialogTitle id="responsive-dialog-title">
                {"Sign Up"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill your Email, UserName and Avatar (image
                    url)
                </DialogContentText>
            </DialogContent>
            <span
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <TextField
                    style={{ width: "80%", margin: "auto" }}
                    label="Email"
                    value={signUpEmail}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setSignUpEmail(e.target.value)}
                />
                <TextField
                    style={{ width: "80%", margin: "auto" }}
                    label="username"
                    value={signUpUserName}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setSignUpUserName(e.target.value)}
                />
                <TextField
                    style={{ width: "80%", margin: "auto" }}
                    label="avatar"
                    value={signUpAvatar}
                    onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                    ) => setSignUpAvatar(e.target.value)}
                />
            </span>
            <DialogActions>
                <Button
                    onClick={() => {
                        if (
                            !signUpAvatar ||
                            !signUpUserName ||
                            !signUpEmail
                        ) {
                            setError("Please fill all the fileds");
                            return;
                        }
                        signUp(
                            signUpEmail,
                            signUpUserName,
                            signUpAvatar
                        );
                    }}
                    color="primary"
                    autoFocus
                >
                    Submit
                </Button>
            </DialogActions>
        </div>
    );
    const signInComponents = (
        <div
            style={{
                flexBasis: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                ...(matches ? { height: "100%" } : { width: "100%" }),
            }}
        >
            <MuiDialogTitle
                className={classes.title}
                id="responsive-dialog-title"
            >
                Sign In
            </MuiDialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill your Email
                </DialogContentText>
                <span
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <TextField
                        style={{ width: "80%", margin: "auto" }}
                        label="Email"
                        value={signInEmail}
                        onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                        ) => setSignInEmail(e.target.value)}
                    />
                    {matches && (
                        <div style={{ height: "96px" }}>{}</div>
                    )}
                </span>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        if (!signInEmail) {
                            setError(
                                "Please fill in an Email address"
                            );
                            return;
                        }
                        handleSignIn();
                    }}
                    color="primary"
                    autoFocus
                >
                    Sign In
                </Button>
            </DialogActions>
            {error !== "" && (
                <div
                    style={{
                        color: "red",
                        margin: "auto",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    {error}
                </div>
            )}
        </div>
    );

    return (
        <div style={{ marginLeft: "auto" }}>
            {!user ? (
                <Button onClick={handleClickOpen} color="inherit">
                    Login
                </Button>
            ) : (
                <Button onClick={() => setUser(null)} color="inherit">
                    Logout
                </Button>
            )}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {handleClose ? (
                    <IconButton
                        style={{ marginLeft: "auto" }}
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <div
                    className={classes.root}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        ...(matches
                            ? { flexDirection: "row" }
                            : { flexDirection: "column" }),
                    }}
                >
                    {!matches ? (
                        <>
                            {signInComponents}
                            {matches ? (
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                />
                            ) : (
                                <Divider orientation="horizontal" />
                            )}
                            {signUpComponents}
                        </>
                    ) : (
                        <>
                            {signUpComponents}
                            {matches ? (
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                />
                            ) : (
                                <Divider orientation="horizontal" />
                            )}
                            {signInComponents}
                        </>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
