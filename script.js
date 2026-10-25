/* ==========================================================================
   Aariv Patel Personal Site // Interactive Drafting Table Controls
   Features:
   - Blueprint X/Y coordinate readout
   - Dark Draft / Daylight Paper theme persistence + 't' shortcut
   - Project category filtering + 'f' shortcut
   - Section jump shortcuts ('1', '2', '3', '4')
   - Interactive 16-beat Tintal tabla cycle stepper + 'm' shortcut
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY_THEME = "aariv_personal_theme_v1";
  var htmlEl = document.documentElement;
  var themeToggleBtn = document.getElementById("theme-toggle");
  var themeLabel = document.getElementById("theme-label");
  var coordX = document.getElementById("coord-x");
  var coordY = document.getElementById("coord-y");
  var filterChips = Array.prototype.slice.call(document.querySelectorAll(".filter-chip"));
  var projectCards = Array.prototype.slice.call(document.querySelectorAll(".project-card"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var matraEls = Array.prototype.slice.call(document.querySelectorAll(".matra"));
  var talaStepBtn = document.getElementById("tala-step-btn");
  var talaReadout = document.getElementById("tala-readout");

  var activeFilterIndex = 0;
  var filterOrder = ["all", "devtools", "webos", "games"];
  var currentMatra = 0;

  // 1. Theme initialization and toggle
  function applyTheme(theme) {
    var mode = theme === "light" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", mode);
    if (themeLabel) {
      themeLabel.textContent = mode === "light" ? "DAYLIGHT PAPER" : "DARK DRAFT";
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, mode);
    } catch (e) {
      // Ignore storage errors in private browsing
    }
  }

  function toggleTheme() {
    var current = htmlEl.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  try {
    var savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (savedTheme === "light" || savedTheme === "dark") {
      applyTheme(savedTheme);
    }
  } catch (e) {
    applyTheme("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // 2. Blueprint coordinate tracking
  function padCoord(n) {
    var clamped = Math.max(0, Math.min(9999, Math.round(n)));
    return String(clamped).padStart(4, "0");
  }

  window.addEventListener(
    "mousemove",
    function (e) {
      if (coordX && coordY) {
        coordX.textContent = padCoord(e.clientX);
        coordY.textContent = padCoord(e.clientY + window.scrollY);
      }
    },
    { passive: true }
  );

  // 3. Project category filter
  function applyFilter(category) {
    var idx = filterOrder.indexOf(category);
    if (idx !== -1) {
      activeFilterIndex = idx;
    }

    filterChips.forEach(function (chip) {
      var isMatch = chip.getAttribute("data-filter") === category;
      chip.classList.toggle("active", isMatch);
      chip.setAttribute("aria-pressed", isMatch ? "true" : "false");
    });

    projectCards.forEach(function (card) {
      var cardCat = card.getAttribute("data-category");
      var visible = category === "all" || cardCat === category;
      if (visible) {
        card.removeAttribute("hidden");
      } else {
        card.setAttribute("hidden", "hidden");
      }
    });
  }

  filterChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var cat = chip.getAttribute("data-filter") || "all";
      applyFilter(cat);
    });
  });

  // 4. Tintal 16-beat tabla cycle stepper
  function setMatra(index) {
    if (!matraEls.length) return;
    currentMatra = (index + matraEls.length) % matraEls.length;
    matraEls.forEach(function (el, i) {
      el.classList.toggle("active", i === currentMatra);
    });
    var activeEl = matraEls[currentMatra];
    var bol = activeEl.getAttribute("data-bol") || "Dha";
    var vibhag = activeEl.getAttribute("data-vibhag") || "X";
    var numStr = String(currentMatra + 1).padStart(2, "0");
    if (talaReadout) {
      talaReadout.textContent =
        "Matra " + numStr + " / 16 // Bol: " + bol + " // Vibhag: " + vibhag;
    }
  }

  if (talaStepBtn) {
    talaStepBtn.addEventListener("click", function () {
      setMatra(currentMatra + 1);
    });
  }

  matraEls.forEach(function (el, idx) {
    el.addEventListener("click", function () {
      setMatra(idx);
    });
  });

  // 5. Scroll spy for section navigation
  var sectionIds = ["about", "projects", "craft", "colophon"];
  function updateActiveNav() {
    var scrollPos = window.scrollY + 180;
    var currentSection = "about";
    sectionIds.forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec && sec.offsetTop <= scrollPos) {
        currentSection = id;
      }
    });
    navLinks.forEach(function (link) {
      var isCurrent = link.getAttribute("data-section") === currentSection;
      link.classList.toggle("active", isCurrent);
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // 6. Keyboard shortcuts (1-4 section jump, t theme toggle, f filter cycle, m matra step)
  window.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) {
      return;
    }

    var key = e.key.toLowerCase();
    if (key === "t") {
      e.preventDefault();
      toggleTheme();
    } else if (key === "f") {
      e.preventDefault();
      var nextFilter = filterOrder[(activeFilterIndex + 1) % filterOrder.length];
      applyFilter(nextFilter);
    } else if (key === "m") {
      e.preventDefault();
      setMatra(currentMatra + 1);
    } else if (key >= "1" && key <= "4") {
      e.preventDefault();
      var targetId = sectionIds[parseInt(key, 10) - 1];
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
})();
