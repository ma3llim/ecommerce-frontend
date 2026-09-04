import { useEffect } from "react";

const useTopScroll = (topPosition: number = 0, dependency?: unknown) => {
    useEffect(() => {
        window.scrollTo({
            top: topPosition,
            behavior: "smooth",
        });
    }, [dependency, topPosition]);
};

export default useTopScroll;
