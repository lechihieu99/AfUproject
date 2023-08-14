import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import favouriteListController from '../controller/FavouriteList.controller';

export const initialState = {
    status: 'idle'
}

export const getAllSong = createAsyncThunk('getAllSong', async (data) => {
    const { tokenId } = data;
    try {
        const getAll = await favouriteListController.getAll(tokenId);
        return getAll;
    }
    catch (error) {
        return error
    }
})

export const addItem = createAsyncThunk('addItem', async (data) => {
    const { songId } = data;
    try {
        const addSongInto = favouriteListController.addItem(songId)
        return addSongInto
    }
    catch (error) {
        return error
    }
})

export const removeItem = createAsyncThunk('removeItem', async (data) => {
    const { songId } = data;
    try {
        const removeSongInto = favouriteListController.removeItem(songId)
        return removeSongInto
    }
    catch (error) {
        return error
    }
})

export const favouriteListSlice = createSlice({
    name: 'favouriteList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllSong.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getAllSong.fulfilled, (state) => {
            state.status = 'fulfilled'
        })
        builder.addCase(getAllSong.rejected, (state) => {
            state.status = 'failed';
        })

        builder.addCase(addItem.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(addItem.fulfilled, (state) => {
            state.status = 'fulfilled'
        })
        builder.addCase(addItem.rejected, (state) => {
            state.status = 'failed';
        })

        builder.addCase(removeItem.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(removeItem.fulfilled, (state) => {
            state.status = 'fulfilled'
        })
        builder.addCase(removeItem.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default favouriteListSlice.reducer;