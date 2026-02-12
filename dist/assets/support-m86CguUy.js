import"./modulepreload-polyfill-B5Qt9EMX.js";import{o as L,b as f,s as _,e as x,f as A,h as v,a as m,u as U,d as S,q as p,r as k,k as b,w,j as q}from"./firebase-client-DvgkFHPb.js";import"./firebase-config-C56FTJjz.js";window.__onAuthStateChanged=L;L(f,async e=>{e||(console.log("No user signed in, redirecting to sign-in page."),window.location.href="login.html")});window.signOut=function(){_(f).then(()=>{alert("Signed out successfully!"),window.location.href="login.html"}).catch(e=>{alert("Error signing out: "+e.message)})};window.chatModal={currentChatId:null,currentUserId:null,realtimeUnsubscribe:null,unreadListener:null,unreadCount:0,selectedImageBase64:null,selectedImageFile:null,chatMode:"faq"};const F={"account-setup":"To open an banking account with Twenty Third & Forth, please visit our sign-up page and complete the registration form. You'll need to provide identification documents and proof of address. Our compliance team will review your application within 1-2 business days.",transfers:"You can make international wire transfers through your online dashboard. Navigate to the Transfer section, enter the recipient details, amount, and currency. Transfers are typically processed within 1-3 business days. Fees vary by currency and destination.",fees:"Our fee structure is transparent and competitive. Account maintenance fees start at $50/month. Wire transfer fees range from $25-$75 depending on currency and destination. Please contact us for a detailed fee schedule tailored to your needs.",security:"Your account is protected by bank-level encryption, multi-factor authentication, and regular security audits. We comply with international banking regulations and maintain strict KYC/AML procedures. Your funds are held in segregated accounts.","multi-currency":"We support over 20 major currencies including USD, EUR, GBP, JPY, CHF, AUD, CAD, and more. You can hold multiple currencies in a single account and convert between them at competitive exchange rates.",investment:"We offer various investment options including fixed deposits, treasury bonds, and managed investment portfolios. Minimum investment amounts and returns vary by product. Please schedule a consultation with our investment team for personalized advice."},j={"account-setup":"📋 Account Setup",transfers:"💸 International Transfers",fees:"💰 Fees & Charges",security:"🔒 Security & Compliance","multi-currency":"🌍 Multi-Currency Accounts",investment:"📈 Investment Services"};async function M(){f.currentUser&&(window.chatModal.currentUserId=f.currentUser.uid,await N(),await R())}async function R(){if(window.chatModal.currentUserId){window.chatModal.unreadListener&&window.chatModal.unreadListener();try{const e=p(v(m,"live_chats"),w("userId","==",window.chatModal.currentUserId)),t=await b(e);if(t.empty){y(0);return}const a=t.docs[0].id;window.chatModal.currentChatId=a;const s=v(m,"live_chats",a,"messages"),r=p(s,w("read","==",!1),w("sender","==","admin"));window.chatModal.unreadListener=q(r,i=>{const n=i.size;window.chatModal.unreadCount=n,y(n)},i=>{console.error("Error listening to unread messages:",i)})}catch(e){console.error("Error setting up unread listener:",e)}}}function y(e){const t=document.getElementById("chatUnreadBadge");t&&(e>0?(t.textContent=e>99?"99+":e,t.classList.remove("hidden"),t.classList.add("animate-pulse"),setTimeout(()=>t.classList.remove("animate-pulse"),2e3)):t.classList.add("hidden"))}async function W(){if(window.chatModal.currentChatId)try{const e=v(m,"live_chats",window.chatModal.currentChatId,"messages"),t=p(e,w("read","==",!1),w("sender","==","admin")),a=await b(t),s=[];a.forEach(r=>{s.push(U(S(m,"live_chats",window.chatModal.currentChatId,"messages",r.id),{read:!0}))}),await Promise.all(s),y(0)}catch(e){console.error("Error marking messages as read:",e)}}async function N(){if(window.chatModal.currentUserId)try{const e=p(v(m,"live_chats"),w("userId","==",window.chatModal.currentUserId)),t=await b(e);t.empty||(window.chatModal.currentChatId=t.docs[0].id,await I(),C())}catch(e){console.error("Error loading chat:",e)}}async function I(){if(window.chatModal.currentChatId)try{const e=v(m,"live_chats",window.chatModal.currentChatId,"messages"),t=p(e,k("timestamp","asc")),a=await b(t),s=document.getElementById("liveChatMessages");if(s){s.innerHTML="",H();const r=[];a.forEach(i=>{r.push({id:i.id,...i.data()})}),r.sort((i,n)=>{var d,c;const l=(d=i.timestamp)!=null&&d.toDate?i.timestamp.toDate().getTime():i.timestamp||0,o=(c=n.timestamp)!=null&&c.toDate?n.timestamp.toDate().getTime():n.timestamp||0;return l-o}),r.forEach(i=>{D(i,!1)}),setTimeout(()=>{s.scrollTop=s.scrollHeight},100)}await C()}catch(e){console.error("Error loading messages:",e)}}async function C(){if(window.chatModal.currentChatId){window.chatModal.realtimeUnsubscribe&&window.chatModal.realtimeUnsubscribe();try{const e=v(m,"live_chats",window.chatModal.currentChatId,"messages"),t=p(e,k("timestamp","asc"));window.chatModal.realtimeUnsubscribe=q(t,a=>{const s=document.getElementById("liveChatMessages");if(!s){console.warn("Messages area not found in realtime listener");return}const r=new Set,i=new Set;s.querySelectorAll("[data-msg-id]").forEach(o=>{var u;const d=o.getAttribute("data-msg-id");d&&r.add(d);const c=(u=o.textContent)==null?void 0:u.trim();c&&i.add(c.substring(0,100))});const n=[];a.forEach(o=>{var h;const d=o.id,c=o.data(),g=(((h=c.text)==null?void 0:h.trim())||"").substring(0,100);!r.has(d)&&!i.has(g)&&(n.push({id:d,...c}),r.add(d),g&&i.add(g))}),n.sort((o,d)=>{var g,h;const c=(g=o.timestamp)!=null&&g.toDate?o.timestamp.toDate().getTime():o.timestamp||0,u=(h=d.timestamp)!=null&&h.toDate?d.timestamp.toDate().getTime():d.timestamp||0;return c-u}),n.length>0&&console.log(`Adding ${n.length} new messages to UI`),n.forEach(o=>{D(o,!0),o.sender==="admin"&&!o.read&&(window.chatModal.unreadCount=(window.chatModal.unreadCount||0)+1,y(window.chatModal.unreadCount))});const l=()=>{s&&(s.scrollTop=s.scrollHeight)};l(),setTimeout(l,100),setTimeout(l,300),setTimeout(l,600)},a=>{console.error("Realtime listener error:",a)})}catch(e){console.error("Error setting up realtime listener:",e)}}}function D(e,t=!1){var g,h;const a=document.getElementById("liveChatMessages");if(!a){console.warn("Messages area not found");return}const s=e.sender==="user",r=e.id||`msg_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;if(a.querySelector(`[data-msg-id="${r}"]`)){console.log("Message already exists, skipping:",r);return}const n=document.createElement("div");n.className=`flex ${s?"justify-end":"justify-start"} mb-3`,n.setAttribute("data-msg-id",r),n.setAttribute("data-timestamp",(g=e.timestamp)!=null&&g.toDate?e.timestamp.toDate().getTime():Date.now());let l="";const o=e.imageBase64||e.imageUrl;o&&(l=`
                <div class="mb-2 rounded-xl overflow-hidden shadow-md">
                    <img src="${o}" alt="Shared image" class="max-w-full max-h-64 cursor-pointer hover:opacity-90 transition-opacity rounded-lg" onclick="window.open('${o}', '_blank')">
                </div>
            `);const d=e.text||"",c=Y(e.timestamp);s?n.innerHTML=`
                <div class="max-w-[75%] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl rounded-tr-sm p-3 shadow-md">
                    ${l}
                    ${d?`<div class="text-sm leading-relaxed">${T(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-300 opacity-80 flex items-center justify-end gap-1">
                        ${c}
                        <i class="fas fa-check ml-1 text-xs"></i>
                    </div>
                </div>
            `:n.innerHTML=`
                <div class="max-w-[75%] bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    ${l}
                    ${d?`<div class="text-sm leading-relaxed text-gray-800">${T(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-400">${c}</div>
                </div>
            `,a.appendChild(n),n.offsetHeight;const u=()=>{a&&(a.scrollTop=a.scrollHeight)};u(),setTimeout(u,50),setTimeout(u,200),setTimeout(u,500),t&&console.log("Added message to UI:",{msgId:r,sender:e.sender,text:(h=e.text)==null?void 0:h.substring(0,50)})}function T(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Y(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}function H(){const e=document.getElementById("liveChatMessages");if(!e||document.getElementById("welcomeMessage"))return;const t=document.createElement("div");t.id="welcomeMessage",t.className="flex justify-center mb-4",t.innerHTML=`
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
        `,e.appendChild(t),e.scrollTop=e.scrollHeight}async function $(){var e;window.chatModal.currentUserId||(window.chatModal.currentUserId=f.currentUser.uid);try{const t=((e=f.currentUser)==null?void 0:e.email)||"User",a=await A(v(m,"live_chats"),{userId:window.chatModal.currentUserId,userName:t,isAnonymous:!1,status:"open",createdAt:x(),lastMessageAt:x()});window.chatModal.currentChatId=a.id,await C()}catch(t){throw console.error("Error creating chat:",t),alert("Failed to start chat. Please try again."),t}}window.sendChatMessage=async function(){const e=document.getElementById("chatMessageInput"),t=document.getElementById("sendMessageBtn"),a=e.value.trim(),s=window.chatModal.selectedImageBase64!==null;if(!(!a&&!s)){if(!window.chatModal.currentChatId)try{await $()}catch{return}t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{let r=null;s&&(r=window.chatModal.selectedImageBase64,removeImagePreview());const i={text:a||(s?"📷 Image":""),sender:"user",timestamp:x(),read:!1};r&&(i.imageBase64=r),await A(v(m,"live_chats",window.chatModal.currentChatId,"messages"),i),await U(S(m,"live_chats",window.chatModal.currentChatId),{lastMessageAt:x(),status:"open"}),e.value=""}catch(r){console.error("Error sending message:",r),alert("Failed to send message. Please try again.")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-paper-plane"></i>')}}};window.startLiveChat=function(){window.chatModal.chatMode="live",document.getElementById("faqTopicsSection").classList.add("hidden"),document.getElementById("liveChatMessages").classList.remove("hidden"),document.getElementById("chatInputArea").classList.remove("hidden"),H(),window.chatModal.currentChatId?I():$().then(()=>{I()})};var E;(E=document.getElementById("imageInput"))==null||E.addEventListener("change",function(e){const t=e.target.files[0];if(!t)return;if(t.size>700*1024){alert("Image size must be less than 700KB. Please compress the image.");return}if(!t.type.startsWith("image/")){alert("Please select an image file");return}const a=new FileReader;a.onload=s=>{const r=document.getElementById("imagePreview"),i=document.getElementById("imagePreviewContainer");r.src=s.target.result,i.classList.remove("hidden"),window.chatModal.selectedImageBase64=s.target.result,window.chatModal.selectedImageFile=t},a.readAsDataURL(t)});window.removeImagePreview=function(){document.getElementById("imagePreviewContainer").classList.add("hidden"),document.getElementById("imageInput").value="",window.chatModal.selectedImageFile=null,window.chatModal.selectedImageBase64=null};document.querySelectorAll(".faq-topic-card").forEach(e=>{e.addEventListener("click",function(){const t=this.dataset.topic;P(t)})});function P(e){const t=F[e];if(!t)return;const a=document.getElementById("faqTopicsSection");a.innerHTML=`
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl">
                <div class="font-semibold text-blue-900 mb-2">${j[e]}</div>
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
        `,document.querySelectorAll(".faq-topic-card").forEach(t=>{t.addEventListener("click",function(){const a=this.dataset.topic;P(a)})})};window.openChatModal=function(){document.getElementById("chatModal").classList.remove("hidden"),document.body.style.overflow="hidden",M(),W()};window.closeChatModal=function(){document.getElementById("chatModal").classList.add("hidden"),document.body.style.overflow="",window.chatModal.chatMode="faq",document.getElementById("faqTopicsSection").classList.remove("hidden"),document.getElementById("liveChatMessages").classList.add("hidden"),document.getElementById("chatInputArea").classList.add("hidden"),window.chatModal.realtimeUnsubscribe&&(window.chatModal.realtimeUnsubscribe(),window.chatModal.realtimeUnsubscribe=null)};var B;(B=document.getElementById("chatModal"))==null||B.addEventListener("click",function(e){e.target===this&&window.closeChatModal()});(async function(){const e=window.__onAuthStateChanged;if(!e){console.warn("Auth state listener unavailable.");return}f.currentUser&&M(),e(f,t=>{t?(window.chatModal.currentUserId=t.uid,M()):(window.chatModal.unreadListener&&(window.chatModal.unreadListener(),window.chatModal.unreadListener=null),y(0))})})();
