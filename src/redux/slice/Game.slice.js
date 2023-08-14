import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import gameController from '../controller/Game.controller';
export const initialState = {
    status: 'idle',
}

export const getAllGame = createAsyncThunk('getAllGame', async () => {
    try {
        const getAll = await gameController.getAllGame();
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getGame = createAsyncThunk('getGame', async (data) => {
    try {
        const { idGame } = data;
        const getAll = await gameController.getGame(idGame);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const getCurrentGameList = createAsyncThunk('getCurrentGameList', async (data) => {
    try {
        const { id } = data;
        const getAll = await gameController.getCurrentGameList(id);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const addCurrentGameList = createAsyncThunk('addCurrentGameList', async (data) => {
    try {
        const { id, name, image, url, description, userId } = data;
        const getAll = await gameController.addCurrentGameList(id, name, image, url, description, userId);
        return getAll;
    }
    catch (error) {
        return error;
    }
})

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllGame.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getAllGame.fulfilled, (state, action) => {
            state.status = 'success';
            state.gameList = action.payload;
        })
        builder.addCase(getAllGame.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getGame.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getGame.fulfilled, (state, action) => {
            state.status = 'success';
            state.game = action.payload;
        })
        builder.addCase(getGame.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(getCurrentGameList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getCurrentGameList.fulfilled, (state, action) => {
            state.status = 'success';
            state.currentGameList = action.payload;
        })
        builder.addCase(getCurrentGameList.rejected, (state) => {
            state.status = 'failed'
        })

        builder.addCase(addCurrentGameList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addCurrentGameList.fulfilled, (state, action) => {
            state.status = 'success';
        })
        builder.addCase(addCurrentGameList.rejected, (state) => {
            state.status = 'failed'
        })
    }
})

export default gameSlice.reducer;