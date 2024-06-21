import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllFeeds = createAsyncThunk(
    'feeds/getAllFeeds',
    async (accessToken) => { 
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3NzU0Njc4Mi1hYTdhLTQ5ODQtOTM4OC01ZmQwNDRjMGZiMTEiLCJuYW1lIjoiQW1pciBOYXZlZWQiLCJpbWFnZSI6IiIsImVtYWlsIjoiYW1pckBtaWxldGFwLmNvbSIsImJ1c2luZXNzSWQiOiIwYWI1ZjljMC1mOTQ4LTRjNDAtOGRhZC1jNThiYTk5ZmI3NjUiLCJ2ZXIiOiI0MEYxRTJBNi1GNTQwLTRDRDgtOEExQS1ENjEyQjMxNUNENEUiLCJqdGkiOiIxYWNlNDVjOS1hODgzLTQzZDgtOGI4YS05MzE3ZmExMmRjZjkiLCJuYmYiOjE3MTg4ODI3MzcsImV4cCI6MTcxOTA1NTUzN30.I1ejH-Z-SNyJc-Zqw8PAMfb3sUay436DoFYOrM59QKRL6ToRCtCTD9uLyAjdzrbn4srxFeAu_2OspF49ZLCTpJqwJoNEWqwY5G9vrbYQB8KoL2WMiAX5le25JpHO9Lh12tamFZkFjUL72As5MM2zo3MuwqUC9DUmrXITcRXJFk6CgscTWdAjYS0uuv4MmF6MKwweuCnpgQdWrnMeMifVbrKRmvWDpc0oNsWC6zZF-bC083X5hcVGqjNNUAdDEUO-ufNeOzDm5t4tk4IzCZ3bIV1Cq7ueCLGj2krX_ebVSBqqBSMmcRgVWuMEzF2toV0AfIRgl5gJxOB9jrTeerjhSg`,
                    'Content-Type': 'application/json'
                }
            };

            const requestBody = {
                pageNo: 1,
                pageSize: 10,
                search: "",
                referenceType: 1,
                filterType: 1
            };

            const request = await axios.post(
                'https://dev.workw.com/konnectapi/api/Feed/GetAllFeed',
                requestBody,
                config
            );

            const res = request.data.data;

            return res;
        } catch (error) {
            throw Error(error.message);
        }
    }
);

const feedsSlice = createSlice({
    name: 'feeds',
    initialState: {
        loading: false,
        feeds: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFeeds.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFeeds.fulfilled, (state, action) => {
                state.loading = false;
                state.feeds = action.payload;
                state.error = null;
            })
            .addCase(getAllFeeds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.feeds = [];
            });
    }
});

export default feedsSlice.reducer;