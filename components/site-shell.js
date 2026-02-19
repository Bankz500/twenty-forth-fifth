// Suppress harmless Google API callback errors (from Firebase Analytics)
(function() {
  if (typeof window === 'undefined') return;
  
  window.addEventListener('error', function(e) {
    // Suppress Google API callback errors that are harmless
    if (e.message && (
      e.message.includes('u[v] is not a function') ||
      e.message.includes('__iframefcb') ||
      e.message.includes('api.js?onload') ||
      (e.filename && e.filename.includes('api.js') && e.filename.includes('onload'))
    )) {
      e.preventDefault();
      e.stopPropagation();
      return true;
    }
  }, true);
  
  // Also catch unhandled promise rejections from Google APIs
  window.addEventListener('unhandledrejection', function(e) {
    const reason = e.reason?.message || String(e.reason || '');
    if (reason.includes('__iframefcb') || reason.includes('api.js')) {
      e.preventDefault();
      return true;
    }
  });
})();

async function includeFragments() {
  const nodes = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    nodes.map(async (node) => {
      const url = node.getAttribute("data-include");
      if (!url) return;
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) {
        node.innerHTML = "";
        return;
      }
      node.innerHTML = await res.text();
    })
  );

  // Let pages hook into "includes finished" timing (e.g., auth button wiring, hash navigation)
  window.dispatchEvent(new CustomEvent("site:fragments-loaded"));
}

function initMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("mobile-menu-button");
  const closeBtn = document.getElementById("close-menu");

  if (!menu || !overlay || !openBtn || !closeBtn) return;

  const open = () => {
    menu.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    menu.classList.add("translate-x-full");
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Close after clicking a link in the drawer
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

function markActiveNav() {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("a[data-nav]").forEach((a) => {
    const target = (a.getAttribute("href") || "").split("#")[0].split("/").pop()?.toLowerCase();
    if (!target) return;
    if (target === here) {
      a.classList.add("bg-blue-100");
    }
  });
}

function initButtonLoadingStates() {
  // Apply only on public pages that use this shell
  const actionSelectors = [
    "button[type='submit']",
    "button[data-loading]",
    "a.btn-blue",
    "button.btn-blue",
  ];

  const buttons = document.querySelectorAll(actionSelectors.join(","));

  buttons.forEach((btn) => {
    // Opt‑out hook for any element that should not get a loading state
    if (btn.dataset.noLoading === "true") return;
    if (btn.dataset.loadingBound === "true") return;

    btn.dataset.loadingBound = "true";

    btn.addEventListener("click", (event) => {
      // Respect modified clicks on links (open in new tab, etc.)
      if (btn.tagName === "A" && (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)) {
        return;
      }

      // If the element is already in a loading state, do nothing
      if (btn.dataset.loading === "true") return;

      const originalHtml = btn.innerHTML;
      btn.dataset.originalHtml = originalHtml;
      btn.dataset.loading = "true";

      // Visual loading state
      btn.classList.add("btn-loading");
      btn.innerHTML = `
        <span class="btn-loading-spinner" aria-hidden="true"></span>
        <span class="btn-loading-label">${btn.getAttribute("data-loading-label") || "Processing..."}</span>
      `;

      // Disable further interaction while loading
      if (btn.tagName === "BUTTON") {
        btn.disabled = true;
      } else if (btn.tagName === "A") {
        btn.setAttribute("aria-disabled", "true");
        btn.style.pointerEvents = "none";
      }

      // Let page‑specific JS reset the button when work is done by
      // clearing the data-loading attribute and restoring innerHTML.
      btn.addEventListener(
        "site:button-reset",
        () => {
          if (!btn.dataset.originalHtml) return;
          btn.innerHTML = btn.dataset.originalHtml;
          btn.classList.remove("btn-loading");
          btn.dataset.loading = "false";
          if (btn.tagName === "BUTTON") {
            btn.disabled = false;
          } else if (btn.tagName === "A") {
            btn.removeAttribute("aria-disabled");
            btn.style.pointerEvents = "";
          }
        },
        { once: true }
      );
    });
  });
}

function preventPageDrag() {
  // Prevent page dragging on mobile while allowing vertical scrolling
  let touchStartX = 0;
  let touchStartY = 0;
  let isScrolling = false;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isScrolling = false;
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = Math.abs(touchX - touchStartX);
    const deltaY = Math.abs(touchY - touchStartY);
    
    // If user is scrolling vertically, allow it
    if (deltaY > deltaX && deltaY > 10) {
      isScrolling = true;
      return;
    }
    
    // Prevent horizontal dragging
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      return;
    }
    
    // Prevent pull-to-refresh at top
    if (window.scrollY === 0 && touchY > touchStartY && !isScrolling) {
      e.preventDefault();
      return;
    }
    
    // Prevent overscroll at bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && touchY < touchStartY && !isScrolling) {
      e.preventDefault();
    }
  }, { passive: false });
}

async function boot() {
  await includeFragments();
  initMobileMenu();
  markActiveNav();
  initButtonLoadingStates();
  preventPageDrag();
}

document.addEventListener("DOMContentLoaded", boot);


