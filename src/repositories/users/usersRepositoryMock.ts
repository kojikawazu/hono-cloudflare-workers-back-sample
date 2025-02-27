import { vi } from 'vitest';

// モックデータ
export const mockUsersData = [
    { id: 1, name: 'User1', email: 'user1@example.com' },
    { id: 2, name: 'User2', email: 'user2@example.com' },
];

// `UsersRepository` のモック
export const mockUsersRepository = {
    getUsers: vi.fn(async () => mockUsersData),
};

// `UsersRepository` をモック化
vi.mock('@/repositories/users/usersRepository', () => ({
    UsersRepository: vi.fn().mockImplementation(() => mockUsersRepository),
}));
