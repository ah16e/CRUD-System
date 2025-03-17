import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk("user/login", async (userCredential) => {
    try {
        const response = await axios.post("http://localhost:8080/login", userCredential, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = response.data; 
        localStorage.setItem("access_token", JSON.stringify(data));
        return data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Incorrect email or password")
    }
});

const LoginSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        user: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload; 
            });
    },
});

export default LoginSlice.reducer;
