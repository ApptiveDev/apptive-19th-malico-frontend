import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@components/App.tsx';

import '@css/index.css';

import {rootStore} from '@/modules';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);
