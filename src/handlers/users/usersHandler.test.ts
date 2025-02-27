// モック適用
import '@/services/users/usersServiceMock';

import { describe, it, expect, vi } from 'vitest';
import { ServerType } from '@hono/node-server';
import { randomPort, closeServer, createServer } from '@/utils/server';
import { mockUsersService } from '@/services/users/usersServiceMock';

let server: ServerType | null = null;
let port = 0;
let baseUrl = '';

// -------------------------------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------------------------------
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

beforeEach(() => {
    vi.clearAllMocks();
});

// -------------------------------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------------------------------
describe('Users Fetch Tests', () => {
    it('GET /api/users should return users data.', async () => {
        const res = await fetch(`${baseUrl}/api/users`);
        expect(res.status).toBe(200);
        
        const json = await res.json();

        expect(json).toEqual([
            { id: 1, name: 'User1', email: 'user1@example.com' },
            { id: 2, name: 'User2', email: 'user2@example.com' },
        ]);
    });

    it('GET /api/users should return error when service fails.', async () => {
        mockUsersService.getUsers.mockRejectedValue(new Error('ユーザー取得に失敗しました'));

        const res = await fetch(`${baseUrl}/api/users`);
        console.log(`res.status: ${res.status}`);
        expect(res.status).toBe(500);
    });
});
