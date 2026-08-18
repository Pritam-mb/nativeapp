import { createClient } from '@supabase/supabase-js';

const SupabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SupabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(SupabaseUrl!, SupabaseAnonKey!);

export function createclientsupabase( //we pass a fn given by clerk and this fn gives the jwt token of the user we pass this token here verify user
    gettoken: () => Promise<string | null>
) {
    return createClient(
        SupabaseUrl!,
        SupabaseAnonKey!,
        {

            async accessToken() {
                return gettoken() //ask clerk for jwt token and then pass to the supabase server
            }
        }
    )
}
// Your App: Asks Clerk for the ID Badge/jwt (gettoken()).
// Clerk: Hands your app the JWT Token (The Badge).
// Your App: Sends that JWT Token to Supabase every time you want to save a property.
// Supabase Database: Supabase un-pauses and fires the network request across the internet.

// When your Postgres database receives the request, the very first thing it does is look at the Authorization header. It sees the token, decrypts it, finds the user's clerk_id, and says, "Ah! I know exactly who this is. Let me check the RLS policies to see if they are allowed to read the properties table!"