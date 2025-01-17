import { createClient } from '@supabase/supabase-js';
import env from "dotenv";

env.config();

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;