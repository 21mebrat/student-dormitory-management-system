import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import authSlice from '../redux/feature/auth/authSlice';
import { authApi } from './feature/auth/authApi';
import { directorApi } from './feature/Director/directorApp';
import searchSlice from './feature/search/searchSlice';
import { studentApi } from './feature/student/studentApi';
import { accountApi } from './feature/Director/accountApi';
import { resetApi } from './feature/passwordReset/reset';

// Redux Persist Configuration for the auth slice
const persistConfig = {
  key: 'auth', // Key to save in localStorage
  storage,     // Type of storage (localStorage in this case)
  whitelist: ['userName', 'accessToken', 'role','file'], // Keys to persist from the auth state
};

// Wrap the authSlice reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

// Logger middleware for development (optional, can be removed in production)
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Dispatching:', action);
    const result = next(action);
    console.log('Next State:', storeAPI.getState());
    return result;
  }
  return next(action); // Don't log in production
};

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    searchedStudent: searchSlice,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [resetApi.reducerPath]: resetApi.reducer,
    [directorApi.reducerPath]: directorApi.reducer,
    [studentApi.reducerPath]:studentApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks for persisting state
    })
      .concat(authApi.middleware)
      .concat(directorApi.middleware)
      .concat(studentApi.middleware)
      .concat(resetApi.middleware)
      .concat(accountApi.middleware)
      .concat(loggerMiddleware) // Add logger middleware only in development
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);
