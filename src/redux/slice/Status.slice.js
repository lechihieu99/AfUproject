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

export const getAllStarListByUser = createAsyncThunk('getAllStarListByUser', async (data) => {
    const { tokenId } = data
    try {

        const getAll = await statusController.getAllStarListByUser(tokenId)
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getAllCommentLikeList = createAsyncThunk('getAllCommentLikeList', async (data) => {
    const { link } = data
    try {

        const getAll = await statusController.getAllCommentListLike(link);
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

export const getAllComment = createAsyncThunk('getAllComment', async (data) => {
    const { link } = data;
    try {
        const getAll = await statusController.getAllComment(link)
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

export const removeStatus = createAsyncThunk('removeStatus', async (data) => {
    const { link } = data;
    try {
        const removeStt = statusController.removeStatus(link)
        return removeStt;
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

export const commentStatus = createAsyncThunk('commentStatus', async (data) => {
    const { link, ownerId, userComment, content } = data;
    try {
        const comment = statusController.postComment(link, ownerId, userComment, content)
        return comment;
    }
    catch (error) {
        return error;
    }
})

export const removeCommentStatus = createAsyncThunk('removeCommentStatus', async (data) => {
    const { link, tokenId } = data;
    try {
        const unCmt = statusController.removeComment(link, tokenId)
        return unCmt;
    }
    catch (error) {
        return error;
    }
})

export const likeComment = createAsyncThunk('likeComment', async (data) => {
    const { link, commentId, owner, userLike } = data;
    try {
        const likeCmt = statusController.likeComment(link, commentId, owner, userLike)
        return likeCmt;
    }
    catch (error) {
        return error;
    }
})

export const unLikeComment = createAsyncThunk('unLikeComment', async (data) => {
    const { link, commentId, userLike } = data;
    try {
        const unLikeCmt = statusController.removeLikeComment(link, commentId, userLike)
        return unLikeCmt;
    }
    catch (error) {
        return error;
    }
})

export const addStarItem = createAsyncThunk('addStarItem', async (data) => {
    const { link, tokenId, ownerId } = data;
    try {
        const add = statusController.addStarItem(link, tokenId, ownerId)
        return add;
    }
    catch (error) {
        return error;
    }
})

export const removeStarItem = createAsyncThunk('removeStarItem', async (data) => {
    const { link, tokenId } = data;
    try {
        const remove = statusController.removeStarItem(link, tokenId)
        return remove;
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

        builder.addCase(getAllStarListByUser.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllStarListByUser.fulfilled, (state, action) => {
            state.status = 'success';
            state.allStarList = action.payload
        })
        builder.addCase(getAllStarListByUser.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getAllCommentLikeList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllCommentLikeList.fulfilled, (state, action) => {
            state.status = 'success';
            state.allCommentLikeList = action.payload
        })
        builder.addCase(getAllCommentLikeList.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getAllComment.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllComment.fulfilled, (state, action) => {
            state.status = 'success';
            state.allComment = action.payload
        })
        builder.addCase(getAllComment.rejected, (state) => {
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

        builder.addCase(removeStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(removeStatus.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(removeStatus.rejected, (state) => {
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

        builder.addCase(commentStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(commentStatus.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(commentStatus.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(removeCommentStatus.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(removeCommentStatus.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(removeCommentStatus.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(likeComment.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(likeComment.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(likeComment.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(unLikeComment.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(unLikeComment.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(unLikeComment.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(addStarItem.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addStarItem.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(addStarItem.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(removeStarItem.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(removeStarItem.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(removeStarItem.rejected, (state) => {
            state.status = 'failed'
        })

    }
})

export default statusSlice.reducer;