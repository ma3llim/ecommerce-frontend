import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./query/QueryProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import { Provider } from "react-redux";
import { ReduxStore } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryProvider>
                <Provider store={ReduxStore}>
                    <App />
                </Provider>
            </QueryProvider>
        </ThemeProvider>
    </StrictMode>
);
