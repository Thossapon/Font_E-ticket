import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig = {
    key: 'root',
    storage,
    // Add any additional configuration options if needed
};
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // Add other reducers as needed
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export const persistor = persistStore(store);
