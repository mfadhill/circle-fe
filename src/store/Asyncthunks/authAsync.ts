import { createAsyncThunk } from "@reduxjs/toolkit";
import { API, setAuthToken } from "../../lib/api";
import { IAuthor } from "../../types/app";

interface Ilogin {
    email: string,
    password: string
}
interface Iregister {
    fullname: string,
    email: string,
    password: string
}

export const registerAsync = createAsyncThunk<
    Iregister,
    Iregister,
    { rejectValue: string }>(
        "auth/register", async (props, { rejectWithValue }) => {
            try {
                console.log(props);
                const { data } = await API.post("/auth/register", props)

                console.log(data);

                return data.data
            } catch (error) {
                return rejectWithValue("error")
            }
        }
    )

export const loginAsync = createAsyncThunk<
    string,
    Ilogin,
    { rejectValue: string }
>("auth/login", async (props, { rejectWithValue }) => {
    try {
        console.log("props", props);
        const { data } = await API.post("/auth/login", props);

        console.log("data", data.token);

        const token = data.token;
        setAuthToken(token);
        localStorage.setItem("token", token);
        return token;
    } catch (error) {
        return rejectWithValue("error");
    }
});

export const authCheckAsync = createAsyncThunk<
    IAuthor,
    string,
    { rejectValue: string }>(
        "auth/authcheck", async (_, { rejectWithValue }) => {
            try {
                const { data } = await API.get("/user/login", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(data.data);
                return data.data
            } catch (error) {
                return rejectWithValue("error");
            }
        }
    )