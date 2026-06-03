// Mock data for the Life OS demo build. Replace with real Supabase queries later.

export type DomainAccent = "finance" | "fitness" | "social" | "professional";

// ---- Net worth ----
export const NET_WORTH = {
  current: 1247832,
  delta7d: 12401,
  deltaPct7d: 1.0,
};

// 30 days of net worth snapshots — slight upward trend with noise
export const netWorthSeries = (() => {
  const start = 1198000;
  const points = [];
  let value = start;
  for (let i = 29; i >= 0; i--) {
    const noise = (Math.sin(i * 0.5) + Math.cos(i * 0.3)) * 4000;
    const drift = ((29 - i) / 29) * 50000;
    value = start + drift + noise;
    points.push({
      date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
      value: Math.round(value),
    });
  }
  return points;
})();

// ---- Readiness / fitness ----
export const READINESS = {
  score: 78,
  interpretation: "Push it today",
  sleep: "7h 12m",
  hrv: 52,
  strain: 14.2,
  recovery: 82,
};

export const SLEEP_LAST_NIGHT = {
  total: "7h 12m",
  score: 82,
  deep: "1h 22m",
  rem: "1h 45m",
  light: "3h 51m",
  awake: "14m",
  // Hypnogram stages: 0=awake, 1=light, 2=deep, 3=rem
  hypnogram: [
    1, 1, 2, 2, 2, 1, 1, 3, 3, 1, 2, 2, 1, 1, 3, 3, 3, 1, 1, 2, 2, 1, 3, 3, 1,
    1, 0, 1, 1, 1, 2, 1, 3, 3, 1, 1,
  ],
};

export const TODAY_ACTIVITY = {
  workouts: 1,
  steps: 8420,
  calories: 420,
  lastWorkout: { type: "Push (Chest + Tri)", duration: "47m", time: "7:12 AM" },
};

export const BIOMETRICS = [
  { name: "HRV (7d avg)", value: "52 ms", delta: 3, deltaLabel: "vs prev", series: [48, 50, 52, 49, 51, 54, 52] },
  { name: "Resting HR", value: "58 bpm", delta: -2, deltaLabel: "vs prev", series: [60, 60, 59, 58, 58, 57, 58] },
  { name: "Weight", value: "182.4 lb", delta: -1.2, deltaLabel: "30d", series: [184, 183.6, 183.2, 183, 182.8, 182.6, 182.4] },
  { name: "VO2 Max", value: "48.2", delta: 0.4, deltaLabel: "30d", series: [47.8, 47.9, 48.0, 48.0, 48.1, 48.2, 48.2] },
];

export const RECENT_WORKOUTS = [
  { id: "w1", date: "Today", type: "Push Day", duration: "47 min", calories: 420, avgHr: 142 },
  { id: "w2", date: "Yesterday", type: "Zone 2 Cardio", duration: "60 min", calories: 380, avgHr: 138 },
  { id: "w3", date: "May 25", type: "Pull Day", duration: "52 min", calories: 440, avgHr: 145 },
  { id: "w4", date: "May 24", type: "Run", duration: "32 min", calories: 320, avgHr: 156 },
];

// ---- Finance ----
export const ACCOUNTS = [
  { id: "a1", name: "Chase Checking", classification: "personal", balance: 24182, type: "checking", institution: "Chase" },
  { id: "a2", name: "Chase Sapphire", classification: "personal", balance: -1240, limit: 30000, type: "credit", institution: "Chase" },
  { id: "a3", name: "GCG Operating", classification: "business", balance: 182400, type: "checking", institution: "Mercury" },
  { id: "a4", name: "Schwab Brokerage", classification: "personal", balance: 1041290, type: "investment", institution: "Schwab" },
  { id: "a5", name: "Apple Card", classification: "personal", balance: -840, limit: 12000, type: "credit", institution: "Apple" },
] as const;

export const CREDIT_SCORE = {
  score: 782,
  delta: 4,
  category: "Excellent",
  updatedDaysAgo: 2,
};

export const UPCOMING_BILLS = [
  { id: "b1", name: "Rent", date: "May 30", amount: 3200 },
  { id: "b2", name: "AWS", date: "May 31", amount: 840 },
  { id: "b3", name: "Adobe CC", date: "Jun 02", amount: 60 },
];

