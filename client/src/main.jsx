import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import ContextProvider from './context/ContextProvider';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <RouterProvider
            router={router}
          >
            <App />
          </RouterProvider>
        </PersistGate>
      </Provider>
    </ContextProvider>
  </StrictMode>
);
