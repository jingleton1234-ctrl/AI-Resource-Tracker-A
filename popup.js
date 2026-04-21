const statusEl = document.getElementById("status");
const tokenEl = document.getElementById("token-count");
const participantIdInputEl = document.getElementById("participant-id-input");
const participantSaveEl = document.getElementById("participant-save");
const participantEditEl = document.getElementById("participant-edit");
const participantFeedbackEl = document.getElementById("participant-feedback");
const participantSummaryLabelEl = document.getElementById("participant-summary-label");
const participantGateBannerEl = document.getElementById("participant-gate-banner");
const popupMainContentEl = document.getElementById("popup-main-content");
const metricEnergyEl = document.getElementById("metric-energy");
const metricCo2El = document.getElementById("metric-co2");
const metricWaterEl = document.getElementById("metric-water");
const metricsGateEl = document.getElementById("metrics-gate");
const metricsGateNoteEl = document.getElementById("metrics-gate-note");
const metricsContentEl = document.getElementById("metrics-content");
const toggleButtonEl = document.getElementById("toggle-extension");
const compareTodayEl = document.getElementById("compare-today");
const compareAverageEl = document.getElementById("compare-average");
const compareDeltaEl = document.getElementById("compare-delta");
const goalInputEl = document.getElementById("goal-input");
const goalSaveEl = document.getElementById("goal-save");
const goalCurrentEl = document.getElementById("goal-current");
const goalProgressEl = document.getElementById("goal-progress");
const goalRemainingEl = document.getElementById("goal-remaining");
const rollingChartGridEl = document.getElementById("rolling-chart-grid");
const rollingChartLabelsEl = document.getElementById("rolling-chart-labels");
const rollingChartScrollEl = document.getElementById("rolling-chart-scroll");
const rollingChartEmptyEl = document.getElementById("rolling-chart-empty");
const rollingChartAxisEl = document.getElementById("rolling-chart-axis");
const rollingAxisMaxEl = document.getElementById("rolling-axis-max");
const rollingAxisMidEl = document.getElementById("rolling-axis-mid");
const rollingAxisMinEl = document.getElementById("rolling-axis-min");
const allTimeTokensEl = document.getElementById("all-time-tokens");
const allTimeElectricityEl = document.getElementById("all-time-electricity");
const allTimeCo2El = document.getElementById("all-time-co2");
const allTimeWaterEl = document.getElementById("all-time-water");
const allTimeEquivalentElectricityEl = document.getElementById("all-time-equivalent-electricity");
const allTimeEquivalentCo2El = document.getElementById("all-time-equivalent-co2");
const allTimeEquivalentWaterEl = document.getElementById("all-time-equivalent-water");
const modelChartGridEl = document.getElementById("model-chart-grid");
const modelChartLabelsEl = document.getElementById("model-chart-labels");
const modelChartScrollEl = document.getElementById("model-chart-scroll");
const modelChartEmptyEl = document.getElementById("model-chart-empty");
const modelChartAxisEl = document.getElementById("model-chart-axis");
const modelChartLegendEl = document.getElementById("model-chart-legend");

const defaultMetricValue = "--";
const impactEquivalents = globalThis.IMPACT_EQUIVALENTS || null;
let extensionEnabled = true;
const PARTICIPANT_ID_KEY = "participantId";
const DAILY_TOTALS_KEY = "dailyTotals";
const DAILY_TOKEN_GOAL_KEY = "dailyTokenGoal";
const ALL_TIME_TOKEN_TOTAL_KEY = "allTimeTokenTotal";
const ALL_TIME_TOTALS_KEY = "allTimeTotals";
const METRICS_AUTO_UNLOCK_AT_LOCAL_MS = new Date(2026, 1, 20, 14, 17, 0, 0).getTime();
const ALL_TIME_ELECTRICITY_KWH_THRESHOLD_WH = 1000;
const ALL_TIME_CO2_KG_THRESHOLD_G = 1000;
const ALL_TIME_WATER_L_THRESHOLD_ML = 1000;
const MODEL_MIX_COLOR_PALETTE = [
  "#0ea5e9",
  "#14b8a6",
  "#22c55e",
  "#84cc16",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#3b82f6"
];
const ROLLING_HISTORY_DAYS = 60;
const AUTO_REASONING_LABEL = "Auto reasoning";
const EXTENDED_REASONING_LABEL = "Extended reasoning";
const REASONING_COLOR_MAP = {
  [AUTO_REASONING_LABEL]: "#0ea5e9",
  [EXTENDED_REASONING_LABEL]: "#ef4444"
};
let environmentalMetricsVisible = false;

