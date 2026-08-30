import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import PageLoader from "@/components/common/PageLoader";
import ClientProtectedRoute from "../layouts/ClientProtectedRoute";

const Home = lazy(() => import("@/client/pages/Home"));
const AboutUs = lazy(() => import("@/client/pages/AboutUs"));
const Categories = lazy(() => import("@/client/pages/Categories"));
const SecurePayment = lazy(() => import("@/client/pages/SecurePayment"));
const Delivery = lazy(() => import("@/client/pages/Delivery"));
const LegalNotice = lazy(() => import("@/client/pages/LegalNotice"));
const ReturnPolicy = lazy(() => import("@/client/pages/ReturnPolicy"));
const ContactUs = lazy(() => import("@/client/pages/ContactUs"));
const TermsAndCondition = lazy(() => import("@/client/pages/TermsAndCondition"));
const PrivacyPolicy = lazy(() => import("@/client/pages/PrivacyPolicy"));
const Login = lazy(() => import("@/client/pages/auth/Login"));
const Register = lazy(() => import("@/client/pages/auth/Register"));
const VerifyEmail = lazy(() => import("@/client/pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/client/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/client/pages/auth/ResetPassword"));
const Dashboard = lazy(() => import("@/client/pages/account/Dashboard"));
const Profile = lazy(() => import("@/client/pages/account/Profile"));
const ChangePassword = lazy(() => import("@/client/pages/account/ChangePassword"));

const ClientRoutes = () => {
    return (
        <Route path="/" element={<ClientLayout />}>
            <Route
                index
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Home />
                    </Suspense>
                }
            />
            <Route
                path="/about-us"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <AboutUs />
                    </Suspense>
                }
            />
            <Route
                path="/category"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Categories />
                    </Suspense>
                }
            />
            <Route
                path="/delivery"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Delivery />
                    </Suspense>
                }
            />
            <Route
                path="/secure-payment"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <SecurePayment />
                    </Suspense>
                }
            />
            <Route
                path="/contact-us"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <ContactUs />
                    </Suspense>
                }
            />
            <Route
                path="/legal-notice"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <LegalNotice />
                    </Suspense>
                }
            />
            <Route
                path="/return-policy"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <ReturnPolicy />
                    </Suspense>
                }
            />
            <Route
                path="/terms-and-conditions"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <TermsAndCondition />
                    </Suspense>
                }
            />
            <Route
                path="/privacy-policy"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <PrivacyPolicy />
                    </Suspense>
                }
            />
            <Route
                path="/register"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Register />
                    </Suspense>
                }
            />
            <Route
                path="/verify-email/:userId"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <VerifyEmail />
                    </Suspense>
                }
            />
            <Route
                path="/forgot-password"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <ForgotPassword />
                    </Suspense>
                }
            />
            <Route
                path="/reset-password/:userId"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <ResetPassword />
                    </Suspense>
                }
            />
            <Route
                path="/login"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                }
            />
            <Route path="/account" element={<ClientProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="change-password" element={<ChangePassword />} />
                {/* <Route path="addresses" element={<Addresses />} /> */}
            </Route>
        </Route>
    );
};

export default ClientRoutes;