export const RECENT_TRANSACTIONS = [
  { id: "t1", merchant: "Stripe", amount: -240, date: "Today", category: "uncategorized", uncategorized: true, time: "1h ago" },
  { id: "t2", merchant: "Coffee Shop", amount: -8.5, date: "Today", category: "Food", time: "3h ago" },
  { id: "t3", merchant: "Vercel", amount: -60, date: "Yesterday", category: "Software", business: true },
  { id: "t4", merchant: "Whole Foods", amount: -184.22, date: "Yesterday", category: "Groceries" },
  { id: "t5", merchant: "Acme Corp", amount: 4200, date: "Yesterday", category: "Income", business: true },
];

// ---- Social ----
export const SOCIAL_WEEK = {
  scheduled: 7,
  posted: 4,
  engaged: 2840,
  daySchedule: [
    { day: "Mon", platforms: ["L", "X"] },
    { day: "Tue", platforms: ["L", "X"] },
    { day: "Wed", platforms: ["I"] },
    { day: "Thu", platforms: [] },
    { day: "Fri", platforms: ["I", "T"] },
    { day: "Sat", platforms: ["L"] },
    { day: "Sun", platforms: [] },
  ],
};

export const TODAY_POSTS = [
  {
    id: "p1",
    time: "9:00 AM",
    status: "posted",
    platforms: ["LinkedIn", "X"],
    excerpt: "Three things I learned shipping a side project to 1k users in 30 days...",
  },
  {
    id: "p2",
    time: "2:00 PM",
    status: "scheduled",
    platforms: ["Instagram", "TikTok"],
    excerpt: "Video — Behind the scenes of Serving launch",
  },
];

export const ENGAGEMENT = [
  { platform: "LinkedIn", posts: 3, impressions: 12400, engagement: 412 },
  { platform: "X / Twitter", posts: 5, impressions: 8200, engagement: 180 },
  { platform: "Instagram", posts: 2, impressions: 4100, engagement: 220 },
  { platform: "TikTok", posts: 1, impressions: 18000, engagement: 2028 },
];

export const IDEAS_BACKLOG = [
  { id: "i1", text: "Why investing in your team is the best ROI", tag: "GCG", captured: "2d ago" },
  { id: "i2", text: "Building in public: month 3 learnings", tag: "Serving", captured: "3d ago" },
  { id: "i3", text: "Most underrated AI workflow of 2026", tag: "AI", captured: "5d ago" },
];

