import ReactDOM from 'react-dom/client';
import '@css/index.css';

import {rootStore} from '@/modules';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '@/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
