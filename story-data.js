const STORY = {
  title: { zh: '彤彤的筆畫魔法書', en: "Tong Tong's Magic Stroke Book" },
  author: { zh: '作者：滿昱繪', en: 'By Man Yu Hui' },

  scenes: [
    {
      id: 1,
      text: {
        zh: '彤彤坐在小書桌前，面前攤開著一本嶄新的生字練習本。窗外的陽光灑進來，但她一點也不想去玩，因為她得先對付這些密密麻麻、長得像亂草一樣的生字。\n\n「這個『龜』字怎麼這麼多筆畫呀？」彤彤小聲嘟囔著。她努力地想把字寫進小格子裡，但手一抖，最後一撇劃出了界。一顆晶瑩的淚珠掉在紙上，剛好把那個字暈開了，模糊得像一朵黑色的小烏雲。',
        en: 'Tong Tong sat at her little desk, a brand-new character practice book spread open before her. Sunlight streamed through the window, but she had no desire to play — she had to deal with these dense, messy-looking characters first.\n\n"Why does the character \'turtle\' have so many strokes?" she muttered. She tried hard to fit the character into the small square, but her hand trembled and the last stroke went outside the lines. A glistening teardrop fell onto the paper, blurring the character into a small black cloud.'
      },
      imagePrompt: 'Studio Ghibli inspired children\'s book watercolor illustration. A sweet Chinese girl age 7 with two small pigtails tied with pink ribbons, wearing a soft pink blouse, sitting at a tiny wooden desk. One glistening teardrop on her cheek. An open practice workbook with tiny Chinese character grids in front of her. Warm amber afternoon sunlight streams through a round window casting a golden glow. Potted plant on windowsill, pencil case on desk. Rich detail, expressive face, lush background. No text, no words in image.',
      character: null
    },
    {
      id: 2,
      text: {
        zh: '這時，美玲老師輕輕走進教室。她看到彤彤垂頭喪氣的樣子，溫柔地在旁邊蹲了下來。美玲老師沒有責備她，反而像變魔術一樣，從背後拿出一把想像的「魔法放大鏡」。\n\n「彤彤，別哭，」美玲老師指著紙上的字說，「這些字其實不是死板板的線條，它們是一群愛跳舞的小精靈喔！」',
        en: 'Just then, Teacher Mei-ling gently walked in. Seeing Tong Tong\'s downcast face, she kindly knelt down beside her. Teacher Mei-ling didn\'t scold her — instead, like magic, she produced an imaginary "magic magnifying glass" from behind her back.\n\n"Don\'t cry, Tong Tong," Teacher Mei-ling said, pointing to the characters. "These aren\'t stiff lines — they\'re a group of dancing little fairies!"'
      },
      imagePrompt: 'Studio Ghibli inspired children\'s book watercolor illustration. A warm kind female Chinese teacher in her early 30s with kind eyes and hair in a bun, wearing a sage green cardigan, kneeling gracefully beside a little girl at a small desk. Teacher holds up one finger as if revealing a secret, sparkles of golden magic light around her hand. The girl looks up with wide curious eyes, tear still drying. Warm classroom atmosphere, chalkboard behind, afternoon light. Rich colors, expressive characters, magical atmosphere. No text in image.',
      character: 'teacher'
    },
    {
      id: 3,
      text: {
        zh: '「妳看這個『鳥』字，這一撇是不是很像小鳥尖尖的嘴巴？」\n\n彤彤眨眨眼睛，仔細盯著那個字看。咦？真的耶！當她重新握起鉛筆，輕輕寫下那一撇時，她想像那是一隻小山雀在跟她打招呼。筆尖在紙上滑動的滋滋聲，聽起來就像小鳥在唱歌。',
        en: '"Look at the character \'bird\' — doesn\'t that stroke look just like a little bird\'s pointy beak?"\n\nTong Tong blinked and stared carefully at the character. Oh! It really did! When she picked up her pencil again and drew that stroke, she imagined a little tit bird saying hello to her. The soft scratching sound of pencil on paper sounded just like a bird singing.'
      },
      imagePrompt: 'Studio Ghibli inspired children\'s book watercolor illustration. A delighted little Chinese girl with pigtails, mouth open in wonder, pointing at a large glowing magical Chinese stroke floating before her. From the glowing golden stroke emerges a tiny fluffy tit bird with a round belly, wings spread, chirping joyfully. Magical sparkles and light rays surround the bird. Girl\'s eyes are wide and bright with discovery. Pencil in her other hand, open workbook on desk. Rich watercolor textures, luminous glow effects, joyful warm palette. No text in image.',
      character: 'teacher'
    },
    {
      id: 4,
      text: {
        zh: '「那我們來看這個『雨』字，」美玲老師繼續引導著，「中間的四個點，就像是輕輕敲打窗戶的小雨滴。滴答、滴答，妳聽到了嗎？」\n\n彤彤笑了，她一筆一劃地寫著，每一點都點得特別輕快。',
        en: '"Now look at the character \'rain,\'" Teacher Mei-ling continued. "The four dots in the middle are like tiny raindrops gently tapping on the window. Drip, drop, drip, drop — can you hear them?"\n\nTong Tong smiled and wrote each stroke carefully, each dot placed with special lightness and joy.'
      },
      imagePrompt: 'Studio Ghibli inspired children\'s book watercolor illustration. A smiling little Chinese girl with pigtails lightly tapping her pencil on paper, eyes half-closed in concentration and delight. Around her float four tiny glowing raindrop spirits with round eyes and small smiles, each trailing a silver blue ribbon as they dance. Outside the window real rain falls softly, streetlamp glowing orange. The girl\'s workbook page glows faintly blue-silver. Cozy magical indoors meets rainy evening outside. Rich blue-lavender-silver palette, atmospheric depth. No text in image.',
      character: 'teacher'
    },
    {
      id: 5,
      text: {
        zh: '彤彤發現了更多魔法！寫「走」字的時候，筆尖像是在操場上輕快地跑步；寫「花」字的時候，最後的一彎勾像是一朵含苞待放的花兒，在微風中對她點點頭。\n\n原本可怕的筆畫，現在都變成了可愛的小動物和植物。她的手不再發抖了，心跳也變得平穩。一橫、一豎、一撇、一捺，這些筆畫在小格子裡排排坐，整整齊齊的，就像一群乖巧的小朋友。',
        en: 'Tong Tong discovered even more magic! Writing the character "walk," her pencil tip seemed to run lightly across a playground. Writing "flower," the final curved hook looked like a blooming flower nodding to her in the breeze.\n\nThe once-scary strokes had all become cute little animals and plants. Her hand no longer trembled, and her heartbeat grew calm. Horizontal, vertical, left-falling, right-falling — the strokes sat neatly in the squares, like a row of well-behaved little children.'
      },
      imagePrompt: 'Studio Ghibli inspired children\'s book watercolor illustration. A joyful little Chinese girl with pigtails laughing and writing freely, surrounded by a swirl of magical golden brush strokes that transform mid-air — one stroke becomes a tiny child running with arms out, another curls into a blooming peach flower, another forms a flying swallow. The magic fills the whole room with warm golden green light. She sits at her desk but the world around her is enchanted. Lush detailed environment, rich textures, dynamic composition with magic radiating outward. No text in image.',
      character: null
    },
    {
      id: 6,
      text: {
        zh: '彤彤收拾好書包，心裡甜滋滋的。她發現，只要帶著愛和想像力，原本複雜的生字也會變成美妙的風景。\n\n從那天起，彤彤最期待的事情，就是打開練習本，和她的筆畫小精靈們一起在紙上跳舞。',
        en: 'Tong Tong packed up her bag with a sweet feeling in her heart. She discovered that with love and imagination, even complex characters could become beautiful, wonderful landscapes.\n\nFrom that day on, Tong Tong\'s favorite thing was to open her practice book and dance across the paper with her little stroke fairies.'
      },
      imagePrompt: 'Studio Ghibli inspired children\'s book watercolor illustration. A happy little Chinese girl with pigtails skipping along a quiet neighborhood path at golden hour, school bag bouncing on her back, arms spread wide. Around her float tiny luminous Chinese brush stroke spirits like fireflies — each one glowing soft gold-rose. Cherry blossom petals drift in the breeze. Long warm shadows on the path. Distant rooftops silhouetted against a glorious pink-orange sunset sky with wispy clouds. Sense of peace, wonder, and belonging. Cinematic wide shot, deeply detailed background. No text in image.',
      character: null
    }
  ],

  characters: {
    tongtong: {
      name: { zh: '彤彤', en: 'Tong Tong' },
      avatar: '🧒',
      color: '#FF8FAB',
      systemPrompt: {
        zh: '你是彤彤，一個7歲的小女孩，剛剛學會了用想像力來寫生字。你說話方式像小朋友，天真可愛，充滿好奇心。你很喜歡分享你發現到的筆畫魔法——「鳥」字的撇像小鳥的嘴巴，「雨」字的點像小雨滴，「走」字像在跑步，「花」字最後一勾像花兒點頭。你說話要簡短，每次回應不超過3句話，要溫暖、開心、有趣。如果小朋友問你問題，你要像朋友一樣回答。請只用繁體中文回答。',
        en: 'You are Tong Tong, a 7-year-old girl who just learned to write Chinese characters using her imagination. You speak in a childlike, innocent, and curious way. You love sharing the stroke magic you discovered — the stroke in "bird" looks like a beak, the dots in "rain" are raindrops, "walk" feels like running, "flower" has a hook like a nodding flower. Keep responses short — no more than 3 sentences. Be warm, happy, and fun. Answer questions like a friend. Reply only in English.'
      },
      voiceLang: { zh: 'zh-TW', en: 'en-US' },
      voicePitch: { zh: 1.3, en: 1.3 },
      voiceRate: { zh: 0.9, en: 0.9 }
    },
    teacher: {
      name: { zh: '美玲老師', en: 'Teacher Mei-ling' },
      avatar: '👩‍🏫',
      color: '#7EC8A4',
      systemPrompt: {
        zh: '你是美玲老師，一位溫柔有愛心的小學老師。你用想像力和比喻幫助小朋友學習寫字——你把筆畫比作小動物、植物和大自然的事物。你說話溫和、鼓勵、充滿耐心，就像在說故事一樣。每次回應不超過3句話。你的目標是讓學習變得有趣又充滿魔法。請只用繁體中文回答。',
        en: 'You are Teacher Mei-ling, a warm and caring elementary school teacher. You use imagination and metaphors to help children learn to write — comparing strokes to animals, plants, and things from nature. You speak gently, encouragingly, and patiently, like you\'re telling a story. Keep responses to 3 sentences or less. Your goal is to make learning fun and magical. Reply only in English.'
      },
      voiceLang: { zh: 'zh-TW', en: 'en-US' },
      voicePitch: { zh: 1.1, en: 1.1 },
      voiceRate: { zh: 0.85, en: 0.85 }
    }
  },

  quiz: [
    {
      question: {
        zh: '彤彤一開始遇到了什麼困難？她的心情怎麼樣？',
        en: 'What difficulty did Tong Tong face at the beginning? How did she feel?'
      },
      hint: {
        zh: '想想看，彤彤在書桌前做什麼？她為什麼哭了？',
        en: 'Think about what Tong Tong was doing at her desk. Why did she cry?'
      }
    },
    {
      question: {
        zh: '美玲老師用了什麼魔法來幫助彤彤？',
        en: 'What magic did Teacher Mei-ling use to help Tong Tong?'
      },
      hint: {
        zh: '老師有拿出什麼東西？她怎麼解釋那些字的？',
        en: 'What did the teacher take out? How did she explain the characters?'
      }
    },
    {
      question: {
        zh: '彤彤把「鳥」字的哪個部分想像成什麼？',
        en: 'What did Tong Tong imagine a part of the "bird" character looked like?'
      },
      hint: {
        zh: '老師說「鳥」字的撇很像什麼動物的什麼部位？',
        en: 'What animal body part did the teacher say a stroke in "bird" looked like?'
      }
    },
    {
      question: {
        zh: '你覺得故事裡最有趣的比喻是哪一個？為什麼？',
        en: 'Which comparison in the story did you find most interesting? Why?'
      },
      hint: {
        zh: '是鳥的嘴巴、小雨滴、跑步，還是花朵？說說你的想法！',
        en: 'Was it the bird beak, the raindrops, running, or the flower? Share your thoughts!'
      }
    },
    {
      question: {
        zh: '如果你是彤彤，你會把哪個字想像成什麼有趣的東西？',
        en: 'If you were Tong Tong, what interesting thing would you imagine a character looks like?'
      },
      hint: {
        zh: '發揮你的想像力！任何答案都很好喔！',
        en: 'Use your imagination! Any answer is great!'
      }
    }
  ],

  ui: {
    startBtn: { zh: '開始閱讀 ✨', en: 'Start Reading ✨' },
    nextBtn: { zh: '下一頁 →', en: 'Next →' },
    prevBtn: { zh: '← 上一頁', en: '← Back' },
    listenBtn: { zh: '🔊 聽故事', en: '🔊 Listen' },
    stopBtn: { zh: '⏹ 停止', en: '⏹ Stop' },
    chatTitle: { zh: '和故事朋友說說話！', en: 'Chat with a Story Friend!' },
    chooseChar: { zh: '選一個角色開始對話：', en: 'Choose a character to talk to:' },
    holdSpeak: { zh: '🎤 按住說話', en: '🎤 Hold to Speak' },
    release: { zh: '🔴 放開送出', en: '🔴 Release to Send' },
    quizTitle: { zh: '🌟 小小測驗時間！', en: '🌟 Quiz Time!' },
    quizIntro: { zh: '你準備好回答美玲老師的問題了嗎？', en: 'Are you ready to answer Teacher Mei-ling\'s questions?' },
    startQuiz: { zh: '開始答題！', en: 'Start Quiz!' },
    nextQ: { zh: '下一題 →', en: 'Next Question →' },
    finishBtn: { zh: '🎉 完成！', en: '🎉 Finish!' },
    endTitle: { zh: '太棒了！你真的很厲害！🌟', en: 'Amazing! You did so well! 🌟' },
    endMsg: { zh: '你認真讀完了「彤彤的筆畫魔法書」！希望你也能像彤彤一樣，找到屬於自己的學習魔法！', en: 'You finished reading "Tong Tong\'s Magic Stroke Book"! We hope you find your own learning magic, just like Tong Tong did!' },
    readAgain: { zh: '再讀一次 📖', en: 'Read Again 📖' },
    generating: { zh: '✨ 正在為你畫圖...', en: '✨ Generating image...' },
    thinking: { zh: '💭 思考中...', en: '💭 Thinking...' },
    scene: { zh: '第', en: 'Scene' },
    of: { zh: '頁，共', en: 'of' },
    pages: { zh: '頁', en: '' },
    talkBtn: { zh: '與角色對話', en: 'Chat with Characters' },
    skipChat: { zh: '直接去測驗', en: 'Go to Quiz' }
  }
};