// ---- Work / Businesses ----
export const BUSINESSES = [
  {
    slug: "gcg",
    name: "GCG",
    status: "HEALTHY",
    trend: "up",
    summary: "$84k MRR · 14 clients",
    pipelineFilled: 0.7,
    pipelineLabel: "pipeline $240k",
    accent: "professional",
    kpis: [
      { name: "MRR", value: 84200, prefix: "$", delta: 4200, deltaPct: 5.0, series: [78000, 79500, 80400, 81000, 82500, 83800, 84200] },
      { name: "Active Clients", value: 14, delta: 2, deltaPct: 16.6, series: [10, 11, 11, 12, 12, 13, 14] },
      { name: "Pipeline", value: 240000, prefix: "$", delta: 0, deltaPct: 0, flat: true, series: [240000, 235000, 242000, 240000, 241000, 239000, 240000] },
      { name: "Capital Deployed", value: 1800000, prefix: "$", delta: 120000, deltaPct: 7.1, series: [1620000, 1680000, 1700000, 1720000, 1760000, 1780000, 1800000] },
    ],
    priorities: [
      { id: "g1", title: "Close Acme deal — $40k", due: "Due Friday", done: false },
      { id: "g2", title: "Q3 planning offsite", due: "Next week", done: false },
      { id: "g3", title: "Update pricing page", due: "done 2d ago", done: true },
    ],
    activity: [
      { id: "ga1", icon: "💰", title: "Payment received — $4,200", subtitle: "Acme Corp · 2h ago" },
      { id: "ga2", icon: "📈", title: "KPI updated: MRR $84,200", subtitle: "12h ago" },
      { id: "ga3", icon: "📝", title: "Priority added", subtitle: "1d ago" },
    ],
  },
  {
    slug: "evc",
    name: "EVC",
    status: "STEADY",
    trend: "flat",
    summary: "$4.2M portfolio · 8 active",
    pipelineLabel: "2 deals in pipeline",
    accent: "professional",
    kpis: [
      { name: "Portfolio Value", value: 4200000, prefix: "$", delta: -20000, deltaPct: -0.5, series: [4180000, 4220000, 4250000, 4240000, 4230000, 4210000, 4200000] },
      { name: "Active Investments", value: 8, delta: 0, deltaPct: 0, flat: true, series: [8, 8, 8, 8, 8, 8, 8] },
      { name: "Recent Activity", value: 3, delta: 1, deltaPct: 50, series: [1, 2, 2, 2, 3, 3, 3] },
      { name: "Pipeline", value: 2, delta: 0, deltaPct: 0, flat: true, series: [2, 2, 2, 2, 2, 2, 2] },
    ],
    priorities: [
      { id: "e1", title: "Q3 portfolio review", due: "This week", done: false },
      { id: "e2", title: "Due diligence on Series A target", due: "Next week", done: false },
    ],
    activity: [
      { id: "ea1", icon: "📊", title: "Portfolio rebalanced", subtitle: "1d ago" },
      { id: "ea2", icon: "💼", title: "Term sheet signed", subtitle: "2d ago" },
    ],
  },
  {
    slug: "serving",
    name: "Serving",
    status: "GROWING",
    trend: "up",
    summary: "$12k revenue · 28 active customers",
    pipelineLabel: "5 deals in pipeline",
    accent: "professional",
    kpis: [
      { name: "Revenue", value: 12400, prefix: "$", delta: 1800, deltaPct: 17, series: [9800, 10200, 10800, 11200, 11800, 12100, 12400] },
      { name: "Active Customers", value: 28, delta: 4, deltaPct: 16, series: [22, 23, 24, 25, 26, 27, 28] },
      { name: "Pipeline", value: 5, suffix: " deals", delta: 1, deltaPct: 25, series: [3, 3, 4, 4, 4, 5, 5] },
      { name: "Avg Deal Size", value: 4200, prefix: "$", delta: 200, deltaPct: 5, series: [3800, 3900, 4000, 4050, 4100, 4150, 4200] },
    ],
    priorities: [
      { id: "s1", title: "Follow up on Hartfield proposal", due: "This week", done: false },
      { id: "s2", title: "Onboard 2 new customers", due: "Next 2 weeks", done: false },
      { id: "s3", title: "Quarterly customer review calls", due: "End of month", done: false },
    ],
    activity: [
      { id: "sa1", icon: "💼", title: "New customer signed: Hartfield Group", subtitle: "4h ago" },
      { id: "sa2", icon: "📞", title: "Discovery call with prospect", subtitle: "8h ago" },
      { id: "sa3", icon: "💰", title: "Payment received — $4,200", subtitle: "1d ago" },
    ],
  },
] as const;

// Top 3 priorities across all businesses (rolled up for Home)
export const TOP_PRIORITIES = [
  { id: "tp1", title: "Close GCG deal — $40k", done: false, business: "GCG" },
  { id: "tp2", title: "Follow up on Hartfield proposal", done: false, business: "Serving" },
  { id: "tp3", title: "EVC quarterly review", done: false, business: "EVC" },
  { id: "tp4", title: "Update pricing page", done: true, business: "GCG" },
  { id: "tp5", title: "Onboard 2 new customers", done: false, business: "Serving" },
];

// ---- Unified activity feed for Home ----
export const HOME_ACTIVITY = [
  { id: "h1", icon: "⚡", domain: "finance" as DomainAccent, title: "Credit score updated: 782 (+4)", time: "12 min ago" },
  { id: "h2", icon: "💸", domain: "finance" as DomainAccent, title: "Charge: Stripe — $240", time: "1 hr ago", action: "Categorize", subtitle: "uncategorized" },
  { id: "h3", icon: "📈", domain: "social" as DomainAccent, title: "LinkedIn post: 1.2k impressions", time: "3 hrs ago" },
  { id: "h4", icon: "💤", domain: "fitness" as DomainAccent, title: "Sleep logged: 7h 12m", time: "7 hrs ago" },
  { id: "h5", icon: "💰", domain: "professional" as DomainAccent, title: "Payment received — $4,200", time: "10 hrs ago", subtitle: "GCG · Acme Corp" },
  { id: "h6", icon: "🏋️", domain: "fitness" as DomainAccent, title: "Workout: Push Day · 47m", time: "13 hrs ago" },
  { id: "h7", icon: "📊", domain: "professional" as DomainAccent, title: "Serving revenue up 17%", time: "1d ago" },
];

