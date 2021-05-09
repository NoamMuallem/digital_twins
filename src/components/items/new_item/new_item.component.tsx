import React, { ReactElement } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import classes from "./new_item.style.module.scss";
import { ItemBoundary, userBoundery } from "../../../interfaces";
import useFormInput from "../../../hooks/form_input.hook";
import TextField from "../../ui/textFiled";
import Checkbox from "@material-ui/core/Checkbox";
import { addItem } from "../../../server_api";
import { AxiosResponse } from "axios";
import Button from "../../ui/button";

export interface NewItemProps {
    user: userBoundery;
    addItemToState: (item: ItemBoundary) => void;
}

export default function NewItem({
    user,
    addItemToState,
}: NewItemProps): ReactElement {
    const [showForm, setShowForm] = React.useState<boolean>(false);
    const type = useFormInput("", "Type");
    const name = useFormInput("", "Name");
    const [active, setActive] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const [long, setLong] = React.useState<number>(0);
    const [lat, setLat] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [
        locationLoading,
        setLocationLoading,
    ] = React.useState<boolean>(false);

    const handleSubmit = () => {
        const newItem: ItemBoundary = {
            type: type.value.toString(),
            name: name.value.toString(),
            active,
            ...(long && lat && { location: { lat: lat, lng: long } }),
            itemAttributes: {
                key1: "test",
            },
        };
        setLoading(true);
        addItem(newItem, user.userId.email)
            .then((res: AxiosResponse<ItemBoundary>) => {
                addItemToState(res.data);
                clearFildes();
                setShowForm(false);
            })
            .catch((e: Error) => setError(e.name));
        setLoading(false);
    };

    React.useEffect(() => {
        setError("");
    }, [type.value, name.value, active, long, lat]);

    const clearFildes = () => {
        type.setValue("");
        name.setValue("");
        setActive(true);
        setError("");
        setLong(0);
        setLat(0);
    };

    return (
        <div className={classes.Card}>
            {!showForm ? (
                <Button
                    onClick={() => setShowForm(true)}
                    text="New Item"
                />
            ) : (
                <div className={classes.Form}>
                    <CancelIcon
                        className={classes.Close}
                        onClick={() => {
                            clearFildes();
                            setShowForm(false);
                        }}
                    />
                    <h2>Add New Item</h2>
                    <div className={classes.Inputs}>
                        <TextField {...type} />
                        <TextField {...name} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={active}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLElement>,
                                        checked: boolean
                                    ) => {
                                        setActive(checked);
                                    }}
                                    name="Active"
                                    style={{
                                        color: "rgb(24, 199, 70)",
                                    }}
                                />
                            }
                            label="Active"
                        />
                    </div>
                    <div className={classes.Location}>
                        {locationLoading ? (
                            <div>Loading Location...</div>
                        ) : !long && !lat ? (
                            <Button
                                onClick={() => {
                                    setLocationLoading(true);
                                    navigator.geolocation.getCurrentPosition(
                                        function (position) {
                                            setLong(
                                                position.coords
                                                    .longitude
                                            );
                                            setLat(
                                                position.coords
                                                    .latitude
                                            );
                                        },
                                        function () {
                                            setError(
                                                "Error, please enable location on this site"
                                            );
                                        }
                                    );
                                    setLocationLoading(false);
                                }}
                                text="Add Location"
                            />
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <h3 style={{ margin: "5px auto" }}>
                                    Location:
                                </h3>
                                <p style={{ margin: "5px auto" }}>
                                    Long: {long.toFixed(3)}, Lat:
                                    {lat.toFixed(3)}
                                </p>
                            </div>
                        )}
                    </div>
                    {error !== "" && (
                        <div className={classes.Error}>{error}</div>
                    )}
                    <div className={classes.Submit}>
                        <Button
                            onClick={() => {
                                if (
                                    type.value !== "" &&
                                    name.value !== ""
                                ) {
                                    handleSubmit();
                                } else {
                                    setError(
                                        "Please fill all fildes (location is optienal)"
                                    );
                                }
                            }}
                            text="Submit"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
