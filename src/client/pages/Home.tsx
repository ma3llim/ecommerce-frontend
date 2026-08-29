import { lazy, Suspense } from "react";
import PageLoader from "@/components/common/PageLoader";
const Banner = lazy(() => import("@/client/components/Banner"));

const Home = () => {
    return (
        <>
            <Suspense fallback={<PageLoader />}>
                <Banner />
            </Suspense>
            Home
        </>
    );
};

export default Home;
