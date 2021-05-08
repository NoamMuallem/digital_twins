import axios from "axios";
import { newUserDetails, ItemBoundary } from "./interfaces";
import constance from "./constance.json";

export const signInRequest = (signUpEmail: string) => {
    return axios.get(
        `http://localhost:8080/twins/users/login/${constance.space}/${signUpEmail}`
    );
};

export const signUpRequest = (newUser: newUserDetails) => {
    return axios.post("http://localhost:8080/twins/users", newUser);
};

export const addItem = (newItem: ItemBoundary, email: string) => {
    return axios.post(
        `http://localhost:8080/twins/items/${constance.space}/${email}`,
        newItem
    );
};
