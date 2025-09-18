console.log('[Spotify Gradient] Injecting gradient theme...');

// === CONFIG ===
const gradientColors = [
  "#ff4e50", // Red
  "#f9d423", // Yellow
  "#24c6dc", // Cyan
  "#5433ff", // Indigo
  "#20bdff", // Blue
  "#a8ff78"  // Lime
];

const animationDuration = 12; // seconds per cycle

// === CREATE GLOBAL GRADIENT BACKDROP ===
function createGradientBackground() {
    const gradientDiv = document.createElement('div');
    gradientDiv.id = 'spotify-global-gradient';
    gradientDiv.style.position = 'fixed';
    gradientDiv.style.top = '0';
    gradientDiv.style.left = '0';
    gradientDiv.style.width = '100%';
    gradientDiv.style.height = '100%';
    gradientDiv.style.zIndex = '-1';
    gradientDiv.style.background = `linear-gradient(270deg, ${gradientColors.join(', ')})`;
    gradientDiv.style.backgroundSize = '1200% 1200%';
    gradientDiv.style.animation = `spotifyGradientAnimation ${animationDuration}s ease infinite`;
    document.body.appendChild(gradientDiv);

    // Inject animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spotifyGradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
}

// === APPLY GRADIENT TO EACH CHILD ELEMENT ===
function applyGradientToElement(el) {
    if (!el || el.id === 'spotify-global-gradient') return;

    el.style.background = 'transparent'; // Let the global gradient shine through
    el.style.transition = 'background 0.5s ease, color 0.5s ease';
    el.style.color = '#fff'; // White text looks clean on dark gradients

    // Optional: Make containers slightly transparent
    if (el.tagName === 'DIV' || el.tagName === 'SECTION') {
        el.style.backgroundColor = 'rgba(0,0,0,0.3)';
    }
}

// === INITIAL PASS ===
function initialSweep() {
    document.body.querySelectorAll('*').forEach(el => applyGradientToElement(el));
}

// === OBSERVE DOM CHANGES ===
const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                applyGradientToElement(node);
                node.querySelectorAll('*').forEach(child => applyGradientToElement(child));
            }
        }
    }
});

// === START ===
createGradientBackground();
initialSweep();
observer.observe(document.body, { childList: true, subtree: true });

console.log('[Spotify Gradient] Active and watching for changes...');
