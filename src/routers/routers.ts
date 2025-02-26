import { Hono } from "hono";
import { SupabaseClient } from "@supabase/supabase-js";
import type { HonoEnv } from "@/types/env";
import { createSupabaseClient } from "@/middleware/supabaseClient";
import { UsersRepository } from "@/repositories/users/usersRepository";
import { UsersServices } from "@/services/users/usersServices";
import { UsersHandler } from "@/handlers/users/usersHandler";

// ルーティング
const router = new Hono<HonoEnv>();

// ミドルウェア
router.use("*", async (c, next) => {
    // 依存性注入
    const supabase: SupabaseClient = createSupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_ANON_KEY);
    // リポジトリ
    const usersRepository = new UsersRepository(supabase);
    // サービス
    const usersServices = new UsersServices(usersRepository);
    // ハンドラ
    const usersHandler = new UsersHandler(usersServices);

    // `usersHandler` をセット
    c.set("usersHandler", usersHandler);

    await next();
});

// ユーザー取得
router.get("/users", async (c) => {
    const usersHandler = c.get("usersHandler") ?? null;
    if (!usersHandler) {
      return c.text("Error: usersHandler not found", 500);
    }
    return usersHandler.getUsers(c);
});

export default router;