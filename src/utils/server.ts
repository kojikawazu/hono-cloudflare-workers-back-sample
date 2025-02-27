import { serve, ServerType } from '@hono/node-server';
import app from '@/index';

/**
 * ランダムなポートを生成する
 * @returns ランダムなポート
 */
export function randomPort() {
    return Math.floor(Math.random() * (65535 - 1024)) + 1024;
}

/**
 * サーバーを作成する
 * @param port ポート
 * @returns サーバー
 */
export function createServer(port: number) {
    const server = serve({
        fetch: (request) =>
            app.fetch(
                request,
                {
                    SUPABASE_URL: process.env.SUPABASE_URL || '',
                    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
                },
                {
                    waitUntil: () => {},
                    passThroughOnException: () => {},
                    props: {},
                },
            ),
        port,
    });

    return server;
}

/**
 * サーバーを閉じる
 * @param server サーバー
 */
export function closeServer(server: ServerType) {
    if (server) {
        try {
            server.close();
            console.log('テストサーバーが正常に終了しました');
        } catch (error) {
            console.error('サーバーの停止に失敗しました:', error);
        }
    }
}
