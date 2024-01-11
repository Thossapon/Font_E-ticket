import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/authContext';
import { store,persistor } from './app/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
// import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Don't forget to wrap your entire App With Provider 🥲
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContextProvider>
          <React.StrictMode>
            <Toaster />
            <App />
          </React.StrictMode>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
