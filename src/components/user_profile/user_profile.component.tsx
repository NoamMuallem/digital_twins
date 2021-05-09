import React, { ReactElement } from "react";
import { userBoundery } from "../../interfaces";
import useFormInput from "../../hooks/form_input.hook";
import TextField from "../ui/textFiled.jsx";
import { updateUserProfile } from "../../server_api";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import classes from "./user_profile.style.module.scss";
import Button from "../ui/button";

export interface UserProfileProps {
    user: userBoundery | null;
    setUser: (user: userBoundery) => void;
}

export default function UserProfile({
    user,
    setUser,
}: UserProfileProps): ReactElement | null {
    const space = useFormInput(user?.userId.space || "", "space");
    const email = useFormInput(user?.userId.email || "", "Email");
    const [role, setRole] = React.useState<
        "PLAYER" | "MANAGER" | "ADMIN"
    >(user?.role || "PLAYER");
    const username = useFormInput(user?.username || "", "Username");
    const avatar = useFormInput(user?.avatar || "", "Avatar");
    const [hasChanged, setHasChanged] = React.useState<boolean>(
        false
    );
    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user) {
            if (
                space.value !== user.userId.space ||
                email.value !== user.userId.email ||
                role !== user.role ||
                username.value !== user.username ||
                avatar.value !== user.avatar
            ) {
                setHasChanged(true);
            }
        }
    }, [
        user,
        space.value,
        role,
        email.value,
        username.value,
        avatar.value,
    ]);

    const updateUser = () => {
        if (user) {
            setLoading(true);
            const newUserProfile: userBoundery = {
                userId: {
                    space: space.value.toString(),
                    email: email.value.toString(),
                },
                role: role,
                username: username.value.toString(),
                avatar: avatar.value.toString(),
            };
            updateUserProfile(user.userId.email, newUserProfile)
                .then(() => {
                    setUser(newUserProfile);
                    setHasChanged(false);
                })
                .catch((e: Error) => {
                    setError(e.name);
                    console.log(e.name);
                });
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className={classes.Form}>
            <h2>Change user Profile</h2>
            <TextField
                {...space}
                style={{ width: "100%", maxWidth: "400px" }}
            />
            <TextField
                {...email}
                style={{ width: "100%", maxWidth: "400px" }}
            />
            <FormControl style={{ width: "100%", maxWidth: "400px" }}>
                <InputLabel id="demo-simple-select-label">
                    Role
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    type="text"
                    id="demo-simple-select"
                    value={role}
                    onChange={(event: any) => {
                        setRole(event.target.value);
                    }}
                >
                    <MenuItem value={"PLAYER"}>Player</MenuItem>
                    <MenuItem value={"MANAGER"}>Manager</MenuItem>
                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                </Select>
            </FormControl>
            <TextField
                {...username}
                style={{ width: "100%", maxWidth: "400px" }}
            />
            <TextField
                {...avatar}
                style={{ width: "100%", maxWidth: "400px" }}
            />
            {error !== "" && <p>{error}</p>}
            {hasChanged && (
                <Button
                    onClick={() => {
                        updateUser();
                    }}
                    text="Save changes"
                />
            )}
        </div>
    );
}
