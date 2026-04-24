import { createClient } from '@supabase/supabase-js';

// Updated with the correct project ID
const supabaseUrl = 'https://bkgnczivzujkftojmnvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZ25jeml2enVqa2Z0b2ptbnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMjM2ODIsImV4cCI6MjA5MjU5OTY4Mn0.gg_T1KqrjoL6BmRRSOnjFmbr15SgeSgjx1HRRU5fHKQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
