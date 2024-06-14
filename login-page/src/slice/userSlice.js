import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const HOST_NAME = '';

export const loginUser = createAsyncThunk('user/loginuser', async (user) => {
    const request = await axios.post(`https://dev.workw.com/konnectauth/api/login`, user);
    console.log(request);
    const res = await request.data.data;
    localStorage.setItem('user', JSON.stringify(res));
    return res;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if (action.error.message === 'Request failed with status code 401') {
                state.error = 'Access Denied, Invalid Credentials';
            } else {
                state.error = action.error.message;
            }
        })
    }
}
);

export default userSlice.reducer;