const formatUnlockLabel = (timestampMs) => {
  const date = new Date(timestampMs);
  const datePart = date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });
  return `${datePart} at ${timePart}`;
};

const METRICS_UNLOCK_LABEL = formatUnlockLabel(METRICS_AUTO_UNLOCK_AT_LOCAL_MS);

const updateStatus = (message) => {
  statusEl.textContent = message;
};

const registerChartForwardScrollLock = () => {
  // Intentionally no-op: users should be able to scroll both directions freely.
};

const sanitizeParticipantId = (value) => {
  const normalized = String(value ?? "").trim();
  if (!normalized) {
    return "";
  }
  return /^[A-Za-z0-9]+$/.test(normalized) ? normalized : "";
};

const updateParticipantSummaryLabel = (participantId) => {
  if (!participantSummaryLabelEl) {
    return;
  }
  participantSummaryLabelEl.textContent = participantId
    ? `Participant ID: ${participantId}`
    : "Participant ID: Not set";
};

const applyParticipantGateState = (participantId) => {
  const hasParticipantId = Boolean(sanitizeParticipantId(participantId));
  if (participantGateBannerEl) {
    participantGateBannerEl.hidden = hasParticipantId;
    participantGateBannerEl.classList.toggle("gated", !hasParticipantId);
  }
  if (popupMainContentEl) {
    popupMainContentEl.classList.toggle("gated", !hasParticipantId);
  }
};

const setParticipantEditing = (isEditing) => {
  if (!participantIdInputEl || !participantSaveEl || !participantEditEl) {
    return;
  }
  participantIdInputEl.disabled = !isEditing;
  participantSaveEl.disabled = !isEditing;
  participantEditEl.disabled = isEditing;
};

const setParticipantFeedback = (message) => {
  if (!participantFeedbackEl) {
    return;
  }
  participantFeedbackEl.textContent = message || "";
};

const loadParticipantId = () => {
  if (!participantIdInputEl) {
    return;
  }
  chrome.storage.local.get({ [PARTICIPANT_ID_KEY]: "" }, (data) => {
    const participantId = sanitizeParticipantId(data?.[PARTICIPANT_ID_KEY]);
    participantIdInputEl.value = participantId;
    updateParticipantSummaryLabel(participantId);
    applyParticipantGateState(participantId);
    if (participantId) {
      setParticipantFeedback(`Saved participant ID: ${participantId}`);
      setParticipantEditing(false);
      return;
    }
    setParticipantFeedback("Enter your participant ID before logging.");
    setParticipantEditing(true);
  });
};

const saveParticipantId = () => {
  if (!participantIdInputEl) {
    return;
  }
  const participantId = sanitizeParticipantId(participantIdInputEl.value);
  if (!participantId) {
    setParticipantFeedback("Participant ID must use letters and numbers only.");
    applyParticipantGateState("");
    setParticipantEditing(true);
    return;
  }
  chrome.storage.local.set({ [PARTICIPANT_ID_KEY]: participantId }, () => {
    participantIdInputEl.value = participantId;
    updateParticipantSummaryLabel(participantId);
    applyParticipantGateState(participantId);
    setParticipantFeedback(`Saved participant ID: ${participantId}`);
    setParticipantEditing(false);
  });
};

const editParticipantId = () => {
  setParticipantFeedback("Editing enabled. Click Save when done.");
  setParticipantEditing(true);
  if (participantIdInputEl) {
    participantIdInputEl.focus();
    participantIdInputEl.select();
  }
};

const updateTokens = (count) => {
  if (!tokenEl) {
    return;
  }
  const formatted = Number.isFinite(count) && count > 0 ? count : "--";
  tokenEl.textContent = `Tokens detected: ${formatted}`;
};

const formatMetric = (value, unit) => {
  if (!Number.isFinite(value) || value <= 0) {
    return `${defaultMetricValue} ${unit}`;
  }
  let formatted;
  if (value >= 10) {
    formatted = value.toFixed(1);
  } else if (value >= 1) {
    formatted = value.toFixed(2);
  } else if (value >= 0.01) {
    formatted = value.toFixed(3);
  } else {
    formatted = value.toFixed(6).replace(/\.?0+$/, "");
  }
  return `${formatted} ${unit}`;
};

