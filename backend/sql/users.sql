CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  software_background TEXT DEFAULT '',
  hardware_background TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);
