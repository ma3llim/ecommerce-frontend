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
    },
});

export const { cleanAdmin, setAdmin } = AdminAuthSlice.actions;

export default AdminAuthSlice.reducer;