const formatWaterMetric = (valueInLiters) => formatMetric((Number(valueInLiters) || 0) * 1000, "ml");

const formatAllTimeElectricityMetric = (valueWh) => {
  const safeWh = Number(valueWh) || 0;
  if (safeWh >= ALL_TIME_ELECTRICITY_KWH_THRESHOLD_WH) {
    return formatMetric(safeWh / 1000, "kWh");
  }
  return formatMetric(safeWh, "Wh");
};

const formatAllTimeCo2Metric = (valueG) => {
  const safeG = Number(valueG) || 0;
  if (safeG >= ALL_TIME_CO2_KG_THRESHOLD_G) {
    return formatMetric(safeG / 1000, "kg");
  }
  return formatMetric(safeG, "g");
};

const formatAllTimeWaterMetric = (valueInLiters) => {
  const safeMl = (Number(valueInLiters) || 0) * 1000;
  if (safeMl >= ALL_TIME_WATER_L_THRESHOLD_ML) {
    return formatMetric(safeMl / 1000, "L");
  }
  return formatMetric(safeMl, "ml");
};

const pickRandomItem = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  return items[Math.floor(Math.random() * items.length)] || null;
};

const getSingleEquivalentFromThresholds = (metricName, metricValue) => {
  if (!impactEquivalents || typeof impactEquivalents.getEquivalentList !== "function") {
    return defaultMetricValue;
  }
  const options = impactEquivalents.getEquivalentList(metricName, metricValue)
    .filter((entry) => Boolean(entry));
  return pickRandomItem(options) || defaultMetricValue;
};

const updateImpactMetrics = (impact) => {
  const metrics = impact || { energyWh: 0, co2g: 0, waterL: 0 };
  if (metricEnergyEl) {
    metricEnergyEl.textContent = formatMetric(metrics.energyWh, "Wh");
  }
  if (metricCo2El) {
    metricCo2El.textContent = formatMetric(metrics.co2g, "g");
  }
  if (metricWaterEl) {
    metricWaterEl.textContent = formatWaterMetric(metrics.waterL);
  }
};

const resetImpactMetrics = () => updateImpactMetrics(null);

const isMetricsAutoUnlocked = (date = new Date()) => date.getTime() >= METRICS_AUTO_UNLOCK_AT_LOCAL_MS;

const computeEnvironmentalMetricsVisibility = () => {
  environmentalMetricsVisible = isMetricsAutoUnlocked();
  return environmentalMetricsVisible;
};

const applyEnvironmentalMetricsVisibility = () => {
  const visible = computeEnvironmentalMetricsVisibility();
  if (tokenEl) {
    tokenEl.hidden = !visible;
    tokenEl.style.display = visible ? "" : "none";
  }
  if (metricsContentEl) {
    metricsContentEl.hidden = !visible;
  }
  if (metricsGateEl) {
    metricsGateEl.hidden = visible;
  }
  if (metricsGateNoteEl && !visible) {
    metricsGateNoteEl.textContent = `Environmental metrics, graphs, and figures are hidden until ${METRICS_UNLOCK_LABEL}.`;
  }
};

const loadMetricsVisibilityPreference = (callback) => {
  applyEnvironmentalMetricsVisibility();
  if (typeof callback === "function") {
    callback();
  }
};

const getIsoLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const shiftDate = (date, offsetDays) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + offsetDays);
  return copy;
};

const toTokenCount = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric) : 0;
};

const formatNudgeTokenCount = (count) => {
  const numeric = Number(count);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "0";
  }
  if (numeric >= 10000) {
    const thousands = (numeric / 1000).toFixed(1).replace(/\.0$/, "");
    return `${thousands} thousand`;
  }
  return String(Math.round(numeric));
};

const formatShortDateLabel = (dateKey) => {
  const date = new Date(`${dateKey}T00:00:00`);
  if (!Number.isFinite(date.getTime())) {
    return "--";
  }
  return date.toLocaleDateString(undefined, { month: "numeric", day: "numeric" });
};

