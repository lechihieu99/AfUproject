import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import statusController from '../controller/Status.controller';

export const initialState = {
    status: 'idle'
}

export const getUserStatus = createAsyncThunk('getUserStatus', async (data) => {
    const { tokenId } = data
    try {

        const getAll = await statusController.getUserStatus(tokenId);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getAllStatus = createAsyncThunk('getAllStatus', async () => {
    try {
        const getAll = await statusController.getAllStatus()
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const postImage = createAsyncThunk('postImage', async (data) => {
    const { tokenId, formData } = data;
    try {
        const postImg = statusController.postImage(tokenId, formData)
        return postImg;
    }
    catch (error) {
        return error;
    }
}
)

export const postStatus = createAsyncThunk('postStatus', async (data) => {
    const { tokenId, like, comment, star, share, content, image, imageContent, type } = data;
    try {
        const postStt = statusController.postStatus(tokenId, like, comment, star, share, content, image, imageContent, type)
        return postStt;
    }
    catch (error) {
        return error;
    }
})

export const likeStatus = createAsyncThunk('likeStatus', async (data) => {
    const { tokenId, link } = data;
    try {
        const like = statusController.likeStatus(tokenId, link)
        return like;
    }
    catch (error) {
        return error;
    }
})

export const unLikeStatus = createAsyncThunk('unLikeStatus', async (data) => {
    const { tokenId, link } = data;
    try {
        const unlike = statusController.unLikeStatus(tokenId, link)
        return unlike;
    }
    catch (error) {
        return error;
    }
})

export const isExistInLikeList = createAsyncThunk('isExistInLikeList', async (data) => {
    const { tokenId, link } = data;
    try {
        const isExist = statusController.isExistInLikeList(tokenId, link)
        return isExist;
    }
    catch (error) {
        return error;
    }
})

export const userLikeList = createAsyncThunk('userLikeList', async (data) => {
    const { tokenId } = data;
    try {
        const userLikeList = statusController.getUserLikeList(tokenId)
        return userLikeList;
    }
    catch (error) {
        return error;
    }
})

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllStatus.fulfilled, (state, action) => {
            state.status = 'success';
            state.allStatus = action.payload
        })
        builder.addCase(getAllStatus.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getUserStatus.pending, (state) => {
            state.status = 'loading';
            state.statusPost = 'loading'
        })
        builder.addCase(getUserStatus.fulfilled, (state, action) => {
            state.status = 'success';
            state.statusList = action.payload;
            state.statusPost = 'success';
        })
        builder.addCase(getUserStatus.rejected, (state) => {
            state.status = 'failed'

            state.statusPost = 'failed'
        })
        builder.addCase(postImage.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(postImage.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(postImage.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(postStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(postStatus.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(postStatus.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(likeStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(likeStatus.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(likeStatus.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(unLikeStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(unLikeStatus.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(unLikeStatus.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(isExistInLikeList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(isExistInLikeList.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(isExistInLikeList.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(userLikeList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(userLikeList.fulfilled, (state, action) => {
            state.status = 'success';
            state.userLikeList = action.payload
        })
        builder.addCase(userLikeList.rejected, (state) => {
            state.status = 'failed'
        })

    }
})

export default statusSlice.reducer;