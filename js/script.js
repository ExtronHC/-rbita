/* ============================================
   ORB1TA - Main JavaScript
   ============================================ */

// Global State
const state = {
    currentScreen: 'boot',
    currentQuestion: 0,
    answers: [],
    soundEnabled: true,
    animationEnabled: true,
    particleEnabled: true,
    fishEnabled: true,
    personalityScores: {
        socialMedia: 0,
        authenticity: 0,
        empathy: 0,
        selfAwareness: 0,
        connection: 0,
        digitalBalance: 0
    }
};

// Quiz Questions (Portuguese)
const questions = [
    {
        question: 'Você apagaria uma foto sua se ela não tivesse curtidas?',
        options: [
            { text: 'Sim, na hora.', scores: { socialMedia: 3, authenticity: 0 } },
            { text: 'Talvez.', scores: { socialMedia: 2, authenticity: 1 } },
            { text: 'Depende.', scores: { socialMedia: 1, authenticity: 2 } },
            { text: 'Não.', scores: { socialMedia: 0, authenticity: 3 } }
        ]
    },
    {
        question: 'Você já fingiu gostar de algo só para se encaixar?',
        options: [
            { text: 'Muitas vezes.', scores: { authenticity: 0, selfAwareness: 0 } },
            { text: 'Algumas vezes.', scores: { authenticity: 1, selfAwareness: 1 } },
            { text: 'Raramente.', scores: { authenticity: 2, selfAwareness: 2 } },
            { text: 'Nunca.', scores: { authenticity: 3, selfAwareness: 3 } }
        ]
    },
    {
        question: 'Você se sente feio(a) por comparação com pessoas da internet?',
        options: [
            { text: 'Quase todos os dias.', scores: { socialMedia: 3, selfAwareness: 0 } },
            { text: 'Frequentemente.', scores: { socialMedia: 2, selfAwareness: 1 } },
            { text: 'Às vezes.', scores: { socialMedia: 1, selfAwareness: 2 } },
            { text: 'Não.', scores: { socialMedia: 0, selfAwareness: 3 } }
        ]
    },
    {
        question: 'Você já ignorou alguém legal porque essa pessoa "não era popular"?',
        options: [
            { text: 'Sim.', scores: { empathy: 0, authenticity: 0 } },
            { text: 'Talvez sem perceber.', scores: { empathy: 1, authenticity: 1 } },
            { text: 'Raramente.', scores: { empathy: 2, authenticity: 2 } },
            { text: 'Não.', scores: { empathy: 3, authenticity: 3 } }
        ]
    },
    {
        question: 'Se seu celular desaparecesse hoje, quem ainda lembraria de você amanhã?',
        options: [
            { text: 'Quase ninguém.', scores: { connection: 0, digitalBalance: 0 } },
            { text: 'Poucas pessoas.', scores: { connection: 1, digitalBalance: 1 } },
            { text: 'Algumas pessoas importantes.', scores: { connection: 2, digitalBalance: 2 } },
            { text: 'Quem importa de verdade.', scores: { connection: 3, digitalBalance: 3 } }
        ]
    },
    {
        question: 'Você conversa com seus pais/responsáveis de verdade… ou só divide a mesma casa?',
        options: [
            { text: 'Nem conversamos direito.', scores: { connection: 0, empathy: 0 } },
            { text: 'Conversamos superficialmente.', scores: { connection: 1, empathy: 1 } },
            { text: 'Às vezes temos conversas reais.', scores: { connection: 2, empathy: 2 } },
            { text: 'Temos conexão real.', scores: { connection: 3, empathy: 3 } }
        ]
    },
    {
        question: 'Você já fez piada com alguém para parecer engraçado na frente dos outros?',
        options: [
            { text: 'Sim.', scores: { empathy: 0, authenticity: 0 } },
            { text: 'Algumas vezes.', scores: { empathy: 1, authenticity: 1 } },
            { text: 'Sem intenção.', scores: { empathy: 2, authenticity: 2 } },
            { text: 'Não.', scores: { empathy: 3, authenticity: 3 } }
        ]
    },
    {
        question: 'Você sente que está vivendo… ou apenas passando o tempo até dormir?',
        options: [
            { text: 'Só existindo.', scores: { selfAwareness: 0, digitalBalance: 0 } },
            { text: 'Sobrevivendo no automático.', scores: { selfAwareness: 1, digitalBalance: 1 } },
            { text: 'Tentando encontrar sentido.', scores: { selfAwareness: 2, digitalBalance: 2 } },
            { text: 'Vivendo conscientemente.', scores: { selfAwareness: 3, digitalBalance: 3 } }
        ]
    },
    {
        question: 'Você já chorou escondido para ninguém perceber que você estava mal?',
        options: [
            { text: 'Muitas vezes.', scores: { selfAwareness: 0, connection: 0 } },
            { text: 'Algumas vezes.', scores: { selfAwareness: 1, connection: 1 } },
            { text: 'Poucas vezes.', scores: { selfAwareness: 2, connection: 2 } },
            { text: 'Não.', scores: { selfAwareness: 3, connection: 3 } }
        ]
    },
    {
        question: 'Você realmente sabe quem é sem internet, trends e opinião dos outros?',
        options: [
            { text: 'Não faço ideia.', scores: { authenticity: 0, selfAwareness: 0 } },
            { text: 'Acho que não totalmente.', scores: { authenticity: 1, selfAwareness: 1 } },
            { text: 'Estou tentando descobrir.', scores: { authenticity: 2, selfAwareness: 2 } },
            { text: 'Sim.', scores: { authenticity: 3, selfAwareness: 3 } }
        ]
    },
    {
        question: 'Você já julgou alguém pela aparência antes de conhecer?',
        options: [
            { text: 'Sim.', scores: { empathy: 0, selfAwareness: 0 } },
            { text: 'Provavelmente.', scores: { empathy: 1, selfAwareness: 1 } },
            { text: 'Às vezes.', scores: { empathy: 2, selfAwareness: 2 } },
            { text: 'Não.', scores: { empathy: 3, selfAwareness: 3 } }
        ]
    },
    {
        question: 'Quantas horas da sua vida você entrega para telas todos os dias?',
        options: [
            { text: 'Quase o dia inteiro.', scores: { digitalBalance: 0, socialMedia: 3 } },
            { text: 'Muitas horas.', scores: { digitalBalance: 1, socialMedia: 2 } },
            { text: 'Mais do que deveria.', scores: { digitalBalance: 2, socialMedia: 1 } },
            { text: 'Tento controlar.', scores: { digitalBalance: 3, socialMedia: 0 } }
        ]
    },
    {
        question: 'Você já sentiu inveja da felicidade que alguém posta?',
        options: [
            { text: 'Sim.', scores: { socialMedia: 3, selfAwareness: 0 } },
            { text: 'Frequentemente.', scores: { socialMedia: 2, selfAwareness: 1 } },
            { text: 'Às vezes.', scores: { socialMedia: 1, selfAwareness: 2 } },
            { text: 'Não.', scores: { socialMedia: 0, selfAwareness: 3 } }
        ]
    },
    {
        question: 'Você seria amigo de você mesmo?',
        options: [
            { text: 'Não.', scores: { selfAwareness: 0, authenticity: 0 } },
            { text: 'Talvez não.', scores: { selfAwareness: 1, authenticity: 1 } },
            { text: 'Acho que sim.', scores: { selfAwareness: 2, authenticity: 2 } },
            { text: 'Sim.', scores: { selfAwareness: 3, authenticity: 3 } }
        ]
    },
    {
        question: 'Quando foi a última vez que você ficou sozinho sem música, vídeo ou celular?',
        options: [
            { text: 'Não lembro.', scores: { digitalBalance: 0, selfAwareness: 0 } },
            { text: 'Faz muito tempo.', scores: { digitalBalance: 1, selfAwareness: 1 } },
            { text: 'Recentemente.', scores: { digitalBalance: 2, selfAwareness: 2 } },
            { text: 'Consigo fazer isso.', scores: { digitalBalance: 3, selfAwareness: 3 } }
        ]
    }
];

