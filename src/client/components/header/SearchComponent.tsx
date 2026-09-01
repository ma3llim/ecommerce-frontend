import useSearchQuery from "@/hooks/useSearchQuery";
import { capitalizeWords } from "@/utils/TextUtils";
import { Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { searchProduct } from "@/client/types/Product.types";

interface SearchComponentProps {
    topMargin?: string;
}

const SearchComponent = ({ topMargin }: SearchComponentProps) => {
    const id = useId();
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const { data, isFetching } = useSearchQuery(query);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!searchRef.current) {
                return;
            }
            const target = event.target as Node;

            if (searchRef.current && !searchRef.current.contains(target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const products = data?.data?.content;

    return (
        <div ref={searchRef} className="relative">
            <div className="mx-auto w-full">
                <div className="flex">
                    <div className="relative w-full">
                        <input
                            type="text"
                            name={id}
                            id={id}
                            value={query}
                            autoComplete="off"
                            placeholder="Search products..."
                            onFocus={() => {
                                if (query.trim()) {
                                    setShowDropdown(true);
                                }
                            }}
                            onChange={event => {
                                setQuery(event.target.value);
                                setShowDropdown(true);
                            }}
                            className="block w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 sm:text-base"
                        />

                        <button
                            type="button"
                            aria-label="Search"
                            className="absolute inset-y-0 right-0 flex items-center rounded-e-lg bg-primary px-4 text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showDropdown && query.trim() && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className={`absolute left-0 right-0 z-50 mx-auto mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg ${topMargin ?? ""}`}
                    >
                        {isFetching ? (
                            <div className="px-4 py-3 text-sm text-muted-foreground">Searching...</div>
                        ) : (products?.length ?? 0) > 0 ? (
                            <div className="flex max-h-80 flex-col overflow-y-auto">
                                {products?.map((product: searchProduct) => (
                                    <Link
                                        key={product?.productId}
                                        to={`/product-details/${product?.slug}`}
                                        onClick={() => {
                                            setQuery("");
                                            setShowDropdown(false);
                                        }}
                                        className="flex items-center gap-3 border-b border-border px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

                                        <span>{capitalizeWords(product?.name)}</span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-3 text-sm text-muted-foreground">No products found.</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchComponent;
