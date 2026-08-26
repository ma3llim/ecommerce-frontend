import PageLoader from "@/components/common/PageLoader";
import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import Adminlayout from "../layout/Adminlayout";

const Login = lazy(() => import("@/admin/pages/auth/Login"));
const Dashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AddCategory = lazy(() => import("@/admin/pages/categories/AddCategory"));
const CategoryListing = lazy(() => import("@/admin/pages/categories/CategoryListing"));
const EditCategory = lazy(() => import("@/admin/pages/categories/EditCategory"));
const ProductListing = lazy(() => import("@/admin/pages/products/ProductListing"));
const AddProduct = lazy(() => import("@/admin/pages/products/AddProduct"));

const AdminRoutes = () => {
    return (
        <Route path="/admin">
            <Route
                path="login"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <Login />
                    </Suspense>
                }
            />

            <Route element={<Adminlayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route
                    index
                    path="dashboard"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <Dashboard />
                        </Suspense>
                    }
                />

                <Route path="categories">
                    <Route index element={<Navigate to="add-category" replace />} />
                    <Route
                        path="add-category"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <AddCategory />
                            </Suspense>
                        }
                    />
                    <Route
                        path="category-listing"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <CategoryListing />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":categoryId/edit"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditCategory />
                            </Suspense>
                        }
                    />
                </Route>

                <Route path="products">
                    <Route index element={<Navigate to="add-product" replace />} />
                    <Route
                        path="add-product"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <AddProduct />
                            </Suspense>
                        }
                    />
                    <Route
                        path="product-listing"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ProductListing />
                            </Suspense>
                        }
                    />
                    {/* 
                    <Route
                        path=":categoryId/edit"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditCategory />
                            </Suspense>
                        }
                    /> */}
                </Route>
            </Route>
        </Route>
    );
};

export default AdminRoutes;
