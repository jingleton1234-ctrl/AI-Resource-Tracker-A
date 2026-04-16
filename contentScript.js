const AI_DOMAIN_PATTERNS = [
  { label: "OpenAI (ChatGPT)", hosts: [/chat\.openai\.com/i, /openai\.com/i] },
  { label: "Anthropic Claude", hosts: [/claude\.ai/i, /anthropic\.com/i] },
  { label: "Google Gemini", hosts: [/gemini\.google\.com/i, /bard\.google\.com/i, /ai\.google/i] },
  { label: "Microsoft Copilot", hosts: [/copilot\.microsoft\.com/i, /bing\.com/i] },
  { label: "Perplexity", hosts: [/perplexity\.ai/i] },
  { label: "Hugging Face", hosts: [/huggingface\.co/i] },
  { label: "Poe", hosts: [/poe\.com/i] },
  { label: "Character.AI", hosts: [/character\.ai/i] },
  { label: "Inflection Pi", hosts: [/pi\.ai/i] },
  { label: "Notion AI", hosts: [/notion\.so/i] },
  { label: "GitHub Copilot", hosts: [/github\.com/i, /copilot\.github\.com/i] }
];

const AI_KEYWORDS = [
  { label: "OpenAI (ChatGPT)", pattern: /ChatGPT|GPT-4|GPT-3\.5|OpenAI/i },
  { label: "Anthropic Claude", pattern: /Claude|Anthropic/i },
  { label: "Google Gemini", pattern: /Gemini|Bard/i },
  { label: "Microsoft Copilot", pattern: /Copilot|Bing AI/i },
  { label: "Perplexity", pattern: /Perplexity/i },
  { label: "Poe", pattern: /Poe AI/i },
  { label: "Character.AI", pattern: /Character\.ai/i },
  { label: "Inflection Pi", pattern: /Inflection|Pi AI/i },
  { label: "Notion AI", pattern: /Notion AI/i },
  { label: "GitHub Copilot", pattern: /GitHub Copilot/i }
];

const TOPIC_RULES = [
  {
    topic: "Programming",
    terms: [
      { phrase: "python", weight: 3.2 }, { phrase: "javascript", weight: 3.2 }, { phrase: "typescript", weight: 3.2 },
      { phrase: "sql", weight: 2.8 }, { phrase: "api", weight: 2.6 }, { phrase: "debug", weight: 2.6 },
      { phrase: "bug", weight: 2.2 }, { phrase: "backend", weight: 2.2 }, { phrase: "frontend", weight: 2.2 },
      { phrase: "function", weight: 1.5 }, { phrase: "code", weight: 1.2 }, { phrase: "coding", weight: 1.2 }
    ]
  },
  {
    topic: "Education",
    terms: [
      { phrase: "homework", weight: 3.1 }, { phrase: "university", weight: 2.9 }, { phrase: "exam", weight: 2.8 },
      { phrase: "teacher", weight: 2.6 }, { phrase: "study", weight: 2.3 }, { phrase: "lesson", weight: 2.3 },
      { phrase: "school", weight: 2.1 }, { phrase: "learn", weight: 1.4 }, { phrase: "curriculum", weight: 2.4 }
    ]
  },
  {
    topic: "Business",
    terms: [
      { phrase: "revenue", weight: 3.0 }, { phrase: "marketing", weight: 2.8 }, { phrase: "kpi", weight: 2.8 },
      { phrase: "sales", weight: 2.6 }, { phrase: "customer", weight: 2.4 }, { phrase: "strategy", weight: 2.3 },
      { phrase: "startup", weight: 2.2 }, { phrase: "meeting", weight: 1.6 }, { phrase: "roadmap", weight: 2.2 }
    ]
  },
  {
    topic: "Health",
    terms: [
      { phrase: "symptom", weight: 3.0 }, { phrase: "doctor", weight: 2.8 }, { phrase: "therapy", weight: 2.8 },
      { phrase: "exercise", weight: 2.5 }, { phrase: "workout", weight: 2.5 }, { phrase: "diet", weight: 2.4 },
      { phrase: "sleep", weight: 2.3 }, { phrase: "health", weight: 1.8 }, { phrase: "nutrition", weight: 2.2 }
    ]
  },
  {
    topic: "Finance",
    terms: [
      { phrase: "budget", weight: 2.8 }, { phrase: "tax", weight: 2.8 }, { phrase: "invest", weight: 2.6 },
      { phrase: "stock", weight: 2.6 }, { phrase: "crypto", weight: 2.4 }, { phrase: "loan", weight: 2.4 },
      { phrase: "interest rate", weight: 3.0 }, { phrase: "savings", weight: 2.2 }, { phrase: "portfolio", weight: 2.4 }
    ]
  },
  {
    topic: "Travel",
    terms: [
      { phrase: "itinerary", weight: 3.1 }, { phrase: "flight", weight: 2.8 }, { phrase: "hotel", weight: 2.7 },
      { phrase: "visa", weight: 2.6 }, { phrase: "destination", weight: 2.4 }, { phrase: "booking", weight: 2.3 },
      { phrase: "trip", weight: 1.8 }, { phrase: "tour", weight: 1.8 }, { phrase: "airport", weight: 2.2 }
    ]
  },
  {
    topic: "Writing",
    terms: [
      { phrase: "essay", weight: 2.8 }, { phrase: "rewrite", weight: 2.7 }, { phrase: "grammar", weight: 2.6 },
      { phrase: "outline", weight: 2.4 }, { phrase: "email", weight: 2.2 }, { phrase: "blog", weight: 2.1 },
      { phrase: "script", weight: 2.0 }, { phrase: "story", weight: 2.0 }, { phrase: "proofread", weight: 2.5 }
    ]
  },
  {
    topic: "Lifestyle",
    terms: [
      { phrase: "recipe", weight: 2.8 }, { phrase: "cooking", weight: 2.6 }, { phrase: "fashion", weight: 2.4 },
      { phrase: "shopping", weight: 2.3 }, { phrase: "hobby", weight: 2.2 }, { phrase: "movie", weight: 2.0 },
      { phrase: "music", weight: 2.0 }, { phrase: "game", weight: 1.8 }, { phrase: "wellness", weight: 2.1 }
    ]
  }
];
const TOPIC_SCORE_MIN_FOR_CONFIDENT_MATCH = 2.2;
const TOPIC_SCORE_TIE_MARGIN = 0.65;

const PROVIDER_LABEL_TO_KEY = {
  "OpenAI (ChatGPT)": "chatgpt",
  "Google Gemini": "gemini",
  "Microsoft Copilot": "copilot",
  "Anthropic Claude": "claude",
  "Perplexity": "perplexity",
  "Poe": "poe",
  "Character.AI": "character.ai",
  "Inflection Pi": "pi",
  "Notion AI": "notion",
  "GitHub Copilot": "copilot"
};

const MODEL_CONTEXT_SELECTORS = [
  "header",
  "nav",
  "[role='navigation']",
  "[role='banner']",
  "[data-testid*='model']",
  "[data-testid*='mode']",
  "[aria-label*='model' i]",
  "[aria-label*='mode' i]",
  "button",
  "[role='button']"
];
const MODEL_CONTEXT_SLICE_LIMIT = 6000;

const PROVIDER_MODEL_RULES = {
  chatgpt: [
    { model: "Thinking", confidence: 0.95, patterns: [/\bthinking\b/i] },
    { model: "Instant", confidence: 0.95, patterns: [/\binstant\b/i] }
  ],
  gemini: [
    { model: "Pro", confidence: 0.95, patterns: [/\bpro\b/i] },
    { model: "Thinking", confidence: 0.95, patterns: [/\bthinking\b/i] },
    { model: "Fast", confidence: 0.95, patterns: [/\bfast\b/i, /\bflash\b/i] }
  ],
  copilot: [
    { model: "Think Deeper", confidence: 0.95, patterns: [/\bthink\s+deeper\b/i] },
    { model: "Study and Learn", confidence: 0.95, patterns: [/\bstudy\s+and\s+learn\b/i] },
    { model: "Search", confidence: 0.9, patterns: [/\bsearch\b/i] },
    { model: "Smart", confidence: 0.9, patterns: [/\bsmart\b/i] }
  ],
  claude: [
    { model: "Opus", confidence: 0.95, patterns: [/\bopus\b/i] },
    { model: "Sonnet", confidence: 0.95, patterns: [/\bsonnet\b/i] },
    { model: "Haiku", confidence: 0.95, patterns: [/\bhaiku\b/i] }
  ],
  perplexity: [
    { model: "Sonar", confidence: 0.95, patterns: [/\bsonar\b/i] },
    { model: "Model", confidence: 0.7, patterns: [/\bmodel\b/i] }
  ]
};

