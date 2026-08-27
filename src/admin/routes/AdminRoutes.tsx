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
const EditProduct = lazy(() => import("@/admin/pages/products/EditProduct"));
const ManageProductTags = lazy(() => import("@/admin/pages/products/ManageProductTags"));
const AddTag = lazy(() => import("@/admin/pages/tags/AddTag"));
const EditTag = lazy(() => import("@/admin/pages/tags/EditTag"));
const TagListing = lazy(() => import("@/admin/pages/tags/TagListing"));
const ManageProductVariants = lazy(() => import("@/admin/pages/products/ManageProductVariants"));
const AddProductVariant = lazy(() => import("@/admin/pages/products/AddProductVariant"));
const EditProductVariant = lazy(() => import("@/admin/pages/products/EditProductVariant"));
const VariantImageManager = lazy(() => import("@/admin/pages/products/VariantImageManager"));
const ProductFaqsListing = lazy(() => import("@/admin/pages/fags/ProductFaqsListing"));
const CreateProductFaq = lazy(() => import("@/admin/pages/fags/CreateProductFaq"));
const EditProductFaq = lazy(() => import("@/admin/pages/fags/EditProductFaq"));
const ViewProductFaq = lazy(() => import("@/admin/pages/fags/ViewProductFaq"));
const UserDetailsPage = lazy(() => import("@/admin/pages/users/UserDetailsPage"));
const UsersListingPage = lazy(() => import("@/admin/pages/users/UsersListingPage"));
const ShipmentListing = lazy(() => import("@/admin/pages/shipment/ShipmentListing"));
const ShipmentDetails = lazy(() => import("@/admin/pages/shipment/ShipmentDetails"));
const CouponListing = lazy(() => import("@/admin/pages/coupon/CouponListing"));
const AddCoupon = lazy(() => import("@/admin/pages/coupon/AddCoupon"));
const EditCoupon = lazy(() => import("@/admin/pages/coupon/EditCoupon"));
const ViewCoupon = lazy(() => import("@/admin/pages/coupon/ViewCoupon"));

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
                    <Route
                        path="edit-product/:productId"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditProduct />
                            </Suspense>
                        }
                    />
                    <Route
                        path="product-tags"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ManageProductTags />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/variants"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ManageProductVariants />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/variants/add"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <AddProductVariant />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/variants/:variantId/edit"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditProductVariant />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/variants/:variantId/images"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <VariantImageManager />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/faqs"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ProductFaqsListing />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/faqs/create"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <CreateProductFaq />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/faqs/:faqId"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ViewProductFaq />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":productId/faqs/:faqId/edit"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditProductFaq />
                            </Suspense>
                        }
                    />
                </Route>

                <Route path="tags">
                    <Route index element={<Navigate to="add-tag" replace />} />
                    <Route
                        path="add-tag"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <AddTag />
                            </Suspense>
                        }
                    />
                    <Route
                        path="tag-listing"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <TagListing />
                            </Suspense>
                        }
                    />
                    <Route
                        path="edit-tag/:tagId"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditTag />
                            </Suspense>
                        }
                    />
                </Route>

                <Route path="users">
                    <Route index element={<Navigate to="user-listing" replace />} />
                    <Route
                        path="user-listing"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <UsersListingPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="user-details/:userId"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <UserDetailsPage />
                            </Suspense>
                        }
                    />
                </Route>

                <Route path="shipments">
                    <Route index element={<Navigate to="listing" replace />} />
                    <Route
                        path="listing"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ShipmentListing />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":shipmentId"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ShipmentDetails />
                            </Suspense>
                        }
                    />
                </Route>

                <Route path="coupons">
                    <Route index element={<Navigate to="listing" replace />} />
                    <Route
                        path="listing"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <CouponListing />
                            </Suspense>
                        }
                    />
                    <Route
                        path="add"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <AddCoupon />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":couponId/edit"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <EditCoupon />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":codeId"
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ViewCoupon />
                            </Suspense>
                        }
                    />
                </Route>
            </Route>
        </Route>
    );
};

export default AdminRoutes;
