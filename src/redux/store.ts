import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weather from './slices/weather';
export const store = configureStore({
  reducer: {
    weather,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