const BANNER_ID = "ai-detector-banner";
const BANNER_POSITION_KEY = "bannerPosition";
const TEXT_SLICE_LIMIT = 8000;
const AI_OUTPUT_SELECTORS = [
  "[data-testid='conversation-turns']",
  "[data-testid='chat-messages']",
  "[data-qa='chat_history']",
  ".conversation",
  ".chat-history",
  ".markdown",
  "main",
  "[role='main']"
];
const COMMON_ASSISTANT_OUTPUT_SELECTORS = [
  "[data-message-author-role='assistant']",
  "[data-author='assistant']",
  "[data-role='assistant']",
  "[data-testid='assistant-message']",
  "[data-testid*='assistant-message']",
  "[data-testid*='assistant']",
  "[data-testid*='response']",
  "[role='main'] .markdown",
  "main .markdown"
];
const COMMON_USER_OUTPUT_SELECTORS = [
  "[data-message-author-role='human']",
  "[data-message-author-role='user']",
  "[data-author='human']",
  "[data-author='user']",
  "[data-role='user']",
  "[data-testid='user-message']",
  "[data-testid*='user-message']"
];
const PROVIDER_OUTPUT_SELECTORS = {
  claude: [
    "div.standard-markdown p.font-claude-response-body",
    "div.standard-markdown .font-claude-response-body",
    "p.font-claude-response-body",
    "div.standard-markdown p",
    "div.standard-markdown"
  ],
  gemini: [
    "[data-test-id='response-content']",
    "[data-test-id='conversation-container']",
    "[data-test-id='chat-history']",
    "main .response",
    "main article"
  ],
  copilot: [
    "#b_sydConvCont",
    "cib-serp",
    "[data-testid='chat-messages']",
    "[role='main'] article"
  ],
  perplexity: [
    "[data-testid='answer']",
    "[data-testid*='answer']",
    "[role='main'] .prose",
    "main .prose"
  ],
  poe: [
    "[data-testid='chat-message']",
    "[data-testid*='assistant-message']",
    "main article"
  ],
  "character.ai": [
    "[data-testid='chat-message']",
    "[data-testid*='message']",
    "main article"
  ],
  pi: [
    "[role='main'] .markdown",
    "main .markdown",
    "main article"
  ],
  notion: [
    "[data-testid='chat-message']",
    "[data-testid*='message']",
    "[role='main'] .markdown",
    "main .markdown"
  ]
};
const CLAUDE_COUNTER_REQUEST_TYPE = "CLAUDE_TOKEN_COUNTER_GET_STATS";
const CLAUDE_COUNTER_MESSAGE_ACTION_GROUP_SELECTOR = '[role="group"][aria-label*="Message actions" i]';
const CLAUDE_COUNTER_ACTION_COPY_BUTTON_SELECTOR = 'button[data-testid="action-bar-copy"]';
const CLAUDE_COUNTER_POSITIVE_FEEDBACK_SELECTOR = 'button[aria-label="Give positive feedback"], button[aria-label*="positive feedback" i]';
const CLAUDE_COUNTER_USER_SELECTORS = [
  '[data-testid="user-message"]',
  '[data-testid*="user-message"]',
  '[data-testid*="human-message"]',
  '[class*="user-message"]'
];
const CLAUDE_COUNTER_ASSISTANT_SELECTORS = [
  '[data-testid="assistant-message"]',
  '[data-testid*="assistant-message"]',
  '[data-testid*="claude-message"]',
  '[class*="assistant-message"]',
  '[class*="claude-message"]'
];
const CLAUDE_COUNTER_GENERIC_MESSAGE_SELECTORS = [
  '[data-testid*="message"]',
  'article[data-testid*="message"]'
];
const CLAUDE_COUNTER_DRAFT_INPUT_SELECTORS = [
  'div[contenteditable="true"][role="textbox"]',
  'div[contenteditable="true"][aria-label*="message" i]',
  'textarea[aria-label*="message" i]',
  "textarea"
];
const USER_INPUT_SELECTORS = [
  "textarea",
  "input",
  "[contenteditable='true']",
  "[role='textbox']",
  "[data-testid='composer']",
  "[data-testid='chat-input']",
  "[aria-label*='message']",
  ".prompt-editor",
  "form"
];
const IMPACT_EQUATION_CONSTANTS = {
  energyWhPerInputToken: 0.000083,
  energyWhPerOutputToken: 0.00083,
  waterMlPerInputToken: 0.002,
  waterMlPerOutputToken: 0.02,
  co2MgPerInputToken: 0.043,
  co2MgPerOutputToken: 0.43,
  thinkingScalarEnabled: 2.1,
  thinkingScalarDisabled: 1
};
let latestDetection = null;
let latestModelDetection = {
  provider: "unknown",
  model: "unknown",
  confidence: 0
};
let latestTokenEstimate = 0;
let latestOutputTokenEstimate = 0;
let accumulatedOutputTokens = 0;
let mutationObserver = null;
let awaitingResponse = false;
let conversationStarted = false;
let sessionId = null;
let sessionIdPromise = null;
let userId = null;
let userIdPromise = null;
let interactionId = null;
let interactionNumber = null;
let interactionNumberPromise = null;
let interactionCounter = 0;
let lastOutputFingerprint = "";
let latestImpactMetrics = { energyWh: 0, co2g: 0, waterL: 0 };
let accumulatedImpactTotals = { energyWh: 0, co2g: 0, waterL: 0 };
let extensionEnabled = true;
let detectionScheduled = false;
let resourceObserver = null;
let pendingNetworkResponse = false;
let latestInputTokenEstimate = 0;
let latestDraftInputTokenEstimate = 0;
let latestSubmittedInputTokenEstimate = 0;
let accumulatedInputTokens = 0;
let latestPromptInputText = "";
let latestAiOutputText = "";
const DAILY_TOTALS_KEY = "dailyTotals";
const DAILY_TOKEN_GOAL_KEY = "dailyTokenGoal";
const ALL_TIME_TOKEN_TOTAL_KEY = "allTimeTokenTotal";
const ALL_TIME_TOTALS_KEY = "allTimeTotals";
const CONVERSATION_SESSION_MAP_KEY = "conversationSessionMap";
const CONVERSATION_SESSION_COUNTER_KEY = "conversationSessionCounter";
const PARTICIPANT_ID_KEY = "participantId";
const DAILY_TOTALS_RETENTION_DAYS = 60;
const INTERACTION_LOG_DEBOUNCE_MS = 1500;
const OUTPUT_SETTLE_GRACE_MS = 4000;
const EQUIVALENT_BOX_MAX_HEIGHT_PX = 132;
const QUICK_FOLLOWUP_WINDOW_MS = 30000;
const QUICK_FOLLOWUP_ALERT_THRESHOLD = 2;
const QUICK_FOLLOWUP_ALERT_REPEAT_INTERVAL = 3;
const NEW_CHAT_DAILY_NUDGE_THRESHOLD = 2;
const PROMPT_MARK_DEDUP_WINDOW_MS = 800;
const QUICK_FOLLOWUP_NUDGE_ID = "ai-detector-quick-followup-nudge";
const NEW_CHAT_NUDGE_ID = "ai-detector-new-chat-nudge";
const BANNER_EDGE_PADDING_PX = 8;
const NEW_CHAT_NUDGE_STATE_KEY = "newChatNudgeState";
const impactEquivalents = globalThis.IMPACT_EQUIVALENTS || null;
const THINKING_GUARD_PROVIDERS = new Set(["gemini", "copilot", "claude", "perplexity"]);
const SESSION_TRACKED_PROVIDER_KEYS = new Set(["chatgpt", "claude", "gemini", "copilot", "perplexity"]);
const NEW_CHAT_TRIGGER_PATTERNS = [
  /\bnew\s+chat\b/i,
  /\bnew\s+conversation\b/i,
  /\bnew\s+thread\b/i,
  /\bstart\s+new\b/i,
  /\bstart\s+over\b/i,
  /\bclear\s+chat\b/i
];
const SESSION_PROVIDER_CONVERSATION_PATH_PATTERNS = {
  chatgpt: [/\/c\/([^/?#]+)/i],
  claude: [/\/chat\/([^/?#]+)/i, /\/project\/[^/?#]+\/chat\/([^/?#]+)/i],
  gemini: [/\/app\/([^/?#]+)/i],
  copilot: [/\/chats?\/([^/?#]+)/i, /\/conversation\/([^/?#]+)/i, /\/chat\/([^/?#]+)/i],
  perplexity: [/\/search\/([^/?#]+)/i, /\/thread\/([^/?#]+)/i, /\/chat\/([^/?#]+)/i, /\/p\/([^/?#]+)/i]
};
const SESSION_PROVIDER_DRAFT_PATH_PATTERNS = {
  chatgpt: [/^\/$/],
  claude: [/^\/$/, /^\/new$/i, /^\/chat$/i],
  gemini: [/^\/$/, /^\/app$/i, /^\/u\/\d+\/app$/i],
  copilot: [/^\/$/, /^\/chat$/i, /^\/chats$/i],
  perplexity: [/^\/$/, /^\/search$/i]
};
const SESSION_PROVIDER_QUERY_PARAM_KEYS = {
  chatgpt: ["conversation_id", "conversationid"],
  claude: ["conversation_id", "conversationid", "chat_id", "chatid"],
  gemini: ["conversation_id", "conversationid", "chat_id", "chatid"],
  copilot: ["conversation_id", "conversationid", "conv_id", "convid", "conv", "chat_id", "chatid", "thread_id", "threadid"],
  perplexity: ["thread_id", "threadid", "conversation_id", "conversationid", "chat_id", "chatid"]
};
const THINKING_STATUS_PATTERNS = [
  /\bthinking\b/i,
  /\bsearching\b/i,
  /\banalyz(?:ing|e)\b/i,
  /\breasoning\b/i,
  /\bgathering\b/i,
  /\bworking on it\b/i,
  /\bthought for\b/i,
  /\blet me think\b/i
];
let pendingInteractionLogTimers = new Map();
let sentInteractionIds = new Set();
let interactionPromptSubmittedAtById = new Map();
let interactionOutputTokenBaselineById = new Map();
let lastLoggedOutputTokensBySession = new Map();
let lastOutputUpdateAt = 0;
let lastPromptSubmittedAt = 0;
let lastPromptMarkAt = 0;
let quickFollowupCountInSession = 0;
let quickFollowupNextAlertCount = QUICK_FOLLOWUP_ALERT_THRESHOLD + 1;
let quickFollowupNudgeTimer = null;
let newChatNudgeTimer = null;
let bannerPositionInitialized = false;
let environmentalMetricsVisible = false;
let latestQuickFollowupMeta = {
  isQuickFollowup: false,
  deltaMs: null,
  quickFollowupCountInSession: 0
};
let currentConversationSessionKey = null;
let conversationNavigationListenersRegistered = false;
let conversationRouteSyncScheduled = false;
let lastConversationRouteFingerprint = "";
let localConversationSessionCounter = 0;


const METRIC_THRESHOLD_KEYS = ["energyWh", "co2g", "waterMl"];

const toSafeMetricNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
};

const normalizeImpactMetrics = (metrics) => ({
  energyWh: +toSafeMetricNumber(metrics?.energyWh).toFixed(6),
  co2g: +toSafeMetricNumber(metrics?.co2g).toFixed(6),
  waterL: +toSafeMetricNumber(metrics?.waterL).toFixed(6)
});

const getLiveSessionImpactTotals = () => {
  const accumulated = normalizeImpactMetrics(accumulatedImpactTotals);
  const latest = normalizeImpactMetrics(latestImpactMetrics);
  return {
    energyWh: +Math.max(accumulated.energyWh, latest.energyWh).toFixed(6),
    co2g: +Math.max(accumulated.co2g, latest.co2g).toFixed(6),
    waterL: +Math.max(accumulated.waterL, latest.waterL).toFixed(6)
  };
};

const getEquivalentSummaryText = (metrics) => {
  if (!impactEquivalents) {
    return "";
  }
  const metricValues = {
    energyWh: toSafeMetricNumber(metrics?.energyWh),
    co2g: toSafeMetricNumber(metrics?.co2g),
    waterMl: +(toSafeMetricNumber(metrics?.waterL) * 1000).toFixed(6)
  };
  const lines = [];
  METRIC_THRESHOLD_KEYS.forEach((metricName) => {
    const list = typeof impactEquivalents.getEquivalentList === "function"
      ? impactEquivalents.getEquivalentList(metricName, metricValues[metricName])
      : [];
    const text = list.length > 0
      ? pickRandom(list)
      : (
        typeof impactEquivalents.getEquivalentText === "function"
          ? impactEquivalents.getEquivalentText(metricName, metricValues[metricName], " / ")
          : ""
      );
    if (!text || text === impactEquivalents.defaultText) {
      return;
    }
    lines.push(text);
  });
  return pickRandom(lines);
};

const matchesSelectorList = (node, selectors) => {
  if (!node || !selectors || selectors.length === 0) {
    return false;
  }
  return selectors.some((selector) => {
    if (!selector) {
      return false;
    }
    if (typeof node.matches === "function" && node.matches(selector)) {
      return true;
    }
    if (typeof node.closest === "function") {
      const match = node.closest(selector);
      if (match) {
        return true;
      }
    }
    return false;
  });
};

const isUserInputElement = (node) => matchesSelectorList(node, USER_INPUT_SELECTORS);
const USER_INPUT_TEXT_SELECTORS = USER_INPUT_SELECTORS.filter((selector) => selector !== "form");

const isThinkingModeEnabled = (modelDetection = latestModelDetection) => {
  const provider = String(modelDetection?.provider || "").toLowerCase();
  const model = String(modelDetection?.model || "").toLowerCase();

  return (
    (provider === "chatgpt" && model === "thinking")
    || (provider === "gemini" && model === "thinking")
    || (provider === "copilot" && model === "think deeper")
    || (provider === "claude" && model === "opus")
  );
};

const getThinkingScalar = (modelDetection = latestModelDetection) => {
  return isThinkingModeEnabled(modelDetection)
    ? IMPACT_EQUATION_CONSTANTS.thinkingScalarEnabled
    : IMPACT_EQUATION_CONSTANTS.thinkingScalarDisabled;
};

const createImpactMetrics = (
  inputTokenCount = 0,
  outputTokenCount = 0,
  modelDetection = latestModelDetection
) => {
  const safeInputTokens = Number.isFinite(inputTokenCount) && inputTokenCount > 0
    ? Number(inputTokenCount)
    : 0;
  const safeOutputTokens = Number.isFinite(outputTokenCount) && outputTokenCount > 0
    ? Number(outputTokenCount)
    : 0;
  const thinkingScalar = getThinkingScalar(modelDetection);

  const energyWh = (
    safeInputTokens * IMPACT_EQUATION_CONSTANTS.energyWhPerInputToken
  ) + (
    safeOutputTokens * IMPACT_EQUATION_CONSTANTS.energyWhPerOutputToken * thinkingScalar
  );
  const waterMl = (
    safeInputTokens * IMPACT_EQUATION_CONSTANTS.waterMlPerInputToken
  ) + (
    safeOutputTokens * IMPACT_EQUATION_CONSTANTS.waterMlPerOutputToken * thinkingScalar
  );
  const co2Mg = (
    safeInputTokens * IMPACT_EQUATION_CONSTANTS.co2MgPerInputToken
  ) + (
    safeOutputTokens * IMPACT_EQUATION_CONSTANTS.co2MgPerOutputToken * thinkingScalar
  );

  return {
    energyWh: +energyWh.toFixed(6),
    co2g: +(co2Mg / 1000).toFixed(6),
    waterL: +(waterMl / 1000).toFixed(6)
  };
};

const addImpactMetrics = (baseMetrics, deltaMetrics) => ({
  energyWh: +((Number(baseMetrics?.energyWh) || 0) + (Number(deltaMetrics?.energyWh) || 0)).toFixed(6),
  co2g: +((Number(baseMetrics?.co2g) || 0) + (Number(deltaMetrics?.co2g) || 0)).toFixed(6),
  waterL: +((Number(baseMetrics?.waterL) || 0) + (Number(deltaMetrics?.waterL) || 0)).toFixed(6)
});

const refreshDisplayedTotals = (modelDetection = latestModelDetection) => {
  const safeOutputTokens = Number.isFinite(latestOutputTokenEstimate) && latestOutputTokenEstimate > 0
    ? Math.round(latestOutputTokenEstimate)
    : 0;
  latestTokenEstimate = safeOutputTokens;
  const inputTokensForImpact = Math.max(
    Number(latestSubmittedInputTokenEstimate) || 0,
    Number(accumulatedInputTokens) || 0
  );
  const safeInputTokens = Number.isFinite(inputTokensForImpact) && inputTokensForImpact > 0
    ? Math.round(inputTokensForImpact)
    : 0;
  latestImpactMetrics = createImpactMetrics(safeInputTokens, safeOutputTokens, modelDetection);
};

const resetAccumulatedTotals = () => {
  accumulatedOutputTokens = 0;
  accumulatedInputTokens = 0;
  accumulatedImpactTotals = { energyWh: 0, co2g: 0, waterL: 0 };
  latestTokenEstimate = 0;
  latestOutputTokenEstimate = 0;
  latestImpactMetrics = { energyWh: 0, co2g: 0, waterL: 0 };
};

const formatImpactValue = (value) => {
  const safeValue = Number.isFinite(value) && value > 0 ? value : 0;
  return safeValue.toFixed(2);
};

const formatWaterMl = (valueInLiters) => {
  const mlValue = (Number(valueInLiters) || 0) * 1000;
  return formatImpactValue(mlValue);
};

const pickRandom = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }
  return items[Math.floor(Math.random() * items.length)] || "";
};

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const readInputText = (node) => {
  if (!node) {
    return "";
  }
  if (typeof node.value === "string" && node.value.trim()) {
    return node.value.trim();
  }
  const text = typeof node.textContent === "string" ? node.textContent : "";
  return text.trim();
};

const findNearestInput = (node) => {
  if (!(node instanceof Element)) {
    return null;
  }
  const inputSelector = USER_INPUT_TEXT_SELECTORS.join(",");
  if (matchesSelectorList(node, USER_INPUT_TEXT_SELECTORS)) {
    return node;
  }
  const directMatch = typeof node.closest === "function" ? node.closest(inputSelector) : null;
  if (directMatch) {
    return directMatch;
  }
  const form = typeof node.closest === "function" ? node.closest("form") : null;
  if (form) {
    return form.querySelector(inputSelector);
  }
  return null;
};

const collectInputCandidates = (sourceNode = null) => {
  const candidates = [];
  const seen = new Set();
  const addCandidate = (node) => {
    if (!node || seen.has(node)) {
      return;
    }
    seen.add(node);
    candidates.push(node);
  };

  addCandidate(findNearestInput(sourceNode));
  addCandidate(findNearestInput(document.activeElement));
  document.querySelectorAll(USER_INPUT_TEXT_SELECTORS.join(",")).forEach((node) => {
    addCandidate(node);
  });
  return candidates;
};

const isLikelyClaudePage = () => {
  const host = (location.hostname || "").toLowerCase();
  const url = (location.href || "").toLowerCase();
  return host.includes("claude.ai")
    || host.includes("anthropic.com")
    || url.includes("claude.ai")
    || url.includes("anthropic.com");
};

const captureInputSnapshot = (sourceNode = null) => {
  const useClaudeEstimator = isLikelyClaudePage();
  const candidates = collectInputCandidates(sourceNode);
  for (const node of candidates) {
    const text = readInputText(node);
    if (text) {
      return {
        text,
        tokens: useClaudeEstimator ? estimateClaudeCounterTokens(text) : estimateTokensFromText(text)
      };
    }
  }

  if (useClaudeEstimator) {
    const draftPrompt = findClaudeCounterDraftPromptText();
    if (draftPrompt) {
      return { text: draftPrompt, tokens: estimateClaudeCounterTokens(draftPrompt) };
    }
  }

  return { text: "", tokens: 0 };
};

const captureInputTokenCount = (sourceNode = null) => {
  return captureInputSnapshot(sourceNode).tokens;
};

const clampBannerPosition = (left, top, width, height) => {
  const maxLeft = Math.max(BANNER_EDGE_PADDING_PX, window.innerWidth - width - BANNER_EDGE_PADDING_PX);
  const maxTop = Math.max(BANNER_EDGE_PADDING_PX, window.innerHeight - height - BANNER_EDGE_PADDING_PX);
  return {
    left: Math.min(Math.max(left, BANNER_EDGE_PADDING_PX), maxLeft),
    top: Math.min(Math.max(top, BANNER_EDGE_PADDING_PX), maxTop)
  };
};

const applyBannerPosition = (banner, left, top) => {
  if (!banner) {
    return;
  }
  const rect = banner.getBoundingClientRect();
  const clamped = clampBannerPosition(
    Number(left) || 0,
    Number(top) || 0,
    rect.width || 0,
    rect.height || 0
  );
  banner.style.left = `${Math.round(clamped.left)}px`;
  banner.style.top = `${Math.round(clamped.top)}px`;
  banner.style.right = "auto";
  banner.style.bottom = "auto";
};

const saveBannerPosition = (banner) => {
  if (!banner || !chrome?.storage?.local) {
    return;
  }
  const rect = banner.getBoundingClientRect();
  try {
    chrome.storage.local.set({
      [BANNER_POSITION_KEY]: {
        left: Math.round(rect.left),
        top: Math.round(rect.top)
      }
    });
  } catch (_error) {
    // Ignore transient context invalidation during extension reload/update.
  }
};

const loadBannerPosition = (banner) => {
  if (!banner || bannerPositionInitialized || !chrome?.storage?.local) {
    return;
  }
  bannerPositionInitialized = true;
  chrome.storage.local.get({ [BANNER_POSITION_KEY]: null }, (data) => {
    const position = data?.[BANNER_POSITION_KEY];
    if (!position || !Number.isFinite(position.left) || !Number.isFinite(position.top)) {
      return;
    }
    applyBannerPosition(banner, position.left, position.top);
  });
};

const enableBannerDragging = (banner) => {
  if (!banner || banner.dataset.dragReady === "true") {
    return;
  }
  banner.dataset.dragReady = "true";
  let dragState = null;

  const stopDrag = () => {
    if (!dragState) {
      return;
    }
    const previousPointerId = dragState.pointerId;
    dragState = null;
    if (Number.isFinite(previousPointerId) && typeof banner.releasePointerCapture === "function") {
      try {
        banner.releasePointerCapture(previousPointerId);
      } catch (_error) {
        // Ignore release errors when pointer capture is already lost.
      }
    }
    saveBannerPosition(banner);
  };

  banner.addEventListener("pointerdown", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target || !target.closest("[data-banner-drag-handle='true']")) {
      return;
    }
    const rect = banner.getBoundingClientRect();
    applyBannerPosition(banner, rect.left, rect.top);
    dragState = {
      pointerId: event.pointerId,
      startLeft: rect.left,
      startTop: rect.top,
      startX: event.clientX,
      startY: event.clientY
    };
    if (typeof banner.setPointerCapture === "function") {
      try {
        banner.setPointerCapture(event.pointerId);
      } catch (_error) {
        // Ignore capture failures and continue without capture.
      }
    }
    event.preventDefault();
  });

  banner.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) {
      return;
    }
    const nextLeft = dragState.startLeft + (event.clientX - dragState.startX);
    const nextTop = dragState.startTop + (event.clientY - dragState.startY);
    applyBannerPosition(banner, nextLeft, nextTop);
    event.preventDefault();
  });

  banner.addEventListener("pointerup", stopDrag);
  banner.addEventListener("pointercancel", stopDrag);
};

const ensureBanner = () => {
  let banner = document.getElementById(BANNER_ID);
  if (!banner) {
    banner = document.createElement("div");
    banner.id = BANNER_ID;
    banner.style.position = "fixed";
    banner.style.right = "24px";
    banner.style.bottom = "36px";
    banner.style.zIndex = "2147483647";
    banner.style.padding = "20px 22px";
    banner.style.borderRadius = "14px";
    banner.style.background = "linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 64, 175, 0.92))";
    banner.style.border = "1px solid rgba(148, 163, 184, 0.4)";
    banner.style.color = "#e2e8f0";
    banner.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    banner.style.fontSize = "14px";
    banner.style.fontWeight = "500";
    banner.style.lineHeight = "1.45";
    banner.style.display = "flex";
    banner.style.flexDirection = "column";
    banner.style.rowGap = "5px";
    banner.style.boxShadow = "0 12px 30px rgba(15, 23, 42, 0.45)";
    banner.style.pointerEvents = "auto";
    banner.style.backdropFilter = "blur(6px)";
    banner.style.width = "min(300px, calc(100vw - 32px))";
    banner.style.minHeight = "220px";
    banner.style.boxSizing = "border-box";
    banner.style.whiteSpace = "pre-line";
    document.documentElement.appendChild(banner);
    enableBannerDragging(banner);
    loadBannerPosition(banner);
    window.addEventListener("resize", () => {
      const liveBanner = document.getElementById(BANNER_ID);
      if (!liveBanner) {
        return;
      }
      const rect = liveBanner.getBoundingClientRect();
      if (!Number.isFinite(rect.left) || !Number.isFinite(rect.top)) {
        return;
      }
      applyBannerPosition(liveBanner, rect.left, rect.top);
      saveBannerPosition(liveBanner);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey && isUserInputElement(event.target)) {
        const draftTokens = captureInputTokenCount(event.target);
        latestDraftInputTokenEstimate = draftTokens;
        latestInputTokenEstimate = draftTokens;
      }
    }, true);
  }
  return banner;
};

const showBanner = () => {
  const banner = ensureBanner();
  banner.style.display = "flex";
};

const hideBanner = () => {
  const banner = document.getElementById(BANNER_ID);
  if (banner) {
    banner.style.display = "none";
  }
};

const applyParticipantBannerGateStyles = (banner, hasParticipantId) => {
  if (!banner) {
    return;
  }
  if (hasParticipantId) {
    banner.style.background = "linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 64, 175, 0.92))";
    banner.style.border = "1px solid rgba(148, 163, 184, 0.4)";
    banner.style.opacity = "1";
    banner.style.filter = "none";
    return;
  }
  banner.style.background = "linear-gradient(135deg, rgba(71, 85, 105, 0.92), rgba(100, 116, 139, 0.92))";
  banner.style.border = "1px solid rgba(148, 163, 184, 0.55)";
  banner.style.opacity = "0.82";
  banner.style.filter = "grayscale(0.6)";
};

const ensureQuickFollowupNudge = () => {
  let nudge = document.getElementById(QUICK_FOLLOWUP_NUDGE_ID);
  if (!nudge) {
    nudge = document.createElement("div");
    nudge.id = QUICK_FOLLOWUP_NUDGE_ID;
    nudge.style.position = "fixed";
    nudge.style.right = "24px";
    nudge.style.top = "50%";
    nudge.style.zIndex = "2147483647";
    nudge.style.padding = "10px 12px";
    nudge.style.borderRadius = "10px";
    nudge.style.background = "rgba(15, 23, 42, 0.95)";
    nudge.style.border = "1px solid rgba(148, 163, 184, 0.45)";
    nudge.style.color = "#e2e8f0";
    nudge.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    nudge.style.fontSize = "12px";
    nudge.style.lineHeight = "1.35";
    nudge.style.maxWidth = "280px";
    nudge.style.pointerEvents = "none";
    nudge.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.45)";
    nudge.style.opacity = "0";
    nudge.style.transform = "translateY(-50%) translateX(120%)";
    nudge.style.transition = "opacity 180ms ease, transform 220ms ease";
    nudge.textContent = "Try to reduce quick follow-up prompts. This will help limit resource consumption.";
    document.documentElement.appendChild(nudge);
  }
  return nudge;
};

const hideQuickFollowupNudge = () => {
  const nudge = document.getElementById(QUICK_FOLLOWUP_NUDGE_ID);
  if (nudge) {
    nudge.style.opacity = "0";
    nudge.style.transform = "translateY(-50%) translateX(120%)";
  }
  if (quickFollowupNudgeTimer) {
    clearTimeout(quickFollowupNudgeTimer);
    quickFollowupNudgeTimer = null;
  }
};

const showQuickFollowupNudge = () => {
  const nudge = ensureQuickFollowupNudge();
  nudge.style.opacity = "1";
  nudge.style.transform = "translateY(-50%) translateX(0)";
  if (quickFollowupNudgeTimer) {
    clearTimeout(quickFollowupNudgeTimer);
  }
  quickFollowupNudgeTimer = setTimeout(() => {
    nudge.style.opacity = "0";
    nudge.style.transform = "translateY(-50%) translateX(120%)";
    quickFollowupNudgeTimer = null;
  }, 6500);
};

const ensureNewChatNudge = () => {
  let nudge = document.getElementById(NEW_CHAT_NUDGE_ID);
  if (!nudge) {
    nudge = document.createElement("div");
    nudge.id = NEW_CHAT_NUDGE_ID;
    nudge.style.position = "fixed";
    nudge.style.right = "24px";
    nudge.style.top = "calc(50% + 86px)";
    nudge.style.zIndex = "2147483647";
    nudge.style.padding = "10px 12px";
    nudge.style.borderRadius = "10px";
    nudge.style.background = "rgba(15, 23, 42, 0.95)";
    nudge.style.border = "1px solid rgba(148, 163, 184, 0.45)";
    nudge.style.color = "#e2e8f0";
    nudge.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    nudge.style.fontSize = "12px";
    nudge.style.lineHeight = "1.35";
    nudge.style.maxWidth = "320px";
    nudge.style.pointerEvents = "none";
    nudge.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.45)";
    nudge.style.opacity = "0";
    nudge.style.transform = "translateY(-50%) translateX(120%)";
    nudge.style.transition = "opacity 180ms ease, transform 220ms ease";
    nudge.textContent = "Continuing the previous conversation may reduce repetition and token usage.";
    document.documentElement.appendChild(nudge);
  }
  return nudge;
};

const hideNewChatNudge = () => {
  const nudge = document.getElementById(NEW_CHAT_NUDGE_ID);
  if (nudge) {
    nudge.style.opacity = "0";
    nudge.style.transform = "translateY(-50%) translateX(120%)";
  }
  if (newChatNudgeTimer) {
    clearTimeout(newChatNudgeTimer);
    newChatNudgeTimer = null;
  }
};

const showNewChatNudge = () => {
  const nudge = ensureNewChatNudge();
  nudge.style.opacity = "1";
  nudge.style.transform = "translateY(-50%) translateX(0)";
  if (newChatNudgeTimer) {
    clearTimeout(newChatNudgeTimer);
  }
  newChatNudgeTimer = setTimeout(() => {
    nudge.style.opacity = "0";
    nudge.style.transform = "translateY(-50%) translateX(120%)";
    newChatNudgeTimer = null;
  }, 6500);
};

const trackNewChatStartAndMaybeNudge = () => {
  const todayKey = getIsoLocalDate();
  if (!chrome?.storage?.local) {
    return;
  }
  chrome.storage.local.get({ [NEW_CHAT_NUDGE_STATE_KEY]: { dayKey: todayKey, count: 0 } }, (data) => {
    const stateRaw = data?.[NEW_CHAT_NUDGE_STATE_KEY];
    const priorCount = stateRaw && stateRaw.dayKey === todayKey ? Number(stateRaw.count) || 0 : 0;
    const nextCount = priorCount + 1;
    chrome.storage.local.set({ [NEW_CHAT_NUDGE_STATE_KEY]: { dayKey: todayKey, count: nextCount } }, () => {
      if (nextCount > NEW_CHAT_DAILY_NUDGE_THRESHOLD) {
        showNewChatNudge();
      }
    });
  });
};

const refreshEnvironmentalMetricsVisibility = () => {
  environmentalMetricsVisible = true;
  return environmentalMetricsVisible;
};

const renderBannerText = (label, tokenCount, impactMetrics, promptText = "", modelDetection = null) => {
  showBanner();
  const banner = ensureBanner();
  const hasParticipantId = Boolean(String(userId || "").trim());
  applyParticipantBannerGateStyles(banner, hasParticipantId);
  const detectedLabel = label ? `AI detected: ${label}` : "AI detected: None";
  const tokenLabel = `Tokens: ${tokenCount ?? 0}`;
  const inputTokensForImpact = Math.max(
    Number(latestSubmittedInputTokenEstimate) || 0,
    Number(accumulatedInputTokens) || 0
  );
  const metrics = impactMetrics || createImpactMetrics(
    inputTokensForImpact,
    tokenCount,
    modelDetection || latestModelDetection
  );
  const showEnvironmentalMetrics = refreshEnvironmentalMetricsVisibility();
  const metricItems = [];
  if (showEnvironmentalMetrics) {
    metricItems.push(tokenLabel);
    metricItems.push(
      `Electricity consumed: ${formatImpactValue(metrics.energyWh)} Wh`,
      `CO2 produced: ${formatImpactValue(metrics.co2g)} g`,
      `Water consumed: ${formatWaterMl(metrics.waterL)} ml`
    );
  }

  banner.replaceChildren();

  const dragHandle = document.createElement("div");
  dragHandle.dataset.bannerDragHandle = "true";
  dragHandle.textContent = "Drag to move";
  dragHandle.style.marginBottom = "4px";
  dragHandle.style.paddingBottom = "4px";
  dragHandle.style.borderBottom = "1px dashed rgba(148, 163, 184, 0.35)";
  dragHandle.style.fontSize = "11px";
  dragHandle.style.letterSpacing = "0.03em";
  dragHandle.style.textTransform = "uppercase";
  dragHandle.style.color = "#cbd5e1";
  dragHandle.style.cursor = "grab";
  dragHandle.style.userSelect = "none";
  banner.appendChild(dragHandle);

  const detectedEl = document.createElement("div");
  detectedEl.textContent = detectedLabel;
  detectedEl.style.marginBottom = "6px";
  banner.appendChild(detectedEl);

  const metricsGroup = document.createElement("div");
  metricsGroup.style.display = "flex";
  metricsGroup.style.flexDirection = "column";
  metricsGroup.style.rowGap = "2px";
  banner.appendChild(metricsGroup);

  metricItems.forEach((line) => {
    const lineEl = document.createElement("div");
    lineEl.textContent = line;
    metricsGroup.appendChild(lineEl);
  });

  if (!hasParticipantId) {
    const gateLine = document.createElement("div");
    gateLine.textContent = "Please save unique user ID to continue";
    gateLine.style.marginTop = "8px";
    gateLine.style.paddingTop = "7px";
    gateLine.style.borderTop = "1px dashed rgba(148, 163, 184, 0.45)";
    gateLine.style.color = "#e2e8f0";
    gateLine.style.fontSize = "12px";
    banner.appendChild(gateLine);
  }

  if (showEnvironmentalMetrics && promptText) {
    const equivalentBox = document.createElement("div");
    equivalentBox.textContent = `Equivalent to: ${promptText}`;
    equivalentBox.style.marginTop = "8px";
    equivalentBox.style.padding = "7px 9px";
    equivalentBox.style.borderRadius = "9px";
    equivalentBox.style.background = "rgba(15, 23, 42, 0.45)";
    equivalentBox.style.border = "1px solid rgba(148, 163, 184, 0.35)";
    equivalentBox.style.maxHeight = `${EQUIVALENT_BOX_MAX_HEIGHT_PX}px`;
    equivalentBox.style.overflowY = "auto";
    equivalentBox.style.boxSizing = "border-box";
    equivalentBox.style.lineHeight = "1.35";
    equivalentBox.style.whiteSpace = "normal";
    banner.appendChild(equivalentBox);
  }

  banner.dataset.detected = label ? "true" : "false";
};

const updateBanner = (label, tokenCount, impactMetrics, outputTokenCountRaw = latestOutputTokenEstimate) => {
  const modelDetection = latestModelDetection;
  const liveSessionMetrics = getLiveSessionImpactTotals();
  const metrics = normalizeImpactMetrics({
    energyWh: Math.max(liveSessionMetrics.energyWh, toSafeMetricNumber(impactMetrics?.energyWh)),
    co2g: Math.max(liveSessionMetrics.co2g, toSafeMetricNumber(impactMetrics?.co2g)),
    waterL: Math.max(liveSessionMetrics.waterL, toSafeMetricNumber(impactMetrics?.waterL))
  });
  const equivalentSummary = getEquivalentSummaryText(metrics);
  const detectedLabel = label ? `AI detected: ${label}` : "AI detected: None";
  const tokenLabel = `Tokens: ${tokenCount ?? 0}`;

  renderBannerText(label, tokenCount, metrics, equivalentSummary, modelDetection);

  if (label && interactionId) {
    const promptSubmission = interactionPromptSubmittedAtById.get(interactionId) || null;
    scheduleInteractionLog({
      metrics: metrics,
      tokenCount: tokenCount,
      outputTokenCountRaw: outputTokenCountRaw,
      inputTokenCount: latestSubmittedInputTokenEstimate || latestInputTokenEstimate || 0,
      userText: latestPromptInputText,
      aiOutputText: latestAiOutputText,
      tokenLabel: tokenLabel,
      detectedLabel: detectedLabel,
      modelProvider: modelDetection?.provider || "unknown",
      modelName: modelDetection?.model || "unknown",
      quickFollowupWithin30s: !!latestQuickFollowupMeta?.isQuickFollowup,
      sessionId: sessionId,
      interactionId: interactionId,
      promptSubmittedAt: promptSubmission?.iso || null
    });
  }
};

const getOrCreateUserId = () => {
  if (userId) {
    return Promise.resolve(userId);
  }
  if (userIdPromise) {
    return userIdPromise;
  }

  userIdPromise = new Promise((resolve) => {
    if (!chrome?.storage?.local) {
      resolve(null);
      return;
    }

    chrome.storage.local.get({ [PARTICIPANT_ID_KEY]: "" }, (data) => {
      if (chrome.runtime?.lastError) {
        resolve(null);
        return;
      }
      const participantId = String(data?.[PARTICIPANT_ID_KEY] ?? "").trim();
      if (participantId) {
        userId = participantId;
        resolve(userId);
        return;
      }
      resolve(null);
    });
  }).finally(() => {
    userIdPromise = null;
  });

  return userIdPromise;
};

const getIsoLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toDailyGoalValue = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric) : null;
};

const getDailyTokenGoalForLogging = () => {
  if (!chrome?.storage?.local) {
    return Promise.resolve("not set");
  }
  return new Promise((resolve) => {
    chrome.storage.local.get({ [DAILY_TOKEN_GOAL_KEY]: null }, (data) => {
      if (chrome.runtime?.lastError) {
        resolve("not set");
        return;
      }
      const goalValue = toDailyGoalValue(data?.[DAILY_TOKEN_GOAL_KEY]);
      resolve(goalValue === null ? "not set" : goalValue);
    });
  });
};

const pruneOldDailyTotals = (dailyTotals) => {
  const totals = dailyTotals && typeof dailyTotals === "object" ? { ...dailyTotals } : {};
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (DAILY_TOTALS_RETENTION_DAYS - 1));

  Object.keys(totals).forEach((dateKey) => {
    const dateValue = new Date(`${dateKey}T00:00:00`);
    if (!Number.isFinite(dateValue.getTime()) || dateValue < cutoff) {
      delete totals[dateKey];
    }
  });
  return totals;
};

const addUsageToDailyTotals = (usage) => {
  if (!chrome?.storage?.local) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    chrome.storage.local.get(
      {
        [DAILY_TOTALS_KEY]: {},
        [ALL_TIME_TOKEN_TOTAL_KEY]: 0,
        [ALL_TIME_TOTALS_KEY]: { tokensTotal: 0, tokensOutTotal: 0, energyWh: 0, co2g: 0, waterL: 0 }
      },
      (data) => {
        if (chrome.runtime?.lastError) {
          resolve();
          return;
        }

      const dateKey = getIsoLocalDate();
      const currentTotals = data?.[DAILY_TOTALS_KEY] && typeof data[DAILY_TOTALS_KEY] === "object"
        ? { ...data[DAILY_TOTALS_KEY] }
        : {};
      const todayTotals = currentTotals[dateKey] || {
        tokensIn: 0,
        tokensOut: 0,
        tokensTotal: 0,
        wh: 0,
        co2_g: 0,
        water_L: 0,
        interactions: 0,
        modelCounts: {}
      };

      const existingModelCounts = todayTotals?.modelCounts && typeof todayTotals.modelCounts === "object"
        ? { ...todayTotals.modelCounts }
        : {};
      const modelLabelRaw = typeof usage?.modelName === "string" ? usage.modelName.trim() : "";
      const modelLabel = modelLabelRaw || "Unknown";
      existingModelCounts[modelLabel] = (Number(existingModelCounts[modelLabel]) || 0)
        + ((Number(usage?.interactions) || 0) > 0 ? (Number(usage?.interactions) || 0) : 0);

      const nextTotals = {
        tokensIn: +(todayTotals.tokensIn + (Number(usage?.tokensIn) || 0)).toFixed(6),
        tokensOut: +(todayTotals.tokensOut + (Number(usage?.tokensOut) || 0)).toFixed(6),
        tokensTotal: +(todayTotals.tokensTotal + (Number(usage?.tokensTotal) || 0)).toFixed(6),
        wh: +(todayTotals.wh + (Number(usage?.wh) || 0)).toFixed(6),
        co2_g: +(todayTotals.co2_g + (Number(usage?.co2_g) || 0)).toFixed(6),
        water_L: +(todayTotals.water_L + (Number(usage?.water_L) || 0)).toFixed(6),
        interactions: (Number(todayTotals.interactions) || 0) + (Number(usage?.interactions) || 0),
        modelCounts: existingModelCounts
      };

      currentTotals[dateKey] = nextTotals;
      const prunedTotals = pruneOldDailyTotals(currentTotals);
      const nextAllTimeTokens = +(
        (Number(data?.[ALL_TIME_TOKEN_TOTAL_KEY]) || 0)
        + (Number(usage?.tokensOut) || 0)
      ).toFixed(6);
      const allTimeTotals = data?.[ALL_TIME_TOTALS_KEY] && typeof data[ALL_TIME_TOTALS_KEY] === "object"
        ? data[ALL_TIME_TOTALS_KEY]
        : {};
      const nextAllTimeTotals = {
        tokensTotal: +(Number(allTimeTotals?.tokensTotal || 0) + (Number(usage?.tokensTotal) || 0)).toFixed(6),
        tokensOutTotal: +(Number(allTimeTotals?.tokensOutTotal || 0) + (Number(usage?.tokensOut) || 0)).toFixed(6),
        energyWh: +(Number(allTimeTotals?.energyWh || 0) + (Number(usage?.wh) || 0)).toFixed(6),
        co2g: +(Number(allTimeTotals?.co2g || 0) + (Number(usage?.co2_g) || 0)).toFixed(6),
        waterL: +(Number(allTimeTotals?.waterL || 0) + (Number(usage?.water_L) || 0)).toFixed(6)
      };

        // Update daily totals at the same moment we record/send an interaction.
        chrome.storage.local.set(
          {
            [DAILY_TOTALS_KEY]: prunedTotals,
            [ALL_TIME_TOKEN_TOTAL_KEY]: nextAllTimeTokens,
            [ALL_TIME_TOTALS_KEY]: nextAllTimeTotals
          },
          () => resolve()
        );
      }
    );
  });
};

