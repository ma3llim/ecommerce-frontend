import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '@/store/slices/adminAuthSlice';

export const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