// ---- Health: Weight tracking ----
export const WEIGHT = {
  current: 182.4,
  unit: "lb",
  goal: 178,
  delta30d: -1.2,
  bodyFatPct: 16.8,
  bodyFatDelta30d: -0.4,
  series30d: [
    183.8, 183.6, 183.6, 183.4, 183.3, 183.4, 183.2, 183.1, 183.0, 182.9,
    183.0, 182.9, 182.8, 182.8, 182.7, 182.6, 182.7, 182.6, 182.6, 182.5,
    182.5, 182.4, 182.4, 182.3, 182.4, 182.5, 182.4, 182.4, 182.3, 182.4,
  ],
};

// ---- Health: Nutrition (today) ----
export const NUTRITION_TODAY = {
  calories: { consumed: 1840, goal: 2400 },
  protein: { consumed: 142, goal: 180, unit: "g" },
  carbs: { consumed: 168, goal: 240, unit: "g" },
  fat: { consumed: 64, goal: 80, unit: "g" },
  meals: [
    { id: "m1", name: "Breakfast", time: "7:40 AM", calories: 520, items: "Eggs · oats · berries" },
    { id: "m2", name: "Lunch", time: "12:30 PM", calories: 720, items: "Chicken bowl · rice · veg" },
    { id: "m3", name: "Snack", time: "3:15 PM", calories: 240, items: "Protein shake" },
    { id: "m4", name: "Dinner", time: "—", calories: 0, items: "Not logged yet" },
  ],
};

// ---- Health: Hydration (today) ----
export const HYDRATION = {
  current: 64, // oz
  goal: 96,
  unit: "oz",
  glasses: 8,
  glassesGoal: 12,
};

// ---- Health: Steps & activity (today) ----
export const STEPS_TODAY = {
  steps: 8420,
  goal: 10000,
  activeCalories: 420,
  activeMinutes: 38,
  distance: 4.1, // miles
};

// ---- Health: Mood & energy (today + 7 day) ----
export const MOOD = {
  todayMood: 4, // 1-5
  todayEnergy: 3, // 1-5
  todayFocus: 4, // 1-5
  notes: "Slept well, felt sharp through morning meetings. Energy dip ~3pm.",
  series7d: [
    { day: "Mon", mood: 3, energy: 3 },
    { day: "Tue", mood: 4, energy: 4 },
    { day: "Wed", mood: 3, energy: 3 },
    { day: "Thu", mood: 4, energy: 4 },
    { day: "Fri", mood: 5, energy: 4 },
    { day: "Sat", mood: 4, energy: 3 },
    { day: "Sun", mood: 4, energy: 3 },
  ],
};

// ---- Finance: Subscriptions ----
export const SUBSCRIPTIONS = [
  { id: "s1", name: "Adobe Creative Cloud", amount: 60, frequency: "monthly", nextDue: "Jun 2", category: "Software", lastUsed: "Today" },
  { id: "s2", name: "AWS", amount: 840, frequency: "monthly", nextDue: "May 31", category: "Software", lastUsed: "Today" },
  { id: "s3", name: "Netflix", amount: 23, frequency: "monthly", nextDue: "Jun 8", category: "Entertainment", lastUsed: "3d ago" },
  { id: "s4", name: "ChatGPT Plus", amount: 20, frequency: "monthly", nextDue: "Jun 12", category: "Software", lastUsed: "Today" },
  { id: "s5", name: "Notion", amount: 12, frequency: "monthly", nextDue: "Jun 15", category: "Software", lastUsed: "1h ago" },
  { id: "s6", name: "Spotify Family", amount: 17, frequency: "monthly", nextDue: "Jun 18", category: "Entertainment", lastUsed: "Today" },
  { id: "s7", name: "iCloud+ 2TB", amount: 10, frequency: "monthly", nextDue: "Jun 22", category: "Software", lastUsed: "Today" },
  { id: "s8", name: "NYTimes", amount: 17, frequency: "monthly", nextDue: "Jun 25", category: "News", lastUsed: "5d ago" },
];