// POLO Messages
const poloMessages = {
    welcome: [
        'Bem-vindo ao ORB1TA! Vamos descobrir juntos?',
        'Olá! Estou aqui para ajudar você a refletir.',
        'Que bom te ver por aqui! Pronto para começar?'
    ],
    quiz: [
        'Hmm, interessante...',
        'Pense bem nessa...',
        'Essa é profunda...',
        'Sua resposta diz muito sobre você...',
        'Continuando nossa jornada...',
        'Quase lá...',
        'Vamos juntos até o fim...'
    ],
    results: {
        'Você está desaparecendo dentro do personagem': 'Sinto que você está perdendo sua verdadeira identidade...',
        'Preso na própria bolha': 'Você percebe que algo está errado, mas precisa agir...',
        'Em conflito': 'Você já começou a enxergar suas contradições. Isso é o começo!',
        'Consciente': 'Você está no caminho certo! Continue sendo autêntico.'
    },
    final: 'Você não está sozinho nessa jornada.'
};

// Personality Types (Portuguese)
const personalityTypes = {
    'Você está desaparecendo dentro do personagem': {
        description: 'Talvez você esteja vivendo mais para parecer alguém do que para realmente ser alguém. A necessidade de aprovação pode estar consumindo sua identidade.',
        message: 'O primeiro passo é notar. Você pode escolher ser real.',
        minScore: 0,
        maxScore: 15
    },
    'Preso na própria bolha': {
        description: 'Você percebe que algo está errado, mas continua anestesiado por rotina, algoritmo e comparação constante.',
        message: 'A bolha é confortável, mas o mundo real é onde a vida acontece.',
        minScore: 16,
        maxScore: 25
    },
    'Em conflito': {
        description: 'Você já começou a enxergar suas contradições. Isso dói — mas também é o começo da mudança.',
        message: 'O conflito é sinal de crescimento. Continue questionando.',
        minScore: 26,
        maxScore: 35
    },
    'Consciente': {
        description: 'Você tenta existir de forma verdadeira em um mundo que recompensa máscaras.',
        message: 'Você é um exemplo. Ajude outros a furarem suas bolhas também.',
        minScore: 36,
        maxScore: 45
    }
};

