console.log('[Spotify Gradient] Watching for right sidebar...');

// === CONFIG ===
const gradient = `linear-gradient(270deg, #ff4e50, #f9d423, #24c6dc, #5433ff, #20bdff, #a8ff78)`;

// Function to apply custom style to the right sidebar
function styleRightSidebar(el) {
    if (!el) return;
    console.log('[Spotify Gradient] Styling right sidebar:', el);

    el.style.background = gradient;
    el.style.backgroundSize = '400% 400%';
    el.style.animation = 'spotifySidebarGradient 12s ease infinite';
    el.style.transition = 'all 0.5s ease';

    // Inject animation keyframes if not already present
    if (!document.getElementById('spotify-gradient-anim')) {
        const style = document.createElement('style');
        style.id = 'spotify-gradient-anim';
        style.textContent = `
          @keyframes spotifySidebarGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
        document.head.appendChild(style);
    }
}

// === INITIAL CHECK ===
function findRightSidebar() {
    return document.querySelector('div[data-right-sidebar-hidden]');
}

const initialSidebar = findRightSidebar();
if (initialSidebar) styleRightSidebar(initialSidebar);

// === OBSERVER TO WATCH FOR IT ===
const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // Direct match
                if (node.matches?.('div[data-right-sidebar-hidden]')) {
                    styleRightSidebar(node);
                }

                // Or check its children
                const child = node.querySelector?.('div[data-right-sidebar-hidden]');
                if (child) styleRightSidebar(child);
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

console.log('[Spotify Gradient] Observer running...');
