let GEMINI_API_KEY = '__GEMINI_API_KEY__';
if (GEMINI_API_KEY === '__GEMINI_API_KEY__') {
  GEMINI_API_KEY = localStorage.getItem('gemini_api_key') || '';
  if (!GEMINI_API_KEY) {
    GEMINI_API_KEY = prompt('本機測試模式：請輸入你的 Gemini API Key\n(Local test: Enter your Gemini API Key)') || '';
    if (GEMINI_API_KEY) localStorage.setItem('gemini_api_key', GEMINI_API_KEY);
  }
}
const GEMINI_TEXT_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite-preview-06-17', 'gemini-1.5-flash'];
let geminiTextModelIndex = 0;
function GEMINI_TEXT_MODEL() { return GEMINI_TEXT_MODELS[geminiTextModelIndex]; }
const GEMINI_IMAGE_MODEL = 'gemini-2.0-flash-preview-image-generation'; // image gen model stays the same

const state = {
  lang: 'zh',
  currentScene: 0,
  imageCache: {},
  isSpeaking: false,
  isRecording: false,
  recognition: null,
  currentCharacter: null,
  chatHistory: [],
  quizIndex: 0,
  quizAnswers: [],
  ttsUtterance: null
};

// ─── INIT ────────────────────────────────────────────────────────────────────

window.addEventListener('load', () => {
  applyLang();
  preloadImage(0);
});

function changeApiKey() {
  const current = localStorage.getItem('gemini_api_key') || '';
  const label = state.lang === 'zh'
    ? `目前 Key：${current ? current.slice(0, 8) + '…' : '（未設定）'}\n\n輸入新的 Gemini API Key：`
    : `Current key: ${current ? current.slice(0, 8) + '…' : '(not set)'}\n\nEnter new Gemini API Key:`;
  const newKey = prompt(label, '');
  if (newKey === null) return;
  if (newKey.trim()) {
    GEMINI_API_KEY = newKey.trim();
    localStorage.setItem('gemini_api_key', newKey.trim());
    geminiTextModelIndex = 0;
    alert(state.lang === 'zh' ? '✅ API Key 已更新！' : '✅ API Key updated!');
  } else {
    alert(state.lang === 'zh' ? '❌ Key 不能是空的' : '❌ Key cannot be empty');
  }
}

// ─── LANGUAGE ────────────────────────────────────────────────────────────────

function toggleLang() {
  state.lang = state.lang === 'zh' ? 'en' : 'zh';
  applyLang();
}

function t(obj) {
  return obj[state.lang] || obj['zh'];
}

function applyLang() {
  const isZh = state.lang === 'zh';
  const btnText = isZh ? 'English' : '中文';
  document.querySelectorAll('.lang-btn').forEach(b => b.textContent = btnText);
  document.documentElement.lang = isZh ? 'zh-TW' : 'en';

  const ui = STORY.ui;
  setTextById('landing-title', t(STORY.title));
  setTextById('landing-author', t(STORY.author));
  setTextById('start-btn', t(ui.startBtn));
  setTextById('listen-label', t(ui.listenBtn).replace('🔊 ', ''));
  setTextById('prev-label', t(ui.prevBtn).replace('← ', ''));
  setTextById('next-label', t(ui.nextBtn).replace(' →', ''));
  setTextById('chat-title', t(ui.chatTitle));
  setTextById('choose-char-label', t(ui.chooseChar));
  setTextById('name-tongtong', t(STORY.characters.tongtong.name));
  setTextById('name-teacher', t(STORY.characters.teacher.name));
  setTextById('desc-tongtong', isZh ? '7歲的小朋友' : '7-year-old friend');
  setTextById('desc-teacher', isZh ? '溫柔的老師' : 'Kind teacher');
  setTextById('quiz-title', t(ui.quizTitle));
  setTextById('quiz-intro-text', t(ui.quizIntro));
  setTextById('start-quiz-label', t(ui.startQuiz));
  setTextById('go-quiz-label', isZh ? '去做測驗 →' : 'Go to Quiz →');
  setTextById('end-title', t(ui.endTitle));
  setTextById('end-msg', t(ui.endMsg));
  setTextById('read-again-label', t(ui.readAgain));
  setTextById('talk-btn-label', t(ui.talkBtn) + ' 💬');
  setTextById('quiz-btn-label', t(ui.skipChat) + ' 🌟');
  setTextById('choose-title', isZh ? '故事讀完啦！' : 'Story Complete!');
  setTextById('choose-sub', isZh ? '你想做什麼呢？' : 'What would you like to do?');
  setTextById('submit-label', isZh ? '送出答案' : 'Submit Answer');
  setTextById('hint-label', isZh ? '需要提示？' : 'Need a hint?');
  setTextById('gen-text', t(ui.generating));

  const chatInput = document.getElementById('chat-text-input');
  if (chatInput) chatInput.placeholder = isZh ? '打字或按住麥克風說話…' : 'Type or hold the mic to speak…';
  const quizTA = document.getElementById('quiz-text-answer');
  if (quizTA) quizTA.placeholder = isZh ? '在這裡輸入你的答案…' : 'Type your answer here…';

  if (state.currentScene < STORY.scenes.length) {
    renderScene(state.currentScene);
  }
  if (state.quizIndex < STORY.quiz.length && document.getElementById('quiz-question-area').style.display !== 'none') {
    renderQuizQuestion(state.quizIndex);
  }
}