const logSessionData = async (data) => {
  const resolvedUserIdRaw = await getOrCreateUserId();
  const resolvedUserId = resolvedUserIdRaw || "anonymous";
  const dailyTokenGoal = await getDailyTokenGoalForLogging();
  const latestResolvedSession = await resolveSessionIdForCurrentConversation();
  let resolvedSessionId = String(latestResolvedSession?.sessionId || "");
  if (!resolvedSessionId && sessionIdPromise) {
    resolvedSessionId = String(await sessionIdPromise || "");
  }
  if (!resolvedSessionId && sessionId) {
    resolvedSessionId = String(sessionId);
  }
  if (!resolvedSessionId) {
    resolvedSessionId = createSessionUuid();
  }
  sessionId = resolvedSessionId;
  const resolvedInteractionNumber = interactionNumberPromise
    ? await interactionNumberPromise
    : interactionNumber;
  const inputTokens = Number.isFinite(data?.inputTokenCount)
    ? Number(data.inputTokenCount)
    : 0;
  const outputTokens = Number(
    data?.outputTokenCountRaw != null ? data.outputTokenCountRaw : data?.tokenCount
  ) || 0;
  const interactionKey = data?.interactionId || interactionId;
  const interactionBaselineTokens = Number(interactionOutputTokenBaselineById.get(interactionKey));
  const previousOutputTokens = Number(lastLoggedOutputTokensBySession.get(resolvedSessionId)) || 0;
  const baselineTokens = Number.isFinite(interactionBaselineTokens) && interactionBaselineTokens >= 0
    ? interactionBaselineTokens
    : previousOutputTokens;
  const outputTokensDelta = Math.max(0, outputTokens - baselineTokens);
  lastLoggedOutputTokensBySession.set(resolvedSessionId, outputTokens);
  const modelProvider = data?.modelProvider || latestModelDetection?.provider || "unknown";
  const modelName = data?.modelName || latestModelDetection?.model || "unknown";
  const impactDelta = createImpactMetrics(inputTokens, outputTokensDelta, {
    provider: modelProvider,
    model: modelName,
    confidence: Number(latestModelDetection?.confidence) || 0
  });
  accumulatedOutputTokens = +((Number(accumulatedOutputTokens) || 0) + outputTokensDelta).toFixed(6);
  accumulatedImpactTotals = addImpactMetrics(accumulatedImpactTotals, impactDelta);
  const tokenRatioOutIn = inputTokens > 0 ? +(outputTokensDelta / inputTokens).toFixed(6) : null;
  const promptTopicAnalysis = detectTopicFromText(data?.userText || latestPromptInputText || "");
  const responseTopicAnalysis = detectTopicFromText(data?.aiOutputText || latestAiOutputText || "");
  const combinedTopicAnalysis = detectCombinedTopic(promptTopicAnalysis, responseTopicAnalysis);
  const energyWh = Number(impactDelta?.energyWh) || 0;
  const co2g = Number(impactDelta?.co2g) || 0;
  const waterMl = +((Number(impactDelta?.waterL) || 0) * 1000).toFixed(6);
  const promptSubmittedAtIso = typeof data?.promptSubmittedAt === "string" && data.promptSubmittedAt.trim()
    ? data.promptSubmittedAt.trim()
    : null;
  const responseCompletedAtIso = typeof data?.responseCompletedAt === "string" && data.responseCompletedAt.trim()
    ? data.responseCompletedAt.trim()
    : null;
  const nowMs = Date.now();
  const sentAtIso = new Date(nowMs).toISOString();
  const promptSubmittedAtMs = promptSubmittedAtIso ? Date.parse(promptSubmittedAtIso) : NaN;
  const responseCompletedAtMs = responseCompletedAtIso ? Date.parse(responseCompletedAtIso) : NaN;
  const fallbackMeasuredAtMs = Math.max(0, nowMs - INTERACTION_LOG_DEBOUNCE_MS);
  const thinkingMeasuredAtMs = Number.isFinite(responseCompletedAtMs) && responseCompletedAtMs > 0
    ? responseCompletedAtMs
    : fallbackMeasuredAtMs;
  const thinkingTimeSec = Number.isFinite(promptSubmittedAtMs)
    ? +Math.max(0, (thinkingMeasuredAtMs - promptSubmittedAtMs) / 1000).toFixed(3)
    : null;
  const {
    userText: _ignoredUserText,
    aiOutputText: _ignoredAiOutputText,
    modelConfidence: _ignoredModelConfidence,
    model_confidence: _ignoredModelConfidenceSnake,
    modelDetectionConfidence: _ignoredModelDetectionConfidence,
    confidence: _ignoredRawConfidence,
    ...safeData
  } = data || {};
  const payload = {
    ...safeData,
    metrics: {
      energyWh: energyWh,
      co2g: co2g,
      waterMl: waterMl
    },
    userId: resolvedUserId,
    sessionId: resolvedSessionId,
    interactionId: data?.interactionId || interactionId,
    interactionNumber: resolvedInteractionNumber,
    timestamp: sentAtIso,
    sentAt: sentAtIso,
    promptSubmittedAt: promptSubmittedAtIso,
    thinkingTimeSec: thinkingTimeSec,
    tokenRatioOutIn: tokenRatioOutIn,
    tokensIn: inputTokens,
    tokensOut: outputTokensDelta,
    dailyTokenGoal: dailyTokenGoal,
    water_ml: waterMl,
    water_L: waterMl,
    topic: combinedTopicAnalysis.topic,
    topicScore: combinedTopicAnalysis.score,
    modelProvider: modelProvider,
    modelName: modelName
  };
  addUsageToDailyTotals({
    tokensIn: inputTokens,
    tokensOut: outputTokensDelta,
    tokensTotal: outputTokensDelta + inputTokens,
    wh: Number(impactDelta?.energyWh) || 0,
    co2_g: Number(impactDelta?.co2g) || 0,
    water_L: Number(impactDelta?.waterL) || 0,
    modelName: modelName,
    interactions: 1
  });
  try {
    chrome.runtime.sendMessage(
      {
        type: "ai-detector:log",
        payload
      },
      (response) => {
        if (chrome.runtime?.lastError) {
          console.error("Error logging session data:", chrome.runtime.lastError.message);
          return;
        }
        if (!response?.ok) {
          console.error("Error logging session data:", response?.error || "Unknown error");
        }
      }
    );
  } catch (error) {
    console.error("Error logging session data:", String(error));
  }
};

