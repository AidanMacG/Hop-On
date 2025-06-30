import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tteceaedbmsbqeqqhrln.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0ZWNlYWVkYm1zYnFlcXFocmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTE0NTksImV4cCI6MjA2NjA4NzQ1OX0.KqtpcP6i-GU9FH74N38KpB_HrNBIEIR4uQXWk-7hGDc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);