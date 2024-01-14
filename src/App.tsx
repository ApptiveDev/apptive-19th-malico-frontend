import {Route, Routes} from 'react-router-dom';
import Home from '@pages/Home.tsx';
import LoginPage from '@pages/LoginPage.tsx';
import RegisterPage from '@pages/register/RegisterPage.tsx';
import FindIdPage from '@pages/findId/FindIdPage.tsx';

const App = () => {
  return <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
    <Route path='/find-id' element={<FindIdPage />}></Route>
  </Routes>;
};

export default App;
