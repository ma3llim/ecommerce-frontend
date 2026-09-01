import { configureStore } from "@reduxjs/toolkit";
import AdminAuthReducer from "@/admin/store/slice/AdminAuth.slice";
import UserAuthReducer from "@/client/store/slice/UserAuth.slice";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage = createWebStorage("local");

const authPersistConfig = {
    key: "adminAuth",
    storage,
    whitelist: ["admin"],
};

const authUserPersistConfig = {
    key: "userAuth",
    storage,
    whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, AdminAuthReducer);
const persistedUserAuthReducer = persistReducer(authUserPersistConfig, UserAuthReducer);

export const ReduxStore = configureStore({
    reducer: {
        AdminAuth: persistedAuthReducer,
        userAuth: persistedUserAuthReducer,
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(ReduxStore);

export type RootState = ReturnType<typeof ReduxStore.getState>;

export type AppDispatch = typeof ReduxStore.dispatch;
