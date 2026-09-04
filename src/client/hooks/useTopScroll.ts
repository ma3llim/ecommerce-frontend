import { useEffect, type DependencyList } from "react";

const useTopScroll = (topPosition: number = 0, dependency: DependencyList = []) => {
    useEffect(() => {
        window.scrollTo({
            top: topPosition,
            behavior: "smooth",
        });
    }, dependency);
};

export default useTopScroll;
