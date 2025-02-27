import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ServerType } from '@hono/node-server';
import { randomPort, closeServer, createServer } from '@/utils/server';

let server: ServerType | null = null;
let port = 0;
let baseUrl = '';

// ---------------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------------
beforeAll(async () => {
    do {
        port = randomPort();
        baseUrl = `http://localhost:${port}`;
        server = createServer(port);
    } while (server === null);

    console.log(`テストサーバーが起動しました: ${baseUrl}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
});

afterAll(() => {
    if (server) {
        closeServer(server);
    }
});

// ---------------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------------
describe('Hono Router Tests', () => {
    it("GET /api/hello should return 'Hello, Hono!'", async () => {
        const res = await fetch(`${baseUrl}/api/hello`);
        expect(res.status).toBe(200);
        expect(await res.text()).toBe('Hello, Hono!');
    });
});
