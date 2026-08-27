import { useEffect, useState } from "react";

const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [state, setState] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(value);
        }, delay);

        return () => {
            clearInterval(timer);
        };
    }, [value, delay]);

    return state;
};

export default useDebounce;
