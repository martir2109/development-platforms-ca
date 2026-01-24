import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iwbnvybjoiuyxanrjsir.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Ym52eWJqb2l1eXhhbnJqc2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTk4NTMsImV4cCI6MjA4Mzc5NTg1M30.OgmoUS3Xp1e7NJ94tS5P39V9ENNC18VMFOk6ZnfewwY";

export const supabase = createClient(supabaseUrl, supabaseKey);
