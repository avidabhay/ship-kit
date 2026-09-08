import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
            // Include source even when no test imports it.
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.{test,spec}.ts", "src/**/*.d.ts"],
            reportsDirectory: "./coverage",
            reporter: ["text", "html", "json-summary"],
            thresholds: {
                statements: 100,
                branches: 100,
                functions: 100,
                lines: 100,
            },
        },
    },
});
