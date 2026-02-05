import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as w}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";import{getFirestore as T,query as C,collection as $,where as A,getDocs as L}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";const D={apiKey:"AIzaSyABYV12B7RM2ZCD2G1lFTLpgJwflJFwEXY",authDomain:"beal-offshore.firebaseapp.com",projectId:"beal-offshore",storageBucket:"beal-offshore.firebasestorage.app",messagingSenderId:"1091834410162",appId:"1:1091834410162:web:56285433b5751e681745ab",measurementId:"G-CT463F3T6J"};try{let x=function(n){const o=document.getElementById("testimonials-grid");if(n.length===0){o.innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">No testimonials available yet.</p>
                        </div>
                    `;return}o.innerHTML=n.map((s,l)=>{const m="⭐".repeat(s.rating||0),f=s.createdAt.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),d=Number.isFinite(s.likeCount)?`<span class="text-xs text-gray-500 flex items-center gap-1">
                            <i class="fas fa-thumbs-up text-blue-500"></i>
                            <span class="font-medium">${s.likeCount}</span>
                          </span>`:"";let r=s.reviewText||"";r.length>180&&(r=r.substring(0,180)+"...");const c=["from-blue-50 to-indigo-50","from-purple-50 to-pink-50","from-green-50 to-emerald-50"],u=["border-blue-200","border-purple-200","border-green-200"],t=["text-blue-600","text-purple-600","text-green-600"],e=c[l%c.length],a=u[l%u.length],i=t[l%t.length];return`
                        <div class="group bg-gradient-to-br ${e} rounded-2xl shadow-lg p-6 md:p-8 border-2 ${a} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                            <!-- Decorative element -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                            
                            <div class="relative z-10">
                                <!-- Header -->
                                <div class="flex items-start justify-between mb-5">
                                    <div class="flex items-center gap-4 flex-1">
                                        ${s.authorImage?`<div class="relative">
                                                <img src="${s.authorImage}" alt="${s.authorName}" class="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md">
                                                ${s.verified?'<div class="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`:`<div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-3 border-white shadow-md">
                                                <i class="fas fa-user text-white text-lg"></i>
                                                ${s.verified?'<div class="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`}
                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-bold text-gray-900 text-base md:text-lg mb-1 truncate">${p(s.authorName)}</h4>
                                            <p class="text-sm text-gray-600 truncate">${p(s.company||"")}</p>
                                            ${s.country?`<p class="text-xs text-gray-500 flex items-center gap-1 mt-1"><i class="fas fa-map-marker-alt"></i> ${p(s.country)}</p>`:""}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Rating -->
                                <div class="mb-4">
                                    <div class="text-yellow-500 text-lg md:text-xl mb-3">${m}</div>
                                </div>
                                
                                <!-- Review Text -->
                                <div class="mb-5">
                                    <div class="relative">
                                        <i class="fas fa-quote-left ${i} text-2xl opacity-20 absolute -top-2 -left-1"></i>
                                        <p class="text-gray-700 text-sm md:text-base leading-relaxed pl-6 relative z-10">${p(r)}</p>
                                    </div>
                                </div>
                                
                                <!-- Footer -->
                                <div class="flex items-center justify-between pt-5 border-t-2 border-white/50">
                                    <div class="flex items-center gap-3">
                                        ${d}
                                        <span class="text-xs text-gray-500 font-medium">${f}</span>
                                    </div>
                                    <div class="${i}">
                                        <i class="fas fa-quote-right text-xl opacity-30"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join("")},p=function(n){const o=document.createElement("div");return o.textContent=n,o.innerHTML};const g=w(D),v=T(g);async function b(){try{let m=function(t){const e=(t||"").toLowerCase().trim().replace(/\s+/g," ");return n.some(a=>{const i=a.toLowerCase().trim();return e.includes(i)||i.includes(e)})},f=function(t){const e=(t||"").toLowerCase().trim().replace(/\s+/g," ");return e.includes("point")&&e.includes("speed")?"point speed":e.includes("invest")&&e.includes("wise")?"invest wise":e.includes("blue")&&(e.includes("line")||e.includes("gadget"))?"blueline gadgets":null};const n=["point speed","pointspeed","point-speed","invest wise","investwise","invest-wise","blueline gadgets","blueline","blue line gadgets","blue-line gadgets"],o=C($(v,"testimonials"),A("published","==",!0)),s=await L(o),l=[];s.forEach(t=>{var a;const e=t.data();l.push({id:t.id,authorName:e.authorName||"",company:e.company||"",country:e.country||"",rating:e.rating||0,reviewText:e.reviewText||"",verified:e.verified||!1,authorImage:e.authorImage||"",likeCount:e.likeCount!==void 0?e.likeCount:null,createdAt:(a=e.createdAt)!=null&&a.toDate?e.createdAt.toDate():e.createdAt?new Date(e.createdAt):new Date})});const d=l.filter(t=>m(t.company));d.sort((t,e)=>{const a=t.createdAt instanceof Date?t.createdAt.getTime():new Date(t.createdAt).getTime();return(e.createdAt instanceof Date?e.createdAt.getTime():new Date(e.createdAt).getTime())-a});const r=[],c=["point speed","invest wise","blueline gadgets"];c.forEach(t=>{const e=d.find(a=>f(a.company)===t&&!r.find(h=>h.id===a.id));e&&r.push(e)}),r.length<3&&c.forEach(t=>{if(r.length>=3)return;const e=d.find(a=>{const i=(a.company||"").toLowerCase().trim();return(t==="point speed"&&i.includes("point")&&i.includes("speed")||t==="invest wise"&&i.includes("invest")&&i.includes("wise")||t==="blueline gadgets"&&i.includes("blue")&&(i.includes("line")||i.includes("gadget")))&&!r.find(y=>y.id===a.id)});e&&r.push(e)}),r.length<3&&d.forEach(t=>{r.length<3&&!r.find(e=>e.id===t.id)&&r.push(t)}),r.length<3&&l.forEach(t=>{r.length<3&&!r.find(e=>e.id===t.id)&&r.push(t)});const u=r.slice(0,3);console.log("Featured testimonials:",u.map(t=>({company:t.company,author:t.authorName}))),x(u)}catch(n){console.error("Error loading testimonials:",n),document.getElementById("testimonials-grid").innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">Unable to load testimonials at this time.</p>
                        </div>
                    `}}b()}catch(g){console.error("Firebase initialization error:",g),document.getElementById("testimonials-grid").innerHTML=`
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-600">Unable to load testimonials at this time.</p>
                </div>
            `}
