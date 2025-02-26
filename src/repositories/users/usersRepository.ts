import { SupabaseClient } from '@supabase/supabase-js';

/**
 * ユーザーリポジトリ
 */
export class UsersRepository {
    private supabase: SupabaseClient;

    /**
     * コンストラクタ
     * @param supabase Supabaseクライアント
     */
    constructor(supabase: SupabaseClient) {
        this.supabase = supabase;
    }

    /**
     * ユーザー一覧を取得する
     * @returns ユーザー一覧
     */
    async getUsers() {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            // パスワードを省く
            return data.map((user) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
        } catch (error) {
            console.log(`repository: getUsers: error: ${error}`);
            throw error;
        }
    }
}
