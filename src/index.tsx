import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './api/auth.api';
import App from './App';
import { AuthContextProvider } from './common/providers/AuthContextProvider';
import { Theme } from './components/common/Theme';
import { ToastProvider } from './components/common/toastMessage';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <ToastProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </ToastProvider>
        </Theme>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
