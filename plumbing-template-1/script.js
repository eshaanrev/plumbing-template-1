(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealables.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main section[id]")
  );
  var navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : [];

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            if (link.getAttribute("href") === "#" + id) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  var heroMedia = document.getElementById("heroMedia");
  var heroGlow = document.getElementById("heroGlow");
  var heroGlowCool = document.getElementById("heroGlowCool");
  var ticking = false;

  function onScroll() {
    if (header) {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    }

    if (!reduceMotion) {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        if (heroMedia) {
          heroMedia.style.transform = "translate3d(0," + y * -0.045 + "px,0)";
        }
        if (heroGlow) {
          heroGlow.style.transform = "translate3d(0," + y * 0.09 + "px,0)";
        }
        if (heroGlowCool) {
          heroGlowCool.style.transform = "translate3d(0," + y * 0.05 + "px,0)";
        }
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  onScroll();

  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var required = form.querySelectorAll("[required]");
      var firstInvalid = null;

      for (var i = 0; i < required.length; i++) {
        if (!required[i].checkValidity()) {
          firstInvalid = required[i];
          break;
        }
      }

      if (firstInvalid) {
        note.style.color = "#b56a2c";
        note.textContent = "Please fill in the required fields so we can reach you.";
        firstInvalid.focus();
        return;
      }

      note.style.color = "";
      note.textContent = "Thanks — your request was received. We'll be in touch shortly.";
      form.reset();
    });
  }
})();
