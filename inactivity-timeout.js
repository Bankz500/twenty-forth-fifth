// Inactivity timeout: auto-logout after 15 minutes of inactivity
// Injects a lightweight modal prompting the user to continue or logout
(function () {
    const INACTIVITY_LIMIT_MS = 15 * 60 * 1000; // 15 minutes
    const GRACE_MS = 60 * 1000; // 1 minute to respond

    let inactivityTimer = null;
    let graceTimer = null;

    function signOutAndRedirect() {
        try {
            if (window.auth && typeof window.auth.signOut === 'function') {
                // Firebase v9 signOut is imported separately; fallback if not present
                window.auth.signOut().catch(() => {});
            }
        } catch (e) {
            // ignore
        }
        try {
            if (window.firebase && window.firebase.auth && window.firebase.auth().signOut) {
                window.firebase.auth().signOut().catch(() => {});
            }
        } catch (e) {
            // ignore
        }
        try {
            // Redirect to login
            window.location.href = 'login.html';
        } catch (e) {
            // ignore
        }
    }

    function ensureModal() {
        if (document.getElementById('inactivity-timeout-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'inactivity-timeout-modal';
        modal.className = 'hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
        modal.innerHTML = "\n            <div class=\"bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 max-w-md\">\n                <h2 class=\"text-base md:text-lg font-semibold text-gray-900 mb-2\">You were inactive</h2>\n                <p class=\"text-xs md:text-sm text-gray-600 mb-4\">For your security, you'll be signed out soon due to inactivity. Do you want to continue your session?</p>\n                <div class=\"flex gap-3\">\n                    <button id=\"inactivity-continue-btn\" class=\"flex-1 bg-blue-600 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-700\">Continue session</button>\n                    <button id=\"inactivity-logout-btn\" class=\"flex-1 bg-gray-100 text-gray-800 rounded-md px-4 py-2 text-sm hover:bg-gray-200\">Log out</button>\n                </div>\n                <p id=\"inactivity-countdown\" class=\"text-[11px] text-gray-500 mt-3 text-right\"></p>\n            </div>\n        ";
        document.body.appendChild(modal);

        document.getElementById('inactivity-logout-btn').addEventListener('click', () => {
            hideModal();
            clearTimers();
            signOutAndRedirect();
        });
        document.getElementById('inactivity-continue-btn').addEventListener('click', () => {
            hideModal();
            clearTimers();
            startInactivityTimer();
        });
    }

    function showModal() {
        ensureModal();
        const modal = document.getElementById('inactivity-timeout-modal');
        if (modal) modal.classList.remove('hidden');
        startGraceCountdown();
    }

    function hideModal() {
        const modal = document.getElementById('inactivity-timeout-modal');
        if (modal) modal.classList.add('hidden');
        const countdown = document.getElementById('inactivity-countdown');
        if (countdown) countdown.textContent = '';
    }

    function startGraceCountdown() {
        const start = Date.now();
        const countdown = document.getElementById('inactivity-countdown');
        clearInterval(graceTimer);
        graceTimer = setInterval(() => {
            const remaining = Math.max(0, GRACE_MS - (Date.now() - start));
            const seconds = Math.ceil(remaining / 1000);
            if (countdown) countdown.textContent = `Auto-logout in ${seconds}s`;
            if (remaining <= 0) {
                clearInterval(graceTimer);
                signOutAndRedirect();
            }
        }, 250);
    }

    function clearTimers() {
        if (inactivityTimer) clearTimeout(inactivityTimer);
        inactivityTimer = null;
        if (graceTimer) clearInterval(graceTimer);
        graceTimer = null;
    }

    function startInactivityTimer() {
        clearTimers();
        inactivityTimer = setTimeout(() => {
            showModal();
        }, INACTIVITY_LIMIT_MS);
    }

    function onActivity() {
        // If modal is visible, ignore activity until user chooses
        const modal = document.getElementById('inactivity-timeout-modal');
        if (modal && !modal.classList.contains('hidden')) return;
        startInactivityTimer();
    }

    // Wire activity listeners
    ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'visibilitychange'].forEach(evt => {
        window.addEventListener(evt, onActivity, { passive: true });
    });

    // Kick off after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startInactivityTimer);
    } else {
        startInactivityTimer();
    }
})();


