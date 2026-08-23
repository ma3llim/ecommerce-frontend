import { configureStore } from "@reduxjs/toolkit";
import AdminAuthReducer from "@/admin/store/slice/AdminAuth.slice";

export const ReduxStore = configureStore({
    reducer: {
        AdminAuth: AdminAuthReducer,
    },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;

export type AppDispatch = typeof ReduxStore.dispatch;
