/* ============================================================
   意境校园 VibeCampus — Application Logic
   ============================================================ */

// 安全注册 GSAP 插件
if (typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Mock Data ---

const USERS = {
  student1: { id: 'student1', name: '张三', avatar: '张', role: '学生', major: '计算机科学与技术',
    bio: '热爱用 AI 把奇思妙想变成能跑起来的小工具，欢迎一起交流～',
    contact: { wechat: 'zhangsan_cs', qq: '10001234', email: 'zhangsan@csust.edu.cn' } },
  student2: { id: 'student2', name: '陈小明', avatar: '陈', role: '学生', major: '软件工程',
    bio: '专注前端与交互设计，喜欢把复杂的东西做得简单好用。',
    contact: { wechat: 'chenxm_dev', qq: '10005678' } },
  student3: { id: 'student3', name: '刘思源', avatar: '刘', role: '学生', major: '人工智能',
    bio: 'SynthWave IDE 作者，痴迷音乐与代码的跨界创作。',
    contact: { wechat: 'liusiyuan_ai', email: 'liusiyuan@csust.edu.cn' } },
  student4: { id: 'student4', name: '赵灵儿', avatar: '赵', role: '学生', major: '数字媒体艺术',
    bio: '用 AI 做视觉与叙事，相信每个人都能成为创造者。',
    contact: { wechat: 'zhaoling_art', qq: '10009012' } },
  student5: { id: 'student5', name: '周杰', avatar: '周', role: '学生', major: '电子信息工程',
    bio: '硬件 + AI 爱好者，喜欢做能动手的小玩意儿。',
    contact: { wechat: 'zhoujie_hw', email: 'zhoujie@csust.edu.cn' } },
};

// SVG preview placeholders
const PREVIEWS = [
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff6b4a"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><circle cx="450" cy="100" r="180" fill="rgba(255,255,255,0.05)"/><rect x="80" y="140" width="300" height="16" rx="8" fill="rgba(255,255,255,0.15)"/><rect x="80" y="170" width="220" height="16" rx="8" fill="rgba(255,255,255,0.08)"/><rect x="80" y="200" width="160" height="10" rx="5" fill="rgba(255,255,255,0.06)"/><text x="80" y="280" fill="rgba(255,255,255,0.25)" font-family="monospace" font-size="14">{ ... }</text></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><circle cx="120" cy="280" r="200" fill="rgba(255,255,255,0.06)"/><rect x="300" y="120" width="250" height="12" rx="6" fill="rgba(255,255,255,0.12)"/><rect x="300" y="148" width="180" height="12" rx="6" fill="rgba(255,255,255,0.06)"/><rect x="300" y="180" width="220" height="80" rx="6" fill="rgba(255,255,255,0.04)"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#047857"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="50" y="60" width="500" height="255" rx="12" fill="rgba(0,0,0,0.15)"/><line x1="70" y1="100" x2="530" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="90" cy="88" r="5" fill="#f87171"/><circle cx="108" cy="88" r="5" fill="#fbbf24"/><circle cx="126" cy="88" r="5" fill="#4ade80"/><text x="90" y="150" fill="rgba(255,255,255,0.3)" font-family="monospace" font-size="13">import { vibe } from "campus"</text><text x="90" y="180" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="13">const code = "createMagic()"</text></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#d97706"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><circle cx="200" cy="180" r="120" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3"/><circle cx="200" cy="180" r="90" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-dasharray="8 4"/><circle cx="400" cy="180" r="60" fill="rgba(255,255,255,0.06)"/><line x1="320" y1="180" x2="380" y2="180" stroke="rgba(255,255,255,0.15)" stroke-width="2"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#db2777"/><stop offset="100%" stop-color="#831843"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="0" y="0" width="600" height="375" fill="url(#p)" opacity="0.05"/><defs><pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="white"/></pattern></defs><rect x="200" y="120" width="200" height="135" rx="8" fill="rgba(255,255,255,0.08)"/><rect x="220" y="140" width="160" height="8" rx="4" fill="rgba(255,255,255,0.12)"/><rect x="220" y="158" width="100" height="8" rx="4" fill="rgba(255,255,255,0.06)"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0ea5e9"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><polygon points="300,50 550,250 300,325 50,250" fill="rgba(255,255,255,0.04)"/><polygon points="300,80 500,240 300,295 100,240" fill="rgba(255,255,255,0.04)"/><text x="300" y="200" fill="rgba(255,255,255,0.2)" font-family="monospace" font-size="40" text-anchor="middle">&lt;/&gt;</text></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#ec4899"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="80" y="60" width="440" height="60" rx="8" fill="rgba(255,255,255,0.06)"/><rect x="80" y="140" width="200" height="140" rx="8" fill="rgba(255,255,255,0.06)"/><rect x="300" y="140" width="220" height="65" rx="8" fill="rgba(255,255,255,0.06)"/><rect x="300" y="215" width="220" height="65" rx="8" fill="rgba(255,255,255,0.04)"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" stop-color="#14b8a6"/><stop offset="100%" stop-color="#0f766e"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="0" y="0" width="600" height="375" fill="url(#grid)" opacity="0.05"/><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><circle cx="300" cy="180" r="50" fill="rgba(255,255,255,0.08)"/><circle cx="300" cy="180" r="25" fill="rgba(255,255,255,0.1)"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ef4444"/><stop offset="100%" stop-color="#f97316"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="50" y="50" width="160" height="275" rx="10" fill="rgba(255,255,255,0.05)"/><rect x="230" y="50" width="160" height="120" rx="10" fill="rgba(255,255,255,0.05)"/><rect x="410" y="50" width="140" height="275" rx="10" fill="rgba(255,255,255,0.04)"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#d946ef"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><ellipse cx="150" cy="200" rx="120" ry="160" fill="rgba(255,255,255,0.04)"/><ellipse cx="450" cy="160" rx="100" ry="140" fill="rgba(255,255,255,0.04)"/><text x="300" y="195" fill="rgba(255,255,255,0.18)" font-family="monospace" font-size="24" text-anchor="middle">console.log(vibe)</text></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0a0e1a"/><stop offset="100%" stop-color="#1e3a8a"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="0" y="0" width="600" height="375" fill="url(#dots)" opacity="0.08"/><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="white"/></pattern></defs><line x1="100" y1="340" x2="100" y2="280" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/><line x1="160" y1="340" x2="160" y2="240" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/><line x1="220" y1="340" x2="220" y2="180" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/><line x1="280" y1="340" x2="280" y2="120" stroke="#ff6b4a" stroke-width="2" stroke-linecap="round"/><line x1="340" y1="340" x2="340" y2="200" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-linecap="round"/><line x1="400" y1="340" x2="400" y2="150" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round"/><line x1="460" y1="340" x2="460" y2="260" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-linecap="round"/></svg>'),
  'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#84cc16"/><stop offset="100%" stop-color="#166534"/></linearGradient></defs><rect fill="url(#g)" width="600" height="375"/><rect x="60" y="50" width="480" height="275" rx="12" fill="rgba(255,255,255,0.06)"/><rect x="100" y="90" width="160" height="200" rx="6" fill="rgba(255,255,255,0.06)"/><rect x="280" y="90" width="220" height="85" rx="6" fill="rgba(255,255,255,0.06)"/><rect x="280" y="190" width="220" height="100" rx="6" fill="rgba(255,255,255,0.04)"/></svg>'),
];

