const m="beal-compliance-modal-root",p="beal-modal-open";function v(){let e=document.getElementById(m);return e||(e=document.createElement("div"),e.id=m,document.body.appendChild(e),e)}function b(e){try{e?(document.documentElement.classList.add(p),document.body.style.overflow="hidden"):(document.documentElement.classList.remove(p),document.body.style.overflow="")}catch{}}function h({title:e,subtitle:l,bodyHtml:s,primary:n,secondary:t}){const r=n?`<button id="bealModalPrimary" class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2" style="background-color: #1800ac;" onmouseover="this.style.backgroundColor='#140099'" onmouseout="this.style.backgroundColor='#1800ac'" onfocus="this.style.outlineColor='#1800ac'">${n.label}</button>`:"",i=t?`<button id="bealModalSecondary" class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-gray-900 font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2" style="outline-color: #1800ac;">${t.label}</button>`:"";return`
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
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">${e}</h3>
                ${l?`<p class="mt-1 text-sm text-gray-600">${l}</p>`:""}
              </div>
            </div>
            <div class="mt-5 text-gray-700 text-sm leading-relaxed">
              ${s}
            </div>
          </div>
          <div class="p-6 sm:p-7 bg-white flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            ${i}
            ${r}
          </div>
        </div>
      </div>
    </div>
  `}function y({title:e,subtitle:l,bodyHtml:s,primary:n,secondary:t,closeOnBackdrop:r=!1}){const i=v();return new Promise(f=>{b(!0),i.innerHTML=h({title:e,subtitle:l,bodyHtml:s,primary:n,secondary:t});const a=o=>{i.innerHTML="",b(!1),f(o)},c=document.getElementById("bealModalBackdrop"),d=document.getElementById("bealModalPrimary"),u=document.getElementById("bealModalSecondary");c&&c.addEventListener("click",()=>{r&&a({action:"backdrop"})});const g=o=>{o.key==="Escape"&&t&&a({action:"escape"})};document.addEventListener("keydown",g,{once:!0}),d&&n&&d.addEventListener("click",async()=>{var o;try{await((o=n.onClick)==null?void 0:o.call(n))}finally{a({action:"primary"})}}),u&&t&&u.addEventListener("click",async()=>{var o;try{await((o=t.onClick)==null?void 0:o.call(t))}finally{a({action:"secondary"})}})})}function x({onContinue:e}={}){return y({title:"AML Notice (Compliance)",subtitle:"Please review before continuing.",bodyHtml:`
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
    `,primary:{label:"I Understand",onClick:e},secondary:{label:"Cancel",onClick:e}})}function w({onClose:e}={}){return y({title:"Account Pending Approval",subtitle:"Your dashboard access will be enabled after admin review.",bodyHtml:`
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
    `,primary:{label:"OK",onClick:e},secondary:null,closeOnBackdrop:!1})}export{w as a,x as s};
