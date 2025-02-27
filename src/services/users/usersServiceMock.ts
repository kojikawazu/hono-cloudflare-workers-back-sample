import { vi } from 'vitest';
import { mockUsersRepository } from '@/repositories/users/usersRepositoryMock';

// `UsersService` のモック
export const mockUsersService = {
    getUsers: vi.fn(async () => mockUsersRepository.getUsers()),
};

// `UsersService` をモック化し、モックリポジトリを使用するように設定
vi.mock('@/services/users/usersService', () => ({
    UsersService: vi.fn().mockImplementation(() => mockUsersService),
}));
