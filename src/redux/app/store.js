import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import authSlice from '../slice/Auth.slice';
import favouriteListSlice from '../slice/FavouriteList.slice';
import userSlice from '../slice/User.slice';
import musicSlice from '../slice/Music.slice';
import gameSlice from '../slice/Game.slice';
import statusSlice from '../slice/Status.slice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        favourite: favouriteListSlice,
        user: userSlice,
        music: musicSlice,
        game: gameSlice,
        status: statusSlice
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ]
})