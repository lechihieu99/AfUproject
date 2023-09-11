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
})

export const getAllFriend = createAsyncThunk('getAllFriend', async (data) => {
    const { tokenId } = data;
    try {
        const getAll = userController.getAllFriend(tokenId)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getAllFriendRequest = createAsyncThunk('getAllFriendRequest', async (data) => {
    const { tokenId } = data;
    try {
        const getAll = userController.getAllFriendRequest(tokenId)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getFriend = createAsyncThunk('getFriend', async (data) => {
    const { userId1, userId2 } = data;
    try {
        const getAll = userController.getFriend(userId1, userId2)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getAllNotification = createAsyncThunk('getAllNotification', async (data) => {
    const { tokenId } = data;
    try {
        const getAll = userController.getAllNotification(tokenId)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

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

export const sendFriendRequest = createAsyncThunk('sendFriendRequest', async (data) => {
    const { userId1, userId2 } = data;
    try {
        const getAll = userController.sendFriendRequest(userId1, userId2)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const acceptFriendRequest = createAsyncThunk('acceptFriendRequest', async (data) => {
    const { id } = data;
    try {
        const getAll = userController.acceptFriendRequest(id)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const cancelFriend = createAsyncThunk('cancelFriend', async (data) => {
    const { userId1, userId2 } = data;
    try {
        const getAll = userController.cancelFriend(userId1, userId2)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const postNotification = createAsyncThunk('postNotification', async (data) => {
    const { sendUser, receiveUser, type, link } = data;
    try {
        const postAll = userController.postNotification(sendUser, receiveUser, type, link)
        return postAll;
    }
    catch (error) {
        return error;
    }
})

export const removeNotification = createAsyncThunk('removeNotification', async (data) => {
    const { sendUser, receiveUser, type, link } = data;
    try {
        const postAll = userController.removeNotification(sendUser, receiveUser, type, link)
        return postAll;
    }
    catch (error) {
        return error;
    }
})

export const seenNotification = createAsyncThunk('seenNotification', async (data) => {
    const { linkNoti } = data;
    try {
        const getAll = userController.seenNotification(linkNoti)
        return getAll;
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
            state.user = null
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        })
        builder.addCase(getUser.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getAllFriend.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllFriend.fulfilled, (state, action) => {
            state.status = 'idle';
            state.friendList = action.payload;
        })
        builder.addCase(getAllFriend.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getAllFriendRequest.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllFriendRequest.fulfilled, (state, action) => {
            state.status = 'idle';
            state.friendListRequest = action.payload;
        })
        builder.addCase(getAllFriendRequest.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getFriend.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getFriend.fulfilled, (state, action) => {
            state.status = 'idle';
            state.friend = action.payload;
        })
        builder.addCase(getFriend.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getAllNotification.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllNotification.fulfilled, (state, action) => {
            state.status = 'idle';
            state.notiList = action.payload;
        })
        builder.addCase(getAllNotification.rejected, (state) => {
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

        builder.addCase(sendFriendRequest.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(sendFriendRequest.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(acceptFriendRequest.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(acceptFriendRequest.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(cancelFriend.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(cancelFriend.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(cancelFriend.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(postNotification.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(postNotification.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(postNotification.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(seenNotification.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(seenNotification.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(seenNotification.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(removeNotification.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(removeNotification.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(removeNotification.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default userSlice.reducer;