javascript:(function(){
  fetch('https://raw.githubusercontent.com/Deondree-dev/gradiant-test/main/StarField.js')
    .then(r => r.text())
    .then(code => {
      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const s = document.createElement('script');
      s.src = url;
      document.head.appendChild(s);
    })
    .catch(err => console.error('Gradient loader error:', err));
})(); 