const WORKS = [
  { id: 1, title: 'SynthWave IDE', type: 'Web App',
    desc: '一款融合音乐创作与编程的在线 IDE，用代码节奏谱写旋律。支持实时协作和音轨可视化。',
    link: 'https://www.baidu.com',
    author: 'student3', preview: 0, rating: 4.8, ratingCount: 156, ratedBy: [],
    comments: [
      { id: 1, user: 'student1', text: '这个作品太有创意了，音乐和编程的完美结合！', date: '2026-07-10' },
      { id: 2, user: 'student2', text: '实时协作功能很流畅，期待更多音轨效果。', date: '2026-07-12' },
      { id: 3, user: 'student5', text: '界面设计很舒服，已经推荐给室友了～', date: '2026-07-14' },
    ],
    date: '2026-06-15' },

  { id: 2, title: '校园食堂排队预测', type: '其他',
    desc: '基于历史客流数据，预测各食堂高峰时段，帮你错峰吃饭、节省时间。',
    link: 'https://www.baidu.com',
    author: 'student5', preview: 3, rating: 4.5, ratingCount: 89, ratedBy: [],
    comments: [
      { id: 4, user: 'student2', text: '太实用了，再也不用排长队了！', date: '2026-07-08' },
    ],
    date: '2026-06-20' },

  { id: 3, title: 'AI 古诗生成器', type: 'AI/ML',
    desc: '输入关键词和情绪，AI 即时生成符合格律的古诗，还能润色成你喜欢的风格。',
    link: 'https://www.baidu.com',
    author: 'student1', preview: 2, rating: 4.2, ratingCount: 67, ratedBy: [],
    comments: [
      { id: 5, user: 'student4', text: '生成的诗意外地有意境，文科生狂喜。', date: '2026-07-05' },
      { id: 6, user: 'student3', text: '能否支持藏头诗？期待更新～', date: '2026-07-09' },
    ],
    date: '2026-06-22' },

  { id: 4, title: '像素风 RPG 小游戏', type: 'Game',
    desc: '用 AI 生成像素美术与剧情，一个发生在校园里的复古冒险小游戏，现已开放三章。',
    link: 'https://www.baidu.com',
    author: 'student4', preview: 4, rating: 4.6, ratingCount: 120, ratedBy: [],
    comments: [
      { id: 7, user: 'student5', text: '美术风格太可爱了，已通关！', date: '2026-07-11' },
      { id: 8, user: 'student1', text: 'BGM 是什么做的？想学。', date: '2026-07-13' },
    ],
    date: '2026-06-25' },

  { id: 5, title: '考研倒计时助手', type: 'Mobile',
    desc: '一个简洁的手机端考研倒计时与每日任务小工具，支持自定义科目和提醒。',
    link: null,
    author: 'student2', preview: 6, rating: 4.0, ratingCount: 45, ratedBy: [],
    comments: [],
    date: '2026-07-01' },

  { id: 6, title: '校园二手书交易小程序', type: 'Mobile',
    desc: '同学们互相转卖教材和笔记的小程序，按专业分类，校内自提更靠谱。',
    link: 'https://www.baidu.com',
    author: 'student2', preview: 7, rating: 4.3, ratingCount: 78, ratedBy: [],
    comments: [
      { id: 9, user: 'student3', text: '开学季刚需，已经卖出两本了！', date: '2026-07-03' },
    ],
    date: '2026-07-02' },

  { id: 7, title: '长沙空气质量可视化', type: 'Data Viz',
    desc: '把近一年的空气质量数据做成可交互的时间轴地图，一眼看懂污染变化。',
    link: 'https://www.baidu.com',
    author: 'student5', preview: 10, rating: 4.7, ratingCount: 134, ratedBy: [],
    comments: [
      { id: 10, user: 'student1', text: '数据可视化的典范，图表很专业。', date: '2026-07-06' },
      { id: 11, user: 'student4', text: '希望能加上 PM2.5 的对比。', date: '2026-07-10' },
    ],
    date: '2026-06-28' },

  { id: 8, title: '智能简历排版工具', type: 'Tool',
    desc: '上传经历，AI 帮你生成排版美观、重点突出的简历，一键导出 PDF。',
    link: 'https://www.baidu.com',
    author: 'student1', preview: 8, rating: 3.9, ratingCount: 52, ratedBy: [],
    comments: [
      { id: 12, user: 'student2', text: '导出格式很干净，求职用了。', date: '2026-07-04' },
    ],
    date: '2026-07-03' },

  { id: 9, title: '意境百事通 · 聊天机器人', type: 'AI/ML',
    desc: '校园专属问答助手，能查课表、找教室、问教务政策，7×24 小时在线。',
    link: 'https://www.baidu.com',
    author: 'student3', preview: 1, rating: 4.4, ratingCount: 95, ratedBy: [],
    comments: [
      { id: 13, user: 'student5', text: '问教室位置秒回，救我狗命。', date: '2026-07-07' },
      { id: 14, user: 'student4', text: '偶尔会答错，但整体很方便。', date: '2026-07-12' },
    ],
    date: '2026-06-30' },

  { id: 10, title: '课程表 OCR 识别', type: 'AI/ML',
    desc: '拍一张课表照片，自动识别并生成可导入日历的课程安排，省去手动录入。',
    link: 'https://www.baidu.com',
    author: 'student4', preview: 9, rating: 4.1, ratingCount: 61, ratedBy: [],
    comments: [],
    date: '2026-07-05' },

  { id: 11, title: '校园跑腿众包平台', type: 'Web App',
    desc: '同学之间互帮互助的跑腿平台，代取快递、代买饭，积分可兑换。',
    link: null,
    author: 'student2', preview: 5, rating: 3.8, ratingCount: 33, ratedBy: [],
    comments: [
      { id: 15, user: 'student1', text: '下雨天代取快递真香。', date: '2026-07-08' },
    ],
    date: '2026-07-06' },

  { id: 12, title: '用 AI 做的个人作品集', type: 'Web App',
    desc: '完全用对话式 AI 搭建的个人主页，展示自己的设计与开发作品，零代码完成。',
    link: 'https://www.baidu.com',
    author: 'student1', preview: 11, rating: 4.6, ratingCount: 88, ratedBy: [],
    comments: [
      { id: 16, user: 'student3', text: '很好的 vibe coding 案例！', date: '2026-07-09' },
      { id: 17, user: 'student5', text: '想学怎么做，求教程。', date: '2026-07-11' },
    ],
    date: '2026-07-07' },
];

