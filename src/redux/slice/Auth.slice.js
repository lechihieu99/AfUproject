import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import authController from '../controller/Auth.controller';

export const initialState = {
    token: undefined,
    status: 'idle',
}
export const loginAccount = createAsyncThunk('loginAccount', async (data) => {
    const { name, email, password } = data;
    try {
        const login = await authController.login(name, email, password);
        return login;
    }
    catch (error) {
        return error;
    }
})

export const signinAccount = createAsyncThunk('signinAccount', async (data) => {
    const { name, email, password } = data;
    try {
        const signin = await authController.signIn(name, email, password);
        return signin;
    }
    catch (error) {
        return error;
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAccount.pending, (state) => {
            state.status = 'loading'
        });
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            // state.status = 'idle';
            action.payload.name === 'AxiosError' ? state.status = 'failed' : state.status = 'success';
            state.status === 'success' ? state.token = action.payload.data : state.token = undefined;
            console.log(action.payload)
            state.status === 'success' && Cookies.set('tokenId', action.payload.data, { expires: 1 })
        });
        builder.addCase(loginAccount.rejected, (state) => {
            state.status = 'failed';
        })

        builder.addCase(signinAccount.pending, (state) => {
            state.statusCreate = 'loading'
        });
        builder.addCase(signinAccount.fulfilled, (state, action) => {
            // state.status = 'idle';
            // console.log(action.payload)
            action.payload.name === 'AxiosError' ? state.statusCreate = 'failed' : state.statusCreate = 'success';
            // state.statusCreate === 'success' ? state.token = action.payload.data : state.token = undefined;
            // state.status === 'success' ? Cookies.set('tokenId', action.payload.data, { expires: 1 }) : Cookies.set('tokenId', undefined, { expires: 1 });
        });
        builder.addCase(signinAccount.rejected, (state) => {
            state.statusCreate = 'failed';
        })
    }
})

export default authSlice.reducer;