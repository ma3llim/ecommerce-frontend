import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Admin, AdminAuthState, LoginRequest, LoginResponse } from "@/admin/auth/types/AdminAuth.types";

const initialState: AdminAuthState = {
    admin: null,
    accessToken: null,
};

const AdminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<LoginResponse>) => {
            state.admin = action.payload.admin;
            state.accessToken = action.payload.accessToken;
        },
        cleanAdmin: state => {
            state.admin = null;
            state.accessToken = null;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { cleanAdmin, setAdmin, setAccessToken } = AdminAuthSlice.actions;

export default AdminAuthSlice.reducer;