// ============================================================
// Supabase 直连（浏览器直接调数据库，和"个人名片"同样方式）
// 对比旧版：不再需要 Express 后端 → 没有 Vercel 冷启动 → 没有中转延迟
// ============================================================
let supabase = null;

(function initSupabase() {
  try {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
      supabase = window.supabase.createClient(
        'https://uodkyasetcptipbqugxr.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZGt5YXNldGNwdGlwYnF1Z3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NzMzNzUsImV4cCI6MjA5OTA0OTM3NX0.E0qmUBSOHJ0D6b5GyZcbrq86drNfCuNK0aQxbnH27ww'
      );
      // 尝试匿名登录（静默，失败不阻塞）
      supabase.auth.signInAnonymously().catch(() => {});
      console.log('[VibeCampus] Supabase 直连已就绪，数据由浏览器直达数据库');
    } else {
      console.warn('[VibeCampus] Supabase SDK 未加载，使用本地模式');
    }
  } catch (e) {
    console.warn('[VibeCampus] Supabase 初始化失败，自动降级为本地模式：', e.message);
  }
})();

// 当前展示用的数据源（优先 Supabase，失败则本地 WORKS 兜底）
let DATA = WORKS;

// 规范化联系方式
function normalizeContact(raw, type) {
  const c = {};
  if (!raw) return c;
  if (typeof raw === 'object') return raw;
  if (type === 'wechat' || type === 'qq' || type === 'email') c[type] = raw;
  else c.note = raw;
  return c;
}