// ---- Social: Content to make today ----
export const CONTENT_TODAY = [
  {
    id: "c1",
    platform: "LinkedIn",
    timeSlot: "9:00 AM",
    status: "drafted",
    angle: "Thought leadership",
    prompt: "3 things I learned shipping Serving's onboarding v2",
    estimatedMinutes: 15,
  },
  {
    id: "c2",
    platform: "X",
    timeSlot: "11:30 AM",
    status: "idea",
    angle: "Behind the scenes",
    prompt: "Quick take: what most agencies miss about onboarding",
    estimatedMinutes: 5,
  },
  {
    id: "c3",
    platform: "Instagram",
    timeSlot: "2:00 PM",
    status: "needs-asset",
    angle: "Founder POV",
    prompt: "Carousel: 'Day in the life' walking through GCG client call",
    estimatedMinutes: 30,
  },
  {
    id: "c4",
    platform: "TikTok",
    timeSlot: "5:00 PM",
    status: "scheduled",
    angle: "Educational",
    prompt: "Video already filmed — 'How I track 3 businesses in one screen'",
    estimatedMinutes: 0,
  },
];

// ---- Reports: aggregated weekly + monthly views ----

export type ReportPeriod = "week" | "month";

export const REPORT_RANGES = {
  week: { current: "May 26 – Jun 1", previous: "May 19 – May 25" },
  month: { current: "May 2026", previous: "April 2026" },
};

// Health rolled up
export const HEALTH_REPORT = {
  week: {
    avgReadiness: 74,
    avgReadinessDelta: 3,
    workouts: 5,
    workoutsDelta: 1,
    workoutMinutes: 246,
    avgSleep: "7h 04m",
    avgSleepDelta: 18, // minutes
    weightChange: -0.6,
    weightUnit: "lb",
    hydrationHitDays: 5,
    hydrationGoalDays: 7,
    avgMood: 3.9,
    avgEnergy: 3.4,
    moodDelta: 0.2,
    nutritionAvgCals: 2180,
    nutritionGoalCals: 2400,
    proteinAvg: 162,
    proteinGoal: 180,
    highlight: "Best stretch of sleep this month — averaged over 7h all week.",
    lowlight: "Energy dipped on Wed/Thu. Try winding down 30 min earlier.",
  },
  month: {
    avgReadiness: 72,
    avgReadinessDelta: 4,
    workouts: 19,
    workoutsDelta: 3,
    workoutMinutes: 940,
    avgSleep: "6h 52m",
    avgSleepDelta: 24,
    weightChange: -1.8,
    weightUnit: "lb",
    hydrationHitDays: 21,
    hydrationGoalDays: 30,
    avgMood: 3.7,
    avgEnergy: 3.5,
    moodDelta: 0.1,
    nutritionAvgCals: 2210,
    nutritionGoalCals: 2400,
    proteinAvg: 158,
    proteinGoal: 180,
    highlight: "Down 1.8 lb without crash dieting — sustainable pace.",
    lowlight: "Hydration hit goal only 70% of days. Set midday reminder.",
  },
};

// Finance rolled up
export const FINANCE_REPORT = {
  week: {
    netWorthDelta: 12401,
    netWorthDeltaPct: 1.0,
    spendingTotal: 2840,
    spendingDelta: -180, // negative = less spending than last week
    incomeTotal: 4200,
    creditScore: 782,
    creditScoreDelta: 4,
    subscriptionsTotal: 0,
    categories: [
      { name: "Food & Dining", value: 412, pct: 14.5 },
      { name: "Software", value: 920, pct: 32.4 },
      { name: "Rent & Utilities", value: 0, pct: 0 },
      { name: "Transport", value: 184, pct: 6.5 },
      { name: "Other", value: 1324, pct: 46.6 },
    ],
    highlight: "$12.4k net worth gain — Schwab brokerage led it.",
    lowlight: "1 uncategorized charge ($240, Stripe) still needs a tag.",
  },
  month: {
    netWorthDelta: 38420,
    netWorthDeltaPct: 3.2,
    spendingTotal: 11240,
    spendingDelta: 420, // positive = more spent
    incomeTotal: 18800,
    creditScore: 782,
    creditScoreDelta: 8,
    subscriptionsTotal: 999,
    categories: [
      { name: "Food & Dining", value: 1820, pct: 16.2 },
      { name: "Software", value: 3760, pct: 33.5 },
      { name: "Rent & Utilities", value: 3200, pct: 28.5 },
      { name: "Transport", value: 640, pct: 5.7 },
      { name: "Other", value: 1820, pct: 16.1 },
    ],
    highlight: "Credit score climbed 8 points to 782. Excellent tier.",
    lowlight: "Software spend hit 33% of total — review subscriptions.",
  },
};

