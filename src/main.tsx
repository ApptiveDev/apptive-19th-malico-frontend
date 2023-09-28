import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/App.tsx';

import '@css/index.css';
// Reducers
import authReducer from '@modules/authReducer.ts';
import tabReducer from '@modules/tabReducer.ts';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tab: tabReducer
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
