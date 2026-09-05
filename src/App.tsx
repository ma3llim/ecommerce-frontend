import ToastProvider from "@/components/common/ToastProvider";
import AppRouter from "@/routes/AppRouter";

function App() {
    return (
        <>
            <AppRouter />
            <ToastProvider />
        </>
    );
}

export default App;
