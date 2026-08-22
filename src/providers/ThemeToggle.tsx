import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();

    const isDark = resolvedTheme === "dark";

    const handleThemeToggle = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={handleThemeToggle}
            className="inline-flex items-center justify-center rounded-full p-2 text-gray-950 transition-colors duration-300 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/10"
        >
            {isDark ? <Sun size={20} strokeWidth={1.5} aria-hidden="true" /> : <Moon size={20} strokeWidth={1.5} aria-hidden="true" />}
        </button>
    );
};

export default ThemeToggle;
