import { UsersHandler } from '@/handlers/users/usersHandler';

export type Env = {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
};

export type Variables = {
    usersHandler: UsersHandler;
};

export type HonoEnv = {
    Variables: Variables;
    Bindings: Env;
};