const formatAxisTokenLabel = (count) => {
  const numeric = Number(count);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "0 tokens";
  }
  if (numeric >= 1000) {
    const formatted = (numeric / 1000).toFixed(1).replace(/\.0$/, "");
    return `${formatted}k tokens`;
  }
  return `${Math.round(numeric)} tokens`;
};

const formatModelPercent = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return "0%";
  }
  return `${Math.round(numeric)}%`;
};

const getRollingModelMixSeries = (totals, days = 7) => {
  const source = totals && typeof totals === "object" ? totals : {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const series = [];
  const discoveredModelSet = new Set([AUTO_REASONING_LABEL, EXTENDED_REASONING_LABEL]);

  for (let i = days - 1; i >= 0; i -= 1) {
    const pointDate = shiftDate(today, -i);
    if (pointDate > today) {
      continue;
    }
    const dateKey = getIsoLocalDate(pointDate);
    const dayRecord = source?.[dateKey] && typeof source[dateKey] === "object" ? source[dateKey] : {};
    const modelCountsRaw = dayRecord?.modelCounts && typeof dayRecord.modelCounts === "object"
      ? dayRecord.modelCounts
      : {};
    const reasoningModeCountsRaw = dayRecord?.reasoningModeCounts && typeof dayRecord.reasoningModeCounts === "object"
      ? dayRecord.reasoningModeCounts
      : {};
    const totalInteractions = Math.max(
      0,
      Number(dayRecord?.interactions) || 0,
      Object.values(modelCountsRaw).reduce((sum, count) => sum + (Number(count) || 0), 0)
    );
    const extendedReasoningCount = Math.max(
      0,
      Math.min(
        totalInteractions,
        Object.values(reasoningModeCountsRaw).reduce((sum, count) => sum + (Number(count) || 0), 0)
      )
    );
    const autoReasoningCount = Math.max(0, totalInteractions - extendedReasoningCount);
    const modelEntries = [
      { model: AUTO_REASONING_LABEL, count: autoReasoningCount },
      { model: EXTENDED_REASONING_LABEL, count: extendedReasoningCount }
    ].filter((entry) => entry.count > 0);
    const total = modelEntries.reduce((sum, entry) => sum + entry.count, 0);
    modelEntries.forEach((entry) => discoveredModelSet.add(entry.model));

    series.push({
      dateKey,
      total,
      segments: modelEntries.map((entry) => ({
        model: entry.model,
        count: entry.count,
        percent: total > 0 ? (entry.count / total) * 100 : 0
      }))
    });
  }

  return {
    series,
    models: Array.from(discoveredModelSet)
  };
};

const buildModelColorMap = (models) => {
  const orderedModels = Array.isArray(models) ? [...models].sort((a, b) => a.localeCompare(b)) : [];
  const colorMap = {};
  orderedModels.forEach((model, index) => {
    colorMap[model] = REASONING_COLOR_MAP[model] || MODEL_MIX_COLOR_PALETTE[index % MODEL_MIX_COLOR_PALETTE.length];
  });
  return colorMap;
};

const renderModelMixLegend = (models, colorMap) => {
  if (!modelChartLegendEl) {
    return;
  }
  modelChartLegendEl.replaceChildren();
  const safeModels = Array.isArray(models) ? models : [];
  safeModels.sort((a, b) => a.localeCompare(b)).forEach((model) => {
    const item = document.createElement("div");
    item.className = "model-legend-item";

    const dot = document.createElement("span");
    dot.className = "model-legend-dot";
    dot.style.backgroundColor = colorMap[model] || "#94a3b8";
    item.appendChild(dot);

    const text = document.createElement("span");
    text.textContent = model;
    item.appendChild(text);

    modelChartLegendEl.appendChild(item);
  });
};

const renderRollingModelMixChart = (mixData) => {
  if (!modelChartGridEl || !modelChartLabelsEl || !modelChartEmptyEl) {
    return;
  }

  modelChartGridEl.replaceChildren();
  modelChartLabelsEl.replaceChildren();
  if (modelChartLegendEl) {
    modelChartLegendEl.replaceChildren();
  }

  const safeSeries = Array.isArray(mixData?.series) ? mixData.series : [];
  const safeModels = Array.isArray(mixData?.models) ? mixData.models : [];
  const hasData = safeSeries.some((point) => point.total > 0);

  modelChartGridEl.hidden = !hasData;
  modelChartLabelsEl.hidden = !hasData;
  if (modelChartScrollEl) {
    modelChartScrollEl.hidden = !hasData;
  }
  modelChartEmptyEl.hidden = hasData;
  if (modelChartAxisEl) {
    modelChartAxisEl.hidden = !hasData;
  }

  if (!hasData) {
    return;
  }

  const colorMap = buildModelColorMap(safeModels);
  renderModelMixLegend(safeModels, colorMap);

  safeSeries.forEach((point) => {
    const stack = document.createElement("div");
    stack.className = "model-day-stack";
    const titleParts = point.segments.map((segment) => {
      return `${segment.model}: ${segment.count} (${formatModelPercent(segment.percent)})`;
    });
    stack.title = titleParts.length > 0
      ? `${point.dateKey}\n${titleParts.join("\n")}`
      : `${point.dateKey}: no model data`;

    if (point.total > 0) {
      point.segments.forEach((segment) => {
        const segmentEl = document.createElement("div");
        segmentEl.className = "model-segment";
        segmentEl.style.height = `${Math.max(1, segment.percent)}%`;
        segmentEl.style.backgroundColor = colorMap[segment.model] || "#94a3b8";
        stack.appendChild(segmentEl);
      });
    }

    modelChartGridEl.appendChild(stack);

    const label = document.createElement("div");
    label.className = "model-chart-label";
    label.textContent = formatShortDateLabel(point.dateKey);
    modelChartLabelsEl.appendChild(label);
  });
  if (modelChartScrollEl) {
    modelChartScrollEl.scrollLeft = modelChartScrollEl.scrollWidth;
  }
};

const getRollingDailyTokenSeries = (totals, days = 7) => {
  const source = totals && typeof totals === "object" ? totals : {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const series = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const pointDate = shiftDate(today, -i);
    if (pointDate > today) {
      continue;
    }
    const dateKey = getIsoLocalDate(pointDate);
    const value = Number(source?.[dateKey]?.tokensOut);
    series.push({
      dateKey,
      tokens: Number.isFinite(value) && value > 0 ? Math.round(value) : 0
    });
  }

  return series;
};

const renderRollingDailyChart = (series) => {
  if (!rollingChartGridEl || !rollingChartLabelsEl || !rollingChartEmptyEl) {
    return;
  }

  rollingChartGridEl.replaceChildren();
  rollingChartLabelsEl.replaceChildren();

  const safeSeries = Array.isArray(series) ? series : [];
  const maxTokens = safeSeries.reduce((max, point) => Math.max(max, point.tokens || 0), 0);
  const hasData = maxTokens > 0;

  rollingChartGridEl.hidden = !hasData;
  rollingChartLabelsEl.hidden = !hasData;
  if (rollingChartScrollEl) {
    rollingChartScrollEl.hidden = !hasData;
  }
  rollingChartEmptyEl.hidden = hasData;
  if (rollingChartAxisEl) {
    rollingChartAxisEl.hidden = !hasData;
  }

  if (!hasData) {
    if (rollingAxisMaxEl) {
      rollingAxisMaxEl.textContent = "-- tokens";
    }
    if (rollingAxisMidEl) {
      rollingAxisMidEl.textContent = "-- tokens";
    }
    if (rollingAxisMinEl) {
      rollingAxisMinEl.textContent = "0 tokens";
    }
    return;
  }

  if (rollingAxisMaxEl) {
    rollingAxisMaxEl.textContent = formatAxisTokenLabel(maxTokens);
  }
  if (rollingAxisMidEl) {
    rollingAxisMidEl.textContent = formatAxisTokenLabel(maxTokens / 2);
  }
  if (rollingAxisMinEl) {
    rollingAxisMinEl.textContent = "0 tokens";
  }

  safeSeries.forEach((point) => {
    const bar = document.createElement("div");
    bar.className = "chart-bar";
    const height = Math.max(4, Math.round((point.tokens / maxTokens) * 120));
    bar.style.height = `${height}px`;
    if ((point.tokens || 0) > 0) {
      bar.style.background = "linear-gradient(180deg, #38bdf8, #0ea5e9)";
    } else {
      bar.style.background = "rgba(148, 163, 184, 0.15)";
    }
    bar.title = `${point.dateKey}: ${point.tokens} tokens`;
    rollingChartGridEl.appendChild(bar);

    const label = document.createElement("div");
    label.className = "chart-label";
    label.textContent = formatShortDateLabel(point.dateKey);
    rollingChartLabelsEl.appendChild(label);
  });
  if (rollingChartScrollEl) {
    rollingChartScrollEl.scrollLeft = rollingChartScrollEl.scrollWidth;
  }
};

const renderTodayVsAverage = (summary) => {
  if (!compareTodayEl || !compareAverageEl || !compareDeltaEl) {
    return;
  }

  compareTodayEl.textContent = `Today: ${formatNudgeTokenCount(summary.todayTokens)} tokens`;

  if (!summary.hasAverage) {
    compareAverageEl.textContent = "Average: Not enough history yet";
    compareDeltaEl.textContent = "Difference: --";
    return;
  }

  compareAverageEl.textContent = `Average: ${formatNudgeTokenCount(summary.averageTokens)} tokens/day`;

  const delta = summary.todayTokens - summary.averageTokens;
  const deltaAbs = Math.abs(delta);
  const deltaPercent = summary.averageTokens > 0
    ? Math.round((deltaAbs / summary.averageTokens) * 100)
    : 0;

  if (delta > 0) {
    compareDeltaEl.textContent = `Difference: ${formatNudgeTokenCount(deltaAbs)} more tokens (${deltaPercent}% above average)`;
  } else if (delta < 0) {
    compareDeltaEl.textContent = `Difference: ${formatNudgeTokenCount(deltaAbs)} fewer tokens (${deltaPercent}% below average)`;
  } else {
    compareDeltaEl.textContent = "Difference: exactly your average";
  }
};

const toGoalValue = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric) : null;
};

