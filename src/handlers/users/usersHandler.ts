import { Context } from 'hono';
import { UsersService } from '@/services/users/usersService';

/**
 * ユーザー関連のハンドラー
 */
export class UsersHandler {
    private usersService: UsersService;

    /**
     * コンストラクタ
     * @param usersServices ユーザーサービス
     */
    constructor(usersService: UsersService) {
        this.usersService = usersService;
    }

    /**
     * ユーザー一覧を取得する
     * @returns ユーザー一覧
     */
    getUsers = async (c: Context) => {
        try {
            const users = await this.usersService.getUsers();
            return c.json(users);
        } catch (error) {
            console.log(`handler: getUsers: error: ${error}`);
            return c.json({ error: 'Internal Server Error' }, 500);
        }
    };
}
