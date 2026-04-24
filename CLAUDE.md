# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

```bash
python -m http.server 8080
# then open http://localhost:8080
```

The site must be served over HTTP (not opened as `file://`) because `fetch()` calls for static image detection require it. Chrome is required for voice input (`SpeechRecognition`).

**One-time image generation tool:** `http://localhost:8080/generate.html`

## Deployment

Pushing to `main` triggers GitHub Actions which:
1. Replaces the `__GEMINI_API_KEY__` placeholder in `script.js` with `secrets.GEMINI_API_KEY`
2. Deploys the directory as-is to GitHub Pages

The secret must be set at: repo → Settings → Secrets and variables → Actions → `GEMINI_API_KEY`.

## Architecture

Pure static site — no build step, no framework, no package.json.

**Files:**
- `story-data.js` — all content (story text, image prompts, character personas, quiz questions) in `STORY` constant. Loaded before `script.js`.
- `script.js` — all runtime logic. Single global `state` object tracks current scene, language, chat history, image cache, quiz progress.
- `style.css` — CSS custom properties in `:root`, screen-based layout via `.screen / .screen.active` visibility toggle.
- `index.html` — five `<div id="screen-*">` sections; only one has `.active` at a time.
- `generate.html` — standalone local tool, not deployed (excluded from nothing — it ships to Pages but is not linked from the story).
- `images/scene-N.png` — pre-generated 9:16 images (1–6). Committed to repo so the live site skips API calls.

**Screen flow:**
```
screen-landing → screen-story (6 scenes) → screen-choose → screen-chat → screen-quiz → screen-end
```

**API key handling:**
- Production: injected at deploy time via `sed` replacing `__GEMINI_API_KEY__`.
- Local: read from `localStorage('gemini_api_key')`; prompted on first visit; changeable via ⚙️ button on landing screen.

**Image loading priority** (`loadSceneImage`):
1. `state.imageCache[index]` (in-memory, current session)
2. `images/scene-N.png` (static file HEAD check)
3. Gemini API generation (Imagen 3 → flash preview fallback)

**Gemini text model fallback** (`geminiChat`):
Iterates `GEMINI_TEXT_MODELS` array on `RESOURCE_EXHAUSTED` errors. Update this array when models are deprecated.

**Bilingual support:** All user-visible strings live in `STORY.ui`, `STORY.characters`, and `STORY.scenes` as `{ zh, en }` objects. `t(obj)` resolves to current `state.lang`. Calling `applyLang()` re-renders all text without a page reload.

**Voice I/O:** Uses browser-native `SpeechSynthesis` (TTS) and `SpeechRecognition` (STT) — no external service. Language codes are set per-character in `story-data.js` (`voiceLang`, `voicePitch`, `voiceRate`).

## Key Constraints

- `generate.html` uses Imagen 3 with `aspectRatio: '9:16'` — match this if regenerating images.
- Character system prompts are in `STORY.characters[key].systemPrompt.{zh,en}` — edit there to change AI persona behaviour.
- The `geminiTextModelIndex` resets to 0 when a new API key is entered via `changeApiKey()`.
