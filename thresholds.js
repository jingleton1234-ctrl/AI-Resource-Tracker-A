(() => {
  const DEFAULT_EQUIVALENT_TEXT = "--";

  const METRIC_LABELS = Object.freeze({
    energyWh: "Electricity",
    co2g: "CO2",
    waterMl: "Water"
  });

  const RAW_THRESHOLDS = {
    energyWh: [
      { threshold: 0.000001, equivalent1: "1 minute of phone use" },
      {
        threshold: 0.3,
        equivalent1: "Sending an SMS text message",
        equivalent2: "Sending a few dozen emails "
      },
      {
        threshold: 0.5,
        equivalent1: "Lighting an LED for 4 minutes",
        equivalent2: "Playing a 5 minute video on a mobile phone"
      },
      {
        threshold: 1,
        equivalent1: "Powering Wi-Fi router for 10 minutes",
        equivalent2: "A phone call for 1 minute"
      },
      {
        threshold: 5,
        equivalent1: "Powering an LED for 40 minutes",
        equivalent2: "Powering an extractor fan for 40 mins"
      },
      {
        threshold: 20,
        equivalent1: "Laptop use for 1-2 hours",
        equivalent2: "1 full smartphone charge"
      },
      {
        threshold: 100,
        equivalent1: "Watching TV for 1 hour",
        equivalent2: "Powering a Wi-Fi router a day"
      },
      {
        threshold: 250,
        equivalent1: "Powering an iron for 10 mins",
        equivalent2: "13 full smartphone charges"
      },
      {
        threshold: 500,
        equivalent1: "Using an electric hob ~20 minutes",
        equivalent2: "25 full smartphone charges"
      },
      {
        threshold: 1000,
        equivalent1: "Running an electric heater for 40 mins",
        equivalent2: "Powering a fridge for 1 day"
      },
      { threshold: 2000, equivalent1: "2 dishwasher cycles" },
      { threshold: 5000, equivalent1: "6 dishwasher cycles" },
      { threshold: 10000, equivalent1: "11 dishwasher cycles" },
      { threshold: 25000, equivalent1: "3 days of electricity for a typical UK home" },
      { threshold: 50000, equivalent1: "7 days of electricity for a typical UK home" },
      { threshold: 100000, equivalent1: "900 kettle boils" },
      { threshold: 250000, equivalent1: "25,000 modern smartphone full charges" },
      { threshold: 500000, equivalent1: "70 days of electricity for a typical UK home" },
      { threshold: 1000000, equivalent1: "130 days of electricity for a typical UK home" },
      { threshold: 2000000, equivalent1: "6000 miles of EV driving" }
    ],
    co2g: [
      {
        threshold: 1,
        equivalent1: "Breathing for 2-3 minutes",
        equivalent2: "Candle burning for 3 minutes"
      },
      {
        threshold: 5,
        equivalent1: "Candle burning for 20 minutes",
        equivalent2: "Driving a car 40 meters"
      },
      {
        threshold: 50,
        equivalent1: "Streaming HD videos for an hour",
        equivalent2: "Smoking 4 cigarettes"
      },
      {
        threshold: 250,
        equivalent1: "An average chicken burger equivalent of CO2",
        equivalent2: "1 mile car jouney"
      },
      {
        threshold: 500,
        equivalent1: "2.5 mile car jouney",
        equivalent2: "An average latte equivalent of CO2"
      },
      {
        threshold: 750,
        equivalent1: "Driving 3 miles by car",
        equivalent2: "C02 emitted producing 1 loaf of bread"
      },
      {
        threshold: 1000,
        equivalent1: "Driving 4 miles by car",
        equivalent2: "An average cheeseburger equivalent of CO2"
      },
      { threshold: 2500, equivalent1: "Driving 9 miles by car" },
      { threshold: 5000, equivalent1: "Driving 21 miles by car" },
      { threshold: 10000, equivalent1: "Driving 42 miles by car" },
      { threshold: 25000, equivalent1: "Driving 105 miles by car" },
      { threshold: 50000, equivalent1: "Driving 210 miles by car" },
      { threshold: 125000, equivalent1: "1 one-way short-haul flight per passenger CO2 equivalent" },
      { threshold: 250000, equivalent1: "Driving 1,000 miles by car" },
      { threshold: 500000, equivalent1: "1 return medium-haul flight per passenger CO2 equivalent" },
      { threshold: 1000000, equivalent1: "1 one-way transatlantic flight passenger share" }
    ],
    waterMl: [
      { threshold: 0.1, equivalent1: "A few drops of water" },
      { threshold: 1, equivalent1: "A few drops of water" },
      { threshold: 5, equivalent1: "One teaspoon of water" },
      { threshold: 15, equivalent1: "One tablespoon of water" },
      { threshold: 50, equivalent1: "Small espresso cup" },
      {
        threshold: 250,
        equivalent1: "a can of water",
        equivalent2: "a small juice carton"
      },
      {
        threshold: 500,
        equivalent1: "A standard soft drink bottle",
        equivalent2: "Two glasses of water"
      },
      {
        threshold: 1000,
        equivalent1: "1-litre bottle",
        equivalent2: "Four glasses of water"
      },
      {
        threshold: 8000,
        equivalent1: "1 toilet flush of water",
        equivalent2: "5 full kettle boils"
      },
      {
        threshold: 15000,
        equivalent1: "1 toilet flush of water",
        equivalent2: "5 full kettle boils"
      },
      {
        threshold: 25000,
        equivalent1: "~2 full baths of water"
      },
      {
        threshold: 50000,
        equivalent1: "5 minute shower of water",
        equivalent2: "One washing machine cycle equivalent of water"
      },
      { threshold: 150000, equivalent1: "1 full bath of water" },
      { threshold: 200000, equivalent1: "~3-4 showers of water" },
      { threshold: 500000, equivalent1: "~7 showers of water" },
      { threshold: 1000000, equivalent1: "1 person's water use for 7 days" },
      { threshold: 2000000, equivalent1: "A full jacuzzi of water" },
      { threshold: 3500000, equivalent1: "The amount of water in a firetruck" },
      { threshold: 5000000, equivalent1: "A small swimming pool" }
    ]
  };

  const normalizeEntry = (entry) => {
    const threshold = Number(entry?.threshold);
    if (!Number.isFinite(threshold) || threshold < 0) {
      return null;
    }
    const equivalent1 = String(entry?.equivalent1 || "").trim();
    const equivalent2 = String(entry?.equivalent2 || "").trim();
    return {
      threshold,
      equivalent1: equivalent1 || "",
      equivalent2: equivalent2 || ""
    };
  };

  const THRESHOLDS = Object.freeze(
    Object.fromEntries(
      Object.entries(RAW_THRESHOLDS).map(([metricName, entries]) => {
        const sortedEntries = (Array.isArray(entries) ? entries : [])
          .map(normalizeEntry)
          .filter((entry) => entry && entry.equivalent1)
          .sort((left, right) => left.threshold - right.threshold);
        return [metricName, Object.freeze(sortedEntries)];
      })
    )
  );

  const toFiniteNonNegative = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric > 0 ? numeric : 0;
  };

  const getThresholdMatch = (metricName, metricValue) => {
    const entries = THRESHOLDS[metricName];
    if (!Array.isArray(entries) || entries.length === 0) {
      return null;
    }
    const safeValue = toFiniteNonNegative(metricValue);
    if (!safeValue) {
      return null;
    }
    let bestMatch = null;
    for (const entry of entries) {
      if (safeValue >= entry.threshold) {
        bestMatch = entry;
      } else {
        break;
      }
    }
    return bestMatch;
  };

  const getEquivalentList = (metricName, metricValue) => {
    const match = getThresholdMatch(metricName, metricValue);
    if (!match) {
      return [];
    }
    return [match.equivalent1, match.equivalent2].filter((text) => Boolean(text));
  };

  const getEquivalentText = (metricName, metricValue, separator = " | ") => {
    const list = getEquivalentList(metricName, metricValue);
    if (list.length === 0) {
      return DEFAULT_EQUIVALENT_TEXT;
    }
    return list.join(separator);
  };

  globalThis.IMPACT_EQUIVALENTS = Object.freeze({
    defaultText: DEFAULT_EQUIVALENT_TEXT,
    metricLabels: METRIC_LABELS,
    thresholds: THRESHOLDS,
    getThresholdMatch,
    getEquivalentList,
    getEquivalentText
  });
})();