const renderDailyGoal = (todayTokens, goalTokens) => {
  if (!goalCurrentEl || !goalProgressEl || !goalRemainingEl) {
    return;
  }

  if (goalTokens === null) {
    goalCurrentEl.textContent = "Goal: Not set";
    goalProgressEl.textContent = "Progress: --";
    goalRemainingEl.textContent = "Remaining: --";
    return;
  }

  goalCurrentEl.textContent = `Goal: ${formatNudgeTokenCount(goalTokens)} tokens`;
  const progressPercent = Math.round((todayTokens / goalTokens) * 100);
  goalProgressEl.textContent = `Progress: ${formatNudgeTokenCount(todayTokens)} / ${formatNudgeTokenCount(goalTokens)} tokens (${progressPercent}%)`;

  const remaining = goalTokens - todayTokens;
  if (remaining > 0) {
    goalRemainingEl.textContent = `Remaining: ${formatNudgeTokenCount(remaining)} tokens`;
  } else if (remaining === 0) {
    goalRemainingEl.textContent = "Remaining: Goal reached";
  } else {
    goalRemainingEl.textContent = `Remaining: Exceeded by ${formatNudgeTokenCount(Math.abs(remaining))} tokens`;
  }
};

const renderAllTimeTotals = (totals) => {
  const source = totals && typeof totals === "object" ? totals : {};
  const tokenTotal = toTokenCount(
    source.tokensOutTotal != null ? source.tokensOutTotal : source.tokensTotal
  );
  const energyWh = Number(source.energyWh) || 0;
  const co2g = Number(source.co2g) || 0;
  const waterL = Number(source.waterL) || 0;
  const waterMl = waterL * 1000;
  const electricityEquivalent = getSingleEquivalentFromThresholds("energyWh", energyWh);
  const co2Equivalent = getSingleEquivalentFromThresholds("co2g", co2g);
  const waterEquivalent = getSingleEquivalentFromThresholds("waterMl", waterMl);

  if (allTimeTokensEl) {
    allTimeTokensEl.textContent = `Tokens: ${formatNudgeTokenCount(tokenTotal)} tokens`;
  }
  if (allTimeElectricityEl) {
    allTimeElectricityEl.textContent = `Electricity: ${formatAllTimeElectricityMetric(energyWh)}`;
  }
  if (allTimeCo2El) {
    allTimeCo2El.textContent = `CO2: ${formatAllTimeCo2Metric(co2g)}`;
  }
  if (allTimeWaterEl) {
    allTimeWaterEl.textContent = `Water: ${formatAllTimeWaterMetric(waterL)}`;
  }
  if (allTimeEquivalentElectricityEl) {
    allTimeEquivalentElectricityEl.textContent = `Electricity: ${electricityEquivalent}`;
  }
  if (allTimeEquivalentCo2El) {
    allTimeEquivalentCo2El.textContent = `CO2: ${co2Equivalent}`;
  }
  if (allTimeEquivalentWaterEl) {
    allTimeEquivalentWaterEl.textContent = `Water: ${waterEquivalent}`;
  }
};

