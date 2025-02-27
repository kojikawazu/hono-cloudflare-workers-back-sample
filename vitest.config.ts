import { defineConfig } from 'vitest/config';
import path from 'path';

/**
 * Vitest の設定
 */
export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        setupFiles: ['./src/tests/setup.ts'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
