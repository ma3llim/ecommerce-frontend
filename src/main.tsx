import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./query/QueryProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { persistor, ReduxStore } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import PageLoader from "./components/common/PageLoader.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryProvider>
                <Provider store={ReduxStore}>
                    <PersistGate loading={<PageLoader />} persistor={persistor}>
                        <HelmetProvider>
                            <App />
                        </HelmetProvider>
                    </PersistGate>
                </Provider>
            </QueryProvider>
        </ThemeProvider>
    </StrictMode>
);
