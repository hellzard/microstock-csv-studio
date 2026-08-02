const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env.local
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Supabase credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing connection to Supabase...');
  console.log('URL:', supabaseUrl);
  
  try {
    // Try to select from projects table to see if schema exists
    const { data, error } = await supabase.from('projects').select('id').limit(1);
    
    if (error) {
      console.error('Connection failed or table does not exist:', error.message);
      if (error.code === '42P01') {
        console.error('The "projects" table is missing. Did you run the SQL migration?');
      }
      process.exit(1);
    }
    
    console.log('Success! Supabase connection is working and the schema is set up.');
    console.log('Data returned:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

testConnection();
