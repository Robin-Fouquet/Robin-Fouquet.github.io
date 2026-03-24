// Activer/Désactiver le mode sombre
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
