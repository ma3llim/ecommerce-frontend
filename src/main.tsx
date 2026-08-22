import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './app/router/AppRouter.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import BreakpointIndicator from './components/ui/BreakpointIndicator.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter />
            <BreakpointIndicator />
        </Provider>
    </StrictMode>
);
