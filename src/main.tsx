import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from '@pages/Home.tsx';
import LoginPage from '@pages/LoginPage.tsx';
import RegisterPage from '@pages/register/RegisterPage.tsx';

import '@css/index.css';

import {rootStore} from '@/modules';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FindIdPage from '@pages/findId/FindIdPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/find-id' element={<FindIdPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
