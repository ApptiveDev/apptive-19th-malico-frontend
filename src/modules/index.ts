import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@modules/authReducer.ts';
import tabReducer from '@modules/tabReducer.ts';

export const rootStore = configureStore({
  reducer: {
    auth: authReducer,
    tab: tabReducer,
  },
});
export type RootState = ReturnType<typeof rootStore.getState>;