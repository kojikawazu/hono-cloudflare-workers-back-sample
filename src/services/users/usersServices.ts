import { UsersRepository } from '@/repositories/users/usersRepository';

export class UsersServices {
    private usersRepository: UsersRepository;

    /**
     * コンストラクタ
     * @param usersRepository ユーザーリポジトリ
     */
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    /**
     * ユーザー一覧を取得する
     * @returns ユーザー一覧
     */
    async getUsers() {
        try {
            const users = await this.usersRepository.getUsers();
            return users;
        } catch (error) {
            console.log(`service: getUsers: error: ${error}`);
            throw error;
        }
    }
}