// 统一取作者信息
function getAuthor(work) {
  const u = (work && typeof work.author === 'string' && USERS[work.author]) ? USERS[work.author] : null;
  if (u) {
    return {
      name: u.name, avatar: u.avatar, role: u.role || '创作者',
      major: u.major || '', bio: u.bio || '',
      contact: (work.authorContact && typeof work.authorContact === 'object') ? work.authorContact : (u.contact || {}),
    };
  }
  return {
    name: (work && (work.authorName || work.author)) || '匿名用户',
    avatar: (((work && (work.authorName || work.author)) || '匿').charAt(0)),
    role: (work && work.authorRole) || '创作者',
    major: (work && work.authorMajor) || '',
    bio: (work && work.authorBio) || '',
    contact: normalizeContact(work && work.authorContact, work && work.contactType),
  };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

// Supabase 返回 snake_case → 前端使用 camelCase（字段映射）
function backendToFrontend(bw) {
  bw = bw || {};
  const ratings = Array.isArray(bw.ratings) ? bw.ratings : [];
  const comments = Array.isArray(bw.comments) ? bw.comments : [];
  return {
    id: bw.id,
    title: bw.title || '',
    type: bw.category || '其他',
    desc: bw.intro || '',
    link: bw.url || null,
    cover: bw.cover || '',
    author: bw.author_name || bw.authorName || '匿名用户',
    authorName: bw.author_name || bw.authorName || '',
    authorMajor: bw.author_major || bw.authorMajor || '',
    authorBio: bw.author_bio || bw.authorBio || '',
    authorContact: bw.author_contact || bw.authorContact,
    contactType: bw.contact_type || bw.contactType || '',
    preview: hashStr(String(bw.id)) % PREVIEWS.length,
    rating: typeof bw.rating_avg === 'number' ? bw.rating_avg : (typeof bw.ratingAvg === 'number' ? bw.ratingAvg : 0),
    ratingCount: bw.rating_count || bw.ratingCount || 0,
    ratedBy: ratings.map(r => r.viewerId).filter(Boolean),
    comments: comments.map(c => ({
      id: c.id || Date.now(),
      user: c.nickname || c.user || '匿名用户',
      text: c.text || '',
      date: (c.createdAt || c.date || '').slice(0, 10),
    })),
    date: (bw.created_at || bw.createdAt || bw.date || '').slice(0, 10),
  };
}

// 前端 → Supabase insert 负载（snake_case）
function frontendToBackend(w) {
  const ac = (w.authorContact && typeof w.authorContact === 'object' && Object.keys(w.authorContact).length) ? w.authorContact : '';
  const contactType = ac && ac.wechat ? 'wechat' : ac && ac.qq ? 'qq' : ac && ac.email ? 'email' : 'other';
  return {
    title: w.title,
    intro: w.desc,
    category: w.type,
    url: w.link || '',
    author_name: w.authorName || '我',
    author_major: w.authorMajor || '',
    author_bio: w.authorBio || '',
    author_contact: ac,
    contact_type: contactType,
    tags: [],
  };
}

// ---------- 数据加载：Supabase 直连，失败自动降级本地数据 ----------
async function loadWorks() {
  if (!supabase) {
    DATA = WORKS;
    console.log('[VibeCampus] 本地模式：使用内置示例数据');
    return;
  }
  try {
    const { data, error } = await supabase
      .from('vc_works')
      .select('*')
      .order('rating_avg', { ascending: false })
      .limit(100);
    if (error) throw error;
    if (data && data.length) {
      DATA = data.map(backendToFrontend);
      console.log('[VibeCampus] 已从 Supabase 加载 ' + DATA.length + ' 件作品');
      return;
    }
    console.log('[VibeCampus] Supabase 无数据，使用本地示例数据');
  } catch (e) {
    console.warn('[VibeCampus] Supabase 加载失败，降级本地数据：', e.message);
  }
  DATA = WORKS;
}

let activeSort = 'rating';
let searchQuery = '';

// Type label map
const TYPE_LABELS = {
  'Web App': 'Web 应用', 'AI/ML': 'AI/ML', 'Game': '游戏',
  'Tool': '工具', 'Data Viz': '数据可视化', 'Mobile': '移动端', 'CLI': '命令行', '其他': '其他'
};

// --- Utilities ---

function toast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => {
    gsap.to(el, { x: 40, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => el.remove() });
  }, 2500);
}