const scheduleInteractionLog = (data) => {
  const interactionKey = data?.interactionId;
  if (!interactionKey || sentInteractionIds.has(interactionKey)) {
    return;
  }

  const queueLogAttempt = () => {
    const timer = setTimeout(() => {
      pendingInteractionLogTimers.delete(interactionKey);
      if (sentInteractionIds.has(interactionKey)) {
        return;
      }

      const recentlyUpdated = lastOutputUpdateAt > 0
        && Date.now() - lastOutputUpdateAt < OUTPUT_SETTLE_GRACE_MS;
      const provider = data?.modelProvider || latestModelDetection?.provider || "unknown";
      const stillThinking = isLikelyThinkingStatusText(provider, data?.aiOutputText || latestAiOutputText || "");

      if (recentlyUpdated || pendingNetworkResponse || awaitingResponse || stillThinking) {
        queueLogAttempt();
        return;
      }

      sentInteractionIds.add(interactionKey);
      if (sentInteractionIds.size > 1000) {
        const first = sentInteractionIds.values().next();
        if (!first.done) {
          sentInteractionIds.delete(first.value);
        }
      }
      const settledOutputAtMs = Number(lastOutputUpdateAt) || 0;
      logSessionData({
        ...data,
        responseCompletedAt: settledOutputAtMs > 0 ? new Date(settledOutputAtMs).toISOString() : null
      });
      interactionPromptSubmittedAtById.delete(interactionKey);
      interactionOutputTokenBaselineById.delete(interactionKey);
    }, INTERACTION_LOG_DEBOUNCE_MS);

    pendingInteractionLogTimers.set(interactionKey, timer);
  };

  const previousTimer = pendingInteractionLogTimers.get(interactionKey);
  if (previousTimer) {
    clearTimeout(previousTimer);
  }
  queueLogAttempt();
};