// DOM Elements
const screens = {
    boot: document.getElementById('boot-screen'),
    home: document.getElementById('home-screen'),
    about: document.getElementById('about-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen'),
    final: document.getElementById('final-screen'),
    settings: document.getElementById('settings-screen'),
    files: document.getElementById('files-screen')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupBootScreen();
    setupNavigation();
    setupQuiz();
    setupClock();
    createFloatingBubbles();
    createTropicalFish();
    setupSettings();
    setupKeyboardSupport();
    setupPoloAnimations();
    
    // Set random POLO welcome message
    setPoloMessage('welcome');
    
    // Start boot sequence
    setTimeout(() => {
        completeBoot();
    }, 4000);
}

// Boot Screen
function setupBootScreen() {
    const bootScreen = screens.boot;
    
    // Skip on click or keypress
    bootScreen.addEventListener('click', skipBoot);
    document.addEventListener('keydown', skipBoot);
}

function skipBoot() {
    if (state.currentScreen === 'boot') {
        completeBoot();
    }
}

function completeBoot() {
    if (state.currentScreen !== 'boot') return;
    
    // Remove event listeners
    screens.boot.removeEventListener('click', skipBoot);
    document.removeEventListener('keydown', skipBoot);
    
    // Play XP startup sound
    playSound('startup');
    
    // Animate transition
    gsap.to(screens.boot, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            screens.boot.classList.add('hidden');
            state.currentScreen = 'home';
            showScreen('home');
        }
    });
}

// Navigation
function setupNavigation() {
    // Desktop icons
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const action = icon.dataset.action;
            handleDesktopAction(action);
        });
    });
    
    // Window close buttons
    const closeButtons = document.querySelectorAll('.window-btn.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            if (action === 'home') {
                showScreen('home');
            }
        });
    });
    
    // Start button
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => {
        showScreen('home');
    });
    
    // Results actions
    const retakeBtn = document.getElementById('retake-quiz');
    const continueBtn = document.getElementById('continue-journey');
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', startQuiz);
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', showFinalScreen);
    }
    
    // Final screen home button
    const finalHomeBtn = document.getElementById('final-home');
    if (finalHomeBtn) {
        finalHomeBtn.addEventListener('click', () => {
            showScreen('home');
        });
    }
}

