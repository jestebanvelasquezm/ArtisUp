import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import showSlice from '../reducer/showSlice';
import users from '../reducer/usersSlice'
export const store = configureStore({
  reducer: {
    shows: showSlice,
    users:users
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
