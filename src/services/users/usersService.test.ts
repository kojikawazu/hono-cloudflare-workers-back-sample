import { mockUsersRepository, mockUsersData } from '@/repositories/users/usersRepositoryMock';
import { UsersRepository } from '@/repositories/users/usersRepository';
import { UsersService } from '@/services/users/usersService';

let usersService: UsersService;

// -------------------------------------------------------------------------------------------------
// Setup
// -------------------------------------------------------------------------------------------------
beforeEach(() => {
    usersService = new UsersService(mockUsersRepository as unknown as UsersRepository);
    vi.clearAllMocks();
});

// -------------------------------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------------------------------
describe('UsersService Tests', () => {
    it('getUsers should return user list', async () => {
        const users = await usersService.getUsers();

        expect(users).toEqual(mockUsersData);
        expect(mockUsersRepository.getUsers).toHaveBeenCalledTimes(1);
    });

    it('getUsers should throw an error when repository fails', async () => {
        mockUsersRepository.getUsers.mockRejectedValue(new Error('ユーザー取得に失敗しました'));

        await expect(usersService.getUsers()).rejects.toThrow('ユーザー取得に失敗しました');
        expect(mockUsersRepository.getUsers).toHaveBeenCalledTimes(1);
    });
});