const resetConversationState = () => {
  awaitingResponse = false;
  conversationStarted = false;
  lastOutputFingerprint = "";
  lastOutputUpdateAt = 0;
  latestTokenEstimate = 0;
  latestOutputTokenEstimate = 0;
  latestInputTokenEstimate = 0;
  latestDraftInputTokenEstimate = 0;
  latestSubmittedInputTokenEstimate = 0;
  accumulatedInputTokens = 0;
  latestPromptInputText = "";
  latestAiOutputText = "";
  resetAccumulatedTotals();
  latestDetection = null;
  latestModelDetection = { provider: "unknown", model: "unknown", confidence: 0 };
  pendingNetworkResponse = false;
  lastPromptSubmittedAt = 0;
  lastPromptMarkAt = 0;
  quickFollowupCountInSession = 0;
  quickFollowupNextAlertCount = QUICK_FOLLOWUP_ALERT_THRESHOLD + 1;
  lastLoggedOutputTokensBySession.clear();
  interactionOutputTokenBaselineById.clear();
  interactionPromptSubmittedAtById.clear();
  latestQuickFollowupMeta = {
    isQuickFollowup: false,
    deltaMs: null,
    quickFollowupCountInSession: 0
  };
  hideQuickFollowupNudge();
  hideNewChatNudge();
};

const applyEnabledState = (enabled) => {
  const nextState = enabled !== false;
  extensionEnabled = nextState;
  if (!extensionEnabled) {
    resetConversationState();
    hideBanner();
  } else {
    showBanner();
    queueDetection();
  }
};

const loadInitialEnabledState = () => {
  if (!chrome?.storage?.local) {
    applyEnabledState(true);
    return;
  }
  chrome.storage.local.get({ aiDetectorEnabled: true }, (data) => {
    applyEnabledState(data.aiDetectorEnabled !== false);
  });
};

const loadInitialMetricsVisibilityState = () => {
  refreshEnvironmentalMetricsVisibility();
  queueDetection();
};

const registerStorageListeners = () => {
  if (!chrome?.storage?.onChanged) {
    return;
  }
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(changes, "aiDetectorEnabled")) {
      applyEnabledState(changes.aiDetectorEnabled.newValue !== false);
    }
    if (Object.prototype.hasOwnProperty.call(changes, PARTICIPANT_ID_KEY)) {
      const nextParticipantId = String(changes[PARTICIPANT_ID_KEY].newValue ?? "").trim();
      userId = nextParticipantId || null;
      userIdPromise = null;
      queueDetection();
    }
  });
};

const findByDomain = () => {
  const host = (location.hostname || "").toLowerCase();
  const url = (location.href || "").toLowerCase();
  for (const entry of AI_DOMAIN_PATTERNS) {
    if (entry.hosts.some((regex) => regex.test(host) || regex.test(url))) {
      return entry.label;
    }
  }
  return null;
};

const findByKeywords = () => {
  const body = document.body;
  if (!body) return null;
  const sample = (body.innerText || "").slice(0, TEXT_SLICE_LIMIT);
  for (const entry of AI_KEYWORDS) {
    if (entry.pattern.test(sample)) {
      return entry.label;
    }
  }
  return null;
};

const isSkippableNode = (node) => isUserInputElement(node);

const extractNodeText = (node) => {
  if (!node) {
    return "";
  }
  if ("value" in node && typeof node.value === "string" && node.value.trim()) {
    return node.value;
  }
  if (typeof node.innerText === "string") {
    return node.innerText;
  }
  return "";
};

const normalizeUiLabel = (value, maxLength = 80) => {
  const normalized = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  if (!normalized) {
    return "";
  }
  return normalized.length <= maxLength ? normalized : "";
};

const isVisibleElement = (node) => {
  if (!(node instanceof Element)) {
    return false;
  }
  const rects = typeof node.getClientRects === "function" ? node.getClientRects() : [];
  if (!rects || rects.length === 0) {
    return false;
  }
  const style = window.getComputedStyle(node);
  if (!style || style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
    return false;
  }
  return true;
};

const collectModelContextText = () => {
  if (!document.body) {
    return "";
  }

  const samples = [];
  const seen = new Set();
  const appendSample = (value) => {
    const text = typeof value === "string" ? value.trim() : "";
    if (!text || seen.has(text)) {
      return;
    }
    seen.add(text);
    samples.push(text);
  };

  MODEL_CONTEXT_SELECTORS.forEach((selector) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node, index) => {
      if (index >= 8) {
        return;
      }
      if (!isVisibleElement(node)) {
        return;
      }
      appendSample(normalizeUiLabel(node.innerText || ""));
      if (typeof node.getAttribute === "function") {
        appendSample(normalizeUiLabel(node.getAttribute("aria-label") || ""));
        appendSample(normalizeUiLabel(node.getAttribute("title") || ""));
        appendSample(normalizeUiLabel(node.getAttribute("data-testid") || ""));
      }
    });
  });

  const scopedText = samples.join(" ").slice(0, MODEL_CONTEXT_SLICE_LIMIT);
  return scopedText.trim();
};

const detectModelFromPage = (providerLabel) => {
  const provider = PROVIDER_LABEL_TO_KEY[providerLabel] || "unknown";
  if (provider === "unknown") {
    return { provider, model: "unknown", confidence: 0 };
  }

  const rules = PROVIDER_MODEL_RULES[provider] || [];
  const contextText = collectModelContextText();
  let bestMatch = null;

  rules.forEach((rule) => {
    const patterns = Array.isArray(rule.patterns) ? rule.patterns : [];
    patterns.forEach((pattern) => {
      if (pattern.test(contextText)) {
        if (!bestMatch || (Number(rule.confidence) || 0) > (Number(bestMatch.confidence) || 0)) {
          bestMatch = {
            provider,
            model: rule.model || "unknown",
            confidence: Number(rule.confidence) || 0
          };
        }
      }
    });
  });

  if (bestMatch) {
    return bestMatch;
  }

  // ChatGPT "Auto" is often implicit and not shown as a visible label.
  if (provider === "chatgpt") {
    return { provider, model: "Auto", confidence: 0.35 };
  }

  return { provider, model: "unknown", confidence: 0 };
};

const getDocumentTextWithoutInputs = () => {
  if (!document.body) {
    return "";
  }
  let text = document.body.innerText || "";
  if (!text.trim()) {
    return text;
  }

  const skipNodes = document.querySelectorAll(USER_INPUT_SELECTORS.join(","));
  skipNodes.forEach((node) => {
    const snippet = extractNodeText(node).trim();
    if (!snippet || snippet.length > 500) {
      return;
    }
    const pattern = new RegExp(escapeForRegex(snippet), "g");
    text = text.replace(pattern, " ");
  });

  return text;
};

const nodeMatchesAnySelector = (node, selectors) => {
  if (!(node instanceof Element) || !Array.isArray(selectors) || selectors.length === 0) {
    return false;
  }
  return selectors.some((selector) => {
    if (!selector) {
      return false;
    }
    try {
      return node.matches(selector) || !!node.closest(selector);
    } catch (_) {
      return false;
    }
  });
};

const getTopLevelMatchedNodes = (nodeList) => {
  const nodes = Array.from(nodeList || []).filter((node) => node instanceof Element);
  if (nodes.length <= 1) {
    return nodes;
  }
  return nodes.filter((node, index) => {
    return !nodes.some((otherNode, otherIndex) => (
      otherIndex !== index
      && otherNode !== node
      && otherNode.contains(node)
    ));
  });
};

const collectTextFromSelectors = (selectors, options = {}) => {
  const minWords = Number.isFinite(options?.minWords) ? options.minWords : 0;
  const excludeSelectors = Array.isArray(options?.excludeSelectors) ? options.excludeSelectors : [];
  const maxSnippets = Number.isFinite(options?.maxSnippets) && options.maxSnippets > 0
    ? Math.floor(options.maxSnippets)
    : null;
  const seen = new Set();

  for (const selector of selectors) {
    if (!selector) {
      continue;
    }
    const matches = document.querySelectorAll(selector);
    if (!matches.length) {
      continue;
    }

    const topLevelNodes = getTopLevelMatchedNodes(matches);
    const snippets = [];

    topLevelNodes.forEach((node) => {
      if (!node || isSkippableNode(node) || !isVisibleElement(node)) {
        return;
      }
      if (excludeSelectors.length && nodeMatchesAnySelector(node, excludeSelectors)) {
        return;
      }
      const snippet = normalizeText(extractNodeText(node));
      if (!snippet) {
        return;
      }
      if (minWords > 0 && snippet.split(" ").filter(Boolean).length < minWords) {
        return;
      }
      if (seen.has(snippet)) {
        return;
      }
      seen.add(snippet);
      snippets.push(snippet);
    });

    if (snippets.length) {
      const selectedSnippets = maxSnippets ? snippets.slice(-maxSnippets) : snippets;
      return selectedSnippets.join("\n");
    }
  }

  return "";
};

