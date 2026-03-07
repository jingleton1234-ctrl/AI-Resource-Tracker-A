const LOG_ENDPOINT = "https://script.google.com/macros/s/AKfycbwPp9_0el7mXsHvzbUpIlgfwhux4ew0Ij3bKdMc_9aw8jTExVLRjHWr2uBb4BYmN2HH1g/exec";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message || message.type !== "ai-detector:log") {
    return;
  }

  // Acknowledge immediately so the message port does not stay open
  // while the network request completes.
  sendResponse({ ok: true, queued: true });

  fetch(LOG_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(message.payload || {})
  })
    .then(async (response) => {
      const responseText = await response.text().catch(() => "");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}${responseText ? ` | ${responseText}` : ""}`);
      }
    })
    .catch((error) => {
      console.error("AI log POST failed:", error);
    });
});
