/**
 * Twenty Third & Forth - Compliance / Account Status Modals
 * Lightweight, monochrome, Tailwind-friendly (Tailwind CDN on pages).
 */
const ROOT_ID = 'beal-compliance-modal-root';
const ACTIVE_CLASS = 'beal-modal-open';

function ensureRoot() {
  let root = document.getElementById(ROOT_ID);
  if (root) return root;

  root = document.createElement('div');
  root.id = ROOT_ID;
  document.body.appendChild(root);
  return root;
}

function lockScroll(lock) {
  try {
    if (lock) {
      document.documentElement.classList.add(ACTIVE_CLASS);
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove(ACTIVE_CLASS);
      document.body.style.overflow = '';
    }
  } catch {
    // ignore
  }
}

function modalShell({ title, subtitle, bodyHtml, primary, secondary }) {
  const primaryBtn = primary
    ? `<button id="bealModalPrimary" class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2" style="background-color: #1800ac;" onmouseover="this.style.backgroundColor='#140099'" onmouseout="this.style.backgroundColor='#1800ac'" onfocus="this.style.outlineColor='#1800ac'">${primary.label}</button>`
    : '';

  const secondaryBtn = secondary
    ? `<button id="bealModalSecondary" class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-gray-900 font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2" style="outline-color: #1800ac;">${secondary.label}</button>`
    : '';

  return `
    <div class="fixed inset-0 z-[1000]">
      <div id="bealModalBackdrop" class="absolute inset-0 backdrop-blur-[2px]" style="background-color: rgba(24, 0, 172, 0.55);"></div>
      <div class="relative min-h-full flex items-center justify-center p-4">
        <div class="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
          <div class="p-6 sm:p-7 bg-gradient-to-br from-white to-gray-50">
            <div class="flex items-start gap-4">
              <div class="shrink-0 w-11 h-11 rounded-2xl text-white flex items-center justify-center shadow" style="background-color: #1800ac;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l7 4v6c0 5-3 9-7 10C8 21 5 17 5 12V6l7-4z" stroke="currentColor" stroke-width="1.8" />
                  <path d="M9 12l2 2 4-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="min-w-0">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">${title}</h3>
                ${subtitle ? `<p class="mt-1 text-sm text-gray-600">${subtitle}</p>` : ''}
              </div>
            </div>
            <div class="mt-5 text-gray-700 text-sm leading-relaxed">
              ${bodyHtml}
            </div>
          </div>
          <div class="p-6 sm:p-7 bg-white flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            ${secondaryBtn}
            ${primaryBtn}
          </div>
        </div>
      </div>
    </div>
  `;
}

function openModal({ title, subtitle, bodyHtml, primary, secondary, closeOnBackdrop = false }) {
  const root = ensureRoot();

  return new Promise((resolve) => {
    lockScroll(true);
    root.innerHTML = modalShell({ title, subtitle, bodyHtml, primary, secondary });

    const cleanup = (result) => {
      root.innerHTML = '';
      lockScroll(false);
      resolve(result);
    };

    const backdrop = document.getElementById('bealModalBackdrop');
    const primaryBtn = document.getElementById('bealModalPrimary');
    const secondaryBtn = document.getElementById('bealModalSecondary');

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        if (closeOnBackdrop) cleanup({ action: 'backdrop' });
      });
    }

    const onKey = (e) => {
      if (e.key === 'Escape') {
        // Only close if there is a secondary action (acts like "dismiss")
        if (secondary) cleanup({ action: 'escape' });
      }
    };
    document.addEventListener('keydown', onKey, { once: true });

    if (primaryBtn && primary) {
      primaryBtn.addEventListener('click', async () => {
        try {
          await primary.onClick?.();
        } finally {
          cleanup({ action: 'primary' });
        }
      });
    }

    if (secondaryBtn && secondary) {
      secondaryBtn.addEventListener('click', async () => {
        try {
          await secondary.onClick?.();
        } finally {
          cleanup({ action: 'secondary' });
        }
      });
    }
  });
}

export function showAmlNoticeModal({ onContinue } = {}) {
  return openModal({
    title: 'AML Notice (Compliance)',
    subtitle: 'Please review before continuing.',
    bodyHtml: `
      <div class="space-y-3">
        <p>
          Twenty Third & Forth maintains a strict Anti‑Money Laundering (AML) and Counter‑Terrorist Financing (CFT) compliance program.
          We follow applicable regulations in the Cayman Islands (Camana Bay, Grand Cayman) and internationally.
        </p>
        <div class="rounded-xl border border-gray-200 bg-white p-4">
          <p class="font-semibold text-gray-900 mb-1">What this means</p>
          <ul class="list-disc pl-5 space-y-1 text-gray-700">
            <li>We may request verification and supporting documents.</li>
            <li>Transactions can be monitored and flagged for review when required.</li>
            <li>Access to certain features may be limited until verification is complete.</li>
          </ul>
        </div>
        <p class="text-xs text-gray-500">
          By continuing, you acknowledge this compliance notice.
        </p>
      </div>
    `,
    primary: {
      label: 'I Understand',
      onClick: onContinue,
    },
    secondary: {
      // Per your request: even “Cancel” continues to the next page.
      label: 'Cancel',
      onClick: onContinue,
    },
  });
}

export function showPendingApprovalModal({ onClose } = {}) {
  return openModal({
    title: 'Account Pending Approval',
    subtitle: 'Your dashboard access will be enabled after admin review.',
    bodyHtml: `
      <div class="space-y-3">
        <p>
          Thanks for creating an account. Your application has been received and is currently <span class="font-semibold text-gray-900">under review</span>.
        </p>
        <div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p class="font-semibold text-gray-900 mb-1">Next steps</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Our team will review your information.</li>
            <li>Once approved, you’ll be able to sign in and access your dashboard.</li>
          </ul>
        </div>
        <p class="text-xs text-gray-500">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    `,
    primary: {
      label: 'OK',
      onClick: onClose,
    },
    secondary: null,
    closeOnBackdrop: false,
  });
}



