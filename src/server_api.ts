import axios from "axios";
import {
    newUserDetails,
    ItemBoundary,
    userBoundery,
} from "./interfaces";
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

export const getAllUserItems = (email: string) => {
    return axios.get(
        `http://localhost:8080/twins/items/${constance.space}/${email}`
    );
};

export const updateUserProfile = (
    email: string,
    user: userBoundery
) => {
    return axios.put(
        `http://localhost:8080/twins/users/${constance.space}/${email}`,
        user
    );
};