function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ─── SCREEN NAVIGATION ───────────────────────────────────────────────────────

function showScreen(id) {
  stopTTS();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToLanding() { showScreen('screen-landing'); }
function showChooseScreen() { showScreen('screen-choose'); }
function goChatScreen() { showScreen('screen-chat'); }
function goQuizScreen() {
  showScreen('screen-quiz');
  state.quizIndex = 0;
  state.quizAnswers = [];
  document.getElementById('quiz-intro').style.display = 'flex';
  document.getElementById('quiz-question-area').style.display = 'none';
}

// ─── STORY ───────────────────────────────────────────────────────────────────

function startStory() {
  state.currentScene = 0;
  showScreen('screen-story');
  renderScene(0);
}

function renderScene(index) {
  const scene = STORY.scenes[index];
  const total = STORY.scenes.length;

  document.getElementById('story-text').textContent = t(scene.text);
  document.getElementById('progress-bar').style.width = `${((index + 1) / total) * 100}%`;

  const ui = STORY.ui;
  const counter = document.getElementById('scene-counter');
  if (state.lang === 'zh') {
    counter.textContent = `第 ${index + 1} 頁，共 ${total} 頁`;
  } else {
    counter.textContent = `Scene ${index + 1} of ${total}`;
  }

  document.getElementById('prev-btn').style.visibility = index === 0 ? 'hidden' : 'visible';
  const nextBtn = document.getElementById('next-btn');
  if (index === total - 1) {
    nextBtn.innerHTML = `<span>🎉 ${state.lang === 'zh' ? '讀完了！' : 'Finished!'}</span>`;
    nextBtn.onclick = () => { stopTTS(); showScreen('screen-choose'); };
  } else {
    nextBtn.innerHTML = `<span id="next-label">${t(ui.nextBtn)}</span>`;
    nextBtn.onclick = nextScene;
  }

  loadSceneImage(index);
}

function nextScene() {
  stopTTS();
  if (state.currentScene < STORY.scenes.length - 1) {
    state.currentScene++;
    renderScene(state.currentScene);
    preloadImage(state.currentScene + 1);
  }
}

function prevScene() {
  stopTTS();
  if (state.currentScene > 0) {
    state.currentScene--;
    renderScene(state.currentScene);
  }
}

function showImage(index, src) {
  const imgEl = document.getElementById('story-image');
  const placeholder = document.getElementById('image-placeholder');
  state.imageCache[index] = src;
  if (state.currentScene === index) {
    imgEl.src = src;
    imgEl.style.display = 'block';
    placeholder.style.display = 'none';
  }
}

function showFallback(index) {
  const fallbackEmojis = ['🧒✨', '👩‍🏫🌟', '🐦✨', '🌧️💧', '🌸✨', '🎒💛'];
  const ph = document.getElementById('image-placeholder');
  if (ph && state.currentScene === index) {
    ph.innerHTML = `<div style="font-size:5rem">${fallbackEmojis[index] || '✨'}</div>`;
  }
}

async function loadSceneImage(index) {
  const imgEl = document.getElementById('story-image');
  const placeholder = document.getElementById('image-placeholder');

  if (state.imageCache[index]) {
    imgEl.src = state.imageCache[index];
    imgEl.style.display = 'block';
    placeholder.style.display = 'none';
    return;
  }

  imgEl.style.display = 'none';
  placeholder.style.display = 'flex';

  // 1. Try static file first (images/scene-X.png committed to repo)
  const staticUrl = `images/scene-${index + 1}.png`;
  try {
    const check = await fetch(staticUrl, { method: 'HEAD' });
    if (check.ok) {
      showImage(index, staticUrl);
      return;
    }
  } catch {}

  // 2. No static file — generate via API
  setTextById('gen-text', t(STORY.ui.generating));
  const dataUrl = await generateImage(STORY.scenes[index].imagePrompt);
  if (dataUrl) {
    showImage(index, dataUrl);
  } else {
    showFallback(index);
  }
}

function preloadImage(index) {
  if (index >= STORY.scenes.length || state.imageCache[index]) return;
  const staticUrl = `images/scene-${index + 1}.png`;
  fetch(staticUrl, { method: 'HEAD' }).then(r => {
    if (r.ok) { state.imageCache[index] = staticUrl; }
    else {
      generateImage(STORY.scenes[index].imagePrompt).then(dataUrl => {
        if (dataUrl) state.imageCache[index] = dataUrl;
      });
    }
  }).catch(() => {
    generateImage(STORY.scenes[index].imagePrompt).then(dataUrl => {
      if (dataUrl) state.imageCache[index] = dataUrl;
    });
  });
}

// ─── TTS ─────────────────────────────────────────────────────────────────────

function toggleTTS() {
  if (state.isSpeaking) {
    stopTTS();
  } else {
    const text = t(STORY.scenes[state.currentScene].text);
    speakText(text, state.lang === 'zh' ? 'zh-TW' : 'en-US', 1.0, 0.9);
    document.getElementById('listen-label').textContent = state.lang === 'zh' ? '停止' : 'Stop';
    document.getElementById('listen-btn').classList.add('btn-stop');
    state.isSpeaking = true;
  }
}

function stopTTS() {
  window.speechSynthesis.cancel();
  state.isSpeaking = false;
  const label = document.getElementById('listen-label');
  if (label) label.textContent = state.lang === 'zh' ? '聽故事' : 'Listen';
  const btn = document.getElementById('listen-btn');
  if (btn) btn.classList.remove('btn-stop');
}

function speakText(text, lang = 'zh-TW', pitch = 1.0, rate = 0.9) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.pitch = pitch;
  u.rate = rate;
  u.onend = () => { state.isSpeaking = false; };
  window.speechSynthesis.speak(u);
}

