import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as D}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";import{getFirestore as N,query as F,collection as z,where as M,getDocs as O}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";const P={apiKey:"AIzaSyBb9sVH4fMb-a5mQgcDjAfYT9RZHTb3sKE",authDomain:"twenty-third-forth.firebaseapp.com",projectId:"twenty-third-forth",storageBucket:"twenty-third-forth.firebasestorage.app",messagingSenderId:"835548579831",appId:"1:835548579831:web:5259f071b50341af28d0f2",measurementId:"G-KEMCE9679Y"};try{let c=function(i){const t=localStorage.getItem(`likes_${i}`);return t?JSON.parse(t):{likes:0,dislikes:0,userLiked:!1,userDisliked:!1}},v=function(i,t){localStorage.setItem(`likes_${i}`,JSON.stringify(t))},k=function(i){const t=c(i);t.userLiked?(t.likes=Math.max(0,t.likes-1),t.userLiked=!1):(t.userDisliked&&(t.dislikes=Math.max(0,t.dislikes-1),t.userDisliked=!1),t.likes+=1,t.userLiked=!0),v(i,t),h(m)},T=function(i){const t=c(i);t.userDisliked?(t.dislikes=Math.max(0,t.dislikes-1),t.userDisliked=!1):(t.userLiked&&(t.likes=Math.max(0,t.likes-1),t.userLiked=!1),t.dislikes+=1,t.userDisliked=!0),v(i,t),h(m)},S=function(i,t){const a=[...i];switch(t){case"oldest":return a.sort((e,s)=>{const r=e.createdAt instanceof Date?e.createdAt:new Date(e.createdAt),o=s.createdAt instanceof Date?s.createdAt:new Date(s.createdAt);return r-o});case"rating":return a.sort((e,s)=>(s.rating||0)-(e.rating||0));case"likes":return a.sort((e,s)=>{const r=c(e.id).likes;return c(s.id).likes-r});case"newest":default:return a.sort((e,s)=>{const r=e.createdAt instanceof Date?e.createdAt:new Date(e.createdAt);return(s.createdAt instanceof Date?s.createdAt:new Date(s.createdAt))-r})}},I=function(i,t){if(t==="all")return i;if(t==="verified")return i.filter(a=>a.verified);if(t==="5star")return i.filter(a=>a.rating===5);if(t==="business")return i.filter(a=>(a.company||"").trim().length>0);if(t==="individual")return i.filter(a=>(a.company||"").trim().length===0);if(t==="recent"){const a=new Date;return a.setDate(a.getDate()-30),i.filter(e=>(e.createdAt instanceof Date?e.createdAt:new Date(e.createdAt))>=a)}return i},A=function(i,t){if(!t)return i;const a=t.toLowerCase();return i.filter(e=>e.authorName&&e.authorName.toLowerCase().includes(a)||e.company&&e.company.toLowerCase().includes(a)||e.country&&e.country.toLowerCase().includes(a)||e.reviewText&&e.reviewText.toLowerCase().includes(a))},R=function(i){const t=i.length,a=i.length>0?(i.reduce((r,o)=>r+(o.rating||0),0)/i.length).toFixed(1):"0.0",e=i.filter(r=>r.verified).length,s=new Set(i.map(r=>r.country).filter(r=>r)).size;document.getElementById("totalReviews").textContent=t,document.getElementById("avgRating").textContent=a,document.getElementById("verifiedCount").textContent=e,document.getElementById("countriesCount").textContent=s},h=function(i){const t=document.getElementById("testimonials-container");if(i.length===0){t.innerHTML=`
              <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <i class="fas fa-comments text-gray-300 text-5xl mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No Testimonials Found</h3>
                <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            `;return}const a=S(i,x);t.innerHTML=a.map((e,s)=>{const r="⭐".repeat(e.rating||0),o="☆".repeat(5-(e.rating||0)),l=e.createdAt.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),n=Math.ceil((e.reviewText||"").split(" ").length/200),d=c(e.id),w=e.likeCount===0||e.likeCount?Number(e.likeCount):null,$=Number.isFinite(w)?`<span class="text-sm text-gray-600 flex items-center gap-1">
                   <i class="fas fa-heart text-red-500"></i>
                   <span class="font-medium">${w}</span>
                 </span>`:"",y=(e.company||"").trim().length>0?"Business":"Individual",C=y==="Business"?"bg-blue-50 text-blue-700 border-blue-200":"bg-gray-50 text-gray-700 border-gray-200";return`
              <article 
                class="testimonial-card rounded-2xl p-6 md:p-8 shadow-lg relative"
                itemscope 
                itemtype="https://schema.org/Review"
              >
                <!-- Quote Icon -->
                <div class="absolute top-6 right-6 opacity-10">
                  <i class="fas fa-quote-right text-6xl text-purple-600"></i>
                </div>
                
                <div class="flex items-start gap-5 mb-6 relative z-10">
                  ${e.authorImage?`
                    <img 
                      src="${e.authorImage}" 
                      alt="${e.authorName}" 
                      class="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-purple-100"
                      itemprop="image"
                      onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    >
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center border-4 border-white shadow-lg ring-2 ring-purple-100 hidden">
                      <i class="fas fa-user text-white text-2xl"></i>
                    </div>
                  `:`
                    <div class="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center border-4 border-white shadow-lg ring-2 ring-purple-100">
                      <i class="fas fa-user text-white text-2xl"></i>
                    </div>
                  `}
                  <div class="flex-1 pt-1">
                    <h3 class="blog-title text-xl font-bold text-gray-900 mb-2" itemprop="author" itemscope itemtype="https://schema.org/Person">
                      <span itemprop="name">${e.authorName||"Anonymous"}</span>
                    </h3>
                    <div class="flex items-center gap-3 mb-3 flex-wrap">
                      ${e.company?`<span class="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-full" itemprop="affiliation">${e.company}</span>`:""}
                      ${e.country?`<span class="text-xs text-gray-600 flex items-center bg-gray-50 px-2 py-1 rounded-full"><i class="fas fa-map-marker-alt mr-1.5 text-purple-500"></i>${e.country}</span>`:""}
                    </div>
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                      <time datetime="${e.createdAt.toISOString()}" itemprop="datePublished" class="flex items-center">
                        <i class="far fa-calendar mr-1.5 text-purple-400"></i>${l}
                      </time>
                      <span class="text-gray-300">•</span>
                      <span class="flex items-center">
                        <i class="far fa-clock mr-1.5 text-purple-400"></i>${n} min read
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mb-5 relative z-10">
                  <div class="flex items-center gap-3 mb-4 flex-wrap">
                    <div class="flex items-center bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
                      <meta itemprop="ratingValue" content="${e.rating}">
                      <meta itemprop="bestRating" content="5">
                      <meta itemprop="worstRating" content="1">
                      <span class="text-2xl mr-2">${r}</span>
                      <span class="text-sm font-bold text-gray-700">${e.rating}/5</span>
                    </div>
                    <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${C} shadow-sm">
                      <i class="fas ${y==="Business"?"fa-building":"fa-user"} mr-1.5"></i>${y}
                    </span>
                    ${e.verified?`
                      <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-400 shadow-sm">
                        <i class="fas fa-check-circle mr-1.5"></i>Verified
                      </span>
                    `:""}
                  </div>
                </div>

                <div class="prose max-w-none mb-6 relative z-10">
                  <div class="bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border-l-4 border-purple-500">
                    <p class="text-gray-800 leading-relaxed text-base font-medium" itemprop="reviewBody">
                      ${(e.reviewText||"").replace(/\n/g,"<br>")}
                    </p>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-5 border-t-2 border-gray-100 relative z-10">
                  <div class="flex items-center gap-3">
                    ${$}
                    <button 
                      onclick="likeTestimonial('${e.id}')" 
                      class="like-btn ${d.userLiked?"active bg-green-50 border-2 border-green-300":"bg-gray-50 border-2 border-gray-200"} text-gray-600 hover:text-green-600 hover:border-green-300 hover:bg-green-50 transition-all text-sm flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow-sm"
                    >
                      <i class="fas fa-thumbs-up"></i>
                      <span>${d.likes}</span>
                    </button>
                    <button 
                      onclick="dislikeTestimonial('${e.id}')" 
                      class="dislike-btn ${d.userDisliked?"active bg-red-50 border-2 border-red-300":"bg-gray-50 border-2 border-gray-200"} text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all text-sm flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow-sm"
                    >
                      <i class="fas fa-thumbs-down"></i>
                      <span>${d.dislikes}</span>
                    </button>
                    <button class="bg-gray-50 border-2 border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-all text-sm flex items-center gap-2 px-4 py-2 rounded-full font-medium shadow-sm">
                      <i class="far fa-share-square"></i>
                      <span>Share</span>
                    </button>
                  </div>
                  <span class="text-xs text-gray-400 font-medium">#${s+1}</span>
                </div>
              </article>
            `}).join(""),L(i),B(i)},L=function(i){const t=[...i].map(e=>({...e,likes:c(e.id).likes})).sort((e,s)=>s.likes-e.likes).slice(0,3),a=document.getElementById("popularReviews");if(t.length===0){a.innerHTML='<p class="text-sm text-gray-500">No reviews yet</p>';return}a.innerHTML=t.map(e=>{const s="⭐".repeat(e.rating||0),r=(e.company||"").trim().length>0?"Business":"Individual";return`
              <div class="border-l-4 border-purple-500 pl-3">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-semibold text-sm text-gray-900">${e.authorName}</span>
                  <span class="text-xs text-yellow-500">${s}</span>
                </div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[11px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-700 bg-gray-50">
                    ${r}
                  </span>
                </div>
                <p class="text-xs text-gray-600 text-clamp-2">${(e.reviewText||"").substring(0,130)}...</p>
                <div class="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <i class="fas fa-thumbs-up"></i>
                  <span>${c(e.id).likes} likes</span>
                </div>
              </div>
            `}).join("")},B=function(i){const t=i.length>0?(i.reduce((n,d)=>n+(d.rating||0),0)/i.length).toFixed(1):"0.0",a={"@context":"https://schema.org","@type":"Organization","@id":"https://twentythirdforth.com/#organization",name:"Twenty Third & Forth",alternateName:"Twenty Third & Forth",url:"https://twentythirdforth.com",logo:{"@type":"ImageObject",url:"https://twentythirdforth.com/1.png"},description:"Twenty Third & Forth provides professional banking services with expertise in compliance and international transactions. Trusted by businesses worldwide.",aggregateRating:{"@type":"AggregateRating",ratingValue:t,reviewCount:i.length.toString(),bestRating:"5",worstRating:"1"},review:i.slice(0,20).map(n=>({"@type":"Review",author:{"@type":"Person",name:n.authorName||"Anonymous",...n.company?{affiliation:{"@type":"Organization",name:n.company}}:{}},reviewRating:{"@type":"Rating",ratingValue:n.rating.toString(),bestRating:"5",worstRating:"1"},reviewBody:n.reviewText,datePublished:n.createdAt.toISOString().split("T")[0],...n.verified?{reviewAspect:"Verified Customer Review"}:{}})),serviceType:"Banking Services",areaServed:{"@type":"Place",name:"Worldwide"}},e=document.getElementById("testimonials-schema");e&&(e.textContent=JSON.stringify(a));const s={"@context":"https://schema.org","@type":"Blog","@id":"https://twentythirdforth.com/testimonials#blog",name:"Twenty Third & Forth Testimonials",description:"Verified client testimonials and reviews for Twenty Third & Forth. Read authentic customer experiences from businesses worldwide who trust Twenty Third & Forth for banking services.",url:"https://twentythirdforth.com/testimonials",inLanguage:"en-US",blogPost:i.map(n=>({"@type":"BlogPosting",headline:`Review by ${n.authorName}${n.company?` from ${n.company}`:""} - Twenty Third & Forth`,author:{"@type":"Person",name:n.authorName||"Anonymous",...n.company?{affiliation:{"@type":"Organization",name:n.company}}:{}},datePublished:n.createdAt.toISOString(),dateModified:n.createdAt.toISOString(),reviewBody:n.reviewText,reviewRating:{"@type":"Rating",ratingValue:n.rating,bestRating:5,worstRating:1},about:{"@type":"Thing",name:"Twenty Third & Forth",description:"Banking Services"}})),publisher:{"@id":"https://twentythirdforth.com/#organization"}},r=document.getElementById("blog-schema");r&&(r.textContent=JSON.stringify(s));const o={"@context":"https://schema.org","@type":"ItemList",name:"Twenty Third & Forth Client Testimonials",description:"List of verified client testimonials and reviews for Twenty Third & Forth",itemListElement:i.slice(0,10).map((n,d)=>({"@type":"ListItem",position:d+1,item:{"@type":"Review",author:{"@type":"Person",name:n.authorName||"Anonymous"},reviewRating:{"@type":"Rating",ratingValue:n.rating,bestRating:5,worstRating:1},reviewBody:n.reviewText.substring(0,200)+"...",datePublished:n.createdAt.toISOString().split("T")[0]}}))};let l=document.getElementById("itemlist-schema");l||(l=document.createElement("script"),l.type="application/ld+json",l.id="itemlist-schema",document.head.appendChild(l)),l.textContent=JSON.stringify(o)},p=function(){let i=I(m,b);i=A(i,u);const t=document.getElementById("searchResults"),a=document.getElementById("searchCount"),e=document.getElementById("clearSearch");u?(t&&t.classList.remove("hidden"),a&&(a.textContent=i.length),e&&e.classList.remove("hidden")):(t&&t.classList.add("hidden"),e&&e.classList.add("hidden")),h(i)};const g=D(P),f=N(g);let m=[],x="newest",b="all",u="";async function E(){try{console.log("🔍 Loading testimonials...");const i=F(z(f,"testimonials"),M("published","==",!0)),t=await O(i);console.log("📊 Found testimonials:",t.size),m=[],t.forEach(a=>{var s;const e=a.data();m.push({id:a.id,authorName:e.authorName||"",company:e.company||"",likeCount:e.likeCount!==void 0?e.likeCount:null,country:e.country||"",rating:e.rating||0,reviewText:e.reviewText||"",verified:e.verified||!1,authorImage:e.authorImage||"",createdAt:(s=e.createdAt)!=null&&s.toDate?e.createdAt.toDate():e.createdAt?new Date(e.createdAt):new Date})}),R(m),p(),console.log("✅ Testimonials loaded successfully")}catch(i){console.error("❌ Error loading testimonials:",i);const t=document.getElementById("testimonials-container");t.innerHTML=`
              <div class="bg-white rounded-xl border border-red-200 p-8 text-center">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <h3 class="text-xl font-semibold text-red-900 mb-2">Error Loading Testimonials</h3>
                <p class="text-red-700">${i.message}</p>
              </div>
            `}}window.likeTestimonial=k,window.dislikeTestimonial=T,document.getElementById("searchInput").addEventListener("input",i=>{u=i.target.value.trim(),p()}),document.getElementById("sortSelect").addEventListener("change",i=>{x=i.target.value,p()}),document.querySelectorAll("[data-filter]").forEach(i=>{i.addEventListener("click",t=>{document.querySelectorAll("[data-filter]").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),b=t.target.dataset.filter,p()})}),document.getElementById("clearSearch").addEventListener("click",()=>{document.getElementById("searchInput").value="",u="",p()});try{const t=(new URLSearchParams(window.location.search).get("search")||"").trim();if(t){const a=document.getElementById("searchInput");a&&(a.value=t),u=t}}catch{}E()}catch(g){console.error("❌ Firebase initialization error:",g);const f=document.getElementById("testimonials-container");f.innerHTML=`
          <div class="bg-white rounded-xl border border-red-200 p-8 text-center">
            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <h3 class="text-xl font-semibold text-red-900 mb-2">Initialization Error</h3>
            <p class="text-red-700">${g.message}</p>
          </div>
        `}
