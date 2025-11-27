/* ============================================================
   HEADER – CINEMATIC (shrink + mobile toggle)
============================================================ */
const header = document.querySelector(".header-cinematic");
const toggleBtn = document.querySelector(".cinematic-toggle");
const menu = document.querySelector(".nav-cinematic");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("open");
    menu.classList.toggle("open");
  });
}

/* ============================================================
   FOOTER – Año dinámico
============================================================ */
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ============================================================
   HERO – CROSSFADE DE FONDO
============================================================ */
const heroImages = [
  "img/hero1.jpg",
  "img/hero7.jpg",
  "img/hero4.jpg",
  "img/hero5.jpg",
  "img/hero6.jpg",
];

let heroIndex = 0;

const heroBG = document.querySelector(".hero-bg");
const heroBGNext = document.querySelector(".hero-bg-next");

if (heroBG && heroBGNext) {
  heroBG.style.backgroundImage = `url(${heroImages[0]})`;

  function fadeHero() {
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroBGNext.style.backgroundImage = `url(${heroImages[heroIndex]})`;
    heroBGNext.style.opacity = 1;

    setTimeout(() => {
      heroBG.style.backgroundImage = `url(${heroImages[heroIndex]})`;
      heroBGNext.style.opacity = 0;
    }, 1500);
  }

  setInterval(fadeHero, 6000);
}

/* ============================================================
   SCROLL REVEAL – TÍTULOS (catalogo-title-wipe)
============================================================ */
const wipeTitles = document.querySelectorAll(".catalogo-title-wipe");

const wipeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

wipeTitles.forEach((t) => wipeObserver.observe(t));

/* ============================================================
   SCROLL REVEAL – CATÁLOGO: CARDS
============================================================ */
const catalogCards = document.querySelectorAll(".catalogo-card");

const catalogObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

catalogCards.forEach((card) => catalogObserver.observe(card));

/* ============================================================
   EFECTO HOVER – Glow dinámico (catalogo-card)
============================================================ */
document.querySelectorAll(".catalogo-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});

/* ============================================================
   EDITORIAL BLOCKS – Fade + Scroll Reveal + Parallax + Tilt
============================================================ */
const editorialBlocks = document.querySelectorAll(".editorial-block");
const editorialImgs = document.querySelectorAll(".editorial-img");

const editorialObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

editorialBlocks.forEach((b) => editorialObserver.observe(b));

/* --- Parallax suave --- */
function updateParallax() {
  editorialImgs.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const pct = rect.top / window.innerHeight;
    img.style.transform = `translateY(${pct * -15}px) scale(1)`;
  });
}

window.addEventListener("scroll", updateParallax);
window.addEventListener("resize", updateParallax);

/* --- Tilt 3D --- */
editorialImgs.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    const r = img.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    img.style.transform = `
      scale(1.03)
      rotateX(${y * 8}deg)
      rotateY(${x * -8}deg)
    `;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});

/* --- Glow follow --- */
document.querySelectorAll(".editorial-img-wrapper").forEach((wrap) => {
  const highlight = wrap.querySelector(".editorial-highlight");
  if (!highlight) return;

  wrap.addEventListener("mousemove", (e) => {
    const r = wrap.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    highlight.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 70%)
    `;
  });
});

/* ============================================================
   DIVIDER – Fade + Parallax
============================================================ */
const dividerBlock = document.querySelector(".divider-photo");
const dividerImg = document.querySelector(".divider-img");

if (dividerBlock && dividerImg) {
  const divObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) dividerBlock.classList.add("visible");
      });
    },
    { threshold: 0.25 }
  );

  divObs.observe(dividerBlock);

  window.addEventListener("scroll", () => {
    const rect = dividerImg.getBoundingClientRect();
    const pct = rect.top / window.innerHeight;
    dividerImg.style.transform = `translateY(${pct * -8}px)`;
  });
}

/* ============================================================
   CONTACTO – Envío Web3Forms
============================================================ */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    formData.set("access_key", "3d1c542f-4c1c-4f83-a43e-066571169d61");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    const success = document.getElementById("contactSuccess");

    if (result.success && success) {
      success.style.opacity = 1;

      setTimeout(() => {
        success.style.opacity = 0;
        contactForm.reset();
      }, 2500);
    } else {
      alert("Error al enviar el formulario.");
    }
  });
}

/* ============================================================
   REDES – Reveal + Glow dinámico + Tema de fondo
============================================================ */
const socialTitle = document.querySelector(".social-title");
const socialSpans = socialTitle?.querySelectorAll("span");
const socialCards = document.querySelectorAll(".social-card");
const socialSection = document.querySelector(".social-section");

/* Reveal del título */
if (socialTitle && socialSpans) {
  const redesObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          socialSpans.forEach((s, i) => {
            s.style.animation = `splitFadeHero 0.9s ease forwards`;
            s.style.animationDelay = `${0.15 + i * 0.25}s`;
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  redesObs.observe(socialTitle);
}

/* Cards reveal + glow + theme */
const socialCardObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

socialCards.forEach((card) => {
  socialCardObs.observe(card);

  /* Glow follow */
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--sx", e.clientX - r.left + "px");
    card.style.setProperty("--sy", e.clientY - r.top + "px");
  });

  /* Theme change */
  card.addEventListener("mouseenter", () => {
    const theme = card.getAttribute("data-theme");
    if (theme) socialSection.setAttribute("data-theme", theme);
  });

  card.addEventListener("mouseleave", () => {
    socialSection.removeAttribute("data-theme");
  });
});

/* ============================================================
   EXPERIENCIA – CARRUSEL DRAG
============================================================ */
const expCarousel = document.querySelector(".exp-carousel");

if (expCarousel) {
  let isDown = false;
  let startX;
  let scrollLeft;

  expCarousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - expCarousel.offsetLeft;
    scrollLeft = expCarousel.scrollLeft;
  });

  expCarousel.addEventListener("mouseleave", () => (isDown = false));
  expCarousel.addEventListener("mouseup", () => (isDown = false));

  expCarousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX - expCarousel.offsetLeft;
    const walk = (x - startX) * 1.2;
    expCarousel.scrollLeft = scrollLeft - walk;
  });
}

/* ============================================================
   LOGOS – DETECCIÓN AUTOMÁTICA DE LOGOS OSCUROS
============================================================ */
document.querySelectorAll(".exp-logos-grid img").forEach((img) => {
  const test = new Image();
  test.crossOrigin = "Anonymous";
  test.src = img.src;

  test.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = test.width;
    canvas.height = test.height;

    ctx.drawImage(test, 0, 0);

    const data = ctx.getImageData(0, 0, test.width, test.height).data;

    let sum = 0;
    let total = 0;

    for (let i = 0; i < data.length; i += 4) {
      sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      total++;
    }

    const avg = sum / total;

    if (avg < 130) img.classList.add("logo-dark");
  };
});



/* ---- LOGOS SCROLL REVEAL ---- */

const logos = document.querySelectorAll('.exp-logos-grid img');

const logoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

logos.forEach(logo => logoObserver.observe(logo));



/* LOOKBOOK – Scroll Reveal */
const lookItems = document.querySelectorAll(".exp-lookbook-item");

const lookObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.2 });

lookItems.forEach((i) => lookObs.observe(i));



// Masonry animation on scroll
const masonryItems = document.querySelectorAll(".masonry-item");

const obsMasonry = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.15 });

masonryItems.forEach(item => obsMasonry.observe(item));
