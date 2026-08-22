import type { AdminUser } from '@/features/admin/auth/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
    user: AdminUser | null;
    isAuthenticated: boolean;
}

const initialState: AdminAuthState = {
    user: null,
    isAuthenticated: false,
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminUser: (state, action: PayloadAction<AdminUser>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearnAdmin: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { setAdminUser, clearnAdmin } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
