import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import{b as w,q as y,h as T,a as L,w as C,k as $}from"./firebase-client-DvgkFHPb.js";import{onAuthStateChanged as A}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";import"./firebase-config-C56FTJjz.js";function v(l){const m=document.getElementById("auth-nav-button"),a=document.getElementById("auth-nav-button-mobile");!m||!a||(l?(m.innerHTML=`
              <a href="dashboard.html" class="btn-blue px-5 py-2.5 rounded-xl font-semibold inline-flex items-center shadow-sm">
                Dashboard
              </a>
            `,a.innerHTML=`
              <a href="dashboard.html" class="w-full py-3 text-center border border-blue-200 text-blue-900 text-sm font-medium bg-white rounded hover:bg-blue-50 hover:border-blue-300 transition duration-300 block">
                Dashboard
              </a>
            `):(m.innerHTML=`
              <a href="login.html" class="btn-blue px-5 py-2.5 rounded-xl font-semibold inline-flex items-center shadow-sm">
                Sign in
              </a>
            `,a.innerHTML=`
              <a href="login.html" class="w-full py-3 text-center border border-blue-200 text-blue-900 text-sm font-medium bg-white rounded hover:bg-blue-50 hover:border-blue-300 transition duration-300 block">
                Sign in
              </a>
            `))}function k(){v(!1),A(w,l=>v(!!l))}window.addEventListener("site:fragments-loaded",k,{once:!0});try{let m=function(o){const d=document.getElementById("testimonials-grid");if(o.length===0){d.innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">No testimonials available yet.</p>
        </div>
                    `;return}d.innerHTML=o.map((r,c)=>{const p="⭐".repeat(r.rating||0),b=r.createdAt.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),u=Number.isFinite(r.likeCount)?`<span class="text-xs text-gray-500 flex items-center gap-1">
                            <i class="fas fa-thumbs-up text-blue-500"></i>
                            <span class="font-medium">${r.likeCount}</span>
                          </span>`:"";let n=r.reviewText||"";n.length>180&&(n=n.substring(0,180)+"...");const f=["from-blue-50 to-indigo-50","from-purple-50 to-pink-50","from-blue-50 to-emerald-50"],g=["border-blue-200","border-purple-200","border-blue-200"],t=["text-blue-600","text-purple-600","text-blue-600"],e=f[c%f.length],s=g[c%g.length],i=t[c%t.length];return`
                        <div class="group bg-gradient-to-br ${e} rounded-2xl shadow-lg p-6 md:p-8 border-2 ${s} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                            <!-- Decorative element -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                            
                            <div class="relative z-10">
                                <!-- Header -->
                                <div class="flex items-start justify-between mb-5">
                                    <div class="flex items-center gap-4 flex-1">
                                        ${r.authorImage?`<div class="relative">
                                                <img src="${r.authorImage}" alt="${r.authorName}" class="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md">
                                                ${r.verified?'<div class="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`:`<div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-3 border-white shadow-md">
                                                <i class="fas fa-user text-white text-lg"></i>
                                                ${r.verified?'<div class="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`}
                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-bold text-gray-900 text-base md:text-lg mb-1 truncate">${a(r.authorName)}</h4>
                                            <p class="text-sm text-gray-600 truncate">${a(r.company||"")}</p>
                                            ${r.country?`<p class="text-xs text-gray-500 flex items-center gap-1 mt-1"><i class="fas fa-map-marker-alt"></i> ${a(r.country)}</p>`:""}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Rating -->
                                <div class="mb-4">
                                    <div class="text-yellow-500 text-lg md:text-xl mb-3">${p}</div>
                                </div>
                                
                                <!-- Review Text -->
                                <div class="mb-5">
                                    <div class="relative">
                                        <i class="fas fa-quote-left ${i} text-2xl opacity-20 absolute -top-2 -left-1"></i>
                                        <p class="text-gray-700 text-sm md:text-base leading-relaxed pl-6 relative z-10">${a(n)}</p>
                                    </div>
                                </div>
                                
                                <!-- Footer -->
                                <div class="flex items-center justify-between pt-5 border-t-2 border-white/50">
                                    <div class="flex items-center gap-3">
                                        ${u}
                                        <span class="text-xs text-gray-500 font-medium">${b}</span>
                                    </div>
                                    <div class="${i}">
                                        <i class="fas fa-quote-right text-xl opacity-30"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join("")},a=function(o){const d=document.createElement("div");return d.textContent=o,d.innerHTML};async function l(){try{let p=function(t){const e=(t||"").toLowerCase().trim().replace(/\s+/g," ");return o.some(s=>{const i=s.toLowerCase().trim();return e.includes(i)||i.includes(e)})},b=function(t){const e=(t||"").toLowerCase().trim().replace(/\s+/g," ");return e.includes("point")&&e.includes("speed")?"point speed":e.includes("invest")&&e.includes("wise")?"invest wise":e.includes("blue")&&(e.includes("line")||e.includes("gadget"))?"blueline gadgets":null};const o=["point speed","pointspeed","point-speed","invest wise","investwise","invest-wise","blueline gadgets","blueline","blue line gadgets","blue-line gadgets"],d=y(T(L,"testimonials"),C("published","==",!0)),r=await $(d),c=[];r.forEach(t=>{var s;const e=t.data();c.push({id:t.id,authorName:e.authorName||"",company:e.company||"",country:e.country||"",rating:e.rating||0,reviewText:e.reviewText||"",verified:e.verified||!1,authorImage:e.authorImage||"",likeCount:e.likeCount!==void 0?e.likeCount:null,createdAt:(s=e.createdAt)!=null&&s.toDate?e.createdAt.toDate():e.createdAt?new Date(e.createdAt):new Date})});const u=c.filter(t=>p(t.company));u.sort((t,e)=>{const s=t.createdAt instanceof Date?t.createdAt.getTime():new Date(t.createdAt).getTime();return(e.createdAt instanceof Date?e.createdAt.getTime():new Date(e.createdAt).getTime())-s});const n=[],f=["point speed","invest wise","blueline gadgets"];f.forEach(t=>{const e=u.find(s=>b(s.company)===t&&!n.find(h=>h.id===s.id));e&&n.push(e)}),n.length<3&&f.forEach(t=>{if(n.length>=3)return;const e=u.find(s=>{const i=(s.company||"").toLowerCase().trim();return(t==="point speed"&&i.includes("point")&&i.includes("speed")||t==="invest wise"&&i.includes("invest")&&i.includes("wise")||t==="blueline gadgets"&&i.includes("blue")&&(i.includes("line")||i.includes("gadget")))&&!n.find(x=>x.id===s.id)});e&&n.push(e)}),n.length<3&&u.forEach(t=>{n.length<3&&!n.find(e=>e.id===t.id)&&n.push(t)}),n.length<3&&c.forEach(t=>{n.length<3&&!n.find(e=>e.id===t.id)&&n.push(t)});const g=n.slice(0,3);console.log("Featured testimonials:",g.map(t=>({company:t.company,author:t.authorName}))),m(g)}catch(o){console.error("Error loading testimonials:",o),document.getElementById("testimonials-grid").innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">Unable to load testimonials at this time.</p>
            </div>
                    `}}l()}catch(l){console.error("Firebase initialization error:",l),document.getElementById("testimonials-grid").innerHTML=`
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-600">Unable to load testimonials at this time.</p>
                </div>
            `}
