import { Hono } from 'hono';
import type { Variables } from 'hono/types';
import type { Env } from '@/types/env';
import routers from '@/routers/routers';

// アプリケーション
const app = new Hono<{ Variables: Variables }>();

// ルーティングを追加
app.route('/api', routers);

// エクスポート
export default {
    fetch: (request: Request, env: Env, ctx: ExecutionContext) => {
        return app.fetch(request, env, ctx);
    },
};
