import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import UsersSlice  from "../features/auth/UsersSlice";

const store = configureStore({
    reducer: {
        user: UsersSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;