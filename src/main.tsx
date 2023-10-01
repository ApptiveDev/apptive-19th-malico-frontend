import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '@components/Home.tsx';

import '@css/index.css';

import {rootStore} from '@/modules';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from '@components/LoginPage.tsx';
import RegisterPage from '@components/RegisterPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