const getFallbackAllTimeTotals = (data) => {
  if (data?.[ALL_TIME_TOTALS_KEY] && typeof data[ALL_TIME_TOTALS_KEY] === "object") {
    const totals = data[ALL_TIME_TOTALS_KEY];
    return {
      ...totals,
      tokensOutTotal: Number(totals?.tokensOutTotal) || 0
    };
  }
  return { tokensOutTotal: 0, energyWh: 0, co2g: 0, waterL: 0 };
};

const renderAllTimeFallback = () => {
  if (
    !allTimeTokensEl
    && !allTimeElectricityEl
    && !allTimeCo2El
    && !allTimeWaterEl
    && !allTimeEquivalentElectricityEl
    && !allTimeEquivalentCo2El
    && !allTimeEquivalentWaterEl
  ) {
    return;
  }
  renderAllTimeTotals({ tokensOutTotal: 0, energyWh: 0, co2g: 0, waterL: 0 });
};

const saveDailyGoal = () => {
  if (!goalInputEl) {
    return;
  }
  const goalValue = toGoalValue(goalInputEl.value);
  chrome.storage.local.set({ [DAILY_TOKEN_GOAL_KEY]: goalValue }, () => {
    loadAndRenderDailyStats();
  });
};

const loadAndRenderDailyStats = () => {
  applyEnvironmentalMetricsVisibility();
  if (!environmentalMetricsVisible) {
    renderAllTimeFallback();
    return;
  }
  chrome.storage.local.get(
    {
      [DAILY_TOTALS_KEY]: {},
      [DAILY_TOKEN_GOAL_KEY]: null,
      [ALL_TIME_TOKEN_TOTAL_KEY]: 0,
      [ALL_TIME_TOTALS_KEY]: { tokensTotal: 0, tokensOutTotal: 0, energyWh: 0, co2g: 0, waterL: 0 }
    },
    (data) => {
    const totals = data?.[DAILY_TOTALS_KEY] && typeof data[DAILY_TOTALS_KEY] === "object"
      ? data[DAILY_TOTALS_KEY]
      : {};
    const goalTokens = toGoalValue(data?.[DAILY_TOKEN_GOAL_KEY]);
    const allTimeTotals = getFallbackAllTimeTotals(data);
    if (goalInputEl) {
      goalInputEl.value = goalTokens === null ? "" : String(goalTokens);
    }
    const today = new Date();
    const todayKey = getIsoLocalDate(today);
    const todayTokens = toTokenCount(totals?.[todayKey]?.tokensOut);
    let averageTokens = null;

    let averageSum = 0;
    let averageCount = 0;
    for (let i = 1; i <= 7; i += 1) {
      const dateKey = getIsoLocalDate(shiftDate(today, -i));
      const tokens = Number(totals?.[dateKey]?.tokensOut);
      if (Number.isFinite(tokens)) {
        averageSum += tokens;
        averageCount += 1;
      }
    }
    if (averageCount > 0) {
      averageTokens = Math.round(averageSum / averageCount);
    }

    // UI reads persisted daily totals to show today's comparisons and charts.
    const summary = {
      todayTokens,
      hasAverage: averageTokens !== null,
      averageTokens: averageTokens ?? 0
    };
    renderTodayVsAverage(summary);
    renderDailyGoal(todayTokens, goalTokens);
    renderAllTimeTotals(allTimeTotals);
    renderRollingDailyChart(getRollingDailyTokenSeries(totals, ROLLING_HISTORY_DAYS));
    renderRollingModelMixChart(getRollingModelMixSeries(totals, ROLLING_HISTORY_DAYS));
  });
};

