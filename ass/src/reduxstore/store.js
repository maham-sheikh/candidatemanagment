import { configureStore } from '@reduxjs/toolkit';
import candidatesReducer from '../features/candidatesSlice';

export const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
});
