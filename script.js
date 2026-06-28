/* ============================================================
   Too Amazin Boutique — script.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky header on scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const body = document.body;
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Hero slider ---------- */
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dotsWrap = document.getElementById("heroDots");
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(i, manual) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("active");
    if (manual) restart();
  }
  function next() { goTo(current + 1); }
  function restart() { clearInterval(timer); timer = setInterval(next, 6000); }
  restart();

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Contact form (demo: no backend yet) ---------- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.querySelectorAll("input, select, textarea, button").forEach((el) => (el.disabled = true));
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------- Lightbox (click any photo to enlarge) ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = document.getElementById("lightboxImg");
    const lbTitle = document.getElementById("lightboxTitle");
    const lbList = document.getElementById("lightboxList");
    const lbClose = document.getElementById("lightboxClose");

    const openLightbox = (fig) => {
      const img = fig.querySelector("img");
      if (!img) return;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lbTitle.textContent = fig.dataset.title || img.alt || "";
      lbList.innerHTML = "";
      const items = (fig.dataset.items || "")
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
      items.forEach((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        lbList.appendChild(li);
      });
      lbList.style.display = items.length ? "" : "none";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("lb-open");
    };

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      body.classList.remove("lb-open");
    };

    document.querySelectorAll(".zoomable").forEach((fig) =>
      fig.addEventListener("click", () => openLightbox(fig))
    );
    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
