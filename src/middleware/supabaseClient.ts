import { createClient, SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabaseクライアントを作成する
 * @param url - SupabaseのURL
 * @param key - Supabaseのキー
 * @returns Supabaseクライアント
 */
export const createSupabaseClient = (url: string, key: string): SupabaseClient => {
    return createClient(url, key);
};
