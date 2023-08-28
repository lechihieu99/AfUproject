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

export const uploadAvatar = createAsyncThunk('uploadAvatar', async (data) => {
    const { tokenId, formData } = data;
    try {
        const upload = userController.uploadAvatar(tokenId, formData)
        return upload;
    }
    catch (error) {
        return error;
    }
})

export const getAvatar = createAsyncThunk('getAvatar', async (data) => {
    const { tokenId } = data;
    try {
        const getAva = userController.getAvatar(tokenId)
        return getAva;
    }
    catch (error) {
        return error;
    }
})

export const updateInforUser = createAsyncThunk('updateInforUser', async (data) => {
    const { tokenId, name, email, birthday, sex, education, habit } = data;
    try {
        const update = userController.updateInformationUser(tokenId, name, email, birthday, sex, education, habit)
        return update;
    }
    catch (error) {
        return error;
    }
})

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

        builder.addCase(uploadAvatar.pending, (state) => {
            state.statusUpload = 'loading';
        })
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.statusUpload = 'success';
        })
        builder.addCase(uploadAvatar.rejected, (state) => {
            state.statusUpload = 'failed'
        })

        builder.addCase(getAvatar.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAvatar.fulfilled, (state, action) => {
            state.status = 'success';
            state.avatar = action.payload;
        })
        builder.addCase(getAvatar.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(updateInforUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(updateInforUser.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(updateInforUser.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default userSlice.reducer;