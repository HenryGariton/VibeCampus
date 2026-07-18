-- ============================================================
-- VibeCampus (意境校园) RLS 策略
-- 改造后浏览器直连 Supabase，需要 RLS 控制权限
-- 在 Supabase 后台 → SQL Editor 粘贴执行（仅需一次）
-- ============================================================

-- 1. 启用 RLS（表级开关）
ALTER TABLE IF EXISTS vc_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS vc_users ENABLE ROW LEVEL SECURITY;

-- 2. vc_works 表策略

-- 任何人（包括未登录访客）都能查看所有作品
DROP POLICY IF EXISTS "任何人都能查看作品" ON vc_works;
CREATE POLICY "任何人都能查看作品" ON vc_works
  FOR SELECT USING (true);

-- 任何人都能发布作品（匿名访客也可以创建）
DROP POLICY IF EXISTS "访客可以发布作品" ON vc_works;
CREATE POLICY "访客可以发布作品" ON vc_works
  FOR INSERT WITH CHECK (true);

-- 任何人都能更新作品（评分和评论通过更新 JSONB 列实现）
DROP POLICY IF EXISTS "访客可以更新作品" ON vc_works;
CREATE POLICY "访客可以更新作品" ON vc_works
  FOR UPDATE USING (true);

-- 3. vc_users 表策略

-- 任何人都能查看用户信息（作者展示用）
DROP POLICY IF EXISTS "任何人都能查看用户" ON vc_users;
CREATE POLICY "任何人都能查看用户" ON vc_users
  FOR SELECT USING (true);

-- ============================================================
-- 说明：以上策略为 MVP 阶段最小权限方案。
-- 生产环境建议改用 auth.uid() 配合 Supabase Anonymous Auth
-- 实现评分去重和作者身份绑定。
-- ============================================================
