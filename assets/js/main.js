// === COACH PERSO - JAVASCRIPT ULTRA-MODERNE ===

class CoachPersoApp {
  constructor() {
    this.init();
    this.setupAnimations();
    this.setupInteractions();
    this.setupCounters();
  }

  init() {
    // Configuration des observateurs d'intersection pour les animations
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, this.observerOptions);

    // Initialiser les animations au chargement
    this.initScrollAnimations();
    this.initParallax();
    this.initTypewriter();
  }

  setupAnimations() {
    // Animation de fade-in au scroll
    const elementsToAnimate = document.querySelectorAll(
      ".card-ultra, .stat-item, .pricing-card, .animate-slide-up"
    );

    elementsToAnimate.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px)";
      el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      this.observer.observe(el);
    });

    // Style pour les éléments visibles
    const style = document.createElement("style");
    style.textContent = `
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
    document.head.appendChild(style);
  }

  setupInteractions() {
    // Effet de hover magnétique pour les boutons
    const buttons = document.querySelectorAll(
      ".btn-electric, .btn-neon, .btn-ghost"
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        this.createRippleEffect(e);
      });

      button.addEventListener("mousemove", (e) => {
        this.magneticEffect(e);
      });

      button.addEventListener("mouseleave", (e) => {
        e.target.style.transform = "";
      });
    });

    // Effet de glow sur les cartes
    const cards = document.querySelectorAll(".card-ultra, .pricing-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        this.addGlowEffect(card);
      });

      card.addEventListener("mouseleave", () => {
        this.removeGlowEffect(card);
      });
    });

    // Navigation fluide
    this.setupSmoothScroll();
  }

  createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

    if (!document.querySelector("#ripple-style")) {
      const style = document.createElement("style");
      style.id = "ripple-style";
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  magneticEffect(e) {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.1}px, ${
      y * 0.1
    }px) scale(1.02)`;
  }

  addGlowEffect(card) {
    card.style.boxShadow =
      "0 0 40px rgba(0, 102, 255, 0.4), 0 25px 50px rgba(0, 0, 0, 0.3)";
    card.style.borderColor = "rgba(0, 102, 255, 0.5)";
  }

  removeGlowEffect(card) {
    card.style.boxShadow = "";
    card.style.borderColor = "";
  }

  setupCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      this.observer.observe(counter);

      counter.addEventListener("transitionend", () => {
        if (counter.classList.contains("visible")) {
          this.animateCounter(counter);
        }
      });
    });
  }

  animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes("%");
    const isWeight = target.includes("kg");
    const isNumber = target.includes("/") || (!isPercentage && !isWeight);

    let finalValue;
    if (isPercentage) {
      finalValue = parseInt(target);
    } else if (isWeight) {
      finalValue = parseInt(
        target.replace("kg", "").replace("-", "").replace("+", "")
      );
    } else if (target.includes("/")) {
      return; // Skip 24/7 type
    } else {
      finalValue = parseInt(target);
    }

    let current = 0;
    const increment = finalValue / 100;

    const timer = setInterval(() => {
      current += increment;

      if (current >= finalValue) {
        current = finalValue;
        clearInterval(timer);
      }

      if (isPercentage) {
        element.textContent = Math.floor(current) + "%";
      } else if (isWeight) {
        const sign = target.includes("-")
          ? "-"
          : target.includes("+")
          ? "+"
          : "";
        element.textContent = sign + Math.floor(current) + "kg";
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  }

  initScrollAnimations() {
    // Animation du header au scroll
    const nav = document.querySelector(".nav-ultra");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        nav.style.background = "rgba(10, 10, 10, 0.95)";
        nav.style.backdropFilter = "blur(25px)";
      } else {
        nav.style.background = "rgba(10, 10, 10, 0.9)";
        nav.style.backdropFilter = "blur(20px)";
      }

      // Hide/show nav on scroll
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    });
  }

  initParallax() {
    // Effet parallax léger sur les sections
    const parallaxElements = document.querySelectorAll(".hero-ultra");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.3;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  initTypewriter() {
    // Effet de machine à écrire pour certains textes
    const typewriterElements = document.querySelectorAll("[data-typewriter]");

    typewriterElements.forEach((element) => {
      const text = element.textContent;
      element.textContent = "";

      this.observer.observe(element);

      element.addEventListener("transitionend", () => {
        if (element.classList.contains("visible")) {
          this.typeWriter(element, text);
        }
      });
    });
  }

  typeWriter(element, text, i = 0) {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      setTimeout(() => this.typeWriter(element, text, i + 1), 50);
    }
  }

  setupSmoothScroll() {
    // Navigation fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Méthodes utilitaires pour les animations
  addFloatingAnimation() {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes float-custom {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-10px) rotate(1deg); }
                66% { transform: translateY(5px) rotate(-1deg); }
            }
            
            .animate-float {
                animation: float-custom 6s ease-in-out infinite;
            }
        `;
    document.head.appendChild(style);
  }

  // Système de particules pour le background
  initParticleSystem() {
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const particles = [];

    // Redimensionner le canvas
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // Créer des particules
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animer les particules
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 102, 255, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  const app = new CoachPersoApp();

  // Ajouter le système de particules après un délai
  setTimeout(() => {
    app.initParticleSystem();
  }, 1000);

  // Ajouter des animations de floating
  app.addFloatingAnimation();
});

// Optimisation des performances
window.addEventListener("load", () => {
  // Preload des images importantes
  const imagesToPreload = [
    // Ajouter ici les URLs des images importantes
  ];

  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// Service Worker pour la mise en cache (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
