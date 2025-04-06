/*
  # Enable Row Level Security for user_profiles table

  1. Security
    - Enable RLS on `user_profiles` table
    - Ensure existing policies work correctly

  This migration enables Row Level Security (RLS) on the user_profiles table.
  The table already has policies defined, but RLS is not currently enabled.
  This migration simply enables RLS to make the existing policies take effect.
*/

-- Enable Row Level Security on the user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;