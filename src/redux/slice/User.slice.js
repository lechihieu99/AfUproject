import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import userController from '../controller/User.controller';

export const initialState = {
    status: 'idle'
}

export const getAllUser = createAsyncThunk('getAllUser', async (data) => {
    try {
        const getAll = await userController.getAllUser();
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getUser = createAsyncThunk('getUser', async (data) => {
    const { tokenId } = data;
    try {
        const getInfoUser = userController.getUser(tokenId)
        return getInfoUser;
    }
    catch (error) {
        return error;
    }
}
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.status = 'idle';
            state.userList = action.payload;
            console.log(action.payload)
        })
        builder.addCase(getAllUser.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        })
        builder.addCase(getUser.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default userSlice.reducer;