function handleDesktopAction(action) {
    playSound('click');
    
    switch(action) {
        case 'start-quiz':
            startQuiz();
            break;
        case 'about':
            showScreen('about');
            break;
        case 'results':
            showScreen('results');
            break;
        case 'settings':
            showScreen('settings');
            break;
        case 'files':
            showScreen('files');
            break;
        case 'exit':
            showFinalScreen();
            break;
    }
}

function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.add('hidden');
        gsap.set(screen, { opacity: 0 });
    });
    
    // Show target screen
    const targetScreen = screens[screenName];
    targetScreen.classList.remove('hidden');
    
    // Animate in
    gsap.to(targetScreen, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    state.currentScreen = screenName;
    
    // Screen-specific setup
    if (screenName === 'home') {
        createFloatingBubbles();
        if (state.fishEnabled) {
            createTropicalFish();
        }
        setPoloMessage('welcome');
    } else if (screenName === 'final') {
        createFinalBubbles();
        if (state.fishEnabled) {
            createFinalFish();
        }
    }
}

// Quiz System
function setupQuiz() {
    const answersContainer = document.getElementById('answers-container');
    
    answersContainer.addEventListener('click', (e) => {
        const option = e.target.closest('.answer-option');
        if (option) {
            selectAnswer(option);
        }
    });
}

