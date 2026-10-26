document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

  // Intersection observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, section').forEach(el => {
    observer.observe(el);
  });

  // Add fade-in animation to cards
  const style = document.createElement('style');
  style.textContent = `
    .feature-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});