function speakCharacter(text, charKey) {
  const char = STORY.characters[charKey];
  const lang = state.lang === 'zh' ? char.voiceLang.zh : char.voiceLang.en;
  const pitch = state.lang === 'zh' ? char.voicePitch.zh : char.voicePitch.en;
  const rate = state.lang === 'zh' ? char.voiceRate.zh : char.voiceRate.en;
  speakText(text, lang, pitch, rate);
}

// ─── GEMINI IMAGE GENERATION ─────────────────────────────────────────────────

async function generateImage(prompt) {
  // Try Imagen 3 first (dedicated image model)
  const result = await tryImagen3(prompt);
  if (result) return result;
  // Fallback: Gemini flash preview image generation
  return await tryGeminiImageGen(prompt);
}

async function tryImagen3(prompt) {
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-008:predict?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1, aspectRatio: '9:16' }
        })
      }
    );
    const data = await resp.json();
    console.log('[Imagen3 response]', JSON.stringify(data).slice(0, 300));
    const pred = data?.predictions?.[0];
    if (pred?.bytesBase64Encoded) {
      return `data:${pred.mimeType || 'image/png'};base64,${pred.bytesBase64Encoded}`;
    }
    return null;
  } catch (e) {
    console.error('[Imagen3 error]', e);
    return null;
  }
}

async function tryGeminiImageGen(prompt) {
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_IMAGE_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] }
        })
      }
    );
    const data = await resp.json();
    console.log('[GeminiImageGen response]', JSON.stringify(data).slice(0, 300));
    const parts = data?.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error('[GeminiImageGen error]', e);
    return null;
  }
}

// ─── GEMINI TEXT GENERATION ───────────────────────────────────────────────────

async function geminiChat(systemPrompt, messages, maxTokens = 250) {
  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  for (let i = geminiTextModelIndex; i < GEMINI_TEXT_MODELS.length; i++) {
    const model = GEMINI_TEXT_MODELS[i];
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { maxOutputTokens: maxTokens, temperature: 0.8 }
        })
      }
    );
    const data = await resp.json();
    console.log(`[Gemini ${model}]`, data?.error?.message || 'OK');

    if (data?.error?.status === 'RESOURCE_EXHAUSTED') {
      geminiTextModelIndex = i + 1;
      continue;
    }
    if (data?.error) throw new Error(data.error.message);

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Empty response from Gemini');
    geminiTextModelIndex = i;
    return text;
  }
  throw new Error(
    '所有模型額度已用完。請到 aistudio.google.com 取得新的 API Key，或開啟 Google Cloud 計費。'
  );
}