function startQuiz() {
    state.currentQuestion = 0;
    state.answers = [];
    state.personalityScores = {
        socialMedia: 0,
        authenticity: 0,
        empathy: 0,
        selfAwareness: 0,
        connection: 0,
        digitalBalance: 0
    };
    
    showScreen('quiz');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[state.currentQuestion];
    
    // Update progress
    const progress = ((state.currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = state.currentQuestion + 1;
    
    // Animate question
    const questionCard = document.getElementById('question-card');
    gsap.fromTo(questionCard, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
    
    // Set question text
    document.getElementById('question-text').textContent = question.question;
    
    // Update POLO message
    updatePoloQuizMessage();
    
    // Generate answers
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'answer-option stagger-item';
        optionEl.textContent = option.text;
        optionEl.dataset.index = index;
        optionEl.style.animationDelay = `${index * 0.1}s`;
        answersContainer.appendChild(optionEl);
    });
}

function selectAnswer(option) {
    // Remove selection from all options
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    option.classList.add('selected');
    playSound('click');
    
    // Store answer
    const index = parseInt(option.dataset.index);
    const question = questions[state.currentQuestion];
    const selectedOption = question.options[index];
    
    state.answers.push(selectedOption);
    
    // Update scores
    Object.entries(selectedOption.scores).forEach(([category, score]) => {
        state.personalityScores[category] += score;
    });
    
    // Move to next question or show results
    setTimeout(() => {
        if (state.currentQuestion < questions.length - 1) {
            state.currentQuestion++;
            loadQuestion();
        } else {
            showResults();
        }
    }, 500);
}

function showResults() {
    showScreen('results');
    
    // Calculate total score
    const totalScore = Object.values(state.personalityScores).reduce((a, b) => a + b, 0);
    
    // Determine personality type
    let personalityType = 'Você está desaparecendo dentro do personagem';
    
    for (const [type, data] of Object.entries(personalityTypes)) {
        if (totalScore >= data.minScore && totalScore <= data.maxScore) {
            personalityType = type;
        }
    }
    
    const typeData = personalityTypes[personalityType];
    
    // Display results
    document.getElementById('personality-type').textContent = personalityType;
    document.getElementById('personality-description').textContent = typeData.description;
    document.getElementById('reflective-message').innerHTML = `<p>${typeData.message}</p>`;
    
    // Update POLO message
    const poloResultsMessage = document.getElementById('polo-results-message');
    if (poloResultsMessage && poloMessages.results[personalityType]) {
        poloResultsMessage.textContent = poloMessages.results[personalityType];
    }
    
    // Create radar chart
    createRadarChart();
}

function createRadarChart() {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.radarChart) {
        window.radarChart.destroy();
    }
    
    window.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Redes Sociais', 'Autenticidade', 'Empatia', 'Autoconsciência', 'Conexão', 'Equilíbrio Digital'],
            datasets: [{
                label: 'Seu Perfil',
                data: [
                    15 - state.personalityScores.socialMedia,
                    state.personalityScores.authenticity,
                    state.personalityScores.empathy,
                    state.personalityScores.selfAwareness,
                    state.personalityScores.connection,
                    state.personalityScores.digitalBalance
                ],
                backgroundColor: 'rgba(5, 175, 242, 0.3)',
                borderColor: 'rgba(5, 175, 242, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(4, 118, 217, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(4, 118, 217, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 15,
                    ticks: {
                        stepSize: 3,
                        color: 'rgba(255, 255, 255, 0.7)',
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    pointLabels: {
                        color: 'rgba(255, 255, 255, 0.9)',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function showFinalScreen() {
    showScreen('final');
}

// Clock
function setupClock() {
    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });
        const shortTimeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
        
        const clockDisplay = document.getElementById('clock-display');
        const trayClock = document.getElementById('tray-clock');
        
        if (clockDisplay) {
            clockDisplay.textContent = timeStr;
        }
        
        if (trayClock) {
            trayClock.textContent = shortTimeStr;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// POLO Mascot
function setupPoloAnimations() {
    // POLO blink animation is handled in CSS
    // Additional animations can be added here
}

function setPoloMessage(type) {
    const poloMessage = document.getElementById('polo-message');
    if (!poloMessage) return;
    
    if (type === 'welcome' && poloMessages.welcome.length > 0) {
        const randomIndex = Math.floor(Math.random() * poloMessages.welcome.length);
        poloMessage.textContent = poloMessages.welcome[randomIndex];
    }
}

function updatePoloQuizMessage() {
    const poloQuizMessage = document.getElementById('polo-quiz-message');
    if (!poloQuizMessage) return;
    
    const randomIndex = Math.floor(Math.random() * poloMessages.quiz.length);
    poloQuizMessage.textContent = poloMessages.quiz[randomIndex];
}

// Floating Bubbles
function createFloatingBubbles() {
    const container = document.querySelector('.floating-bubbles');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 60 + 20;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        container.appendChild(bubble);
    }
}

function createFinalBubbles() {
    const container = document.querySelector('.bubble-layer');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 40 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 8 + 5;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.top = `${top}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animation = `bubble-rise ${duration}s linear infinite, bubble-wobble 2s ease-in-out infinite`;
        
        container.appendChild(bubble);
    }
}

// Tropical Fish
function createTropicalFish() {
    const container = document.querySelector('.fish-container');
    if (!container || !state.fishEnabled) return;
    
    container.innerHTML = '';
    
    const fishEmojis = ['🐠', '🐟', '🐡', '🦈', '🐳'];
    
    for (let i = 0; i < 8; i++) {
        const fish = document.createElement('div');
        fish.className = `fish ${Math.random() > 0.5 ? 'reverse' : ''} ${Math.random() > 0.7 ? 'small' : ''}`;
        fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
        
        const top = Math.random() * 80 + 10;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        
        fish.style.top = `${top}%`;
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationDelay = `${delay}s`;
        
        container.appendChild(fish);
    }
}

function createFinalFish() {
    const container = document.querySelector('.fish-container-final');
    if (!container || !state.fishEnabled) return;
    
    container.innerHTML = '';
    
    const fishEmojis = ['🐠', '🐟', '🐡'];
    
    for (let i = 0; i < 5; i++) {
        const fish = document.createElement('div');
        fish.className = `fish ${Math.random() > 0.5 ? 'reverse' : ''}`;
        fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
        
        const top = Math.random() * 80 + 10;
        const duration = Math.random() * 25 + 20;
        const delay = Math.random() * 5;
        
        fish.style.top = `${top}%`;
        fish.style.animationDuration = `${duration}s`;
        fish.style.animationDelay = `${delay}s`;
        
        container.appendChild(fish);
    }
}

// Settings
function setupSettings() {
    const soundToggle = document.getElementById('sound-toggle');
    const animationToggle = document.getElementById('animation-toggle');
    const particleToggle = document.getElementById('particle-toggle');
    const fishToggle = document.getElementById('fish-toggle');
    
    if (soundToggle) {
        soundToggle.addEventListener('change', (e) => {
            state.soundEnabled = e.target.checked;
        });
    }
    
    if (animationToggle) {
        animationToggle.addEventListener('change', (e) => {
            state.animationEnabled = e.target.checked;
            document.body.style.setProperty('--animation-duration', e.target.checked ? '0.3s' : '0s');
        });
    }
    
    if (particleToggle) {
        particleToggle.addEventListener('change', (e) => {
            state.particleEnabled = e.target.checked;
        });
    }
    
    if (fishToggle) {
        fishToggle.addEventListener('change', (e) => {
            state.fishEnabled = e.target.checked;
            if (e.target.checked && state.currentScreen === 'home') {
                createTropicalFish();
            } else {
                const fishContainer = document.querySelector('.fish-container');
                if (fishContainer) {
                    fishContainer.innerHTML = '';
                }
            }
        });
    }
}

// Sound Effects
function playSound(type) {
    if (!state.soundEnabled) return;
    
    // Create audio context for simple sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'startup':
            oscillator.frequency.value = 523.25;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
        case 'click':
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'hover':
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
        case 'success':
            oscillator.frequency.value = 1000;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
    }
}

// Keyboard Support
function setupKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        if (state.currentScreen === 'quiz') {
            const key = parseInt(e.key);
            if (key >= 1 && key <= 4) {
                const options = document.querySelectorAll('.answer-option');
                if (options[key - 1]) {
                    selectAnswer(options[key - 1]);
                }
            }
        }
        
        // Escape to go home
        if (e.key === 'Escape' && state.currentScreen !== 'home' && state.currentScreen !== 'boot') {
            showScreen('home');
        }
    });
}

// Ripple Effect
document.addEventListener('click', (e) => {
    if (e.target.closest('.aero-button') || e.target.closest('.desktop-icon') || e.target.closest('.answer-option')) {
        createRipple(e);
    }
});

function createRipple(e) {
    const button = e.target.closest('.aero-button, .desktop-icon, .answer-option');
    if (!button) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Hover Sound Effects
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.aero-button') || e.target.closest('.desktop-icon') || e.target.closest('.answer-option')) {
        playSound('hover');
    }
});

// Window Dragging (Simple Implementation)
let isDragging = false;
let currentWindow = null;
let offsetX, offsetY;

document.addEventListener('mousedown', (e) => {
    const windowHeader = e.target.closest('.window-header');
    if (windowHeader && !e.target.closest('.window-btn')) {
        isDragging = true;
        currentWindow = windowHeader.closest('.glass-window');
        const rect = currentWindow.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        currentWindow.style.position = 'absolute';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentWindow) {
        currentWindow.style.left = `${e.clientX - offsetX}px`;
        currentWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentWindow = null;
});

// Particle Effects on Mouse Move
if (state.particleEnabled) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            createParticle(e.clientX, e.clientY);
        }
    });
}

function createParticle(x, y) {
    if (!state.particleEnabled) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
}

// Initialize GSAP animations for elements
function animateElements() {
    if (!state.animationEnabled) return;
    
    // Animate desktop icons
    gsap.from('.desktop-icon', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // Animate widgets
    gsap.from('.floating-widget', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Animate logo
    gsap.from('.main-logo', {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    });
    
    // Animate POLO
    gsap.from('.polo-container', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out'
    });
}

// Call animations when home screen is shown
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'home-screen' && !mutation.target.classList.contains('hidden')) {
            animateElements();
        }
    });
});

observer.observe(screens.home, { attributes: true, attributeFilter: ['class'] });

// Console Easter Egg
console.log('%c🌐 ORB1TA — Fure a bolha', 'color: #05AFF2; font-size: 20px; font-weight: bold;');
console.log('%cTalvez apenas tenha se perdido dentro da bolha.', 'color: #F7B643; font-style: italic;');
