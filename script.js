// ===== MODE SOMBRE =====
const darkModeToggle = document.getElementById('darkModeToggle');
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Appliquer le mode sombre au chargement si sauvegardé
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Mode Clair';
}

// Basculer entre mode clair et mode sombre
darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️ Mode Clair' : '🌙 Mode Sombre';
});

// ===== CHRONOMÈTRE =====
let time = 0;
let timerInterval;
let isPaused = false;

function formatTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

function startChronometer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('time').textContent = formatTime(time);
    }, 1000);
}

function resetChronometer() {
    clearInterval(timerInterval);
    time = 0;
    isPaused = false;
    document.getElementById('time').textContent = formatTime(time);
    document.getElementById('pauseChronometer').textContent = '⏸️ Pause';
    startChronometer();
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(timerInterval);
        document.getElementById('pauseChronometer').textContent = '▶️ Reprendre';
    } else {
        startChronometer();
        document.getElementById('pauseChronometer').textContent = '⏸️ Pause';
    }
}

// Démarrer le chronomètre au chargement
startChronometer();

// Événements des boutons du chronomètre
document.getElementById('resetChronometer').addEventListener('click', resetChronometer);
document.getElementById('pauseChronometer').addEventListener('click', togglePause);

// ===== DATE ET HEURE =====
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('fr-FR');
    document.getElementById('currentDate').textContent = `Nous sommes le ${formattedDate}, il est ${formattedTime}`;
}

// Mettre à jour immédiatement puis toutes les secondes
updateDateTime();
setInterval(updateDateTime, 1000);

// ===== CITATIONS =====
const quotes = [
    '"La seule façon de faire du bon travail est d\'aimer ce que vous faites." - Steve Jobs',
    '"L\'innovation distingue un leader d\'un suiveur." - Steve Jobs',
    '"Le succès n\'est pas la clé du bonheur. Le bonheur est la clé du succès." - Albert Schweitzer',
    '"La vie est 10% ce qui vous arrive et 90% comment vous y réagissez." - Charles R. Swindoll',
    '"Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant." - Proverbe chinois',
    '"N\'abandonnez jamais un rêve juste à cause du temps qu\'il faudra pour l\'accomplir. Le temps passera de toute façon." - Earl Nightingale',
    '"Le seul moyen de faire du bon travail est d\'aimer ce que vous faites." - Steve Jobs'
];

document.getElementById('changeQuote').addEventListener('click', function() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = randomQuote;
});

// ===== STATISTIQUES =====
// Compteur de visites
let visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visitCount').textContent = visitCount;

// Temps passé sur le site
let timeOnSite = 0;
setInterval(() => {
    timeOnSite++;
    document.getElementById('timeOnSite').textContent = timeOnSite + 's';
}, 1000);

// Compteur de clics
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    document.getElementById('clicks').textContent = clickCount;
});