// Social rolled up
export const SOCIAL_REPORT = {
  week: {
    postsPublished: 11,
    postsPlanned: 14,
    impressions: 42700,
    impressionsDelta: 5800,
    engagement: 2840,
    engagementRate: 6.6,
    engagementRateDelta: 0.4,
    bestPost: {
      platform: "TikTok",
      excerpt: "Behind the scenes: how I track 3 businesses in one screen",
      impressions: 18000,
      engagement: 2028,
    },
    perPlatform: [
      { platform: "LinkedIn", posts: 3, impressions: 12400, engagement: 412 },
      { platform: "X", posts: 5, impressions: 8200, engagement: 180 },
      { platform: "Instagram", posts: 2, impressions: 4100, engagement: 220 },
      { platform: "TikTok", posts: 1, impressions: 18000, engagement: 2028 },
    ],
    highlight: "One TikTok carried 42% of total impressions this week.",
    lowlight: "Missed 3 scheduled posts. Block 30 min/day for queue.",
  },
  month: {
    postsPublished: 38,
    postsPlanned: 48,
    impressions: 184200,
    impressionsDelta: 21400,
    engagement: 9840,
    engagementRate: 5.3,
    engagementRateDelta: -0.2,
    bestPost: {
      platform: "TikTok",
      excerpt: "5 productivity rules I broke to build faster",
      impressions: 78000,
      engagement: 5200,
    },
    perPlatform: [
      { platform: "LinkedIn", posts: 12, impressions: 52000, engagement: 1820 },
      { platform: "X", posts: 18, impressions: 31000, engagement: 620 },
      { platform: "Instagram", posts: 6, impressions: 18200, engagement: 980 },
      { platform: "TikTok", posts: 2, impressions: 83000, engagement: 6420 },
    ],
    highlight: "Cleared 180k impressions, +13% MoM.",
    lowlight: "Posting rate dropped from 12/wk to 8/wk in week 3.",
  },
};

// Work rolled up — per business
export const WORK_REPORT = {
  week: {
    businesses: [
      { name: "GCG", revenue: 4200, revenueDelta: 800, priorities: 1, priorityWins: ["Closed Acme renewal — $40k"], note: "Strong week. Pipeline filled to $240k." },
      { name: "EVC", revenue: 0, revenueDelta: 0, priorities: 0, priorityWins: [], note: "Quiet — portfolio review next week." },
      { name: "Serving", revenue: 12400, revenueDelta: 1800, priorities: 2, priorityWins: ["Hartfield signed", "2 customers onboarded"], note: "Best week MTD. +17% revenue." },
    ],
    totalRevenue: 16600,
    totalRevenueDelta: 2600,
    prioritiesCompleted: 3,
    prioritiesTotal: 8,
    highlight: "$16.6k total — driven by Serving onboarding 2 customers.",
    lowlight: "EVC needs attention — only quiet business this week.",
  },
  month: {
    businesses: [
      { name: "GCG", revenue: 84200, revenueDelta: 4200, priorities: 5, priorityWins: ["Q2 close", "Pricing page shipped"], note: "MRR steady. Need to convert pipeline." },
      { name: "EVC", revenue: 0, revenueDelta: 0, priorities: 1, priorityWins: ["Term sheet signed"], note: "Portfolio -0.5% but added new position." },
      { name: "Serving", revenue: 38420, revenueDelta: 9800, priorities: 8, priorityWins: ["Onboarding v2", "Launched annual plans", "+12 customers"], note: "Fastest growing — keep momentum." },
    ],
    totalRevenue: 122620,
    totalRevenueDelta: 14000,
    prioritiesCompleted: 14,
    prioritiesTotal: 22,
    highlight: "$14k revenue lift MoM. Serving caught up to GCG in growth.",
    lowlight: "EVC stalled. Decide: rebalance or step back from active mgmt.",
  },
};

// ---- Notifications (count for the bell) ----
export const UNREAD_NOTIFICATIONS = 3;
