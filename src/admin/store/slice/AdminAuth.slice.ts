import type { Admin, AdminAuthState } from "@/admin/auth/types/AdminAuth.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AdminAuthState = {
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    initialized: false,
};

const AdminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<Admin>) => {
            state.admin = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.initialized = true;
        },
        cleanAdmin: state => {
            state.admin = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.initialized = false;
        },
    },
});

export const { cleanAdmin, setAdmin } = AdminAuthSlice.actions;

export default AdminAuthSlice.reducer;
