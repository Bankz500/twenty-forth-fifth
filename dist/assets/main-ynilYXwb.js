import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import{a as A,d as T}from"./firebase-client-Drf6QgQf.js";import{onAuthStateChanged as $,signInWithEmailAndPassword as B,signOut as M}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";import{query as N,collection as D,where as H,getDocs as P,doc as E,getDoc as I,serverTimestamp as k,setDoc as j}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";import{s as q}from"./compliance-modals-gNe9-PES.js";import"./firebase-config-D2Ob3NcO.js";function C(c){const l=document.getElementById("auth-nav-button"),u=document.getElementById("auth-nav-button-mobile");!l||!u||(c?(l.innerHTML=`
              <a href="dashboard.html" class="btn-blue px-5 py-2.5 rounded-xl font-semibold inline-flex items-center shadow-sm">
                Dashboard
              </a>
            `,u.innerHTML=`
              <a href="dashboard.html" class="w-full py-3 text-center border border-blue-200 text-blue-900 text-sm font-medium bg-white rounded hover:bg-blue-50 hover:border-blue-300 transition duration-300 block">
                Dashboard
              </a>
            `):(l.innerHTML=`
              <a href="login.html" class="btn-blue px-5 py-2.5 rounded-xl font-semibold inline-flex items-center shadow-sm">
                Sign in
              </a>
            `,u.innerHTML=`
              <a href="login.html" class="w-full py-3 text-center border border-blue-200 text-blue-900 text-sm font-medium bg-white rounded hover:bg-blue-50 hover:border-blue-300 transition duration-300 block">
                Sign in
              </a>
            `))}function F(){C(!1),$(A,c=>C(!!c))}window.addEventListener("site:fragments-loaded",F,{once:!0});try{let l=function(n){const a=document.getElementById("testimonials-grid");if(n.length===0){a.innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">No testimonials available yet.</p>
        </div>
                    `;return}a.innerHTML=n.map((i,m)=>{const d="⭐".repeat(i.rating||0),v=i.createdAt.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),f=Number.isFinite(i.likeCount)?`<span class="text-xs text-gray-500 flex items-center gap-1">
                            <i class="fas fa-thumbs-up text-blue-500"></i>
                            <span class="font-medium">${i.likeCount}</span>
                          </span>`:"";let r=i.reviewText||"";r.length>180&&(r=r.substring(0,180)+"...");const g=["from-blue-50 to-indigo-50","from-purple-50 to-pink-50","from-blue-50 to-emerald-50"],p=["border-blue-200","border-purple-200","border-blue-200"],e=["text-blue-600","text-purple-600","text-blue-600"],t=g[m%g.length],s=p[m%p.length],o=e[m%e.length];return`
                        <div class="group bg-gradient-to-br ${t} rounded-2xl shadow-lg p-6 md:p-8 border-2 ${s} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                            <!-- Decorative element -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                            
                            <div class="relative z-10">
                                <!-- Header -->
                                <div class="flex items-start justify-between mb-5">
                                    <div class="flex items-center gap-4 flex-1">
                                        ${i.authorImage?`<div class="relative">
                                                <img src="${i.authorImage}" alt="${i.authorName}" class="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md">
                                                ${i.verified?'<div class="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`:`<div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-3 border-white shadow-md">
                                                <i class="fas fa-user text-white text-lg"></i>
                                                ${i.verified?'<div class="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`}
                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-bold text-gray-900 text-base md:text-lg mb-1 truncate">${u(i.authorName)}</h4>
                                            <p class="text-sm text-gray-600 truncate">${u(i.company||"")}</p>
                                            ${i.country?`<p class="text-xs text-gray-500 flex items-center gap-1 mt-1"><i class="fas fa-map-marker-alt"></i> ${u(i.country)}</p>`:""}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Rating -->
                                <div class="mb-4">
                                    <div class="text-yellow-500 text-lg md:text-xl mb-3">${d}</div>
                                </div>
                                
                                <!-- Review Text -->
                                <div class="mb-5">
                                    <div class="relative">
                                        <i class="fas fa-quote-left ${o} text-2xl opacity-20 absolute -top-2 -left-1"></i>
                                        <p class="text-gray-700 text-sm md:text-base leading-relaxed pl-6 relative z-10">${u(r)}</p>
                                    </div>
                                </div>
                                
                                <!-- Footer -->
                                <div class="flex items-center justify-between pt-5 border-t-2 border-white/50">
                                    <div class="flex items-center gap-3">
                                        ${f}
                                        <span class="text-xs text-gray-500 font-medium">${v}</span>
                                    </div>
                                    <div class="${o}">
                                        <i class="fas fa-quote-right text-xl opacity-30"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join("")},u=function(n){const a=document.createElement("div");return a.textContent=n,a.innerHTML};async function c(){try{let d=function(e){const t=(e||"").toLowerCase().trim().replace(/\s+/g," ");return n.some(s=>{const o=s.toLowerCase().trim();return t.includes(o)||o.includes(t)})},v=function(e){const t=(e||"").toLowerCase().trim().replace(/\s+/g," ");return t.includes("point")&&t.includes("speed")?"point speed":t.includes("invest")&&t.includes("wise")?"invest wise":t.includes("blue")&&(t.includes("line")||t.includes("gadget"))?"blueline gadgets":null};const n=["point speed","pointspeed","point-speed","invest wise","investwise","invest-wise","blueline gadgets","blueline","blue line gadgets","blue-line gadgets"],a=N(D(T,"testimonials"),H("published","==",!0)),i=await P(a),m=[];i.forEach(e=>{var s;const t=e.data();m.push({id:e.id,authorName:t.authorName||"",company:t.company||"",country:t.country||"",rating:t.rating||0,reviewText:t.reviewText||"",verified:t.verified||!1,authorImage:t.authorImage||"",likeCount:t.likeCount!==void 0?t.likeCount:null,createdAt:(s=t.createdAt)!=null&&s.toDate?t.createdAt.toDate():t.createdAt?new Date(t.createdAt):new Date})});const f=m.filter(e=>d(e.company));f.sort((e,t)=>{const s=e.createdAt instanceof Date?e.createdAt.getTime():new Date(e.createdAt).getTime();return(t.createdAt instanceof Date?t.createdAt.getTime():new Date(t.createdAt).getTime())-s});const r=[],g=["point speed","invest wise","blueline gadgets"];g.forEach(e=>{const t=f.find(s=>v(s.company)===e&&!r.find(h=>h.id===s.id));t&&r.push(t)}),r.length<3&&g.forEach(e=>{if(r.length>=3)return;const t=f.find(s=>{const o=(s.company||"").toLowerCase().trim();return(e==="point speed"&&o.includes("point")&&o.includes("speed")||e==="invest wise"&&o.includes("invest")&&o.includes("wise")||e==="blueline gadgets"&&o.includes("blue")&&(o.includes("line")||o.includes("gadget")))&&!r.find(w=>w.id===s.id)});t&&r.push(t)}),r.length<3&&f.forEach(e=>{r.length<3&&!r.find(t=>t.id===e.id)&&r.push(e)}),r.length<3&&m.forEach(e=>{r.length<3&&!r.find(t=>t.id===e.id)&&r.push(e)});const p=r.slice(0,3);console.log("Featured testimonials:",p.map(e=>({company:e.company,author:e.authorName}))),l(p)}catch(n){console.error("Error loading testimonials:",n),document.getElementById("testimonials-grid").innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">Unable to load testimonials at this time.</p>
            </div>
                    `}}c()}catch(c){console.error("Firebase initialization error:",c),document.getElementById("testimonials-grid").innerHTML=`
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-600">Unable to load testimonials at this time.</p>
                </div>
            `}typeof emailjs<"u"&&emailjs.init("PpoJ-7X-bqUjp3Wa7");function U(c=6){return Array.from({length:c},()=>Math.floor(Math.random()*10)).join("")}function x(c,l,u="operation"){let n;const a=new Promise((i,m)=>{n=setTimeout(()=>m(new Error(`${u} timed out after ${l}ms`)),l)});return Promise.race([c,a]).finally(()=>clearTimeout(n))}const S=document.getElementById("hero-login-form"),O=document.getElementById("hero-email"),R=document.getElementById("hero-password"),y=document.getElementById("hero-login-btn"),b=document.getElementById("hero-error-message");S&&S.addEventListener("submit",async c=>{c.preventDefault();const l=O.value.trim(),u=R.value;b&&(b.classList.add("hidden"),b.textContent="");try{y.disabled=!0,y.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i>Authenticating...';const a=(await x(B(A,l,u),15e3,"Sign in")).user,i=E(T,"users",a.uid),m=await x(I(i),12e3,"Load user profile");let d=m.exists()?m.data()||{}:null;if(!d){let p=null;try{const h=(a.email||l||"").trim();if(h){const w=E(T,"users",h),L=await I(w);L.exists()&&(p=L.data()||{})}}catch(h){console.warn("Legacy email-doc migration skipped/failed:",h)}const e=p&&typeof p=="object"?p:{},t=a.displayName||"",s=e.firstName||(typeof e.name=="string"?e.name.split(" ")[0]:"")||(typeof e.fullName=="string"?e.fullName.split(" ")[0]:"")||(t?t.split(" ")[0]:"")||(a.email||l||"").split("@")[0]||"",o={...e,email:e.email||a.email||l,firstName:e.firstName||s||null,approvalStatus:e.approvalStatus||"approved",isApproved:typeof e.isApproved=="boolean"?e.isApproved:!0,approvedAt:e.approvedAt||k(),approvedBy:e.approvedBy||(p?"legacy_migrated":"legacy_auto"),createdAt:e.createdAt||k(),createdAtIso:e.createdAtIso||new Date().toISOString(),migratedFrom:p?"users/{email}":null};await x(j(i,o,{merge:!0}),12e3,"Create legacy profile"),d=o}const v=(d==null?void 0:d.approvalStatus)||null,f=typeof(d==null?void 0:d.isApproved)=="boolean"?d.isApproved:null,r=v==="approved"||v==null&&f!==!1;if(!d||!r){try{await M(A)}catch{}y.disabled=!1,y.innerHTML='<i class="fas fa-sign-in-alt mr-2"></i>Sign in',await q();return}const g=U();sessionStorage.setItem("loginOtp",g),sessionStorage.setItem("loginEmail",l),window.location.href="otp.html"}catch(n){console.error("Login error:",n);let a="User not found. Please check your email and password.";n.code==="auth/user-not-found"?a="User not found. Please check your email or sign up for an account.":n.code==="auth/wrong-password"?a="Invalid password. Please try again.":n.code==="auth/invalid-email"?a="Invalid email address. Please check your email.":n.code==="auth/too-many-requests"?a="Too many failed attempts. Please try again later.":n.code==="auth/network-request-failed"?a="Network error. Please check your connection and try again.":String((n==null?void 0:n.message)||"").includes("timed out")&&(a="Network timeout while signing in. Please check your connection and try again."),b&&(b.textContent=a,b.classList.remove("hidden"),b.scrollIntoView({behavior:"smooth",block:"nearest"}))}finally{y.disabled=!1,y.innerHTML='<i class="fas fa-sign-in-alt mr-2"></i>Sign in'}});
