import React, { ReactElement } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import classes from "./new_item.style.module.scss";
import { ItemBoundary, userBoundery } from "../../../interfaces";
import TextField from "../../ui/textFiled";
import Checkbox from "@material-ui/core/Checkbox";
import {
  addItem,
  updateItem,
  registerToCourse,
  resignFromCourse,
} from "../../../server_api";
import { AxiosResponse } from "axios";
import Button from "../../ui/button";
import Select from "../../ui/select.component.jsx";
import useValueChangeListener from "../../../hooks/listenToChange.hook.js";

export interface NewItemProps {
  user: userBoundery;
  addItemToState?: (item: ItemBoundary) => void;
  item?: ItemBoundary;
  index?: number;
  enrollState?: (item: ItemBoundary) => void;
  resignState?: (id: string, index: number) => void;
  canEnroll?: boolean;
}

export default function NewItem({
  user,
  addItemToState,
  item,
  index,
  enrollState,
  resignState,
  canEnroll,
}: NewItemProps): ReactElement {
  const type = "Course";
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(
    (item && item.name) || ""
  );
  const [active, setActive] = React.useState<boolean>(
    item && item.active !== null ? item.active : true
  );
  const [error, setError] = React.useState<string>("");
  const [long, setLong] = React.useState<number>(
    (item && item.location && item.location.lng) || 0
  );
  const [lat, setLat] = React.useState<number>(
    (item && item.location && item.location.lat) || 0
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [startHour, setStartHour] = React.useState<string>(
    (item && item.itemAttributes && item.itemAttributes.startHour) ||
      "8"
  );
  const [startMin, setStartMin] = React.useState<string>(
    (item && item.itemAttributes && item.itemAttributes.startMin) ||
      "0"
  );
  const [endsHour, setEndsHour] = React.useState<string>(
    (item && item.itemAttributes && item.itemAttributes.endsHour) ||
      "8"
  );
  const [endsMin, setEndsMin] = React.useState<string>(
    (item && item.itemAttributes && item.itemAttributes.endsMin) ||
      "0"
  );
  const [classRoom, setClassRoom] = React.useState<string>(
    (item && item.itemAttributes && item.itemAttributes.classRoom) ||
      ""
  );
  const [day, setDay] = React.useState<
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
  >("Sunday");
  const [
    locationLoading,
    setLocationLoading,
  ] = React.useState<boolean>(false);
  const [changed, setChanged] = React.useState<boolean>(false);

  const valueNotChanged = React.useCallback(() => {
    setChanged(false);
  }, [setChanged]);
  const valueChanged = React.useCallback(() => {
    setChanged(true);
  }, [setChanged]);

  useValueChangeListener(
    item && item.name,
    name,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    item && item.active,
    active,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    item && item.location && item.location.lng,
    long,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    item && item.location && item.location.lat,
    lat,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    (item && item.itemAttributes && item.itemAttributes.startHour) ||
      "8",
    startHour,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    (item && item.itemAttributes && item.itemAttributes.startMin) ||
      "0",
    startMin,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    (item && item.itemAttributes && item.itemAttributes.endsHour) ||
      "8",
    endsHour,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    (item && item.itemAttributes && item.itemAttributes.endsMin) ||
      "0",
    endsMin,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    (item && item.itemAttributes && item.itemAttributes.classRoom) ||
      "",
    classRoom,
    valueChanged,
    valueNotChanged
  );
  useValueChangeListener(
    (item && item.itemAttributes && item.itemAttributes.day) ||
      "Sunday",
    day,
    valueChanged,
    valueNotChanged
  );

  const handleResign = () => {
    resignFromCourse(user.userId.email, item!.itemId!.id).then(() => {
      if (resignState) {
        resignState(item!.itemId!.id, index!);
      }
    });
  };

  const handleEnrollToCourse = () => {
    registerToCourse(user.userId.email, item!.itemId!.id).then(() => {
      if (enrollState) {
        enrollState(item!);
      }
    });
  };

  const handleSubmit = () => {
    const newItem: ItemBoundary = {
      type: "Course",
      name: name.toString(),
      active,
      ...(long && lat && { location: { lat: lat, lng: long } }),
      itemAttributes: {
        startHour,
        startMin,
        endsHour,
        endsMin,
        classRoom,
        day,
      },
    };
    setLoading(true);
    addItem(newItem, user.userId.email)
      .then((res: AxiosResponse<ItemBoundary>) => {
        console.log(res);
        if (addItemToState) {
          addItemToState(res.data);
        }
        clearFildes();
        setShowForm(false);
      })
      .catch((e: Error) => console.log(e));
    setLoading(false);
  };

  const hangleChange = () => {
    const newItem: ItemBoundary = {
      ...item,
      type: "Course",
      name: name.toString(),
      active,
      ...(long && lat && { location: { lat: lat, lng: long } }),
      itemAttributes: {
        startHour,
        startMin,
        endsHour,
        endsMin,
        classRoom,
        day,
      },
    };
    updateItem(user.userId!.email, newItem).then(() =>
      console.log("updated")
    );
  };

  React.useEffect(() => {
    setError("");
  }, [name, active, long, lat]);

  const clearFildes = () => {
    setName("");
    setActive(true);
    setError("");
    setLong(0);
    setLat(0);
  };

  return (
    <div className={classes.Card}>
      {!showForm && !item ? (
        <Button onClick={() => setShowForm(true)} text="New" />
      ) : (
        <div
          className={`${classes.Form} ${
            user.role === "PLAYER" && classes.Mini
          }`}
        >
          {!item && (
            <CancelIcon
              className={classes.Close}
              onClick={() => {
                clearFildes();
                setShowForm(false);
              }}
            />
          )}
          <h2>{item ? name : "New Course"}</h2>
          <div className={classes.Inputs}>
            {user.role !== "PLAYER" ? (
              <TextField
                label="Course Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            ) : (
              <span>{name}</span>
            )}
            {user.role === "MANAGER" && (
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
            )}
          </div>
          <div className={classes.Scedual}>
            {user.role === "MANAGER" ? (
              <>
                <Select
                  onChange={setDay}
                  value={day}
                  items={[
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ]}
                />
                <div className={classes.Time}>
                  <span>From: </span>
                  <TextField
                    type="number"
                    style={{ width: "3ch" }}
                    InputProps={{
                      inputProps: { min: 8, max: 23, step: 1 },
                    }}
                    value={startHour}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setStartHour(e.target.value)}
                  />
                  <span>:</span>
                  <TextField
                    style={{ width: "3ch" }}
                    type="number"
                    inputProps={{
                      inputProps: { min: 0, max: 50, step: 10 },
                    }}
                    value={startMin}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setStartMin(e.target.value)}
                  />
                </div>
                <div className={classes.Time}>
                  <span>To: </span>
                  <TextField
                    style={{ width: "3ch" }}
                    type="number"
                    InputProps={{
                      inputProps: { min: 8, max: 23, step: 1 },
                    }}
                    value={endsHour}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setEndsHour(e.target.value)}
                  />
                  <span>:</span>
                  <TextField
                    style={{ width: "3ch" }}
                    type="number"
                    inputProps={{
                      inputProps: { min: 0, max: 50, step: 10 },
                    }}
                    value={endsMin}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => setEndsMin(e.target.value)}
                  />
                </div>
                <TextField
                  label="Room"
                  value={classRoom}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => setClassRoom(e.target.value)}
                />
              </>
            ) : (
              <span>{`From :${startHour}:${startMin} To: ${endsHour}:${endsMin} ${day} room:${classRoom}`}</span>
            )}
          </div>
          <div className={classes.Location}>
            {locationLoading ? (
              <div>Loading Location...</div>
            ) : !long && !lat && user.role === "MANAGER" ? (
              <Button
                onClick={() => {
                  setLocationLoading(true);
                  navigator.geolocation.getCurrentPosition(
                    function (position) {
                      setLong(position.coords.longitude);
                      setLat(position.coords.latitude);
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
                <h3 style={{ margin: "5px auto" }}>Location:</h3>
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
            {item && user.role === "MANAGER" && changed && (
              <Button
                onClick={() => {
                  if (name !== "") {
                    hangleChange();
                  } else {
                    setError(
                      "Please fill all fildes (location is optienal)"
                    );
                  }
                }}
                text={"Update"}
              />
            )}
            {!item && (
              <Button
                onClick={() => {
                  if (name !== "") {
                    handleSubmit();
                  } else {
                    setError(
                      "Please fill all fildes (location is optienal)"
                    );
                  }
                }}
                text={"Add"}
              />
            )}
            {enrollState && canEnroll && (
              <Button
                onClick={() => {
                  handleEnrollToCourse();
                }}
                text={"enroll"}
              />
            )}
            {resignState && (
              <Button onClick={() => handleResign()} text="Resign" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
