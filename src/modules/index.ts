import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@modules/authReducer.ts';

export const rootStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof rootStore.getState>;
