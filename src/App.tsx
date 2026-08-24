import ResponsiveViewer from "@/components/ResponsiveViewer";
import ToastProvider from "@/components/ToastProvider";
import AppRouter from "@/routes/AppRouter";

function App() {
    return (
        <>
            <AppRouter />
            <ResponsiveViewer />
            <ToastProvider />
        </>
    );
}

export default App;
