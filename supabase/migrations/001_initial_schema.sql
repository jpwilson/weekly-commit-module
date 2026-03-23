-- ============================================================
-- ST6 Weekly Commit Module — Database Schema
-- ============================================================

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'INDIVIDUAL' CHECK (role IN ('INDIVIDUAL', 'MANAGER', 'ADMIN')),
  title TEXT NOT NULL DEFAULT '',
  avatar_initials TEXT NOT NULL DEFAULT '',
  manager_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RCDO Hierarchy
CREATE TABLE rally_cries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  org_id TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE defining_objectives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rally_cry_id UUID NOT NULL REFERENCES rally_cries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE outcomes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  defining_objective_id UUID NOT NULL REFERENCES defining_objectives(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  metric TEXT,
  target_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Weeks
CREATE TABLE weeks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 53),
  year INTEGER NOT NULL CHECK (year BETWEEN 2020 AND 2100),
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'LOCKED', 'RECONCILING', 'RECONCILED')),
  locked_at TIMESTAMPTZ,
  reconciled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_number, year)
);

-- Commits
CREATE TABLE commits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  week_id UUID NOT NULL REFERENCES weeks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  outcome_id UUID REFERENCES outcomes(id),
  priority INTEGER NOT NULL DEFAULT 2 CHECK (priority BETWEEN 1 AND 4),
  category TEXT NOT NULL DEFAULT 'FEATURE' CHECK (category IN ('CRITICAL_OPS', 'PERFORMANCE', 'MAINTENANCE', 'FEATURE', 'RESEARCH', 'COLLABORATION')),
  estimated_hours NUMERIC,
  sort_order INTEGER NOT NULL DEFAULT 0,
  carried_from_commit_id UUID REFERENCES commits(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reconciliations
CREATE TABLE reconciliations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  commit_id UUID NOT NULL REFERENCES commits(id) ON DELETE CASCADE,
  week_id UUID NOT NULL REFERENCES weeks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  outcome TEXT NOT NULL DEFAULT 'DONE' CHECK (outcome IN ('DONE', 'CARRY_FORWARD')),
  notes TEXT,
  actual_hours NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(commit_id, week_id)
);

-- Analytics events
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  page_path TEXT,
  user_id UUID REFERENCES profiles(id),
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_weeks_user ON weeks(user_id, year, week_number);
CREATE INDEX idx_commits_week ON commits(week_id);
CREATE INDEX idx_commits_user ON commits(user_id);
CREATE INDEX idx_reconciliations_week ON reconciliations(week_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);
CREATE INDEX idx_analytics_event ON analytics_events(event_name);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE commits ENABLE ROW LEVEL SECURITY;
ALTER TABLE reconciliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rally_cries ENABLE ROW LEVEL SECURITY;
ALTER TABLE defining_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE outcomes ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: users can read all profiles (for team views), update own
CREATE POLICY "Profiles are viewable by authenticated users" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RCDO: readable by all authenticated
CREATE POLICY "RCDO readable by authenticated" ON rally_cries
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "DO readable by authenticated" ON defining_objectives
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Outcomes readable by authenticated" ON outcomes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Weeks: users see own + team members if manager
CREATE POLICY "Users see own weeks" ON weeks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Managers see team weeks" ON weeks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = weeks.user_id AND manager_id = auth.uid()
    )
  );
CREATE POLICY "Users manage own weeks" ON weeks
  FOR ALL USING (auth.uid() = user_id);

-- Commits: same as weeks
CREATE POLICY "Users see own commits" ON commits
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Managers see team commits" ON commits
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = commits.user_id AND manager_id = auth.uid()
    )
  );
CREATE POLICY "Users manage own commits" ON commits
  FOR ALL USING (auth.uid() = user_id);

-- Reconciliations: same pattern
CREATE POLICY "Users see own reconciliations" ON reconciliations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Managers see team reconciliations" ON reconciliations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = reconciliations.user_id AND manager_id = auth.uid()
    )
  );
CREATE POLICY "Users manage own reconciliations" ON reconciliations
  FOR ALL USING (auth.uid() = user_id);

-- Analytics: users can insert, admins/managers can read all
CREATE POLICY "Users can insert analytics" ON analytics_events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can read own analytics" ON analytics_events
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_weeks_updated_at
  BEFORE UPDATE ON weeks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_commits_updated_at
  BEFORE UPDATE ON commits FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_reconciliations_updated_at
  BEFORE UPDATE ON reconciliations FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_initials)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    UPPER(LEFT(COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 1) ||
          LEFT(SPLIT_PART(COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), ' ', 2), 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();
