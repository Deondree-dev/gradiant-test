javascript:(function() {
  console.log('[Spotify Starfield] Starting...');

  // === Utility Functions ===
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // === Settings ===
  const STAR_COUNT = 150;          // number of static stars
  const SHOOTING_STAR_COUNT = 3;   // how many shooting stars at once
  const STAR_COLOR = '#fff';       // star color
  const STAR_SPEED = 0.05;         // drift speed for static stars
  const SHOOTING_SPEED = 5;        // speed of shooting stars
  const GRADIENT_TOP_COLOR = 'rgba(0, 0, 0, 0.7)';   // top: black w/ 70% opacity
  const GRADIENT_BOTTOM_COLOR = 'rgba(0, 0, 155, 0.7)'; // bottom: dark blue w/ 70% opacity

  const targets = [
    '#global-nav-bar',
    '.f9pLH3HRZQxdDLzNqKjE',
    '.DLwH4stkW06ZbHFstpq0',
    'div[data-right-sidebar-hidden]'
  ];

  // === Wait for Spotify UI to load ===
  function waitForElement(els, func, timeout = 100) {
    const queries = els.map(el => document.querySelector(el));
    if (queries.every(a => a)) {
      func(queries);
    } else if (timeout > 0) {
      setTimeout(() => waitForElement(els, func, timeout - 1), 300);
    }
  }

  waitForElement(targets, (elements) => {
    console.log('[Spotify Starfield] Elements found.');

    // === Set opacity for Spotify overlay element ===
    const overlay = document.querySelector('.POZtIm1wHFiwlxZY5i0a');
    if (overlay) {
      overlay.style.opacity = '0.8';
    }

    // === Create gradient background layer ===
    let gradientOverlay = document.createElement('div');
    gradientOverlay.id = 'spotify-gradient-overlay';
    Object.assign(gradientOverlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: `linear-gradient(to bottom, ${GRADIENT_TOP_COLOR}, ${GRADIENT_BOTTOM_COLOR})`,
      pointerEvents: 'none',
      zIndex: '-2'
    });
    document.body.appendChild(gradientOverlay);

    // === Create global star canvas ===
    let canvas = document.createElement('canvas');
    canvas.id = 'spotify-starfield-canvas';
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '-3'
    });

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // === Create stars ===
    const stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        size: Math.random() < 0.5 ? 1 : 2,
        opacity: random(0.5, 1),
        driftX: random(-STAR_SPEED, STAR_SPEED),
        driftY: random(-STAR_SPEED, STAR_SPEED)
      });
    }

    // === Create shooting stars ===
    const shootingStars = [];
    function spawnShootingStar() {
      shootingStars.push({
        x: random(-200, canvas.width),
        y: random(-200, canvas.height / 2),
        length: random(80, 120),
        opacity: 1
      });
    }
    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) spawnShootingStar();

    // === Draw loop ===
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static stars
      ctx.fillStyle = STAR_COLOR;
      for (let star of stars) {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Drift
        star.x += star.driftX;
        star.y += star.driftY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      // Draw shooting stars
      ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 2;
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y + s.length);
        ctx.stroke();

        s.x += SHOOTING_SPEED;
        s.y += SHOOTING_SPEED;
        s.opacity -= 0.005;

        // Reset when done
        if (s.opacity <= 0 || s.x > canvas.width + 200 || s.y > canvas.height + 200) {
          shootingStars.splice(i, 1);
          spawnShootingStar();
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
    console.log('[Spotify Starfield] Animation running.');
  });
})();
