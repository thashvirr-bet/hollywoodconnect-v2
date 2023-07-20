import {configureStore} from '@reduxjs/toolkit'
import providerReducer from './features/providerSlice'
import {TypedUseSelectorHook, useSelector} from "react-redux"

export const store = configureStore({
    reducer: {
        providerReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;