// ─── CHAT ─────────────────────────────────────────────────────────────────────

function selectCharacter(charKey) {
  state.currentCharacter = charKey;
  state.chatHistory = [];
  const char = STORY.characters[charKey];

  document.getElementById('char-select').style.display = 'none';
  document.getElementById('chat-area').style.display = 'flex';
  document.getElementById('chat-area').style.flexDirection = 'column';

  document.getElementById('active-char-avatar').textContent = char.avatar;
  document.getElementById('active-char-name').textContent = t(char.name);

  const messages = document.getElementById('chat-messages');
  messages.innerHTML = '';

  const greeting = state.lang === 'zh'
    ? (charKey === 'tongtong' ? '嗨！你好！你有沒有喜歡哪個字的魔法呀？😊' : '小朋友你好！有什麼想問我的嗎？😊')
    : (charKey === 'tongtong' ? 'Hi there! Did you like any of the character magic? 😊' : 'Hello, little friend! Do you have any questions for me? 😊');

  appendChatMsg(greeting, 'char');
  speakCharacter(greeting, charKey);
}

function resetCharSelect() {
  stopTTS();
  document.getElementById('char-select').style.display = 'block';
  document.getElementById('chat-area').style.display = 'none';
  state.currentCharacter = null;
  state.chatHistory = [];
}

function appendChatMsg(text, type) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg msg-${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function sendMessage(text) {
  if (!text.trim() || !state.currentCharacter) return;

  appendChatMsg(text, 'user');
  state.chatHistory.push({ role: 'user', content: text });

  const thinkingEl = appendChatMsg(t(STORY.ui.thinking), 'thinking');

  try {
    const char = STORY.characters[state.currentCharacter];
    const systemPrompt = t(char.systemPrompt);
    const reply = await geminiChat(systemPrompt, state.chatHistory);

    thinkingEl.remove();
    appendChatMsg(reply, 'char');
    state.chatHistory.push({ role: 'assistant', content: reply });
    speakCharacter(reply, state.currentCharacter);
  } catch (err) {
    console.error('[Chat error]', err);
    thinkingEl.className = 'msg msg-error';
    thinkingEl.textContent = state.lang === 'zh'
      ? `⚠️ 錯誤：${err.message}`
      : `⚠️ Error: ${err.message}`;
  }
}

function sendTextMessage() {
  const input = document.getElementById('chat-text-input');
  const text = input.value.trim();
  if (text) {
    input.value = '';
    sendMessage(text);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('screen-chat').classList.contains('active')) {
    sendTextMessage();
  }
});

// ─── SPEECH RECOGNITION ───────────────────────────────────────────────────────

function createRecognition(lang, onResult) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert(state.lang === 'zh' ? '你的瀏覽器不支援語音輸入，請用 Chrome 瀏覽器！' : 'Your browser does not support voice input. Please use Chrome!');
    return null;
  }
  const r = new SR();
  r.lang = lang;
  r.interimResults = false;
  r.maxAlternatives = 1;
  r.onresult = e => {
    const transcript = e.results[0][0].transcript;
    onResult(transcript);
  };
  r.onerror = () => {};
  return r;
}

function startRecording(e) {
  if (e) e.preventDefault();
  stopTTS();
  const lang = state.lang === 'zh' ? 'zh-TW' : 'en-US';
  state.recognition = createRecognition(lang, text => {
    const input = document.getElementById('chat-text-input');
    input.value = text;
    sendMessage(text);
    input.value = '';
  });
  if (state.recognition) {
    state.recognition.start();
    state.isRecording = true;
    document.getElementById('mic-btn').classList.add('recording');
  }
}

function stopRecording(e) {
  if (e) e.preventDefault();
  if (state.recognition) {
    state.recognition.stop();
    state.recognition = null;
  }
  state.isRecording = false;
  document.getElementById('mic-btn').classList.remove('recording');
}

function startQuizRecording(e) {
  if (e) e.preventDefault();
  stopTTS();
  const lang = state.lang === 'zh' ? 'zh-TW' : 'en-US';
  state.recognition = createRecognition(lang, text => {
    document.getElementById('quiz-text-answer').value = text;
  });
  if (state.recognition) {
    state.recognition.start();
    state.isRecording = true;
    document.getElementById('quiz-mic-btn').classList.add('recording');
  }
}

