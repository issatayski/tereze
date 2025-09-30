
// Mobile menu toggle
const burger = document.getElementById('burger');
const mobilePanel = document.getElementById('mobilePanel');
if (burger){
  burger.addEventListener('click', () => {
    const open = mobilePanel.getAttribute('data-open') === '1';
    mobilePanel.style.display = open ? 'none' : 'block';
    mobilePanel.setAttribute('data-open', open ? '0' : '1');
  });
}

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
      if (mobilePanel) { mobilePanel.style.display = 'none'; mobilePanel.setAttribute('data-open','0'); }
    }
  });
});

// Simple slider
function Slider(root){
  const track = root.querySelector('.slider-track');
  const slides = Array.from(root.querySelectorAll('.slide'));
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  let idx = 0;
  function go(i){
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-idx * 100}%)`;
  }
  prev?.addEventListener('click', () => go(idx-1));
  next?.addEventListener('click', () => go(idx+1));
  // Auto-play
  setInterval(() => go(idx+1), 6000);
}
document.querySelectorAll('.slider').forEach(Slider);

// Fake quote form submit
const form = document.getElementById('quoteForm');
if (form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    alert(`Спасибо! Мы свяжемся с вами.\nИмя: ${data.name}\nТелефон: ${data.phone}`);
    form.reset();
  });
}

// WhatsApp fast contact
document.querySelectorAll('[data-whats]').forEach(btn => {
  btn.addEventListener('click', () => {
    const phone = btn.getAttribute('data-whats');
    const msg = encodeURIComponent('Здравствуйте! Нужен замер/расчёт по окнам и дверям.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  });
});
