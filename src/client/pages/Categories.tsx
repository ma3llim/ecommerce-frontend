import { useQuery } from "@tanstack/react-query";
import { CategoryApi } from "../api/Category.api";
import ToastService from "@/services/ToastService";
import PageLoader from "@/components/common/PageLoader";
import { Helmet } from "react-helmet-async";
import bannerImage from "@/assets/banners/about_us.webp";
import Banner from "../components/Banner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import upperFirst from "lodash/upperFirst";
import { Button } from "@/components/ui/button";

const Categories = () => {
    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ["allCategory"],
        queryFn: () => CategoryApi.getAll(),
        placeholderData: previousData => previousData,
    });

    if (isError) {
        ToastService.error(error instanceof Error ? error.message : "Failed to fetch categories.");
    }

    const categories = data?.data.content;

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <Helmet>
                <title>Shop by Category - ecommerce</title>
                <meta
                    name="description"
                    content="Explore a wide range of product categories on ecommerce. Find the best deals on fashion, electronics, home essentials, and more."
                />
                <meta name="keywords" content="shopping categories, online store, buy online, best deals, ecommerce categories" />
                <meta property="og:title" content="Shop by Category - ecommerce" />
                <meta property="og:description" content="Browse and shop from various categories on ecommerce. Discover top deals today!" />
                // Todo update with real domain
                {/* <meta property="og:url" content="https://ecommerce.com/category" /> */}
                <meta property="og:type" content="website" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Banner title="Category" image={bannerImage}>
                <Breadcrumb>
                    <BreadcrumbList className="text-lg">
                        <BreadcrumbItem>
                            <Link to="/" className="text-white/70 transition-colors hover:text-white dark:text-white/80 dark:hover:text-white">
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">Category</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Banner>
            <Container>
                <section className="my-5 w-full">
                    <div className="mx-auto w-full text-center">
                        <h1 className="text-3xl font-bold underline decoration-4 md:text-4xl">Category</h1>
                    </div>
                    <div className="grid grid-cols-1 items-center justify-items-center gap-4 px-3 py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                        {categories?.map(category => (
                            <div
                                key={category.categoryId}
                                className="group flex w-full select-none flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-border bg-card p-3 transition-all duration-300 ease-in hover:border-primary"
                            >
                                <Link to={`/category/${category.slug}`} className="w-full">
                                    <img
                                        src={category.imageUrl}
                                        loading="lazy"
                                        alt={category.name}
                                        className="mx-auto w-4/5 rounded object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                </Link>
                                <h2 className="mt-3 text-xl font-bold underline">{upperFirst(category.name)}</h2>
                                <Link to={`/category/${category.slug}`}>
                                    <Button className="mt-4 btnXl">View Category</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {categories?.length === 0 && !isFetching && <div className="py-10 text-center text-muted-foreground">No categories found.</div>}
                </section>
            </Container>
        </>
    );
};

export default Categories;
