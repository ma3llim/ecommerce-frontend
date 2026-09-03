import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
            open: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
    build: {
        minify: "oxc",
        target: "esnext",
        cssCodeSplit: true,
        chunkSizeWarningLimit: 500,
        rolldownOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules/react")) {
                        return "react";
                    }

                    if (id.includes("node_modules/@tanstack")) {
                        return "query";
                    }

                    if (id.includes("node_modules/framer-motion")) {
                        return "motion";
                    }

                    if (id.includes("node_modules/react-hook-form") || id.includes("node_modules/@hookform") || id.includes("node_modules/yup")) {
                        return "forms";
                    }

                    if (id.includes("node_modules/swiper")) {
                        return "swiper";
                    }

                    if (id.includes("node_modules/recharts")) {
                        return "charts";
                    }

                    if (id.includes("node_modules/@dnd-kit")) {
                        return "dnd";
                    }
                },
            },
        },
    },
});
