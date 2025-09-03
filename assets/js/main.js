// === COACH PERSO - JAVASCRIPT ULTRA-MODERNE ===

class CoachPersoApp {
  constructor() {
    this.init();
    this.setupAnimations();
    this.setupInteractions();
    this.setupCounters();
    this.setupMobileMenu();
    this.setupResponsiveFeatures();
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

  setupMobileMenu() {
    // Créer le bouton hamburger s'il n'existe pas
    const nav = document.querySelector(".nav-ultra");
    if (nav && !document.querySelector(".nav-toggle")) {
      const navContainer = nav.querySelector(".container-ultra");
      const flexContainer = navContainer.querySelector(".flex");

      // Créer le bouton hamburger
      const toggleButton = document.createElement("button");
      toggleButton.className = "nav-toggle";
      toggleButton.setAttribute("aria-label", "Menu de navigation");
      toggleButton.innerHTML = "<span></span><span></span><span></span>";

      // Insérer le bouton dans le flex container
      flexContainer.appendChild(toggleButton);

      // Référence au menu de navigation (le dernier div avec les liens)
      const navMenu = flexContainer.querySelector("div:nth-child(2)"); // Le div avec les liens

      // Ajouter les styles CSS inline pour être sûr qu'ils s'appliquent
      this.addInlineMenuStyles();

      // Gérer les clics sur le bouton
      toggleButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Toggle des classes
        toggleButton.classList.toggle("active");
        navMenu.classList.toggle("nav-menu-active");
        document.body.classList.toggle("nav-open");

        console.log(
          "Menu toggle clicked",
          navMenu.classList.contains("nav-menu-active")
        );
      });

      // Fermer le menu quand on clique sur un lien
      const navLinks = navMenu.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          toggleButton.classList.remove("active");
          navMenu.classList.remove("nav-menu-active");
          document.body.classList.remove("nav-open");
        });
      });

      // Fermer le menu lors du redimensionnement
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          toggleButton.classList.remove("active");
          navMenu.classList.remove("nav-menu-active");
          document.body.classList.remove("nav-open");
        }
      });
    }
  }

  setupResponsiveFeatures() {
    // Optimisation du scroll pour mobile
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const nav = document.querySelector(".nav-ultra");
          if (nav) {
            if (window.scrollY > 100) {
              nav.style.background = "rgba(10, 10, 10, 0.95)";
            } else {
              nav.style.background = "rgba(10, 10, 10, 0.9)";
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Touch gestures pour mobile
    this.setupTouchGestures();
  }

  addInlineMenuStyles() {
    if (document.querySelector("#simple-mobile-menu-styles")) return;

    const styles = document.createElement("style");
    styles.id = "simple-mobile-menu-styles";
    styles.textContent = `
      /* Bouton hamburger simple */
      .nav-toggle {
        display: none;
        flex-direction: column;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 8px;
        gap: 4px;
        z-index: 1001;
        position: relative;
      }

      .nav-toggle span {
        width: 25px;
        height: 3px;
        background: white;
        border-radius: 2px;
        transition: all 0.3s ease;
        display: block;
      }

      .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }

      /* Afficher le bouton sur mobile */
      @media (max-width: 768px) {
        .nav-toggle {
          display: flex !important;
        }

        /* Cacher le menu par défaut et le transformer en overlay */
        .nav-ultra .container-ultra .flex > div:nth-child(2) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(20px);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          transform: translateX(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .nav-ultra .container-ultra .flex > div:nth-child(2).nav-menu-active {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
        }

        /* Style des liens dans le menu mobile */
        .nav-ultra .container-ultra .flex > div:nth-child(2) .nav-link {
          width: 100%;
          max-width: 300px;
          text-align: center;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          margin: 0.5rem 0;
          font-size: 1.1rem;
          color: white;
          text-decoration: none;
        }

        .nav-ultra .container-ultra .flex > div:nth-child(2) .btn-electric {
          width: 100%;
          max-width: 300px;
          margin-top: 1rem;
        }
      }

      /* Empêcher le scroll quand le menu est ouvert */
      body.nav-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
      }
    `;

    document.head.appendChild(styles);
  }

  setupResponsiveFeatures() {
    // Gestion responsive de la navigation
    const handleResize = () => {
      const navToggle = document.querySelector(".nav-toggle");
      const navMenu = document.querySelector(".nav-menu");

      if (window.innerWidth > 768) {
        // Réinitialiser pour desktop
        navToggle?.classList.remove("active");
        navMenu?.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    };

    window.addEventListener("resize", handleResize);

    // Optimisation du scroll pour mobile
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const nav = document.querySelector(".nav-ultra");
          if (nav) {
            if (window.scrollY > 100) {
              nav.style.background = "rgba(10, 10, 10, 0.95)";
            } else {
              nav.style.background = "rgba(10, 10, 10, 0.9)";
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Touch gestures pour mobile
    this.setupTouchGestures();
  }

  setupTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Swipe horizontal détecté
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          const navMenu = document.querySelector(".nav-menu");
          const navToggle = document.querySelector(".nav-toggle");

          if (deltaX > 0 && navMenu?.classList.contains("active")) {
            // Swipe right - fermer le menu
            navToggle?.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("nav-open");
          }
        }
      },
      { passive: true }
    );
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

// Service Worker désactivé pour le développement local
// Sera réactivé en production avec HTTPS
if ("serviceWorker" in navigator && location.protocol === "https:") {
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