const registerStorageListeners = () => {
  if (!chrome?.storage?.onChanged) {
    return;
  }
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(changes, DAILY_TOTALS_KEY)) {
      loadAndRenderDailyStats();
    }
    if (Object.prototype.hasOwnProperty.call(changes, ALL_TIME_TOKEN_TOTAL_KEY)) {
      loadAndRenderDailyStats();
    }
    if (Object.prototype.hasOwnProperty.call(changes, ALL_TIME_TOTALS_KEY)) {
      loadAndRenderDailyStats();
    }
    if (Object.prototype.hasOwnProperty.call(changes, PARTICIPANT_ID_KEY)) {
      const participantId = sanitizeParticipantId(changes[PARTICIPANT_ID_KEY].newValue);
      updateParticipantSummaryLabel(participantId);
      applyParticipantGateState(participantId);
    }
  });
};

const updateToggleButton = (enabled) => {
  extensionEnabled = enabled !== false;
  if (!toggleButtonEl) {
    return;
  }
  toggleButtonEl.classList.toggle("enabled", extensionEnabled);
  toggleButtonEl.classList.toggle("disabled", !extensionEnabled);
  toggleButtonEl.textContent = extensionEnabled ? "Turn off detector" : "Turn on detector";
};

const renderResult = (label, tokens, impact, enabledState) => {
  applyEnvironmentalMetricsVisibility();
  updateToggleButton(enabledState);
  if (!extensionEnabled) {
    updateStatus("Detector is paused.");
    updateTokens(null);
    resetImpactMetrics();
    loadAndRenderDailyStats();
    return;
  }

  updateStatus(label ? label : "None detected yet.");
  if (!environmentalMetricsVisible) {
    updateTokens(null);
    resetImpactMetrics();
    return;
  }
  updateTokens(tokens);
  updateImpactMetrics(impact);
  loadAndRenderDailyStats();
};

