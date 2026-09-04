import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Cart, CartItem, CartItemCardProps, CartSummaryProps } from "@/client/types/Cart.types";
import ToastService from "@/services/ToastService";
import { CartApi } from "@/client/api/Cart.api";
import PageLoader from "@/components/common/PageLoader";
import Container from "@/client/components/Container";
import { Helmet } from "react-helmet-async";

const Cart = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["cart"],
        queryFn: CartApi.getCart,
    });

    const cart = data?.data;
    const items = cart?.items ?? [];

    const updateItemMutation = useMutation({
        mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
            CartApi.updateItem(itemId, {
                quantity,
            }),

        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            ToastService.success(response.message || "Cart updated successfully.");
        },

        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to update cart.");
        },
    });

    const deleteItemMutation = useMutation({
        mutationFn: (itemId: string) => CartApi.deleteItem(itemId),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            ToastService.success(response.message || "Item removed from cart.");
        },
        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to remove item.");
        },
    });

    const clearCartMutation = useMutation({
        mutationFn: CartApi.clearCart,
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            ToastService.success(response.message || "Cart cleared successfully.");
        },
        onError: error => {
            ToastService.error(error instanceof Error ? error.message : "Failed to clear cart.");
        },
    });

    const handleQuantityChange = (item: CartItem, quantity: number) => {
        if (quantity < 1) {
            return;
        }

        updateItemMutation.mutate({
            itemId: item.id,
            quantity,
        });
    };

    const handleDelete = (item: CartItem) => {
        deleteItemMutation.mutate(item.id);
    };

    const handleClearCart = () => {
        clearCartMutation.mutate();
    };

    if (isError) {
        return (
            <Container>
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    <h1 className="mt-4 text-2xl font-bold">Unable to load cart</h1>
                    <p className="mt-2 text-muted-foreground">Something went wrong while loading your cart.</p>
                    <Button type="button" className="mt-5" onClick={() => queryClient.invalidateQueries({ queryKey: ["cart"] })}>
                        Try Again
                    </Button>
                </div>
            </Container>
        );
    }

    if (!items.length) {
        return (
            <Container>
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <ShoppingBag className="h-9 w-9 text-muted-foreground" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
                    <p className="mt-2 max-w-md text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    <Button className="mt-6">
                        <Link to="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <>
            <Helmet>
                <title>Shopping Cart - Ecommerce</title>
                <meta name="description" content="Review the products in your shopping cart before securely completing your purchase on Ecommerce." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {isLoading ? (
                <PageLoader />
            ) : (
                <Container>
                    <main className="w-full py-8 md:py-10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {items.length} {items.length === 1 ? "item" : "items"} in your cart
                                </p>
                            </div>
                            <Button type="button" variant="outline" disabled={clearCartMutation.isPending} onClick={handleClearCart}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                {clearCartMutation.isPending ? "Clearing..." : "Clear Cart"}
                            </Button>
                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                            <section className="space-y-4">
                                {items.map(item => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        isUpdating={updateItemMutation.isPending && updateItemMutation.variables?.itemId === item.id}
                                        isDeleting={deleteItemMutation.isPending && deleteItemMutation.variables === item.id}
                                        onQuantityChange={handleQuantityChange}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </section>
                            <CartSummary cart={cart} />
                        </div>
                    </main>
                </Container>
            )}
        </>
    );
};

const CartItemCard = ({ item, isUpdating, isDeleting, onQuantityChange, onDelete }: CartItemCardProps) => {
    return (
        <article className="rounded-xl border bg-card p-4 transition-colors duration-300 hover:border-primary/50 sm:p-5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Link to={`/product-details/${item.productSlug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted/30">
                    <img loading="lazy" src={item.productVariantImage} alt={item.productName} className="h-full w-full object-contain p-2" />
                </Link>

                <div className="min-w-0 flex-1">
                    <Link to={`/product-details/${item.productSlug}`} className="font-semibold transition-colors hover:text-primary">
                        {item.productName}
                    </Link>
                    <p className="mt-1 break-all text-xs text-muted-foreground">Variant ID: {item.productVariantId}</p>
                    <p className="mt-3 text-lg font-bold text-primary">₹{item.unitPrice.toLocaleString("en-IN")}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center overflow-hidden rounded-lg border">
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isUpdating || isDeleting || item.quantity <= 1}
                            onClick={() => onQuantityChange(item, item.quantity - 1)}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>

                        <span className="min-w-10 text-center text-sm font-semibold">{item.quantity}</span>

                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isUpdating || isDeleting}
                            onClick={() => onQuantityChange(item, item.quantity + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="font-bold">₹{item.totalPrice.toLocaleString("en-IN")}</p>

                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isUpdating || isDeleting}
                            aria-label="Remove item"
                            onClick={() => onDelete(item)}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
};

const CartSummary = ({ cart }: CartSummaryProps) => {
    const totalItems = cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

    return (
        <aside className="h-fit rounded-xl border bg-card p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>

                    <span className="font-medium">{totalItems}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>

                    <span className="font-medium">₹{(cart?.totalAmount ?? 0).toLocaleString("en-IN")}</span>
                </div>

                <div className="h-px bg-border" />

                <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>

                    <span className="text-xl font-bold text-primary">₹{(cart?.totalAmount ?? 0).toLocaleString("en-IN")}</span>
                </div>
            </div>
            <Button size="lg" className="mt-6 w-full">
                <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
        </aside>
    );
};

export default Cart;