function renderStars(rating, size = 14) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = '<span class="stars">';
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      html += `<svg class="stars__star stars__star--filled" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    } else if (i === full && half) {
      html += `<svg class="stars__star stars__star--half" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    } else {
      html += `<svg class="stars__star" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }
  }
  html += '</span>';
  return html;
}

function getSortedWorks() {
  let works = [...DATA];
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    works = works.filter(w =>
      w.title.toLowerCase().includes(q) ||
      w.desc.toLowerCase().includes(q) ||
      w.type.toLowerCase().includes(q) ||
      (getAuthor(w).name || '').toLowerCase().includes(q)
    );
  }
  switch (activeSort) {
    case 'rating':  works.sort((a, b) => b.rating - a.rating); break;
    case 'newest':  works.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
    case 'popular': works.sort((a, b) => b.ratingCount - a.ratingCount); break;
  }
  return works;
}

// --- Rendering ---

function renderWorks() {
  const works = getSortedWorks();
  const grid = document.getElementById('worksCards');
  const empty = document.getElementById('worksEmpty');
  const count = document.getElementById('worksCount');
  const title = document.getElementById('worksTitle');

  title.textContent = '全部作品';
  count.textContent = `${works.length} 个作品`;

  if (works.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = works.map(w => {
    const author = getAuthor(w);
    const badges = [];
    if (w.featured) badges.push('<span class="work-card__badge work-card__badge--featured">推荐</span>');
    if (w.pinned) badges.push('<span class="work-card__badge work-card__badge--pinned">置顶</span>');

    return `
      <article class="work-card" data-id="${w.id}" onclick="openSheet('${w.id}')">
        <div class="work-card__media">
          <img class="work-card__preview" src="${w.cover || PREVIEWS[w.preview]}" alt="${w.title}" loading="lazy">
          ${badges.join('')}
        </div>
        <div class="work-card__body">
          <h3 class="work-card__title">${w.title}</h3>
          <p class="work-card__desc">${w.desc}</p>
          <div class="work-card__meta">
            <div class="work-card__author">
              <span class="work-card__author-name">${author.name}</span>
            </div>
            <div class="work-card__rating">
              ${renderStars(w.rating)}
              <span class="work-card__rating-score">${w.rating}</span>
              <span class="work-card__rating-count">(${w.ratingCount})</span>
            </div>
          </div>
          <div class="work-card__actions">
            ${w.link ? `<a href="${w.link}" target="_blank" rel="noopener" class="work-card__btn work-card__btn--link" onclick="event.stopPropagation()">打开作品 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : ''}
            <button class="work-card__btn work-card__btn--review" onclick="event.stopPropagation(); openSheet('${w.id}')">评价 <span class="work-card__review-count">(${w.comments.length})</span></button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // 纯 CSS 错峰入场：替代原 gsap.from。
  // 原因：GSAP 的 from 会先把卡片设成 opacity:0，在 display:none→'' 切换的那一帧
  // 若 GSAP 未及时 tick（file:// 下 CDN 偶发未加载 / 时序问题），卡片会永久
  // 卡在 opacity:0，表现为“其他作品淡化”。纯 CSS 动画在本地与刷新下行为一致、稳定。
  //
  // 关键：先强制一次同步 reflow（读取 offsetWidth），让浏览器“提交”卡片当前的初始
  // 可见态，再给卡片加 --enter 类。否则 #app 从 display:none 切到显示的同一帧里，
  // “插入卡片 + 加动画类”会被浏览器合并处理，动画首帧（translateY 上弹）被吞掉，
  // 只剩 scale 被看到。reflow 后再加类，浏览器会把它当成一次真实状态变化，
  // 动画从首帧完整播放——首次进入与刷新表现完全一致。
  void grid.offsetWidth; // 强制同步布局，提交卡片初始态
  grid.querySelectorAll('.work-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
    card.classList.add('work-card--enter');
  });
}

// 不带入场动画的渲染（排序 FLIP 使用）
function renderWorksRaw() {
  const works = getSortedWorks();
  const grid = document.getElementById('worksCards');
  const empty = document.getElementById('worksEmpty');
  const count = document.getElementById('worksCount');
  const title = document.getElementById('worksTitle');

  title.textContent = '全部作品';
  count.textContent = `${works.length} 个作品`;

  if (works.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = works.map(w => {
    const author = getAuthor(w);
    const badges = [];
    if (w.featured) badges.push('<span class="work-card__badge work-card__badge--featured">推荐</span>');
    if (w.pinned) badges.push('<span class="work-card__badge work-card__badge--pinned">置顶</span>');

    return `
      <article class="work-card" data-id="${w.id}" onclick="openSheet('${w.id}')">
        <div class="work-card__media">
          <img class="work-card__preview" src="${w.cover || PREVIEWS[w.preview]}" alt="${w.title}" loading="lazy">
          ${badges.join('')}
        </div>
        <div class="work-card__body">
          <h3 class="work-card__title">${w.title}</h3>
          <p class="work-card__desc">${w.desc}</p>
          <div class="work-card__meta">
            <div class="work-card__author">
              <span class="work-card__author-name">${author.name}</span>
            </div>
            <div class="work-card__rating">
              ${renderStars(w.rating)}
              <span class="work-card__rating-score">${w.rating}</span>
              <span class="work-card__rating-count">(${w.ratingCount})</span>
            </div>
          </div>
          <div class="work-card__actions">
            ${w.link ? `<a href="${w.link}" target="_blank" rel="noopener" class="work-card__btn work-card__btn--link" onclick="event.stopPropagation()">打开作品 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : ''}
            <button class="work-card__btn work-card__btn--review" onclick="event.stopPropagation(); openSheet('${w.id}')">评价 <span class="work-card__review-count">(${w.comments.length})</span></button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderLeaderboard() {
  const sorted = [...WORKS].sort((a, b) => b.rating - a.rating);
  const list = document.getElementById('leaderboardList');
  list.innerHTML = sorted.slice(0, 6).map((w, i) => `
    <li class="leaderboard__item" onclick="openSheet('${w.id}')">
      <span class="leaderboard__item-rank">${i + 1}</span>
      <div class="leaderboard__item-info">
        <div class="leaderboard__item-title">${w.title}</div>
        <div class="leaderboard__item-author">${getAuthor(w).name}</div>
      </div>
      <span class="leaderboard__item-score">${w.rating}</span>
    </li>
  `).join('');
}

// --- 作品详情底部抽屉 ---

let currentWork = null; // 当前打开的作品（供底部打分/评论复用）
const RATING_LABELS = ['', '有待提高', '还不错', '挺好的', '非常棒！', '完美！'];

function openSheet(workId) {
  const work = DATA.find(w => String(w.id) === String(workId));
  if (!work) return;
  currentWork = work;

  const overlay = document.getElementById('ratingModal');
  document.getElementById('ratingModalTitle').textContent = work.title;
  document.getElementById('ratingModalDesc').textContent = work.desc;
  document.getElementById('sheetStars').innerHTML = renderStars(work.rating, 22);
  document.getElementById('sheetRatingInfo').innerHTML =
    `<strong>${work.rating}</strong> / 5.0 · ${work.ratingCount} 人评分`;
  document.getElementById('commentInput').value = '';
  document.getElementById('commentNick').value = '';
  const starsWrap = document.getElementById('interactiveStars');
  if ((work.ratedBy || []).includes(getViewerId())) {
    starsWrap.classList.add('is-locked');
    document.getElementById('ratingLabel').textContent = '你已评过分';
  } else {
    starsWrap.classList.remove('is-locked');
    document.getElementById('ratingLabel').textContent = '点击星星评分';
  }
  document.querySelectorAll('#interactiveStars .rating-interactive__star')
    .forEach(s => s.classList.remove('rating-interactive__star--active'));

  renderAuthorCard(work);
  renderComments(work);

  overlay.style.display = '';
  lockBodyScroll();
  requestAnimationFrame(() => overlay.classList.add('sheet-overlay--show'));
}

// 抽屉打开时锁定后面主界面的滚动，防止“在模糊遮罩处滚动导致后面界面跟着滚”的穿透问题。
// 同时补偿滚动条宽度（存到 --sbw），避免锁定瞬间页面因滚动条消失而右移抖动。
function lockBodyScroll() {
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--sbw', (sbw > 0 ? sbw : 0) + 'px');
  document.body.classList.add('sheet-open');
}
function unlockBodyScroll() {
  document.body.classList.remove('sheet-open');
  document.documentElement.style.removeProperty('--sbw');
}

function renderAuthorCard(work) {
  const u = getAuthor(work);
  document.getElementById('authorAvatar').textContent = u.avatar || u.name.charAt(0);
  document.getElementById('authorName').textContent = u.name;
  document.getElementById('authorRole').textContent = u.role || '创作者';
  document.getElementById('authorMajor').textContent = u.major || '';
  document.getElementById('authorBio').textContent = u.bio || '';
  const contactEl = document.getElementById('authorContact');
  const contact = u.contact || {};
  const items = [];
  if (contact.wechat) items.push({ type: '微信', value: contact.wechat, kind: 'copy' });
  if (contact.qq)     items.push({ type: 'QQ',   value: contact.qq,     kind: 'copy' });
  if (contact.email)  items.push({ type: '邮箱', value: contact.email,  kind: 'mail' });
  if (contact.note)   items.push({ type: '其他', value: contact.note,   kind: 'copy' });
  contactEl.innerHTML = items.map(it => `
    <button class="sheet__author-contact-item" type="button"
      onclick="${it.kind === 'copy'
        ? `copyContact('${it.value}','${it.type}')`
        : `window.open('mailto:${it.value}')`}">
      <span class="sheet__author-contact-label">${it.type}</span>
      <span class="sheet__author-contact-value">${it.value}</span>
      <span class="sheet__author-contact-action">${it.kind === 'copy' ? '复制' : '发信'}</span>
    </button>
  `).join('');
}

function copyContact(value, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value)
      .then(() => toast(`已复制${label}：${value}`))
      .catch(() => fallbackCopy(value));
  } else {
    fallbackCopy(value);
  }
}

function fallbackCopy(value) {
  const ta = document.createElement('textarea');
  ta.value = value;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); toast(`已复制：${value}`); }
  catch (e) { toast('复制失败，请手动复制', 'error'); }
  document.body.removeChild(ta);
}

function contactAuthorPrimary() {
  const work = currentWork;
  if (!work) return;
  const contact = getAuthor(work).contact || {};
  const pref = contact.wechat || contact.qq;
  if (pref) copyContact(pref, '联系方式');
  else if (contact.email) window.open('mailto:' + contact.email);
  else toast('作者暂未提供联系方式', 'error');
}

// 获取当前访客的稳定标识（无登录，按设备去重）
function getViewerId() {
  const KEY = 'campus_viewer_id';
  let id = null;
  try { id = localStorage.getItem(KEY); } catch (e) {}
  if (!id) {
    id = 'v_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    try { localStorage.setItem(KEY, id); } catch (e) {}
  }
  return id;
}

async function submitRating(work, val) {
  const vid = getViewerId();
  if ((work.ratedBy || []).includes(vid)) {
    toast('你已经给这个作品评过分啦', 'error');
    return;
  }
  // 本地即时锁定，避免重复点击
  const starsWrap = document.getElementById('interactiveStars');
  starsWrap.classList.add('is-locked');

  // 没有 Supabase → 本地模式：直接计算平均分
  if (!supabase) {
    work.ratedBy = work.ratedBy || [];
    const newTotal = work.rating * work.ratingCount + val;
    work.ratingCount += 1;
    work.rating = Math.round((newTotal / work.ratingCount) * 10) / 10;
    work.ratedBy.push(vid);
    applyRatingUI(work, val);
    updateCardMeta(work);
    return;
  }

  // Supabase 模式：读 → 检查 → 写（乐观更新）
  try {
    const { data: current, error: fetchErr } = await supabase
      .from('vc_works').select('ratings,rating_avg,rating_count').eq('id', work.id).single();
    if (fetchErr) throw fetchErr;

    const ratings = Array.isArray(current.ratings) ? current.ratings : [];
    if (ratings.some(r => r.viewerId === vid)) {
      starsWrap.classList.remove('is-locked');
      toast('你已经给这个作品评过分啦', 'error');
      return;
    }
    ratings.push({ viewerId: vid, score: val, createdAt: new Date().toISOString() });
    const newCount = ratings.length;
    const newAvg = Math.round((ratings.reduce((s, r) => s + r.score, 0) / newCount) * 10) / 10;

    const { error: updateErr } = await supabase
      .from('vc_works')
      .update({ ratings, rating_avg: newAvg, rating_count: newCount, updated_at: new Date().toISOString() })
      .eq('id', work.id);
    if (updateErr) throw updateErr;

    work.rating = newAvg;
    work.ratingCount = newCount;
    work.ratedBy = (work.ratedBy || []).concat(vid);
    applyRatingUI(work, val);
    updateCardMeta(work);
  } catch (e) {
    starsWrap.classList.remove('is-locked');
    toast('评分失败：' + e.message, 'error');
  }
}

function applyRatingUI(work, val) {
  document.getElementById('sheetStars').innerHTML = renderStars(work.rating, 22);
  document.getElementById('sheetRatingInfo').innerHTML =
    `<strong>${work.rating}</strong> / 5.0 · ${work.ratingCount} 人评分`;
  const starsWrap = document.getElementById('interactiveStars');
  starsWrap.classList.add('is-locked');
  document.getElementById('ratingLabel').textContent = '你已评过分';
  toast(`评分成功！你给了 ${val} 星`);
}

function updateCardMeta(work) {
  const card = document.querySelector(`.work-card[data-id="${work.id}"]`);
  if (!card) return;
  const score = card.querySelector('.work-card__rating-score');
  const count = card.querySelector('.work-card__rating-count');
  const rc = card.querySelector('.work-card__review-count');
  if (score) score.textContent = work.rating;
  if (count) count.textContent = `(${work.ratingCount})`;
  if (rc) rc.textContent = `(${work.comments.length})`;
}

function renderComments(work) {
  work.comments = work.comments || [];
  const listEl = document.getElementById('commentsList');
  const countEl = document.getElementById('commentsCount');

  countEl.textContent = `${work.comments.length} 条评价`;

  if (work.comments.length === 0) {
    listEl.innerHTML = '<div class="comments__empty">暂无评价，来抢沙发吧</div>';
    return;
  }

  listEl.innerHTML = work.comments.map(c => {
    const known = USERS[c.user];
    const name = known ? known.name : c.user;
    const avatar = known ? known.avatar : (c.user ? c.user.charAt(0) : '匿');
    return `
      <div class="comment">
        <div class="comment__header">
          <div class="comment__avatar">${avatar}</div>
          <span class="comment__name">${name}</span>
          <span class="comment__time">${c.date}</span>
        </div>
        <div class="comment__body">${c.text}</div>
      </div>
    `;
  }).join('');
}

// --- Upload Modal ---

function openUploadModal() {
  const modal = document.getElementById('uploadModal');
  // 清除上一次关闭动画遗留的内联样式，避免透明/缩放残留导致无法编辑
  modal.style.opacity = '';
  modal.style.transform = '';
  modal.style.display = '';
}
function closeUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (typeof gsap !== 'undefined') {
    gsap.to(modal, {
      opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        modal.style.display = 'none';
        modal.style.opacity = '';
        modal.style.transform = '';
      }
    });
  } else {
    modal.style.display = 'none';
  }
}

function closeRatingModal() {
  const overlay = document.getElementById('ratingModal');
  overlay.classList.remove('sheet-overlay--show');
  unlockBodyScroll();
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
  currentWork = null;
}
function handleUploadSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('uploadTitle').value.trim();
  const type = document.getElementById('uploadType').value;
  const linkRaw = document.getElementById('uploadLink').value.trim();
  const link = linkRaw
    ? (/^https?:\/\//i.test(linkRaw) ? linkRaw : 'https://' + linkRaw)
    : null;
  const desc = document.getElementById('uploadDesc').value.trim();

  if (!title || !type || !desc) {
    toast('请填写所有必填字段', 'error');
    return;
  }

  const cWechat = document.getElementById('uploadContactWechat').value.trim();
  const cQQ = document.getElementById('uploadContactQQ').value.trim();
  const cEmail = document.getElementById('uploadContactEmail').value.trim();
  const authorContact = {};
  if (cWechat) authorContact.wechat = cWechat;
  if (cQQ) authorContact.qq = cQQ;
  if (cEmail) authorContact.email = cEmail;

  const newWork = {
    id: WORKS.length + 1,
    title, type, desc,
    link,
    author: 'student1',
    authorName: '我',
    authorContact: Object.keys(authorContact).length ? authorContact : null,
    preview: Math.floor(Math.random() * PREVIEWS.length),
    rating: 0,
    ratingCount: 0,
    ratedBy: [],
    comments: [],
    date: new Date().toISOString().split('T')[0],
  };

  // 本地模式
  if (!supabase) {
    WORKS.unshift(newWork);
    closeUploadModal();
    document.getElementById('uploadForm').reset();
    toast('作品发布成功！（本地模式，刷新后不会保留）');
    renderWorks();
    renderLeaderboard();
    return;
  }

  // Supabase 模式：直接写入数据库
  (async () => {
    try {
      const row = frontendToBackend(newWork);
      row.id = crypto.randomUUID ? crypto.randomUUID() : 'w_' + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
      row.created_at = new Date().toISOString();
      row.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('vc_works')
        .insert(row)
        .select()
        .single();
      if (error) throw error;

      const bw = backendToFrontend(data);
      DATA.unshift(bw);
      closeUploadModal();
      document.getElementById('uploadForm').reset();
      toast('作品发布成功！');
      renderWorks();
      renderLeaderboard();
    } catch (err) {
      toast('发布失败：' + err.message, 'error');
    }
  })();
}

// --- Splash → App ---

function showApp() {
  const app = document.getElementById('app');
  app.style.display = '';
  app.classList.add('app--entering');

  initCanvas('heroCanvas');
  initCTAPulse();

  // 关键修复：app 刚从 display:none 变为显示的那一帧，若同步用 innerHTML
  // 重建卡片并给卡片加 .work-card--enter 动画类，部分浏览器会“吞掉”动画
  // 首帧（直接推进到当前时间），导致首屏卡片的轻微上弹入场不播放；
  // 而刷新因 DOM 已就绪便正常。用 rAF 把渲染推迟到下一帧，让 app 先完成
  // 显示与布局，卡片动画从首帧开始 —— 首次进入与刷新表现一致。
  requestAnimationFrame(async () => {
    await loadWorks();
    renderWorks();
    renderLeaderboard();
  });

  setTimeout(() => app.classList.remove('app--entering'), 600);
}

function enterApp() {
  const splash = document.getElementById('splash');

  splash.classList.add('splash--exiting');

  // 记住"已进入"：localStorage + history.state 双保险，
  // 刷新 / 浏览器后退都不会再回到进入界面（replaceState 不会新增历史项）
  markEntered();

  setTimeout(() => {
    splash.style.display = 'none';
    showApp();
  }, 400);
}

function initCTAPulse() {
  if (typeof gsap === 'undefined') return; // gsap 未加载（如 file:// 下 CDN 失败）时跳过，不影响功能
  gsap.to('#btnCreateCTA', {
    boxShadow: '0 4px 40px oklch(48% 0.18 260 / 0.5)',
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// --- Canvas Animation ---

function initCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, particles = [], animId;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 12000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.08,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `oklch(55% 0.18 250 / ${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `oklch(55% 0.18 250 / ${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  const handleResize = () => { resize(); createParticles(); };
  window.addEventListener('resize', handleResize);

  // Store for cleanup
  canvas._cleanup = () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', handleResize);
  };
}

// --- Event Bindings ---

function bindEvents() {
  // Splash enter
  document.getElementById('btnEnter').addEventListener('click', enterApp);

  // Logo → 回到顶部
  document.getElementById('navLogo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Search
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchQuery = searchInput.value;
      renderWorks();
    }, 250);
  });

  // Sort bar（排序切换淡入淡出）
  document.getElementById('sortBar').addEventListener('click', (e) => {
    const chip = e.target.closest('.sort-chip');
    if (!chip) return;
    e.preventDefault();
    const sort = chip.dataset.sort;
    if (!sort) return;
    if (activeSort === sort) return;
    activeSort = sort;
    document.querySelectorAll('#sortBar .sort-chip').forEach(c => c.classList.remove('sort-chip--active'));
    chip.classList.add('sort-chip--active');

    const grid = document.getElementById('worksCards');
    if (typeof gsap !== 'undefined') {
      gsap.to(grid, {
        opacity: 0, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          renderWorksRaw();
          gsap.fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
        }
      });
    } else {
      renderWorksRaw();
    }
  });

  // CTA fab button
  document.getElementById('btnCreateCTA').addEventListener('click', openUploadModal);

  // Upload modal
  document.getElementById('btnCloseUpload').addEventListener('click', closeUploadModal);
  document.getElementById('btnCancelUpload').addEventListener('click', closeUploadModal);
  document.getElementById('uploadModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeUploadModal();
  });
  document.getElementById('uploadForm').addEventListener('submit', handleUploadSubmit);

  // Upload preview
  document.getElementById('uploadPreview').addEventListener('click', () => {
    const idx = Math.floor(Math.random() * PREVIEWS.length);
    document.getElementById('uploadPreview').innerHTML = `<img src="${PREVIEWS[idx]}" alt="preview" style="width:100%;height:auto;border-radius:var(--radius-md)">`;
    toast('预览图已选择（模拟）');
  });

  // 抽屉关闭
  document.getElementById('btnCloseRating').addEventListener('click', closeRatingModal);
  document.getElementById('ratingModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeRatingModal();
  });

  // 抽屉：打分（点击星星立即提交）
  const sheetStars = document.querySelectorAll('#interactiveStars .rating-interactive__star');
  const starsWrap = document.getElementById('interactiveStars');
  const ratingLabel = document.getElementById('ratingLabel');
  sheetStars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      if (starsWrap.classList.contains('is-locked')) return;
      const val = parseInt(star.dataset.star, 10);
      sheetStars.forEach((s, i) => s.classList.toggle('rating-interactive__star--active', i < val));
    });
    star.addEventListener('mouseleave', () => {
      if (starsWrap.classList.contains('is-locked')) return;
      sheetStars.forEach(s => s.classList.remove('rating-interactive__star--active'));
    });
    star.addEventListener('click', () => {
      if (!currentWork) return;
      if (starsWrap.classList.contains('is-locked')) return;
      const val = parseInt(star.dataset.star, 10);
      sheetStars.forEach((s, i) => s.classList.toggle('rating-interactive__star--active', i < val));
      ratingLabel.textContent = `${val} 星 · ${RATING_LABELS[val]}`;
      submitRating(currentWork, val);
    });
  });

  // 抽屉：发布评价（支持昵称）
  document.getElementById('btnSubmitComment').addEventListener('click', () => {
    if (!currentWork) return;
    const input = document.getElementById('commentInput');
    const nick = document.getElementById('commentNick');
    const text = input.value.trim();
    if (!text) { toast('请输入评价内容', 'error'); return; }
    const nickname = nick.value.trim() || '匿名用户';
    const newComment = {
      id: Date.now(),
      user: nickname,
      text: text,
      date: new Date().toISOString().split('T')[0],
    };
    currentWork.comments = currentWork.comments || [];
    currentWork.comments.push(newComment);
    input.value = '';
    renderComments(currentWork);
    updateCardMeta(currentWork);
    toast('评价发表成功！');

    // Supabase 模式：持久化评论到数据库
    if (supabase) {
      (async () => {
        try {
          const { data: current, error: fetchErr } = await supabase
            .from('vc_works').select('comments,comment_count').eq('id', currentWork.id).single();
          if (fetchErr) throw fetchErr;
          const comments = Array.isArray(current.comments) ? current.comments : [];
          comments.push({
            id: Date.now().toString(),
            nickname: nickname,
            text: text,
            createdAt: new Date().toISOString(),
          });
          const { error: updateErr } = await supabase
            .from('vc_works')
            .update({ comments, comment_count: comments.length, updated_at: new Date().toISOString() })
            .eq('id', currentWork.id);
          if (updateErr) throw updateErr;
        } catch (e) {
          console.warn('[VibeCampus] 评论同步失败：', e.message);
        }
      })();
    }
  });

  // Hero scroll
  document.querySelector('.hero__scroll').addEventListener('click', () => {
    document.getElementById('mainContent').scrollIntoView({ behavior: 'smooth' });
  });

  // Escape to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeUploadModal();
      closeRatingModal();
    }
  });
}

// --- Init ---

// Splash 入场动画由 css/style.css 中的纯 CSS 关键帧负责（不依赖 GSAP CDN）。

// 判断是否已进入过：localStorage 优先，history.state 兜底
// 兼容 file:// 本地直接打开时 localStorage 不可用的情况（如 Firefox 对本地文件的存储限制）
function hasEntered() {
  try {
    if (localStorage.getItem('campus_entered') === '1') return true;
  } catch (e) {}
  try {
    return !!(history.state && history.state.entered);
  } catch (e) {}
  return false;
}

// 标记已进入：localStorage + history.state 双保险
// 用 replaceState（不新增历史项），浏览器后退不会回到 splash 进入界面
function markEntered() {
  try { localStorage.setItem('campus_entered', '1'); } catch (e) {}
  try { history.replaceState({ entered: true }, ''); } catch (e) {}
}

function init() {
  bindEvents();

  // 已经点过"立刻进入"则跳过引导，直接进展示界面
  // （避免刷新 / 从作品页返回后再次弹出进入界面、需要重复点击）
  if (hasEntered()) {
    const splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
    showApp();
    return;
  }

  initCanvas('splashCanvas');
}

document.addEventListener('DOMContentLoaded', init);
