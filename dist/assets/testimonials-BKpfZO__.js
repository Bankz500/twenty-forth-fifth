import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as D}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";import{getFirestore as O,query as N,collection as M,where as P,getDocs as j}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";const F={apiKey:"AIzaSyABYV12B7RM2ZCD2G1lFTLpgJwflJFwEXY",authDomain:"beal-offshore.firebaseapp.com",projectId:"beal-offshore",storageBucket:"beal-offshore.firebasestorage.app",messagingSenderId:"1091834410162",appId:"1:1091834410162:web:56285433b5751e681745ab",measurementId:"G-CT463F3T6J"};try{let d=function(a){const t=localStorage.getItem(`likes_${a}`);return t?JSON.parse(t):{likes:0,dislikes:0,userLiked:!1,userDisliked:!1}},v=function(a,t){localStorage.setItem(`likes_${a}`,JSON.stringify(t))},k=function(a){const t=d(a);t.userLiked?(t.likes=Math.max(0,t.likes-1),t.userLiked=!1):(t.userDisliked&&(t.dislikes=Math.max(0,t.dislikes-1),t.userDisliked=!1),t.likes+=1,t.userLiked=!0),v(a,t),h(m)},B=function(a){const t=d(a);t.userDisliked?(t.dislikes=Math.max(0,t.dislikes-1),t.userDisliked=!1):(t.userLiked&&(t.likes=Math.max(0,t.likes-1),t.userLiked=!1),t.dislikes+=1,t.userDisliked=!0),v(a,t),h(m)},L=function(a,t){const s=[...a];switch(t){case"oldest":return s.sort((e,n)=>{const r=e.createdAt instanceof Date?e.createdAt:new Date(e.createdAt),o=n.createdAt instanceof Date?n.createdAt:new Date(n.createdAt);return r-o});case"rating":return s.sort((e,n)=>(n.rating||0)-(e.rating||0));case"likes":return s.sort((e,n)=>{const r=d(e.id).likes;return d(n.id).likes-r});case"newest":default:return s.sort((e,n)=>{const r=e.createdAt instanceof Date?e.createdAt:new Date(e.createdAt);return(n.createdAt instanceof Date?n.createdAt:new Date(n.createdAt))-r})}},S=function(a,t){if(t==="all")return a;if(t==="verified")return a.filter(s=>s.verified);if(t==="5star")return a.filter(s=>s.rating===5);if(t==="business")return a.filter(s=>(s.company||"").trim().length>0);if(t==="individual")return a.filter(s=>(s.company||"").trim().length===0);if(t==="recent"){const s=new Date;return s.setDate(s.getDate()-30),a.filter(e=>(e.createdAt instanceof Date?e.createdAt:new Date(e.createdAt))>=s)}return a},R=function(a,t){if(!t)return a;const s=t.toLowerCase();return a.filter(e=>e.authorName&&e.authorName.toLowerCase().includes(s)||e.company&&e.company.toLowerCase().includes(s)||e.country&&e.country.toLowerCase().includes(s)||e.reviewText&&e.reviewText.toLowerCase().includes(s))},A=function(a){const t=a.length,s=a.length>0?(a.reduce((r,o)=>r+(o.rating||0),0)/a.length).toFixed(1):"0.0",e=a.filter(r=>r.verified).length,n=new Set(a.map(r=>r.country).filter(r=>r)).size;document.getElementById("totalReviews").textContent=t,document.getElementById("avgRating").textContent=s,document.getElementById("verifiedCount").textContent=e,document.getElementById("countriesCount").textContent=n},h=function(a){const t=document.getElementById("testimonials-container");if(a.length===0){t.innerHTML=`
              <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <i class="fas fa-comments text-gray-300 text-5xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
                <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            `;return}const s=L(a,y);t.innerHTML=s.map((e,n)=>{const r="⭐".repeat(e.rating||0),o="☆".repeat(5-(e.rating||0)),l=e.createdAt.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),i=Math.ceil((e.reviewText||"").split(" ").length/200),c=d(e.id),w=e.likeCount===0||e.likeCount?Number(e.likeCount):null,T=Number.isFinite(w)?`<span class="text-sm text-gray-600 flex items-center gap-1">
                   <i class="fas fa-heart text-red-500"></i>
                   <span class="font-medium">${w}</span>
                 </span>`:"",x=(e.company||"").trim().length>0?"Business":"Individual",C=x==="Business"?"bg-blue-50 text-blue-700 border-blue-200":"bg-gray-50 text-gray-700 border-gray-200";return`
              <article 
                class="testimonial-card bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm"
                itemscope 
                itemtype="https://schema.org/Review"
              >
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-start gap-4 flex-1">
                    ${e.authorImage?`
                      <img 
                        src="${e.authorImage}" 
                        alt="${e.authorName}" 
                        class="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                        itemprop="image"
                        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
                      >
                      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border-2 border-gray-200 hidden">
                        <i class="fas fa-user text-purple-600 text-xl"></i>
                      </div>
                    `:`
                      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border-2 border-gray-200">
                        <i class="fas fa-user text-purple-600 text-xl"></i>
                      </div>
                    `}
                    <div class="flex-1">
                      <h3 class="blog-title text-xl font-bold text-gray-900 mb-1" itemprop="author" itemscope itemtype="https://schema.org/Person">
                        <span itemprop="name">${e.authorName||"Anonymous"}</span>
                      </h3>
                      <div class="flex items-center gap-3 mb-2 flex-wrap">
                        ${e.company?`<span class="text-sm font-medium text-gray-700" itemprop="affiliation">${e.company}</span>`:""}
                        ${e.country?`<span class="text-xs text-gray-500 flex items-center"><i class="fas fa-map-marker-alt mr-1"></i>${e.country}</span>`:""}
                      </div>
                      <div class="flex items-center gap-2 text-sm text-gray-500">
                        <time datetime="${e.createdAt.toISOString()}" itemprop="datePublished">
                          <i class="far fa-calendar mr-1"></i>${l}
                        </time>
                        <span class="text-gray-400">•</span>
                        <span>
                          <i class="far fa-clock mr-1"></i>${i} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="flex items-center gap-2 mb-2 flex-wrap">
                    <div class="flex items-center" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                      <meta itemprop="ratingValue" content="${e.rating}">
                      <meta itemprop="bestRating" content="5">
                      <meta itemprop="worstRating" content="1">
                      <span class="text-2xl">${r}</span>
                      <span class="text-gray-400 text-lg">${o}</span>
                      <span class="ml-2 text-sm font-semibold text-gray-700">${e.rating}/5</span>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${C}">
                      <i class="fas ${x==="Business"?"fa-building":"fa-user"} mr-1"></i>${x}
                    </span>
                    ${e.verified?`
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <i class="fas fa-check-circle mr-1"></i>Verified Review
                      </span>
                    `:""}
                  </div>
                </div>

                <div class="prose max-w-none mb-4">
                  <p class="text-gray-700 leading-relaxed text-base" itemprop="reviewBody">
                    ${(e.reviewText||"").replace(/\n/g,"<br>")}
                  </p>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div class="flex items-center gap-4">
                    ${T}
                    <button 
                      onclick="likeTestimonial('${e.id}')" 
                      class="like-btn ${c.userLiked?"active":""} text-gray-500 hover:text-green-600 transition-colors text-sm flex items-center gap-1"
                    >
                      <i class="fas fa-thumbs-up"></i>
                      <span>${c.likes}</span>
                    </button>
                    <button 
                      onclick="dislikeTestimonial('${e.id}')" 
                      class="dislike-btn ${c.userDisliked?"active":""} text-gray-500 hover:text-red-600 transition-colors text-sm flex items-center gap-1"
                    >
                      <i class="fas fa-thumbs-down"></i>
                      <span>${c.dislikes}</span>
                    </button>
                    <button class="text-gray-500 hover:text-purple-600 transition-colors text-sm">
                      <i class="far fa-share-square mr-1"></i>Share
                    </button>
                  </div>
                  <span class="text-xs text-gray-400">Review #${n+1}</span>
                </div>
              </article>
            `}).join(""),I(a),$(a)},I=function(a){const t=[...a].map(e=>({...e,likes:d(e.id).likes})).sort((e,n)=>n.likes-e.likes).slice(0,3),s=document.getElementById("popularReviews");if(t.length===0){s.innerHTML='<p class="text-sm text-gray-500">No reviews yet</p>';return}s.innerHTML=t.map(e=>{const n="⭐".repeat(e.rating||0),r=(e.company||"").trim().length>0?"Business":"Individual";return`
              <div class="border-l-4 border-purple-500 pl-3">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-semibold text-sm text-gray-900">${e.authorName}</span>
                  <span class="text-xs text-yellow-500">${n}</span>
                </div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[11px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-700 bg-gray-50">
                    ${r}
                  </span>
                </div>
                <p class="text-xs text-gray-600 text-clamp-2">${(e.reviewText||"").substring(0,130)}...</p>
                <div class="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <i class="fas fa-thumbs-up"></i>
                  <span>${d(e.id).likes} likes</span>
                </div>
              </div>
            `}).join("")},$=function(a){const t=a.length>0?(a.reduce((i,c)=>i+(c.rating||0),0)/a.length).toFixed(1):"0.0",s={"@context":"https://schema.org","@type":"Organization","@id":"https://beal-offshore.com/#organization",name:"Beal Offshore Ltd",alternateName:"Beal Offshore",url:"https://beal-offshore.com",logo:{"@type":"ImageObject",url:"https://beal-offshore.com/Logo.png"},description:"Beal Offshore Ltd provides professional offshore banking services with expertise in compliance and international transactions. Trusted by businesses worldwide.",aggregateRating:{"@type":"AggregateRating",ratingValue:t,reviewCount:a.length.toString(),bestRating:"5",worstRating:"1"},review:a.slice(0,20).map(i=>({"@type":"Review",author:{"@type":"Person",name:i.authorName||"Anonymous",...i.company?{affiliation:{"@type":"Organization",name:i.company}}:{}},reviewRating:{"@type":"Rating",ratingValue:i.rating.toString(),bestRating:"5",worstRating:"1"},reviewBody:i.reviewText,datePublished:i.createdAt.toISOString().split("T")[0],...i.verified?{reviewAspect:"Verified Customer Review"}:{}})),serviceType:"Offshore Banking Services",areaServed:{"@type":"Place",name:"Worldwide"}},e=document.getElementById("testimonials-schema");e&&(e.textContent=JSON.stringify(s));const n={"@context":"https://schema.org","@type":"Blog","@id":"https://beal-offshore.com/testimonials#blog",name:"Beal Offshore Ltd Testimonials",description:"Verified client testimonials and reviews for Beal Offshore Ltd. Read authentic customer experiences from businesses worldwide who trust Beal Offshore for offshore banking services.",url:"https://beal-offshore.com/testimonials",inLanguage:"en-US",blogPost:a.map(i=>({"@type":"BlogPosting",headline:`Review by ${i.authorName}${i.company?` from ${i.company}`:""} - Beal Offshore Ltd`,author:{"@type":"Person",name:i.authorName||"Anonymous",...i.company?{affiliation:{"@type":"Organization",name:i.company}}:{}},datePublished:i.createdAt.toISOString(),dateModified:i.createdAt.toISOString(),reviewBody:i.reviewText,reviewRating:{"@type":"Rating",ratingValue:i.rating,bestRating:5,worstRating:1},about:{"@type":"Thing",name:"Beal Offshore Ltd",description:"Offshore Banking Services"}})),publisher:{"@id":"https://beal-offshore.com/#organization"}},r=document.getElementById("blog-schema");r&&(r.textContent=JSON.stringify(n));const o={"@context":"https://schema.org","@type":"ItemList",name:"Beal Offshore Ltd Client Testimonials",description:"List of verified client testimonials and reviews for Beal Offshore Ltd",itemListElement:a.slice(0,10).map((i,c)=>({"@type":"ListItem",position:c+1,item:{"@type":"Review",author:{"@type":"Person",name:i.authorName||"Anonymous"},reviewRating:{"@type":"Rating",ratingValue:i.rating,bestRating:5,worstRating:1},reviewBody:i.reviewText.substring(0,200)+"...",datePublished:i.createdAt.toISOString().split("T")[0]}}))};let l=document.getElementById("itemlist-schema");l||(l=document.createElement("script"),l.type="application/ld+json",l.id="itemlist-schema",document.head.appendChild(l)),l.textContent=JSON.stringify(o)},p=function(){let a=S(m,b);a=R(a,u);const t=document.getElementById("searchResults"),s=document.getElementById("searchCount"),e=document.getElementById("clearSearch");u?(t&&t.classList.remove("hidden"),s&&(s.textContent=a.length),e&&e.classList.remove("hidden")):(t&&t.classList.add("hidden"),e&&e.classList.add("hidden")),h(a)};const g=D(F),f=O(g);let m=[],y="newest",b="all",u="";async function E(){try{console.log("🔍 Loading testimonials...");const a=N(M(f,"testimonials"),P("published","==",!0)),t=await j(a);console.log("📊 Found testimonials:",t.size),m=[],t.forEach(s=>{var n;const e=s.data();m.push({id:s.id,authorName:e.authorName||"",company:e.company||"",likeCount:e.likeCount!==void 0?e.likeCount:null,country:e.country||"",rating:e.rating||0,reviewText:e.reviewText||"",verified:e.verified||!1,authorImage:e.authorImage||"",createdAt:(n=e.createdAt)!=null&&n.toDate?e.createdAt.toDate():e.createdAt?new Date(e.createdAt):new Date})}),A(m),p(),console.log("✅ Testimonials loaded successfully")}catch(a){console.error("❌ Error loading testimonials:",a);const t=document.getElementById("testimonials-container");t.innerHTML=`
              <div class="bg-white rounded-xl border border-red-200 p-8 text-center">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <h3 class="text-xl font-semibold text-red-900 mb-2">Error Loading Testimonials</h3>
                <p class="text-red-700">${a.message}</p>
              </div>
            `}}window.likeTestimonial=k,window.dislikeTestimonial=B,document.getElementById("searchInput").addEventListener("input",a=>{u=a.target.value.trim(),p()}),document.getElementById("sortSelect").addEventListener("change",a=>{y=a.target.value,p()}),document.querySelectorAll("[data-filter]").forEach(a=>{a.addEventListener("click",t=>{document.querySelectorAll("[data-filter]").forEach(s=>s.classList.remove("active")),t.target.classList.add("active"),b=t.target.dataset.filter,p()})}),document.getElementById("clearSearch").addEventListener("click",()=>{document.getElementById("searchInput").value="",u="",p()});try{const t=(new URLSearchParams(window.location.search).get("search")||"").trim();if(t){const s=document.getElementById("searchInput");s&&(s.value=t),u=t}}catch{}E()}catch(g){console.error("❌ Firebase initialization error:",g);const f=document.getElementById("testimonials-container");f.innerHTML=`
          <div class="bg-white rounded-xl border border-red-200 p-8 text-center">
            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <h3 class="text-xl font-semibold text-red-900 mb-2">Initialization Error</h3>
            <p class="text-red-700">${g.message}</p>
          </div>
        `}
