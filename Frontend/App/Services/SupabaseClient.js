import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lgmwzmncolfoownyqpcg.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnbXd6bW5jb2xmb293bnlxcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1ODkwNjMsImV4cCI6MjA0OTE2NTA2M30.xACAaySz33JOKBTNB8-VGaxFeNv75fkUpDx_uNeUmLg"; // Ensure this is defined in your environment variables
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;