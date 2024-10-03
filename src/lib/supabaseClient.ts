import { createClient } from '@supabase/supabase-js'
import { type Database } from '../../database.types'

import { PRIVATE_SUPABASE_URL, PRIVATE_SUPABASE_KEY } from "$env/static/private";

export const supabase = createClient<Database>(PRIVATE_SUPABASE_URL, PRIVATE_SUPABASE_KEY)