function stopQuizRecording(e) {
  if (e) e.preventDefault();
  if (state.recognition) {
    state.recognition.stop();
    state.recognition = null;
  }
  state.isRecording = false;
  document.getElementById('quiz-mic-btn').classList.remove('recording');
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────

function beginQuiz() {
  state.quizIndex = 0;
  state.quizAnswers = [];
  document.getElementById('quiz-intro').style.display = 'none';
  document.getElementById('quiz-question-area').style.display = 'flex';
  document.getElementById('quiz-question-area').style.flexDirection = 'column';
  setTextById('quiz-q-total', STORY.quiz.length);
  renderQuizQuestion(0);
}

function renderQuizQuestion(index) {
  const q = STORY.quiz[index];
  setTextById('quiz-q-num', index + 1);
  setTextById('quiz-question-text', t(q.question));
  setTextById('quiz-hint-text', t(q.hint));

  document.getElementById('quiz-hint').style.display = 'none';
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('quiz-answer-area').style.display = 'flex';
  document.getElementById('quiz-text-answer').value = '';

  const nextBtn = document.getElementById('quiz-question-area').querySelector('.btn-primary:last-child');
  const nextLabel = document.getElementById('next-q-label');
  if (nextLabel) {
    nextLabel.textContent = index === STORY.quiz.length - 1
      ? (state.lang === 'zh' ? '完成！🎉' : 'Finish! 🎉')
      : t(STORY.ui.nextQ);
  }

  speakText(t(q.question), state.lang === 'zh' ? 'zh-TW' : 'en-US', 1.1, 0.85);
}

function showQuizHint() {
  document.getElementById('quiz-hint').style.display = 'block';
}

async function submitQuizAnswer() {
  const answer = document.getElementById('quiz-text-answer').value.trim();
  if (!answer) {
    const msg = state.lang === 'zh' ? '請先回答問題喔！' : 'Please answer the question first!';
    alert(msg);
    return;
  }

  document.getElementById('quiz-answer-area').style.display = 'none';
  document.getElementById('quiz-feedback').style.display = 'flex';
  setTextById('feedback-text', t(STORY.ui.thinking));

  const q = STORY.quiz[state.quizIndex];
  const systemPrompt = state.lang === 'zh'
    ? `你是美玲老師，一位溫柔有耐心的小學老師。小朋友回答了一個關於故事「彤彤的筆畫魔法書」的問題。請給出鼓勵、溫暖的回饋（2-3句話），先肯定小朋友的努力，再補充或引導正確答案。只說中文，不要太難。問題：${t(q.question)}`
    : `You are Teacher Mei-ling, a kind and patient elementary teacher. A child just answered a question about the story "Tong Tong's Magic Stroke Book". Give encouraging, warm feedback (2-3 sentences) — first praise their effort, then gently supplement or guide the correct answer. Keep it simple and child-friendly. Question: ${t(q.question)}`;

  try {
    const reply = await geminiChat(systemPrompt, [
      { role: 'user', content: `My answer: ${answer}` }
    ], 200);
    setTextById('feedback-text', reply);
    speakText(reply, state.lang === 'zh' ? 'zh-TW' : 'en-US', 1.1, 0.85);
    state.quizAnswers.push({ question: t(q.question), answer, feedback: reply });
  } catch {
    const errMsg = state.lang === 'zh' ? '答得很好！繼續加油喔！' : 'Great answer! Keep it up!';
    setTextById('feedback-text', errMsg);
  }
}

function nextQuizQuestion() {
  stopTTS();
  state.quizIndex++;
  if (state.quizIndex >= STORY.quiz.length) {
    showEndScreen();
  } else {
    renderQuizQuestion(state.quizIndex);
  }
}

// ─── END ─────────────────────────────────────────────────────────────────────

function showEndScreen() {
  showScreen('screen-end');
  const stars = '⭐'.repeat(Math.min(5, state.quizAnswers.length));
  setTextById('star-score', stars);
  speakText(
    t(STORY.ui.endTitle) + ' ' + t(STORY.ui.endMsg),
    state.lang === 'zh' ? 'zh-TW' : 'en-US',
    1.1, 0.85
  );
}

function restartAll() {
  stopTTS();
  state.currentScene = 0;
  state.chatHistory = [];
  state.quizIndex = 0;
  state.quizAnswers = [];
  state.currentCharacter = null;
  document.getElementById('char-select').style.display = 'block';
  document.getElementById('chat-area').style.display = 'none';
  showScreen('screen-landing');
}
