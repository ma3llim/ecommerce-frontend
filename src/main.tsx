import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./query/QueryProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import ResponsiveViewer from "./components/ResponsiveViewer.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryProvider>
                <App />
                <ResponsiveViewer />
            </QueryProvider>
        </ThemeProvider>
    </StrictMode>
);
