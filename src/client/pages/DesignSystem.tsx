import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";

const DesignSystem = () => {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
                {/* Header */}
                <section className="space-y-3">
                    <p className="text-sm font-medium text-primary">E-COMMERCE DESIGN SYSTEM</p>

                    <h1 className="text-4xl font-bold tracking-tight">Design System Playground</h1>

                    <p className="max-w-2xl text-muted-foreground">A testing page for colors, typography, components, product cards, states, and light/dark themes.</p>
                </section>

                {/* Colors */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Colors</h2>
                        <p className="text-sm text-muted-foreground">Semantic colors used throughout the application.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <ColorCard name="Primary" className="bg-primary text-primary-foreground" />

                        <ColorCard name="Secondary" className="bg-secondary text-secondary-foreground" />

                        <ColorCard name="Accent" className="bg-accent text-accent-foreground" />

                        <ColorCard name="Muted" className="bg-muted text-muted-foreground" />

                        <ColorCard name="Card" className="border bg-card text-card-foreground" />

                        <ColorCard name="Destructive" className="bg-destructive text-destructive-foreground" />

                        <ColorCard name="Background" className="border bg-background text-foreground" />

                        <ColorCard name="Foreground" className="bg-foreground text-background" />
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Typography</h2>
                        <p className="text-sm text-muted-foreground">Basic typography hierarchy for the storefront.</p>
                    </div>

                    <div className="space-y-4 rounded-xl border bg-card p-6">
                        <h1 className="text-4xl font-bold">Heading One</h1>

                        <h2 className="text-3xl font-semibold">Heading Two</h2>

                        <h3 className="text-2xl font-semibold">Heading Three</h3>

                        <p className="text-base">This is normal body text for product descriptions, checkout information, and general content.</p>

                        <p className="text-sm text-muted-foreground">This is muted text for supporting information.</p>

                        <p className="text-xs text-muted-foreground">Small text for metadata.</p>
                    </div>
                </section>

                {/* Buttons */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Buttons</h2>
                        <p className="text-sm text-muted-foreground">Common actions used throughout the store.</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">Add to Cart</button>

                        <button className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-opacity hover:opacity-80">Buy Now</button>

                        <button className="rounded-lg border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted">Cancel</button>

                        <button className="rounded-lg bg-destructive px-5 py-2.5 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90">Delete</button>

                        <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground opacity-50">Disabled</button>
                    </div>
                </section>

                {/* Product Card */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Product Card</h2>

                        <p className="text-sm text-muted-foreground">Example storefront product presentation.</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </section>

                {/* Product Detail */}
                <section className="space-y-5">
                    <h2 className="text-2xl font-semibold">Product Information</h2>

                    <div className="grid gap-8 rounded-2xl border bg-card p-6 lg:grid-cols-2">
                        <div className="aspect-square rounded-xl bg-muted" />

                        <div className="flex flex-col justify-center space-y-5">
                            <div className="space-y-2">
                                <span className="text-sm font-medium text-primary">Premium Collection</span>

                                <h3 className="text-3xl font-bold">Premium Product Name</h3>

                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-500">
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                        <Star size={16} fill="currentColor" />
                                    </div>

                                    <span className="text-sm text-muted-foreground">4.8 (124 reviews)</span>
                                </div>
                            </div>

                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-bold">₹2,499</span>

                                <span className="text-lg text-muted-foreground line-through">₹3,499</span>

                                <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">29% OFF</span>
                            </div>

                            <p className="text-muted-foreground">A short product description demonstrating how your ecommerce content will look using the design tokens.</p>

                            <div className="flex items-center gap-3">
                                <button className="flex h-11 w-11 items-center justify-center rounded-lg border hover:bg-muted">
                                    <Minus size={16} />
                                </button>

                                <span className="min-w-8 text-center font-medium">1</span>

                                <button className="flex h-11 w-11 items-center justify-center rounded-lg border hover:bg-muted">
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground">
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>

                                <button className="flex h-12 w-12 items-center justify-center rounded-lg border hover:bg-muted">
                                    <Heart size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Inputs */}
                <section className="space-y-5">
                    <h2 className="text-2xl font-semibold">Form Elements</h2>

                    <div className="grid gap-6 rounded-xl border bg-card p-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="search" className="text-sm font-medium">
                                Search Products
                            </label>

                            <input
                                id="search"
                                type="search"
                                placeholder="Search products..."
                                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                </section>

                {/* Status */}
                <section className="space-y-5">
                    <h2 className="text-2xl font-semibold">Status & Badges</h2>

                    <div className="flex flex-wrap gap-3">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">New</span>

                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">In Stock</span>

                        <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-600 dark:text-yellow-400">Low Stock</span>

                        <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">Out of Stock</span>

                        <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">Draft</span>
                    </div>
                </section>
            </div>
        </main>
    );
};

interface ColorCardProps {
    name: string;
    className: string;
}

const ColorCard = ({ name, className }: ColorCardProps) => {
    return (
        <div className={`flex h-28 items-end rounded-xl p-4 ${className}`}>
            <span className="text-sm font-medium">{name}</span>
        </div>
    );
};

const ProductCard = () => {
    return (
        <article className="group overflow-hidden rounded-xl border bg-card text-card-foreground">
            <div className="relative aspect-square bg-muted">
                <div className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">New</div>

                <button type="button" aria-label="Add to wishlist" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur">
                    <Heart size={16} />
                </button>
            </div>

            <div className="space-y-3 p-4">
                <div>
                    <h3 className="font-medium">Premium Product</h3>

                    <p className="mt-1 text-sm text-muted-foreground">Product description</p>
                </div>

                <div className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-500 text-amber-500" />

                    <span className="text-sm font-medium">4.8</span>

                    <span className="text-xs text-muted-foreground">(124)</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₹2,499</span>

                    <button
                        type="button"
                        aria-label="Add product to cart"
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default DesignSystem;
