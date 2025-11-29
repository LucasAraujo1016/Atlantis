import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bqnfnoxsmfckaqpapico.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbmZub3hzbWZja2FxcGFwaWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMDc5NzIsImV4cCI6MjA3OTY4Mzk3Mn0.nX93DIorDRFvj0wkzgozYWljEcjU87S5FDZQDp9uW7M';

export const supabase = createClient(supabaseUrl, supabaseKey);