# AI Detector Chrome Extension

This lightweight Chrome extension watches every tab you open, looks for hints that you're on an AI-powered experience (ChatGPT, Claude, Gemini, Copilot, etc.), and surfaces a small banner inside the page with the message `AI detected: <service>`. The same message — plus an estimated token count for the visible AI response — is mirrored in the extension popup when you click the toolbar icon.

## Features
- Detects well-known AI products via domain and keyword heuristics.
- Shows an on-page pill so the message is always visible without opening the popup.
- Popup summarizes the latest detection and estimates how many output tokens are currently on the page (while ignoring anything you type into the prompt box and staying at zero until the first reply arrives).
- Token counts are converted into rough sustainability metrics (electricity, CO2, and water) so you get a sense of the impact of each response.
- Session logs include refined topic detection for both the prompt and the AI response, with weighted confidence-based category matching.
- Toggle button lets you temporarily pause or resume detection for all tabs.
- Uses lightweight POST logging for detected AI sessions; see `contentScript.js` for payload details.

## Installing
1. Open Chrome and visit `chrome://extensions`.
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked** and pick the `ai-detector-extension` folder from this project.
4. Pin the "AI Detector Companion" action icon so you can open the popup quickly.

## Using
- Browse to any AI site; the floating banner will immediately state `AI detected: <name>` together with `Tokens: <count>`.
- Click the toolbar icon to open the popup if you want to double-check or you're on a page where the banner is hidden by other UI.
- Use the toggle button in the popup to turn the detector on or off at any time.
- If you visit a site the extension doesn't recognize, the banner will read `AI detected: None`.

## How the impact estimates work
- Electricity: Assumes 0.00083 Wh/token (~0.83 Wh per 1k output tokens).
- CO2: Assumes 0.43 mg/token (0.00043 g/token, ~0.43 g per 1k output tokens).
- Water: Assumes 0.01 ml/token (0.00001 L/token, ~10 ml per 1k output tokens).

These numbers are intentionally conservative heuristics inspired by a mix of public reports. Adjust `IMPACT_CONSTANTS` in `contentScript.js` if you want to plug in different assumptions.

You can extend the detection list by editing `contentScript.js` and adding more domain or keyword heuristics.
