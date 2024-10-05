import { createClient } from '@supabase/supabase-js'
import { type Database } from '../../database.types'

import { PRIVATE_SUPABASE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

export const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_KEY)