import type { LoginResponse, UserAuthState } from "@/client/types/User.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserAuthState = {
    user: null,
    accessToken: null,
};

const UserAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        cleanUser: state => {
            state.user = null;
            state.accessToken = null;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { cleanUser, setAccessToken, setUser } = UserAuthSlice.actions;

export default UserAuthSlice.reducer;
