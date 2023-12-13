import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@modules/authReducer.ts';
import registerReducer from '@modules/registerReducer.ts';

export const rootStore = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof rootStore.getState>;
