import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/client/api/Product.api";

const useSearchQuery = (query: string, delay: number = 500) => {
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // Debounce the query to reduce API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query.trim());
        }, delay);

        return () => clearTimeout(timer);
    }, [query, delay]);

    const { data, isFetching } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn: () => ProductApi.search(debouncedQuery),
        enabled: !!debouncedQuery,
        staleTime: 30000,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return { data, isFetching };
};

export default useSearchQuery;
