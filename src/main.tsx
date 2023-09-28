import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/App.tsx';
import '@css/index.css';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from '@modules/auth.ts';
import {Provider} from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
