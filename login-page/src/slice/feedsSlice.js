import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllFeeds = createAsyncThunk(
    'feeds/getAllFeeds',
    async ({accessToken, pageNumber}) => { 
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const requestBody = {
                pageNo: pageNumber,
                pageSize: 20,
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