import { Hono } from 'hono';
import { SupabaseClient } from '@supabase/supabase-js';
import type { HonoEnv } from '@/types/env';
import { createSupabaseClient } from '@/middleware/supabaseClient';
import { UsersRepository } from '@/repositories/users/usersRepository';
import { UsersService } from '@/services/users/usersService';
import { UsersHandler } from '@/handlers/users/usersHandler';

// ルーティング
const router = new Hono<HonoEnv>();

// ミドルウェア
router.use('*', async (c, next) => {
    const supabaseUrl = c.env.SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = c.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is not set');
    }

    // 依存性注入
    const supabase: SupabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);

    // リポジトリ
    const usersRepository = new UsersRepository(supabase);
    // サービス
    const usersService = new UsersService(usersRepository);
    // ハンドラ
    const usersHandler = new UsersHandler(usersService);

    // `usersHandler` をセット
    c.set('usersHandler', usersHandler);

    await next();
});

// 動作確認用
router.get('/hello', (c) => c.text('Hello, Hono!'));

// ユーザー取得
router.get('/users', async (c) => {
    const usersHandler = c.get('usersHandler') ?? null;
    if (!usersHandler) {
        return c.text('Error: usersHandler not found', 500);
    }
    return usersHandler.getUsers(c);
});

export default router;
