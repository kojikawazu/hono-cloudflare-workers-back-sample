import { Context } from "hono";
import { UsersServices } from "@/services/users/usersServices";

/**
 * ユーザー関連のハンドラー
 */
export class UsersHandler {
    private usersServices: UsersServices;

    /**
     * コンストラクタ
     * @param usersServices ユーザーサービス
     */
    constructor(usersServices: UsersServices) {
        this.usersServices = usersServices;
    }

    /**
     * ユーザー一覧を取得する
     * @returns ユーザー一覧
     */
    getUsers = async (c: Context) => {
        try {
            const users = await this.usersServices.getUsers();
            return c.json(users);
        } catch (error) {
            console.log(`handler: getUsers: error: ${error}`);
            return c.json({ error: "Internal Server Error" }, 500);
        }
    }
}