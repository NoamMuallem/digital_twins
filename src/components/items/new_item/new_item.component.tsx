import React, { ReactElement } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import classes from "./new_item.style.module.scss";
import { ItemBoundary, userBoundery } from "../../../interfaces";
import useFormInput from "../../../hooks/form_input.hook";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { addItem } from "../../../server_api";
import { AxiosResponse } from "axios";

export interface NewItemProps {
    //addItemToState: (item: ItemBoundary) => void;
    user: userBoundery;
}

export default function NewItem({
    user,
}: NewItemProps): ReactElement {
    const [showForm, setShowForm] = React.useState<boolean>(false);
    const type = useFormInput("", "Type");
    const name = useFormInput("", "Name");
    const [active, setActive] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const [long, setLong] = React.useState<number>(0);
    const [lat, setLat] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);

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
                console.log(res.data);
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
        <div>
            {!showForm ? (
                <button onClick={() => setShowForm(true)}>
                    New Item
                </button>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            clearFildes();
                            setShowForm(false);
                        }}
                    >
                        X
                    </button>
                    <TextField type="text" {...type} />
                    <TextField type="text" {...name} />
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
                                color="primary"
                            />
                        }
                        label="Active"
                    />
                    {!long && !lat ? (
                        <button
                            onClick={() => {
                                navigator.geolocation.getCurrentPosition(
                                    function (position) {
                                        setLong(
                                            position.coords.longitude
                                        );
                                        setLat(
                                            position.coords.latitude
                                        );
                                    },
                                    function () {
                                        setError(
                                            "Error, please enable location on this site"
                                        );
                                    }
                                );
                            }}
                        >
                            Add Location
                        </button>
                    ) : (
                        <p>
                            Long: {long.toFixed(3)}, Lat:
                            {lat.toFixed(3)}
                        </p>
                    )}
                    {error !== "" && <p>{error}</p>}
                    <button
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
                    >
                        submit
                    </button>
                </div>
            )}
        </div>
    );
}
