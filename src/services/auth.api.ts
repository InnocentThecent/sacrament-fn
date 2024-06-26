import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localUrl, handleErrorResponse } from ".";

export const loginUser = createAsyncThunk(
  "user/login",
  async (myFields: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}/auth/login`, myFields);
      localStorage.setItem("accessToken", res.data.tokens.accessToken);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}/forgotPassword`, { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { email, token }: { email: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`${localUrl}/reset/${token}`, {
        email,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);
