import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './app/router/AppRouter.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import BreakpointIndicator from './components/ui/BreakpointIndicator.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter />
            <BreakpointIndicator />

            <ToastContainer limit={4} position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable />
        </Provider>
    </StrictMode>
);