const normalizeClaudeCounterText = (value) => {
  return (value || "")
    .replace(/\u200B/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const isClaudeCounterVisible = (element) => {
  if (!(element instanceof Element) || !element.isConnected) {
    return false;
  }

  const style = window.getComputedStyle(element);
  if (!style || style.display === "none" || style.visibility === "hidden") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

const pruneClaudeCounterNestedElements = (elements) => {
  const unique = Array.from(new Set(elements));
  return unique.filter((candidate) => {
    return !unique.some(
      (other) => other !== candidate && candidate.contains(other)
    );
  });
};

const uniqueClaudeCounterElements = (elements) => {
  return Array.from(new Set(elements.filter(Boolean)));
};

const cleanClaudeCounterNodeText = (element) => {
  if (!(element instanceof Element)) {
    return "";
  }
  const clone = element.cloneNode(true);
  const unwanted = clone.querySelectorAll(
    [
      "button",
      "nav",
      "header",
      "footer",
      "svg",
      "img",
      "input",
      "textarea",
      "[role='button']",
      "[aria-hidden='true']",
      "[data-testid*='actions']",
      "[data-testid*='toolbar']",
      "[data-testid*='footer']"
    ].join(",")
  );
  unwanted.forEach((node) => node.remove());
  return normalizeClaudeCounterText(clone.innerText || clone.textContent || "");
};

const getClaudeCounterTopLevelElements = (selectors) => {
  const collected = [];
  selectors.forEach((selector) => {
    if (!selector) {
      return;
    }
    document.querySelectorAll(selector).forEach((element) => {
      if (isClaudeCounterVisible(element)) {
        collected.push(element);
      }
    });
  });
  return pruneClaudeCounterNestedElements(collected);
};

const getClaudeCounterMessageActionGroups = () => {
  const directGroups = Array.from(
    document.querySelectorAll(CLAUDE_COUNTER_MESSAGE_ACTION_GROUP_SELECTOR)
  );
  if (directGroups.length > 0) {
    return uniqueClaudeCounterElements(directGroups);
  }

  const groupsFromCopyButtons = Array.from(
    document.querySelectorAll(CLAUDE_COUNTER_ACTION_COPY_BUTTON_SELECTOR)
  )
    .map((button) => button.closest('[role="group"]'))
    .filter(Boolean);
  return uniqueClaudeCounterElements(groupsFromCopyButtons);
};

const findClaudeCounterMessageContainerFromActionGroup = (group) => {
  let node = group;
  let bestContainer = null;

  for (let depth = 0; depth < 12 && node; depth += 1) {
    const parent = node.parentElement;
    if (!parent) {
      break;
    }

    const actionGroupsInside = parent.querySelectorAll(
      CLAUDE_COUNTER_MESSAGE_ACTION_GROUP_SELECTOR
    ).length;
    if (actionGroupsInside > 1) {
      break;
    }

    const text = cleanClaudeCounterNodeText(parent);
    if (text) {
      bestContainer = parent;
    }
    node = parent;
  }

  return bestContainer;
};

const dedupeClaudeCounterTexts = (texts) => {
  const seen = new Set();
  return texts.filter((text) => {
    const key = normalizeClaudeCounterText(text);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

const extractClaudeCounterByActionGroups = (role) => {
  const groups = getClaudeCounterMessageActionGroups();
  const texts = [];

  groups.forEach((group) => {
    const hasPositiveFeedback = Boolean(
      group.querySelector(CLAUDE_COUNTER_POSITIVE_FEEDBACK_SELECTOR)
    );
    const isAssistant = hasPositiveFeedback;
    const matchesRole =
      (role === "assistant" && isAssistant) || (role === "user" && !isAssistant);

    if (!matchesRole) {
      return;
    }

    const container = findClaudeCounterMessageContainerFromActionGroup(group);
    if (!container) {
      return;
    }

    const text = cleanClaudeCounterNodeText(container);
    if (!text || text.length < 8) {
      return;
    }
    texts.push(text);
  });

  return dedupeClaudeCounterTexts(texts);
};

const getClaudeCounterRoleSignal = (element) => {
  if (!(element instanceof Element)) {
    return "";
  }
  const testId = (element.getAttribute("data-testid") || "").toLowerCase();
  const className = typeof element.className === "string"
    ? element.className.toLowerCase()
    : "";
  const ariaLabel = (element.getAttribute("aria-label") || "").toLowerCase();
  return `${testId} ${className} ${ariaLabel}`;
};

const claudeCounterLooksLikeUser = (signal) => /(^|\W)(user|human)(\W|$)/.test(signal);
const claudeCounterLooksLikeAssistant = (signal) => /(^|\W)(assistant|claude|ai)(\W|$)/.test(signal);

const extractClaudeCounterByRole = (role) => {
  const actionBased = extractClaudeCounterByActionGroups(role);
  if (actionBased.length > 0) {
    return actionBased;
  }

  const explicitSelectors = role === "user"
    ? CLAUDE_COUNTER_USER_SELECTORS
    : CLAUDE_COUNTER_ASSISTANT_SELECTORS;
  const explicit = getClaudeCounterTopLevelElements(explicitSelectors)
    .map(cleanClaudeCounterNodeText)
    .filter(Boolean);
  if (explicit.length > 0) {
    return dedupeClaudeCounterTexts(explicit);
  }

  const genericNodes = getClaudeCounterTopLevelElements(CLAUDE_COUNTER_GENERIC_MESSAGE_SELECTORS);
  const genericTexts = [];

  genericNodes.forEach((node) => {
    const signal = getClaudeCounterRoleSignal(node);
    const text = cleanClaudeCounterNodeText(node);
    if (!text) {
      return;
    }

    if (role === "user" && claudeCounterLooksLikeUser(signal) && !claudeCounterLooksLikeAssistant(signal)) {
      genericTexts.push(text);
    }
    if (role === "assistant" && claudeCounterLooksLikeAssistant(signal) && !claudeCounterLooksLikeUser(signal)) {
      genericTexts.push(text);
    }
  });

  if (genericTexts.length > 0) {
    return dedupeClaudeCounterTexts(genericTexts);
  }

  const alternatingTexts = genericNodes
    .map(cleanClaudeCounterNodeText)
    .filter(Boolean);
  if (alternatingTexts.length === 0) {
    return [];
  }

  const startIndex = role === "user" ? 0 : 1;
  return dedupeClaudeCounterTexts(
    alternatingTexts.filter((_, index) => index % 2 === startIndex)
  );
};

const estimateClaudeCounterTokens = (text) => {
  const normalized = normalizeClaudeCounterText(text);
  if (!normalized) {
    return 0;
  }

  const cjkPattern =
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
  const cjkChars = normalized.match(cjkPattern) || [];
  const withoutCjk = normalized.replace(cjkPattern, " ");
  const parts =
    withoutCjk.match(/[A-Za-z0-9]+(?:['\u2019][A-Za-z0-9]+)?|[^\sA-Za-z0-9]/g) || [];

  let tokenCount = cjkChars.length;
  parts.forEach((part) => {
    if (/^[A-Za-z0-9]+(?:['\u2019][A-Za-z0-9]+)?$/.test(part)) {
      tokenCount += Math.max(1, Math.ceil(part.length / 4));
    } else {
      tokenCount += 1;
    }
  });

  return tokenCount;
};

const findClaudeCounterDraftPromptText = () => {
  const candidates = getClaudeCounterTopLevelElements(CLAUDE_COUNTER_DRAFT_INPUT_SELECTORS);
  let draft = "";

  candidates.forEach((element) => {
    const value = element instanceof HTMLTextAreaElement
      ? element.value
      : element.innerText || element.textContent || "";
    const normalized = normalizeClaudeCounterText(value);
    if (normalized.length > draft.length) {
      draft = normalized;
    }
  });

  return draft;
};

const computeClaudeDomTokenStats = () => {
  const promptMessages = extractClaudeCounterByRole("user");
  const outputMessages = extractClaudeCounterByRole("assistant");
  const draftPrompt = findClaudeCounterDraftPromptText();

  const promptTokens = promptMessages.reduce(
    (sum, text) => sum + estimateClaudeCounterTokens(text),
    0
  );
  const outputTokens = outputMessages.reduce(
    (sum, text) => sum + estimateClaudeCounterTokens(text),
    0
  );

  return {
    promptTokens,
    outputTokens,
    totalTokens: promptTokens + outputTokens,
    draftPromptTokens: estimateClaudeCounterTokens(draftPrompt),
    promptMessages: promptMessages.length,
    outputMessages: outputMessages.length,
    lastUpdated: new Date().toISOString(),
    pageUrl: location.href,
    method: "estimated-dom",
    promptMessageTexts: promptMessages,
    outputMessageTexts: outputMessages
  };
};

const getClaudeOutputTextFromStats = (stats) => {
  const outputTexts = Array.isArray(stats?.outputMessageTexts)
    ? stats.outputMessageTexts
    : [];
  return normalizeClaudeCounterText(outputTexts.join("\n"));
};

const collectAiOutputText = (provider = "unknown") => {
  if (!document.body) {
    return "";
  }

  const providerKey = String(provider || "unknown").toLowerCase();

  if (providerKey === "claude") {
    const claudeOutputText = getClaudeOutputTextFromStats(computeClaudeDomTokenStats());
    if (claudeOutputText) {
      return claudeOutputText;
    }
    return "";
  }

  if (providerKey !== "chatgpt") {
    const providerSelectors = PROVIDER_OUTPUT_SELECTORS[providerKey] || [];
    const providerOutputText = collectTextFromSelectors(
      [...providerSelectors, ...COMMON_ASSISTANT_OUTPUT_SELECTORS],
      {
        minWords: 1,
        maxSnippets: 36,
        excludeSelectors: COMMON_USER_OUTPUT_SELECTORS
      }
    );
    if (providerOutputText) {
      return providerOutputText;
    }
  }

  const genericOutputText = collectTextFromSelectors(AI_OUTPUT_SELECTORS, {
    minWords: 3,
    maxSnippets: providerKey === "chatgpt" ? null : 36
  });
  if (genericOutputText) {
    return genericOutputText;
  }

  const fallbackText = getDocumentTextWithoutInputs();
  if (providerKey === "chatgpt") {
    return fallbackText;
  }
  return extractTailSlice(fallbackText, 3500);
};

const normalizeText = (text) => (text || "").replace(/\s+/g, " ").trim();

const extractTailSlice = (text, maxChars = 500) => {
  const normalized = normalizeText(text);
  if (!normalized) {
    return "";
  }
  return normalized.slice(Math.max(0, normalized.length - maxChars));
};

const isLikelyThinkingStatusText = (provider, rawOutputText) => {
  if (!THINKING_GUARD_PROVIDERS.has(provider)) {
    return false;
  }
  const tail = extractTailSlice(rawOutputText, 500);
  if (!tail) {
    return false;
  }
  const tailWordCount = tail.split(" ").filter(Boolean).length;
  if (tailWordCount > 80) {
    return false;
  }
  return THINKING_STATUS_PATTERNS.some((pattern) => pattern.test(tail));
};

const estimateTokensFromText = (text) => {
  if (!text) {
    return 0;
  }
  const sanitized = text.replace(/\s+/g, " ").trim();
  if (!sanitized) {
    return 0;
  }
  const charBased = Math.round(sanitized.length / 4);
  const wordBased = sanitized.split(" ").filter(Boolean).length;
  return Math.max(charBased, wordBased);
};

const buildTopicRegex = (phrase) => {
  const escaped = escapeForRegex(phrase.trim()).replace(/\s+/g, "\\s+");
  return new RegExp(`\\b${escaped}\\b`, "gi");
};

const countRegexMatches = (text, pattern) => {
  if (!text || !pattern) {
    return 0;
  }
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
};

const stemTopicToken = (token) => {
  const word = String(token || "").toLowerCase();
  if (!word) {
    return "";
  }
  if (word.length > 5 && word.endsWith("ies")) {
    return `${word.slice(0, -3)}y`;
  }
  if (word.length > 5 && word.endsWith("ing")) {
    return word.slice(0, -3);
  }
  if (word.length > 4 && word.endsWith("ed")) {
    return word.slice(0, -2);
  }
  if (word.length > 4 && word.endsWith("es")) {
    return word.slice(0, -2);
  }
  if (word.length > 3 && word.endsWith("s")) {
    return word.slice(0, -1);
  }
  return word;
};

const buildTopicStemCounts = (normalizedText) => {
  const stemCounts = new Map();
  const matches = normalizedText.match(/[a-z0-9]+(?:'[a-z0-9]+)?/gi) || [];
  for (const token of matches) {
    const stem = stemTopicToken(token);
    if (!stem) {
      continue;
    }
    stemCounts.set(stem, (stemCounts.get(stem) || 0) + 1);
  }
  return stemCounts;
};

const detectTopicFromText = (text) => {
  const normalized = (text || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!normalized) {
    return { topic: "Uncategorized", score: 0, confidence: 0, matchedTerms: [] };
  }
  const stemCounts = buildTopicStemCounts(normalized);

  const ranked = TOPIC_RULES.map(({ topic, terms }) => {
    const termList = Array.isArray(terms) ? terms : [];
    let score = 0;
    let hits = 0;
    const matchedTerms = [];

    termList.forEach(({ phrase, weight }) => {
      const term = String(phrase || "").trim().toLowerCase();
      if (!term) {
        return;
      }
      const isMultiWordTerm = /\s/.test(term);
      const matchCount = isMultiWordTerm
        ? countRegexMatches(normalized, buildTopicRegex(term))
        : (stemCounts.get(stemTopicToken(term)) || 0);
      if (matchCount <= 0) {
        return;
      }
      const safeWeight = Number(weight) || 1;
      score += safeWeight * matchCount;
      hits += matchCount;
      matchedTerms.push(term);
    });

    return {
      topic,
      score,
      hits,
      uniqueTerms: matchedTerms.length,
      matchedTerms
    };
  }).sort((a, b) => b.score - a.score);

  const top = ranked[0] || { topic: "Uncategorized", score: 0, hits: 0, uniqueTerms: 0, matchedTerms: [] };
  const runnerUpScore = ranked[1]?.score || 0;
  const hasStrongScore = top.score >= TOPIC_SCORE_MIN_FOR_CONFIDENT_MATCH;
  const hasBreadthSignal = top.uniqueTerms >= 2 && top.score >= (TOPIC_SCORE_MIN_FOR_CONFIDENT_MATCH - 0.4);
  const hasClearMargin = top.score - runnerUpScore >= TOPIC_SCORE_TIE_MARGIN;
  const hasSoftMargin = top.uniqueTerms >= 3 && (top.score - runnerUpScore) >= Math.max(0.3, TOPIC_SCORE_TIE_MARGIN * 0.5);
  const isConfidentMatch = (hasStrongScore || hasBreadthSignal) && (hasClearMargin || hasSoftMargin);

  if (!isConfidentMatch) {
    return {
      topic: "Uncategorized",
      score: +top.score.toFixed(3),
      confidence: (hasStrongScore || hasBreadthSignal) ? 0.35 : 0,
      matchedTerms: top.matchedTerms.slice(0, 6)
    };
  }

  const confidence = Math.max(0.35, Math.min(0.99, top.score / (top.score + 3)));
  return {
    topic: top.topic,
    score: +top.score.toFixed(3),
    confidence: +confidence.toFixed(3),
    matchedTerms: top.matchedTerms.slice(0, 6)
  };
};

const detectCombinedTopic = (promptAnalysis, responseAnalysis) => {
  const prompt = promptAnalysis || { topic: "Uncategorized", score: 0, confidence: 0 };
  const response = responseAnalysis || { topic: "Uncategorized", score: 0, confidence: 0 };
  const combinedScoreByTopic = new Map();

  if (prompt.topic && prompt.topic !== "Uncategorized") {
    combinedScoreByTopic.set(prompt.topic, (combinedScoreByTopic.get(prompt.topic) || 0) + (Number(prompt.score) || 0) * 1.05);
  }
  if (response.topic && response.topic !== "Uncategorized") {
    combinedScoreByTopic.set(response.topic, (combinedScoreByTopic.get(response.topic) || 0) + (Number(response.score) || 0) * 1.2);
  }

  if (combinedScoreByTopic.size === 0) {
    return { topic: "Uncategorized", score: 0, confidence: 0, source: "none" };
  }

  const ranked = Array.from(combinedScoreByTopic.entries())
    .map(([topic, score]) => ({ topic, score }))
    .sort((a, b) => b.score - a.score);
  const top = ranked[0];
  const runnerUpScore = ranked[1]?.score || 0;
  const confidence = Math.max(
    Number(prompt.confidence) || 0,
    Number(response.confidence) || 0,
    Math.min(0.99, top.score / (top.score + 3))
  );
  const source = prompt.topic === top.topic && response.topic === top.topic
    ? "prompt+response"
    : (response.topic === top.topic ? "response" : "prompt");

  if (top.score < TOPIC_SCORE_MIN_FOR_CONFIDENT_MATCH || (top.score - runnerUpScore) < TOPIC_SCORE_TIE_MARGIN) {
    return {
      topic: "Uncategorized",
      score: +top.score.toFixed(3),
      confidence: +Math.min(confidence, 0.35).toFixed(3),
      source: "ambiguous"
    };
  }

  return {
    topic: top.topic,
    score: +top.score.toFixed(3),
    confidence: +confidence.toFixed(3),
    source
  };
};

const markAwaitingResponse = (sourceNode = null) => {
  const now = Date.now();
  if (lastPromptMarkAt > 0 && now - lastPromptMarkAt <= PROMPT_MARK_DEDUP_WINDOW_MS) {
    return;
  }
  lastPromptMarkAt = now;

  const deltaMs = lastPromptSubmittedAt > 0 ? now - lastPromptSubmittedAt : null;
  const isQuickFollowup = Number.isFinite(deltaMs) && deltaMs > 0 && deltaMs <= QUICK_FOLLOWUP_WINDOW_MS;
  if (isQuickFollowup) {
    quickFollowupCountInSession += 1;
  }
  latestQuickFollowupMeta = {
    isQuickFollowup,
    deltaMs,
    quickFollowupCountInSession
  };
  lastPromptSubmittedAt = now;

  if (isQuickFollowup && quickFollowupCountInSession >= quickFollowupNextAlertCount) {
    showQuickFollowupNudge();
    quickFollowupNextAlertCount += QUICK_FOLLOWUP_ALERT_REPEAT_INTERVAL;
  }

  const inputSnapshot = captureInputSnapshot(sourceNode);
  latestPromptInputText = inputSnapshot.text || latestPromptInputText || "";
  latestInputTokenEstimate = Math.max(inputSnapshot.tokens, latestDraftInputTokenEstimate, 0);
  latestSubmittedInputTokenEstimate = latestInputTokenEstimate;
  accumulatedInputTokens = +(
    (Number(accumulatedInputTokens) || 0)
    + (Number(latestSubmittedInputTokenEstimate) || 0)
  ).toFixed(6);
  awaitingResponse = true;
  pendingNetworkResponse = false;
  interactionId = crypto.randomUUID();
  const currentInteractionId = interactionId;
  interactionOutputTokenBaselineById.set(currentInteractionId, Math.max(0, Math.round(latestOutputTokenEstimate || 0)));
  interactionPromptSubmittedAtById.set(currentInteractionId, {
    ms: now,
    iso: new Date(now).toISOString()
  });
  if (interactionOutputTokenBaselineById.size > 1000) {
    const firstBaseline = interactionOutputTokenBaselineById.keys().next();
    if (!firstBaseline.done) {
      interactionOutputTokenBaselineById.delete(firstBaseline.value);
    }
  }
  if (interactionPromptSubmittedAtById.size > 1000) {
    const first = interactionPromptSubmittedAtById.keys().next();
    if (!first.done) {
      interactionPromptSubmittedAtById.delete(first.value);
    }
  }
  sessionIdPromise = resolveSessionIdForCurrentConversation().then((resolvedSession) => {
    sessionId = resolvedSession.sessionId;
    if (resolvedSession.isNewConversation) {
      resetAccumulatedTotals();
      accumulatedInputTokens = Number(latestSubmittedInputTokenEstimate) || 0;
      lastLoggedOutputTokensBySession.clear();
      interactionOutputTokenBaselineById.set(currentInteractionId, 0);
      lastOutputFingerprint = "";
      trackNewChatStartAndMaybeNudge();
    }
    return resolvedSession.sessionId;
  });
  interactionNumberPromise = nextInteractionNumber().then((number) => {
    interactionNumber = number;
    return number;
  });
};

const handlePromptInput = (event) => {
  if (!isUserInputElement(event.target)) {
    return;
  }
  const snapshot = captureInputSnapshot(event.target);
  latestDraftInputTokenEstimate = snapshot.tokens;
  latestPromptInputText = snapshot.text || latestPromptInputText || "";
};

const handlePromptSubmit = (event) => {
  if (isUserInputElement(event.target)) {
    markAwaitingResponse(event.target);
  }
};

const handlePromptKeydown = (event) => {
  if (event.key !== "Enter" || event.shiftKey) {
    return;
  }
  if (isUserInputElement(event.target)) {
    markAwaitingResponse(event.target);
  }
};

const handlePromptClick = (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) {
    return;
  }
  const newChatTrigger = target.closest("button, a");
  if (newChatTrigger) {
    const triggerLabel = [
      newChatTrigger.getAttribute("aria-label"),
      newChatTrigger.getAttribute("title"),
      newChatTrigger.textContent
    ]
      .filter(Boolean)
      .join(" ")
      .trim();
    if (isNewConversationTriggerLabel(triggerLabel)) {
      const providerKey = getSessionProviderKeyForCurrentLocation();
      if (providerKey) {
        currentConversationSessionKey = `${providerKey}:draft:${createSessionUuid()}`;
      } else {
        currentConversationSessionKey = null;
      }
      sessionId = null;
      sessionIdPromise = null;
    }
  }
  const sendButton = target.closest(
    "[data-testid='send-button'], [data-testid='composer-send'], [aria-label*='send'], button[type='submit']"
  );
  if (sendButton) {
    markAwaitingResponse(sendButton);
  }
};

const registerPromptListeners = () => {
  document.addEventListener("submit", handlePromptSubmit, true);
  document.addEventListener("keydown", handlePromptKeydown, true);
  document.addEventListener("click", handlePromptClick, true);
  document.addEventListener("input", handlePromptInput, true);
};

const createSessionUuid = () => {
  return crypto.randomUUID();
};

const normalizeConversationPath = (value) => {
  const rawPath = typeof value === "string" ? value.trim() : "";
  if (!rawPath) {
    return "/";
  }
  const withoutTrailingSlash = rawPath.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
};

const normalizeConversationId = (value, maxLength = 200) => {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) {
    return "";
  }
  const cleaned = raw.replace(/[/?#&\s]+/g, "").trim();
  if (!cleaned) {
    return "";
  }
  return cleaned.slice(0, maxLength);
};

const isConversationDraftKey = (value) => {
  return typeof value === "string" && value.includes(":draft:");
};

const getConversationProviderFromKey = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  const match = value.match(/^([a-z0-9._-]+):/i);
  return match && match[1] ? match[1].toLowerCase() : "";
};

const getSessionProviderKeyForCurrentLocation = () => {
  const host = (location.hostname || "").toLowerCase();
  if (host.includes("chatgpt.com") || host.includes("chat.openai.com")) {
    return "chatgpt";
  }
  if (host.includes("claude.ai") || host.includes("anthropic.com")) {
    return "claude";
  }
  if (host.includes("gemini.google.com") || host.includes("bard.google.com") || host.includes("ai.google")) {
    return "gemini";
  }
  if (host.includes("copilot.microsoft.com") || host.includes("bing.com")) {
    return "copilot";
  }
  if (host.includes("perplexity.ai")) {
    return "perplexity";
  }
  return "";
};

const getConversationIdFromPath = (providerKey, path) => {
  const patterns = SESSION_PROVIDER_CONVERSATION_PATH_PATTERNS[providerKey] || [];
  for (const pattern of patterns) {
    const match = path.match(pattern);
    let decodedValue = "";
    if (match && match[1]) {
      try {
        decodedValue = decodeURIComponent(match[1]);
      } catch (_error) {
        decodedValue = match[1];
      }
    }
    const candidate = normalizeConversationId(decodedValue);
    if (!candidate) {
      continue;
    }
    if (providerKey === "perplexity" && pattern.source.includes("\\/search\\/")) {
      const stableSuffixMatch = candidate.match(/-([A-Za-z0-9]{8,})$/);
      if (stableSuffixMatch && stableSuffixMatch[1]) {
        return stableSuffixMatch[1];
      }
    }
    return candidate;
  }
  return "";
};

const getConversationIdFromQuery = (providerKey, searchParams) => {
  if (!(searchParams instanceof URLSearchParams)) {
    return "";
  }
  const supportedParamKeys = new Set((SESSION_PROVIDER_QUERY_PARAM_KEYS[providerKey] || []).map((key) => key.toLowerCase()));
  if (supportedParamKeys.size === 0) {
    return "";
  }
  for (const [rawKey, rawValue] of searchParams.entries()) {
    const normalizedKey = String(rawKey || "").toLowerCase();
    if (!supportedParamKeys.has(normalizedKey)) {
      continue;
    }
    const candidate = normalizeConversationId(rawValue);
    if (candidate) {
      return candidate;
    }
  }
  return "";
};

const isDraftPathForProvider = (providerKey, path) => {
  const patterns = SESSION_PROVIDER_DRAFT_PATH_PATTERNS[providerKey] || [];
  return patterns.some((pattern) => pattern.test(path));
};

const buildDraftConversationKey = (providerKey) => {
  if (
    currentConversationSessionKey
    && currentConversationSessionKey.startsWith(`${providerKey}:draft:`)
  ) {
    return currentConversationSessionKey;
  }
  return `${providerKey}:draft:${createSessionUuid()}`;
};

const getConversationSessionKeyForCurrentPage = () => {
  const providerKey = getSessionProviderKeyForCurrentLocation();
  if (!SESSION_TRACKED_PROVIDER_KEYS.has(providerKey)) {
    return null;
  }

  let currentUrl;
  try {
    currentUrl = new URL(location.href);
  } catch (_error) {
    return buildDraftConversationKey(providerKey);
  }

  const normalizedPath = normalizeConversationPath(currentUrl.pathname || "/");
  const queryConversationId = getConversationIdFromQuery(providerKey, currentUrl.searchParams);
  if (queryConversationId) {
    return `${providerKey}:c:${queryConversationId}`;
  }

  const pathConversationId = getConversationIdFromPath(providerKey, normalizedPath);
  if (pathConversationId) {
    return `${providerKey}:c:${pathConversationId}`;
  }

  if (isDraftPathForProvider(providerKey, normalizedPath.toLowerCase())) {
    return buildDraftConversationKey(providerKey);
  }

  return `${providerKey}:path:${normalizedPath}`;
};

const isNewConversationTriggerLabel = (value) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    return false;
  }
  return NEW_CHAT_TRIGGER_PATTERNS.some((pattern) => pattern.test(text));
};

const getConversationSessionMap = () => {
  if (!chrome?.storage?.local) {
    return Promise.resolve({});
  }
  return new Promise((resolve) => {
    chrome.storage.local.get({ [CONVERSATION_SESSION_MAP_KEY]: {} }, (data) => {
      if (chrome.runtime?.lastError) {
        resolve({});
        return;
      }
      const map = data?.[CONVERSATION_SESSION_MAP_KEY];
      if (!map || typeof map !== "object") {
        resolve({});
        return;
      }
      resolve({ ...map });
    });
  });
};

const setConversationSessionMap = (map) => {
  if (!chrome?.storage?.local) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    chrome.storage.local.set({ [CONVERSATION_SESSION_MAP_KEY]: map }, () => resolve());
  });
};

const parseSessionCounterValue = (value) => {
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric < 0) {
    return 0;
  }
  return numeric;
};

const parseSessionOrdinal = (value) => {
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric <= 0) {
    return null;
  }
  return numeric;
};

const getHighestSessionOrdinalFromMap = (conversationMap) => {
  if (!conversationMap || typeof conversationMap !== "object") {
    return 0;
  }
  let maxOrdinal = 0;
  Object.values(conversationMap).forEach((rawValue) => {
    const parsed = parseSessionOrdinal(rawValue);
    if (parsed && parsed > maxOrdinal) {
      maxOrdinal = parsed;
    }
  });
  return maxOrdinal;
};

const getConversationSessionCounter = () => {
  if (!chrome?.storage?.local) {
    return Promise.resolve(localConversationSessionCounter);
  }
  return new Promise((resolve) => {
    chrome.storage.local.get({ [CONVERSATION_SESSION_COUNTER_KEY]: 0 }, (data) => {
      if (chrome.runtime?.lastError) {
        resolve(localConversationSessionCounter);
        return;
      }
      const storedValue = parseSessionCounterValue(data?.[CONVERSATION_SESSION_COUNTER_KEY]);
      localConversationSessionCounter = Math.max(localConversationSessionCounter, storedValue);
      resolve(localConversationSessionCounter);
    });
  });
};

const setConversationSessionCounter = (value) => {
  const normalized = parseSessionCounterValue(value);
  localConversationSessionCounter = Math.max(localConversationSessionCounter, normalized);
  if (!chrome?.storage?.local) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    chrome.storage.local.set({ [CONVERSATION_SESSION_COUNTER_KEY]: normalized }, () => resolve());
  });
};

const allocateNextConversationSessionId = async (conversationMap) => {
  const highestFromMap = getHighestSessionOrdinalFromMap(conversationMap);
  const storedCounter = await getConversationSessionCounter();
  const nextOrdinal = Math.max(highestFromMap, storedCounter, localConversationSessionCounter) + 1;
  await setConversationSessionCounter(nextOrdinal);
  return String(nextOrdinal);
};

const syncConversationSessionStateFromLocation = () => {
  const conversationKey = getConversationSessionKeyForCurrentPage();
  if (!conversationKey) {
    currentConversationSessionKey = null;
    sessionId = null;
    sessionIdPromise = null;
    return;
  }
  if (conversationKey === currentConversationSessionKey) {
    return;
  }
  const previousConversationKey = currentConversationSessionKey;
  const previousSessionId = sessionId;
  currentConversationSessionKey = conversationKey;
  sessionIdPromise = null;

  const mapLookupKey = conversationKey;
  getConversationSessionMap().then(async (conversationMap) => {
    if (currentConversationSessionKey !== mapLookupKey) {
      return;
    }
    if (!conversationMap[mapLookupKey]) {
      const previousMapSessionId = previousConversationKey ? conversationMap[previousConversationKey] : null;
      const previousSessionOrdinal = parseSessionOrdinal(previousMapSessionId || previousSessionId);
      const shouldPromoteDraftSession = !isConversationDraftKey(mapLookupKey)
        && previousConversationKey
        && isConversationDraftKey(previousConversationKey)
        && getConversationProviderFromKey(previousConversationKey) === getConversationProviderFromKey(mapLookupKey)
        && !!previousSessionOrdinal;
      if (shouldPromoteDraftSession) {
        conversationMap[mapLookupKey] = String(previousSessionOrdinal);
        await setConversationSessionMap(conversationMap);
      }
    }
    sessionId = conversationMap[mapLookupKey] || null;
  });
};

const scheduleConversationSessionRouteSync = () => {
  if (conversationRouteSyncScheduled) {
    return;
  }
  conversationRouteSyncScheduled = true;
  setTimeout(() => {
    conversationRouteSyncScheduled = false;
    syncConversationSessionStateFromLocation();
  }, 0);
};

const handlePotentialConversationRouteChange = () => {
  const fingerprint = `${location.pathname || ""}${location.search || ""}${location.hash || ""}`;
  if (fingerprint === lastConversationRouteFingerprint) {
    return;
  }
  lastConversationRouteFingerprint = fingerprint;
  scheduleConversationSessionRouteSync();
};

const wrapHistoryMethodForConversationTracking = (methodName) => {
  const originalMethod = history && typeof history[methodName] === "function"
    ? history[methodName]
    : null;
  if (!originalMethod) {
    return;
  }
  history[methodName] = function patchedHistoryMethod(...args) {
    const result = originalMethod.apply(this, args);
    handlePotentialConversationRouteChange();
    return result;
  };
};

const registerConversationNavigationListeners = () => {
  if (conversationNavigationListenersRegistered) {
    return;
  }
  conversationNavigationListenersRegistered = true;
  wrapHistoryMethodForConversationTracking("pushState");
  wrapHistoryMethodForConversationTracking("replaceState");
  window.addEventListener("popstate", handlePotentialConversationRouteChange, true);
  window.addEventListener("hashchange", handlePotentialConversationRouteChange, true);
  handlePotentialConversationRouteChange();
};

const resolveSessionIdForCurrentConversation = async () => {
  const conversationKey = getConversationSessionKeyForCurrentPage();
  if (!conversationKey) {
    let isNewConversation = false;
    if (!sessionId) {
      sessionId = createSessionUuid();
      isNewConversation = true;
    }
    return { sessionId, isNewConversation };
  }

  const previousKey = currentConversationSessionKey;
  currentConversationSessionKey = conversationKey;
  const conversationMap = await getConversationSessionMap();

  let isNewConversation = false;
  if (!conversationMap[conversationKey]) {
    const previousDraftSessionId = previousKey ? conversationMap[previousKey] : null;
    const previousDraftSessionOrdinal = parseSessionOrdinal(previousDraftSessionId);
    const currentSessionOrdinal = parseSessionOrdinal(sessionId);
    const isPromotingDraftToConversation = !isConversationDraftKey(conversationKey)
      && previousKey
      && isConversationDraftKey(previousKey)
      && getConversationProviderFromKey(previousKey) === getConversationProviderFromKey(conversationKey)
      && !!previousDraftSessionOrdinal
      && !!currentSessionOrdinal
      && previousDraftSessionOrdinal === currentSessionOrdinal
      && !!sessionId;
    conversationMap[conversationKey] = isPromotingDraftToConversation
      ? String(currentSessionOrdinal)
      : await allocateNextConversationSessionId(conversationMap);
    isNewConversation = !isPromotingDraftToConversation;
    await setConversationSessionMap(conversationMap);
  }

  const mappedSessionOrdinal = parseSessionOrdinal(conversationMap[conversationKey]);
  if (!mappedSessionOrdinal) {
    conversationMap[conversationKey] = await allocateNextConversationSessionId(conversationMap);
    await setConversationSessionMap(conversationMap);
  }
  sessionId = String(conversationMap[conversationKey]);
  return { sessionId, isNewConversation };
};

const nextInteractionNumber = async () => {
  const resolvedUserId = await getOrCreateUserId();
  if (!resolvedUserId) {
    interactionCounter += 1;
    return interactionCounter;
  }
  if (!chrome?.storage?.local) {
    interactionCounter += 1;
    return interactionCounter;
  }
  return new Promise((resolve) => {
    chrome.storage.local.get(
      { interactionCounter: 0, interactionCounterUserId: null },
      (data) => {
        if (chrome.runtime?.lastError) {
          interactionCounter += 1;
          resolve(interactionCounter);
          return;
        }
        let counter = Number.isFinite(data?.interactionCounter)
          ? data.interactionCounter
          : 0;
        if (data?.interactionCounterUserId !== resolvedUserId) {
          counter = 0;
        }
        counter += 1;
        chrome.storage.local.set(
          { interactionCounter: counter, interactionCounterUserId: resolvedUserId },
          () => {
            if (chrome.runtime?.lastError) {
              interactionCounter += 1;
              resolve(interactionCounter);
              return;
            }
            interactionCounter = counter;
            resolve(counter);
          }
        );
      }
    );
  });
};

const queueDetection = () => {
  if (detectionScheduled || !extensionEnabled) {
    return;
  }
  detectionScheduled = true;
  requestAnimationFrame(() => {
    detectionScheduled = false;
    runDetection();
  });
};

const runDetection = () => {
  if (!extensionEnabled) {
    hideBanner();
    return;
  }

  const requiresNetworkTrigger = conversationStarted || awaitingResponse;
  if (requiresNetworkTrigger && !pendingNetworkResponse) {
    return;
  }

  const domainMatch = findByDomain();
  const keywordMatch = domainMatch || findByKeywords();
  latestDetection = keywordMatch;
  if (!latestDetection) {
    latestModelDetection = { provider: "unknown", model: "unknown", confidence: 0 };
    resetAccumulatedTotals();
    latestAiOutputText = "";
    updateBanner(null, latestTokenEstimate, latestImpactMetrics, latestOutputTokenEstimate);
    return;
  }
  latestModelDetection = detectModelFromPage(latestDetection);
  const providerKey = latestModelDetection?.provider || "unknown";
  const claudeStats = providerKey === "claude" ? computeClaudeDomTokenStats() : null;
  const rawOutput = providerKey === "claude"
    ? getClaudeOutputTextFromStats(claudeStats)
    : collectAiOutputText(providerKey);
  const outputTokenEstimate = providerKey === "claude"
    ? Math.max(0, Math.round(Number(claudeStats?.outputTokens) || 0))
    : estimateTokensFromText(rawOutput);
  const normalizedOutput = normalizeText(rawOutput);
  const hasOutput = !!normalizedOutput;
  const hasNewOutput = hasOutput && normalizedOutput !== lastOutputFingerprint;
  const isThinkingStatus = isLikelyThinkingStatusText(providerKey, rawOutput);

  if (!hasOutput) {
    latestAiOutputText = "";
    latestOutputTokenEstimate = 0;
    if (!awaitingResponse) {
      conversationStarted = false;
      lastOutputFingerprint = "";
    }
    latestTokenEstimate = 0;
    latestImpactMetrics = { energyWh: 0, co2g: 0, waterL: 0 };
    updateBanner(latestDetection, latestTokenEstimate, latestImpactMetrics, latestOutputTokenEstimate);
    pendingNetworkResponse = false;
    awaitingResponse = false;
    return;
  }

  if (!conversationStarted) {
    if (!awaitingResponse) {
      lastOutputFingerprint = normalizedOutput;
      latestAiOutputText = rawOutput;
      lastOutputUpdateAt = Date.now();
      // Before the user submits the first prompt in this session, keep visible
      // counters at zero to avoid showing stale/bootstrapped page content.
      latestOutputTokenEstimate = outputTokenEstimate;
      latestTokenEstimate = 0;
      latestImpactMetrics = { energyWh: 0, co2g: 0, waterL: 0 };
      updateBanner(latestDetection, latestTokenEstimate, latestImpactMetrics, latestOutputTokenEstimate);
      return;
    }

    if (!hasNewOutput) {
      latestAiOutputText = rawOutput;
      latestOutputTokenEstimate = outputTokenEstimate;
      latestTokenEstimate = 0;
      latestImpactMetrics = { energyWh: 0, co2g: 0, waterL: 0 };
      updateBanner(latestDetection, latestTokenEstimate, latestImpactMetrics, latestOutputTokenEstimate);
      return;
    }

    conversationStarted = true;
    awaitingResponse = false;
  }

  if (!hasNewOutput) {
    if (awaitingResponse && isThinkingStatus) {
      pendingNetworkResponse = true;
      return;
    }
    pendingNetworkResponse = false;
    awaitingResponse = false;
    return;
  }

  lastOutputFingerprint = normalizedOutput;
  latestAiOutputText = rawOutput;
  lastOutputUpdateAt = Date.now();
  latestOutputTokenEstimate = outputTokenEstimate;
  refreshDisplayedTotals(latestModelDetection);
  updateBanner(latestDetection, latestTokenEstimate, latestImpactMetrics, latestOutputTokenEstimate);
  awaitingResponse = isThinkingStatus;
  pendingNetworkResponse = isThinkingStatus;
};

const registerResourceObserver = () => {
  if (resourceObserver || typeof PerformanceObserver === "undefined") {
    return;
  }

  const observerCallback = (list) => {
    const entries = list?.getEntries();
    if (!entries || !entries.length) {
      return;
    }
    pendingNetworkResponse = true;
    queueDetection();
  };

  try {
    resourceObserver = new PerformanceObserver(observerCallback);
    resourceObserver.observe({ type: "resource", buffered: true });
  } catch (firstError) {
    try {
      resourceObserver = new PerformanceObserver(observerCallback);
      resourceObserver.observe({ entryTypes: ["resource"] });
    } catch (secondError) {
      resourceObserver = null;
    }
  }
};

const startObserving = () => {
  if (mutationObserver || !document.documentElement) {
    return;
  }
  mutationObserver = new MutationObserver(() => queueDetection());
  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: false
  });
};

const init = () => {
  ensureBanner();
  getOrCreateUserId().finally(() => {
    queueDetection();
  });
  loadInitialMetricsVisibilityState();
  loadInitialEnabledState();
  registerStorageListeners();
  registerConversationNavigationListeners();
  queueDetection();
  startObserving();
  registerPromptListeners();
  registerResourceObserver();
  window.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      queueDetection();
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message || !message.type) {
    return;
  }
  if (message.type === CLAUDE_COUNTER_REQUEST_TYPE) {
    const stats = computeClaudeDomTokenStats();
    const {
      promptMessageTexts: _promptMessageTexts,
      outputMessageTexts: _outputMessageTexts,
      ...publicStats
    } = stats;
    sendResponse({ ok: true, stats: publicStats });
    return;
  }
  if (message.type === "ai-detector:getStatus") {
    const liveSessionImpact = getLiveSessionImpactTotals();
    sendResponse({
      detected: latestDetection,
      modelDetection: latestModelDetection,
      tokens: latestTokenEstimate,
      impact: {
        energyWh: Math.max(liveSessionImpact.energyWh, toSafeMetricNumber(latestImpactMetrics?.energyWh)),
        co2g: Math.max(liveSessionImpact.co2g, toSafeMetricNumber(latestImpactMetrics?.co2g)),
        waterL: Math.max(liveSessionImpact.waterL, toSafeMetricNumber(latestImpactMetrics?.waterL))
      },
      enabled: extensionEnabled
    });
    return;
  }
  if (message.type === "ai-detector:setEnabled") {
    applyEnabledState(message.enabled !== false);
    sendResponse({ enabled: extensionEnabled });
    return;
  }
  if (message.type === "ai-detector:refreshMetricsVisibility") {
    refreshEnvironmentalMetricsVisibility();
    queueDetection();
    sendResponse({ ok: true });
  }
});

