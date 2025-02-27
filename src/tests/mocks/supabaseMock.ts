import { vi } from 'vitest';

// SupabaseClient のモック
export const mockSupabaseClient = {
    from: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({ data: [], error: null })),
    })),
};

// `createSupabaseClient` をモック化
vi.mock('@/middleware/supabaseClient', () => ({
    createSupabaseClient: vi.fn(() => mockSupabaseClient),
}));
