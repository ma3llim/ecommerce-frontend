import { AlertCircle, Check, Heart, Info, Minus, Plus, Search, ShoppingBag, Star, X } from "lucide-react";

const DesignSystem = () => {
    return (
        <main className="min-h-screen bg-background p-6 text-foreground md:p-10">
            <div className="mx-auto max-w-7xl space-y-12">
                {/* Header */}
                <section>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Design System</p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight">E-Commerce UI Foundation</h1>

                    <p className="mt-3 max-w-2xl text-muted-foreground">Core visual components and design tokens used throughout the client application.</p>
                </section>

                {/* Colors */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Colors</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Semantic colors from the application theme.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        <ColorBox name="Primary" className="bg-primary text-primary-foreground" />

                        <ColorBox name="Secondary" className="bg-secondary text-secondary-foreground" />

                        <ColorBox name="Accent" className="bg-accent text-accent-foreground" />

                        <ColorBox name="Card" className="border border-border bg-card text-card-foreground" />

                        <ColorBox name="Muted" className="bg-muted text-muted-foreground" />

                        <ColorBox name="Destructive" className="bg-destructive text-white" />
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Typography</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Heading and body typography.</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Heading / Space Grotesk</p>

                        <h1 className="mt-2 text-4xl font-bold">Everything You Need.</h1>

                        <h2 className="mt-6 text-2xl font-semibold">Premium products, simple shopping.</h2>

                        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                            Inter is used for readable body content, descriptions, labels and supporting information across the store.
                        </p>
                    </div>
                </section>

                {/* Buttons */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Buttons</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Primary actions and secondary actions.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
                        <button className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                            Shop Now
                        </button>

                        <button className="rounded-xl border border-border bg-background px-5 py-3 font-semibold text-foreground transition-colors hover:bg-muted">
                            View Details
                        </button>

                        <button className="rounded-xl bg-secondary px-5 py-3 font-semibold text-secondary-foreground transition-colors hover:bg-muted">
                            Secondary
                        </button>

                        <button className="rounded-xl bg-destructive px-5 py-3 font-semibold text-white transition-opacity hover:opacity-90">Delete</button>

                        <button
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background transition-colors hover:bg-muted"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        <button
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                            aria-label="Shopping bag"
                        >
                            <ShoppingBag className="h-5 w-5" />
                        </button>
                    </div>
                </section>

                {/* Form Controls */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Form Controls</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Inputs and common form elements.</p>
                    </div>

                    <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search Products</label>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>
                </section>

                {/* Cards */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Cards</h2>
                        <p className="mt-1 text-sm text-muted-foreground">Surfaces used for products, content and information.</p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <ShoppingBag className="h-6 w-6 text-primary" />

                            <h3 className="mt-4 text-lg font-semibold">Product Card</h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">Clean elevated surface for product information.</p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <Star className="h-6 w-6 text-accent-foreground" />

                            <h3 className="mt-4 text-lg font-semibold">Review Card</h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">Used for ratings, reviews and customer feedback.</p>
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                            <Heart className="h-6 w-6 text-primary" />

                            <h3 className="mt-4 text-lg font-semibold">Feature Card</h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">Supporting content with a subtle visual hierarchy.</p>
                        </div>
                    </div>
                </section>

                {/* Badges */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Badges</h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">New</span>

                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">Popular</span>

                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">Featured</span>

                        <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-white">Sale</span>
                    </div>
                </section>

                {/* Alerts */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Feedback</h2>
                    </div>

                    <div className="space-y-3">
                        <Feedback
                            icon={<Check />}
                            title="Success"
                            text="Your order has been placed successfully."
                            className="border-primary/20 bg-primary/5 text-primary"
                        />

                        <Feedback
                            icon={<Info />}
                            title="Information"
                            text="Free delivery is available on orders above ₹999."
                            className="border-border bg-muted text-muted-foreground"
                        />

                        <Feedback
                            icon={<AlertCircle />}
                            title="Warning"
                            text="Only 2 items are remaining in stock."
                            className="border-accent/30 bg-accent/20 text-accent-foreground"
                        />

                        <Feedback
                            icon={<X />}
                            title="Error"
                            text="Something went wrong. Please try again."
                            className="border-destructive/20 bg-destructive/5 text-destructive"
                        />
                    </div>
                </section>

                {/* Quantity */}
                <section className="space-y-5">
                    <div>
                        <h2 className="text-2xl font-semibold">Product Controls</h2>
                    </div>

                    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-border bg-card">
                        <button className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted" aria-label="Decrease quantity">
                            <Minus className="h-4 w-4" />
                        </button>

                        <span className="flex h-10 min-w-12 items-center justify-center border-x border-border text-sm font-semibold">1</span>

                        <button className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted" aria-label="Increase quantity">
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

interface ColorBoxProps {
    name: string;
    className: string;
}

const ColorBox = ({ name, className }: ColorBoxProps) => {
    return (
        <div className={`flex h-28 items-end rounded-2xl p-4 shadow-sm ${className}`}>
            <span className="text-sm font-semibold">{name}</span>
        </div>
    );
};

interface FeedbackProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    className: string;
}

const Feedback = ({ icon, title, text, className }: FeedbackProps) => {
    return (
        <div className={`flex items-start gap-3 rounded-xl border p-4 ${className}`}>
            <div className="[&>svg]:h-5 [&>svg]:w-5">{icon}</div>

            <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm opacity-80">{text}</p>
            </div>
        </div>
    );
};

export default DesignSystem;
