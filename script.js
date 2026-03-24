// =============================================================================
// MODE SOMBRE
// =============================================================================

const darkModeToggle = document.getElementById('darkModeToggle');
const isDarkMode = loc// Activer/Désactiver le mode sombre
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Désactiver le mode sombre';
    } else {
        darkModeToggle.textContent = 'Activer le mode sombre';
    }
});

// Chronomètre
let time = 0; // Initialisation à 0
let timerInterval;

function formatTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

function startChronometer() {
    // S'assurer de ne pas avoir plusieurs intervalles en parallèle
    clearInterval(timerInterval); 
    timerInterval = setInterval(() => {
        time++;
        document.getElementById('time').textContent = formatTime(time);
    }, 1000);
}

function resetChronometer() {
    clearInterval(timerInterval);
    time = 0;
    document.getElementById('time').textContent = formatTime(time);
    // Optionnel : redémarrer automatiquement après un reset.
    // Si vous ne voulez pas qu'il redémarre tout seul, commentez la ligne suivante.
    startChronometer(); 
}

// Lancer le chronomètre automatiquement au chargement de la page
startChronometer();

// Réinitialisation du chronomètre
const resetButton = document.getElementById('resetChronometer');
resetButton.addEventListener('click', resetChronometer);

// Afficher la date et l'heure actuelles
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('fr-FR');
    document.getElementById('currentDate').textContent = `Nous sommes le ${formattedDate}, il est ${formattedTime}.`;
}

// Mettre à jour la date et l'heure toutes les secondes et immédiatement au chargement
updateDateTime(); // Appel initial pour afficher sans attendre 1 seconde
setInterval(updateDateTime, 1000);
alStorage.getItem('darkMode') === 'true';

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


// =============================================================================
// DATE ET HEURE
// =============================================================================

function updateDateTime() {
    const now = new Date();
    
    // Options pour le format de date en français
    const dateOptions = {
        weekday: 'long',    // lundi, mardi, mercredi, etc.
        year: 'numeric',    // 2026
        month: 'long',      // janvier, février, etc.
        day: 'numeric'      // 1, 2, 3, etc.
    };
    
    // Options pour le format d'heure en français
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const formattedDate = now.toLocaleDateString('fr-FR', dateOptions);
    const formattedTime = now.toLocaleTimeString('fr-FR', timeOptions);
    
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        // Mettre la première lettre du jour en majuscule
        const dateCapitalized = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        dateElement.textContent = `Nous sommes le ${dateCapitalized}, il est ${formattedTime}`;
    }
}

// Mettre à jour immédiatement au chargement
updateDateTime();

// Mettre à jour toutes les secondes
setInterval(updateDateTime, 1000);


// =============================================================================
// CHRONOMÈTRE
// =============================================================================

let time = 0;
let timerInterval = null;
let isPaused = false;

// Formater le temps en HH:MM:SS
function formatTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

// Démarrer le chronomètre
function startChronometer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(() => {
        time++;
        const timeElement = document.getElementById('time');
        if (timeElement) {
            timeElement.textContent = formatTime(time);
        }
    }, 1000);
}

// Réinitialiser le chronomètre
function resetChronometer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    time = 0;
    isPaused = false;
    
    const timeElement = document.getElementById('time');
    const pauseButton = document.getElementById('pauseChronometer');
    
    if (timeElement) {
        timeElement.textContent = formatTime(time);
    }
    if (pauseButton) {
        pauseButton.textContent = '⏸️ Pause';
    }
    
    startChronometer();
}

// Mettre en pause / Reprendre le chronomètre
function togglePause() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById('pauseChronometer');
    
    if (isPaused) {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (pauseButton) {
            pauseButton.textContent = '▶️ Reprendre';
        }
    } else {
        startChronometer();
        if (pauseButton) {
            pauseButton.textContent = '⏸️ Pause';
        }
    }
}

// Initialiser le chronomètre au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    startChronometer();
    
    const resetButton = document.getElementById('resetChronometer');
    const pauseButton = document.getElementById('pauseChronometer');
    
    if (resetButton) {
        resetButton.addEventListener('click', resetChronometer);
    }
    
    if (pauseButton) {
        pauseButton.addEventListener('click', togglePause);
    }
});


// =============================================================================
// CITATIONS
// =============================================================================

const quotes = [
    '"La seule façon de faire du bon travail est d\'aimer ce que vous faites." - Steve Jobs',
    '"L\'innovation distingue un leader d\'un suiveur." - Steve Jobs',
    '"Le succès n\'est pas la clé du bonheur. Le bonheur est la clé du succès." - Albert Schweitzer',
    '"La vie est 10% ce qui vous arrive et 90% comment vous y réagissez." - Charles R. Swindoll',
    '"Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant." - Proverbe chinois',
    '"N\'abandonnez jamais un rêve juste à cause du temps qu\'il faudra pour l\'accomplir. Le temps passera de toute façon." - Earl Nightingale',
    '"Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement." - Martin Luther King Jr.'
];

// Changer la citation affichée
const changeQuoteButton = document.getElementById('changeQuote');
if (changeQuoteButton) {
    changeQuoteButton.addEventListener('click', function() {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const quoteElement = document.getElementById('quote');
        if (quoteElement) {
            quoteElement.textContent = randomQuote;
        }
    });
}


// =============================================================================
// STATISTIQUES DE VISITE
// =============================================================================

// Compteur de visites (sauvegardé dans le navigateur)
let visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
localStorage.setItem('visitCount', visitCount);

const visitCountElement = document.getElementById('visitCount');
if (visitCountElement) {
    visitCountElement.textContent = visitCount;
}

// Temps passé sur le site
let timeOnSite = 0;
setInterval(() => {
    timeOnSite++;
    const timeOnSiteElement = document.getElementById('timeOnSite');
    if (timeOnSiteElement) {
        // Afficher en secondes si < 60s, sinon en minutes
        if (timeOnSite < 60) {
            timeOnSiteElement.textContent = timeOnSite + 's';
        } else {
            const minutes = Math.floor(timeOnSite / 60);
            const seconds = timeOnSite % 60;
            timeOnSiteElement.textContent = `${minutes}m ${seconds}s`;
        }
    }
}, 1000);

// Compteur de clics
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    const clicksElement = document.getElementById('clicks');
    if (clicksElement) {
        clicksElement.textContent = clickCount;
    }
});
