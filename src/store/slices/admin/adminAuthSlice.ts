import type { AdminAuthState, AuthUser } from '@/types/admin/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AdminAuthState = {
    user: null,
    isAuthenticated: false,
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearAdmin: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setAdminUser, clearAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
