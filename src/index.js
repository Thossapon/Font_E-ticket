import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
// import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Don't forget to wrap your entire App With Provider 🥲
    <Provider store={store}>
      <AuthContextProvider>
        <React.StrictMode>
          <Toaster />
          <App />
        </React.StrictMode>
      </AuthContextProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
