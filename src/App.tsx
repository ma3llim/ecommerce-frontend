import ResponsiveViewer from "@/components/common/ResponsiveViewer";
import ToastProvider from "@/components/common/ToastProvider";
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