const notifyActiveTabOfToggle = (enabled) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const [tab] = tabs;
    if (!tab || !tab.id) {
      return;
    }
    chrome.tabs.sendMessage(tab.id, { type: "ai-detector:setEnabled", enabled }, () => {
      // ignore errors; content script may not be ready yet
    });
  });
};

const persistToggleState = (nextState) => {
  chrome.storage.local.set({ aiDetectorEnabled: nextState }, () => {
    updateToggleButton(nextState);
    notifyActiveTabOfToggle(nextState);
    if (!nextState) {
      updateStatus("Detector is paused.");
      updateTokens(null);
      resetImpactMetrics();
    } else {
      requestDetection();
    }
  });
};

const loadToggleState = (callback) => {
  chrome.storage.local.get({ aiDetectorEnabled: true }, (data) => {
    const enabled = data.aiDetectorEnabled !== false;
    updateToggleButton(enabled);
    if (typeof callback === "function") {
      callback(enabled);
    }
  });
};

const requestDetection = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError) {
      updateStatus(`Error: ${chrome.runtime.lastError.message}`);
      updateTokens(null);
      resetImpactMetrics();
      return;
    }

    const [tab] = tabs;
    if (!tab || !tab.id) {
      updateStatus("No active tab detected.");
      updateTokens(null);
      resetImpactMetrics();
      return;
    }

    chrome.tabs.sendMessage(tab.id, { type: "ai-detector:getStatus" }, (response) => {
      if (chrome.runtime.lastError) {
        updateStatus("Waiting for AI detector to initialize on this tab.");
        updateTokens(null);
        resetImpactMetrics();
        return;
      }

      renderResult(
        response && response.detected ? response.detected : null,
        response?.tokens ?? null,
        response?.impact ?? null,
        response?.enabled
      );
    });
  });
};

const initialize = () => {
  registerChartForwardScrollLock();
  applyParticipantGateState("");
  loadParticipantId();
  loadMetricsVisibilityPreference(() => {
    loadAndRenderDailyStats();
    requestDetection();
  });
  registerStorageListeners();
  loadToggleState();
  if (toggleButtonEl) {
    toggleButtonEl.addEventListener("click", () => {
      persistToggleState(!extensionEnabled);
    });
  }
  if (goalSaveEl) {
    goalSaveEl.addEventListener("click", saveDailyGoal);
  }
  if (goalInputEl) {
    goalInputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        saveDailyGoal();
      }
    });
  }
  if (participantSaveEl) {
    participantSaveEl.addEventListener("click", saveParticipantId);
  }
  if (participantEditEl) {
    participantEditEl.addEventListener("click", editParticipantId);
  }
  if (participantIdInputEl) {
    participantIdInputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !participantSaveEl?.disabled) {
        saveParticipantId();
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", initialize);
