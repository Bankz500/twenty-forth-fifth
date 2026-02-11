import"./modulepreload-polyfill-B5Qt9EMX.js";import{o as B,a as l,l as $,h as w,i as L,c as u,d,u as T,e as A,q as h,p as U,g as p,w as g,n as S}from"./firebase-client-BQD81AQz.js";import"./firebase-config-D2Ob3NcO.js";window.__onAuthStateChanged=B;B(l,async e=>{e||(console.log("No user signed in, redirecting to sign-in page."),window.location.href="login.html")});window.signOut=function(){$(l).then(()=>{alert("Signed out successfully!"),window.location.href="login.html"}).catch(e=>{alert("Error signing out: "+e.message)})};window.chatModal={currentChatId:null,currentUserId:null,realtimeUnsubscribe:null,unreadListener:null,unreadCount:0,selectedImageBase64:null,selectedImageFile:null,chatMode:"faq"};const P={"account-setup":"To open an banking account with Twenty Third & Forth, please visit our sign-up page and complete the registration form. You'll need to provide identification documents and proof of address. Our compliance team will review your application within 1-2 business days.",transfers:"You can make international wire transfers through your online dashboard. Navigate to the Transfer section, enter the recipient details, amount, and currency. Transfers are typically processed within 1-3 business days. Fees vary by currency and destination.",fees:"Our fee structure is transparent and competitive. Account maintenance fees start at $50/month. Wire transfer fees range from $25-$75 depending on currency and destination. Please contact us for a detailed fee schedule tailored to your needs.",security:"Your account is protected by bank-level encryption, multi-factor authentication, and regular security audits. We comply with international banking regulations and maintain strict KYC/AML procedures. Your funds are held in segregated accounts.","multi-currency":"We support over 20 major currencies including USD, EUR, GBP, JPY, CHF, AUD, CAD, and more. You can hold multiple currencies in a single account and convert between them at competitive exchange rates.",investment:"We offer various investment options including fixed deposits, treasury bonds, and managed investment portfolios. Minimum investment amounts and returns vary by product. Please schedule a consultation with our investment team for personalized advice."},_={"account-setup":"📋 Account Setup",transfers:"💸 International Transfers",fees:"💰 Fees & Charges",security:"🔒 Security & Compliance","multi-currency":"🌍 Multi-Currency Accounts",investment:"📈 Investment Services"};async function y(){l.currentUser&&(window.chatModal.currentUserId=l.currentUser.uid,await W(),await F())}async function F(){if(window.chatModal.currentUserId){window.chatModal.unreadListener&&window.chatModal.unreadListener();try{const e=h(u(d,"live_chats"),g("userId","==",window.chatModal.currentUserId)),t=await p(e);if(t.empty){v(0);return}const s=t.docs[0].id;window.chatModal.currentChatId=s;const r=u(d,"live_chats",s,"messages"),n=h(r,g("read","==",!1),g("sender","==","admin"));window.chatModal.unreadListener=S(n,a=>{const i=a.size;window.chatModal.unreadCount=i,v(i)},a=>{console.error("Error listening to unread messages:",a)})}catch(e){console.error("Error setting up unread listener:",e)}}}function v(e){const t=document.getElementById("chatUnreadBadge");t&&(e>0?(t.textContent=e>99?"99+":e,t.classList.remove("hidden"),t.classList.add("animate-pulse"),setTimeout(()=>t.classList.remove("animate-pulse"),2e3)):t.classList.add("hidden"))}async function j(){if(window.chatModal.currentChatId)try{const e=u(d,"live_chats",window.chatModal.currentChatId,"messages"),t=h(e,g("read","==",!1),g("sender","==","admin")),s=await p(t),r=[];s.forEach(n=>{r.push(T(A(d,"live_chats",window.chatModal.currentChatId,"messages",n.id),{read:!0}))}),await Promise.all(r),v(0)}catch(e){console.error("Error marking messages as read:",e)}}async function W(){if(window.chatModal.currentUserId)try{const e=h(u(d,"live_chats"),g("userId","==",window.chatModal.currentUserId)),t=await p(e);t.empty||(window.chatModal.currentChatId=t.docs[0].id,await x(),b())}catch(e){console.error("Error loading chat:",e)}}async function x(){if(window.chatModal.currentChatId)try{const e=u(d,"live_chats",window.chatModal.currentChatId,"messages"),t=h(e,U("timestamp","asc")),s=await p(t),r=document.getElementById("liveChatMessages");if(r){r.innerHTML="",q();const n=[];s.forEach(a=>{n.push({id:a.id,...a.data()})}),n.sort((a,i)=>{var m,f;const o=(m=a.timestamp)!=null&&m.toDate?a.timestamp.toDate().getTime():a.timestamp||0,c=(f=i.timestamp)!=null&&f.toDate?i.timestamp.toDate().getTime():i.timestamp||0;return o-c}),n.forEach(a=>{k(a,!1)}),setTimeout(()=>{r.scrollTop=r.scrollHeight},100)}await b()}catch(e){console.error("Error loading messages:",e)}}async function b(){if(window.chatModal.currentChatId){window.chatModal.realtimeUnsubscribe&&window.chatModal.realtimeUnsubscribe();try{const e=u(d,"live_chats",window.chatModal.currentChatId,"messages"),t=h(e,U("timestamp","asc"));window.chatModal.realtimeUnsubscribe=S(t,s=>{const r=document.getElementById("liveChatMessages");if(!r)return;const n=new Set;r.querySelectorAll("[data-msg-id]").forEach(i=>{n.add(i.getAttribute("data-msg-id"))});const a=[];s.forEach(i=>{const o=i.id;n.has(o)||a.push({id:o,...i.data()})}),a.sort((i,o)=>{var f,M;const c=(f=i.timestamp)!=null&&f.toDate?i.timestamp.toDate().getTime():i.timestamp||0,m=(M=o.timestamp)!=null&&M.toDate?o.timestamp.toDate().getTime():o.timestamp||0;return c-m}),a.forEach(i=>{k(i,!0),i.sender==="admin"&&!i.read&&(window.chatModal.unreadCount=(window.chatModal.unreadCount||0)+1,v(window.chatModal.unreadCount))}),setTimeout(()=>{r.scrollTop=r.scrollHeight},100)})}catch(e){console.error("Error setting up realtime listener:",e)}}}function k(e,t=!1){const s=document.getElementById("liveChatMessages");if(!s)return;const r=e.sender==="user",n=e.id||`msg_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;if(s.querySelector(`[data-msg-id="${n}"]`))return;const a=document.createElement("div");a.className=`flex ${r?"justify-end":"justify-start"} mb-3`,a.setAttribute("data-msg-id",n);let i="";const o=e.imageBase64||e.imageUrl;o&&(i=`
                <div class="mb-2 rounded-xl overflow-hidden shadow-md">
                    <img src="${o}" alt="Shared image" class="max-w-full max-h-64 cursor-pointer hover:opacity-90 transition-opacity rounded-lg" onclick="window.open('${o}', '_blank')">
                </div>
            `);const c=e.text||"",m=R(e.timestamp);r?a.innerHTML=`
                <div class="max-w-[75%] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl rounded-tr-sm p-3 shadow-md">
                    ${i}
                    ${c?`<div class="text-sm leading-relaxed">${I(c)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-300 opacity-80 flex items-center justify-end gap-1">
                        ${m}
                        <i class="fas fa-check ml-1 text-xs"></i>
                    </div>
                </div>
            `:a.innerHTML=`
                <div class="max-w-[75%] bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    ${i}
                    ${c?`<div class="text-sm leading-relaxed text-gray-800">${I(c)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-400">${m}</div>
                </div>
            `,s.appendChild(a),setTimeout(()=>{s.scrollTop=s.scrollHeight},50)}function I(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function R(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}function q(){const e=document.getElementById("liveChatMessages");if(!e||document.getElementById("welcomeMessage"))return;const t=document.createElement("div");t.id="welcomeMessage",t.className="flex justify-center mb-4",t.innerHTML=`
            <div class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 border border-gray-200 rounded-2xl p-5 max-w-[90%] shadow-lg">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center shadow-md">
                            <i class="fas fa-headset text-white text-lg"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900 mb-2 text-base">Welcome to Twenty Third & Forth Support! 👋</h4>
                        <p class="text-sm text-gray-700 leading-relaxed mb-3">
                            We're here to help you with any questions about our banking services. 
                            Our support team will respond to your message as soon as possible.
                        </p>
                        <div class="flex items-center gap-4 text-xs text-gray-600">
                            <div class="flex items-center gap-1.5">
                                <i class="far fa-clock text-gray-600"></i>
                                <span>5-10 min response</span>
                            </div>
                            <div class="flex items-center gap-1.5">
                                <i class="fas fa-shield-alt text-blue-500"></i>
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,e.appendChild(t),e.scrollTop=e.scrollHeight}async function D(){var e;window.chatModal.currentUserId||(window.chatModal.currentUserId=l.currentUser.uid);try{const t=((e=l.currentUser)==null?void 0:e.email)||"User",s=await L(u(d,"live_chats"),{userId:window.chatModal.currentUserId,userName:t,isAnonymous:!1,status:"open",createdAt:w(),lastMessageAt:w()});window.chatModal.currentChatId=s.id,await b()}catch(t){throw console.error("Error creating chat:",t),alert("Failed to start chat. Please try again."),t}}window.sendChatMessage=async function(){const e=document.getElementById("chatMessageInput"),t=document.getElementById("sendMessageBtn"),s=e.value.trim(),r=window.chatModal.selectedImageBase64!==null;if(!(!s&&!r)){if(!window.chatModal.currentChatId)try{await D()}catch{return}t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{let n=null;r&&(n=window.chatModal.selectedImageBase64,removeImagePreview());const a={text:s||(r?"📷 Image":""),sender:"user",timestamp:w(),read:!1};n&&(a.imageBase64=n),await L(u(d,"live_chats",window.chatModal.currentChatId,"messages"),a),await T(A(d,"live_chats",window.chatModal.currentChatId),{lastMessageAt:w(),status:"open"}),e.value=""}catch(n){console.error("Error sending message:",n),alert("Failed to send message. Please try again.")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-paper-plane"></i>')}}};window.startLiveChat=function(){window.chatModal.chatMode="live",document.getElementById("faqTopicsSection").classList.add("hidden"),document.getElementById("liveChatMessages").classList.remove("hidden"),document.getElementById("chatInputArea").classList.remove("hidden"),q(),window.chatModal.currentChatId?x():D().then(()=>{x()})};var C;(C=document.getElementById("imageInput"))==null||C.addEventListener("change",function(e){const t=e.target.files[0];if(!t)return;if(t.size>700*1024){alert("Image size must be less than 700KB. Please compress the image.");return}if(!t.type.startsWith("image/")){alert("Please select an image file");return}const s=new FileReader;s.onload=r=>{const n=document.getElementById("imagePreview"),a=document.getElementById("imagePreviewContainer");n.src=r.target.result,a.classList.remove("hidden"),window.chatModal.selectedImageBase64=r.target.result,window.chatModal.selectedImageFile=t},s.readAsDataURL(t)});window.removeImagePreview=function(){document.getElementById("imagePreviewContainer").classList.add("hidden"),document.getElementById("imageInput").value="",window.chatModal.selectedImageFile=null,window.chatModal.selectedImageBase64=null};document.querySelectorAll(".faq-topic-card").forEach(e=>{e.addEventListener("click",function(){const t=this.dataset.topic;H(t)})});function H(e){const t=P[e];if(!t)return;const s=document.getElementById("faqTopicsSection");s.innerHTML=`
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl">
                <div class="font-semibold text-blue-900 mb-2">${_[e]}</div>
                <div class="text-sm text-gray-700 mb-4">${t}</div>
                <button onclick="resetFAQ()" class="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to Topics</span>
                </button>
            </div>
        `}window.resetFAQ=function(){const e=document.getElementById("faqTopicsSection");e.innerHTML=`
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-1">Popular Topics</div>
            
            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="account-setup">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900 mb-1">Account Setup</div>
                        <div class="text-xs text-gray-500">How do I open an banking account?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-gray-900 transition-colors"></i>
                </div>
            </div>

            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="transfers">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900 mb-1">International Transfers</div>
                        <div class="text-xs text-gray-500">How do I make international wire transfers?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-gray-900 transition-colors"></i>
                </div>
            </div>

            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="fees">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors flex-shrink-0">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900 mb-1">Fees & Charges</div>
                        <div class="text-xs text-gray-500">What are your banking fees?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-gray-900 transition-colors"></i>
                </div>
            </div>

            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="security">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors flex-shrink-0">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900 mb-1">Security & Compliance</div>
                        <div class="text-xs text-gray-500">How secure is my account?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-gray-900 transition-colors"></i>
                </div>
            </div>

            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="multi-currency">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors flex-shrink-0">
                        <i class="fas fa-globe"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900 mb-1">Multi-Currency Accounts</div>
                        <div class="text-xs text-gray-500">What currencies do you support?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-gray-900 transition-colors"></i>
                </div>
            </div>

            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="investment">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors flex-shrink-0">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900 mb-1">Investment Services</div>
                        <div class="text-xs text-gray-500">What investment options are available?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-gray-900 transition-colors"></i>
                </div>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-200">
                <button onclick="startLiveChat()" class="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <i class="fas fa-comment-dots"></i>
                    <span>Start Live Chat</span>
                </button>
            </div>
        `,document.querySelectorAll(".faq-topic-card").forEach(t=>{t.addEventListener("click",function(){const s=this.dataset.topic;H(s)})})};window.openChatModal=function(){document.getElementById("chatModal").classList.remove("hidden"),document.body.style.overflow="hidden",y(),j()};window.closeChatModal=function(){document.getElementById("chatModal").classList.add("hidden"),document.body.style.overflow="",window.chatModal.chatMode="faq",document.getElementById("faqTopicsSection").classList.remove("hidden"),document.getElementById("liveChatMessages").classList.add("hidden"),document.getElementById("chatInputArea").classList.add("hidden"),window.chatModal.realtimeUnsubscribe&&(window.chatModal.realtimeUnsubscribe(),window.chatModal.realtimeUnsubscribe=null)};var E;(E=document.getElementById("chatModal"))==null||E.addEventListener("click",function(e){e.target===this&&window.closeChatModal()});(async function(){const e=window.__onAuthStateChanged;if(!e){console.warn("Auth state listener unavailable.");return}l.currentUser&&y(),e(l,t=>{t?(window.chatModal.currentUserId=t.uid,y()):(window.chatModal.unreadListener&&(window.chatModal.unreadListener(),window.chatModal.unreadListener=null),v(0))})})();
