(function() {
    console.log("Gradient Stars Script Loaded!");

    // === STYLE INJECTION ===
    const style = document.createElement('style');
    style.innerHTML = `
        /* Gradient background */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,50,0.8));
            pointer-events: none;
            z-index: 0;
        }

        /* Star styling */
        .star {
            position: fixed;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: 0.8;
            z-index: 1;
        }

        /* Shooting star */
        .shooting-star {
            position: fixed;
            width: 2px;
            height: 80px;
            background: linear-gradient(to bottom, white, transparent);
            opacity: 0.9;
            z-index: 2;
            transform: rotate(-45deg);
        }

        /* Adjust target element opacity */
        .POZtIm1wHFiwlxZY5i0a {
            opacity: 0.8 !important;
        }
    `;
    document.head.appendChild(style);

    // === STAR GENERATION ===
    function spawnStars(count) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = Math.random() * window.innerHeight + 'px';
            star.style.left = Math.random() * window.innerWidth + 'px';
            document.body.appendChild(star);
        }
    }

    // === SHOOTING STAR GENERATION ===
    function spawnShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = Math.random() * window.innerHeight + 'px';
        shootingStar.style.left = Math.random() * window.innerWidth + 'px';
        document.body.appendChild(shootingStar);

        setTimeout(() => shootingStar.remove(), 2000);
    }

    // === INIT ===
    spawnStars(100); // Adjust density as needed
    setInterval(spawnShootingStar, 5000); // Shooting star every 5 seconds
})();
