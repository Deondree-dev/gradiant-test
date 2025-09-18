(function() {
    console.log('[Spotify Gradient] Injector running...');

    const gradient = `linear-gradient(270deg, #ff4e50, #f9d423, #24c6dc, #5433ff, #20bdff, #a8ff78)`;
    const animationDuration = 12; // seconds

    // Inject animation keyframes if not already present
    if (!document.getElementById('spotify-gradient-anim')) {
        const style = document.createElement('style');
        style.id = 'spotify-gradient-anim';
        style.textContent = `
            @keyframes spotifyGradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }

    // Function to apply gradient to an element
    function applyGradient(el) {
        if (!el) return;
        el.style.background = gradient;
        el.style.backgroundSize = '400% 400%';
        el.style.animation = `spotifyGradientAnimation ${animationDuration}s ease infinite`;
        el.style.transition = 'all 0.5s ease';
        el.style.color = '#fff';
        el.style.backdropFilter = 'blur(6px)'; // optional blur for sleek look
    }

    // === Apply to existing elements ===
    document.querySelectorAll('div[data-right-sidebar-hidden], .f9pLH3HRZQxdDLzNqKjE')
            .forEach(el => applyGradient(el));

    // === Observe future elements ===
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Apply to matches
                    if (node.matches?.('div[data-right-sidebar-hidden], .f9pLH3HRZQxdDLzNqKjE')) {
                        applyGradient(node);
                    }

                    // Check descendants
                    node.querySelectorAll?.('div[data-right-sidebar-hidden], .f9pLH3HRZQxdDLzNqKjE')
                        .forEach(el => applyGradient(el));
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log('[Spotify Gradient] Observer active for sidebar and class f9pLH3HRZQxdDLzNqKjE');
})();
