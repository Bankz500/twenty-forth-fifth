import"./modulepreload-polyfill-B5Qt9EMX.js";import{o as D,b as p,s as Y,e as C,f as $,h as v,a as f,u as H,d as P,q as b,r as _,k as L,w as x,j as F}from"./firebase-client-DvgkFHPb.js";import"./firebase-config-C56FTJjz.js";window.__onAuthStateChanged=D;D(p,async e=>{e||(console.log("No user signed in, redirecting to sign-in page."),window.location.href="login.html")});window.signOut=function(){Y(p).then(()=>{alert("Signed out successfully!"),window.location.href="login.html"}).catch(e=>{alert("Error signing out: "+e.message)})};window.chatModal={currentChatId:null,currentUserId:null,realtimeUnsubscribe:null,unreadListener:null,unreadCount:0,selectedImageBase64:null,selectedImageFile:null,chatMode:"faq"};const N={"account-setup":"To open an banking account with Twenty Third & Forth, please visit our sign-up page and complete the registration form. You'll need to provide identification documents and proof of address. Our compliance team will review your application within 1-2 business days.",transfers:"You can make international wire transfers through your online dashboard. Navigate to the Transfer section, enter the recipient details, amount, and currency. Transfers are typically processed within 1-3 business days. Fees vary by currency and destination.",fees:"Our fee structure is transparent and competitive. Account maintenance fees start at $50/month. Wire transfer fees range from $25-$75 depending on currency and destination. Please contact us for a detailed fee schedule tailored to your needs.",security:"Your account is protected by bank-level encryption, multi-factor authentication, and regular security audits. We comply with international banking regulations and maintain strict KYC/AML procedures. Your funds are held in segregated accounts.","multi-currency":"We support over 20 major currencies including USD, EUR, GBP, JPY, CHF, AUD, CAD, and more. You can hold multiple currencies in a single account and convert between them at competitive exchange rates.",investment:"We offer various investment options including fixed deposits, treasury bonds, and managed investment portfolios. Minimum investment amounts and returns vary by product. Please schedule a consultation with our investment team for personalized advice."},Q={"account-setup":"📋 Account Setup",transfers:"💸 International Transfers",fees:"💰 Fees & Charges",security:"🔒 Security & Compliance","multi-currency":"🌍 Multi-Currency Accounts",investment:"📈 Investment Services"};async function S(){p.currentUser&&(window.chatModal.currentUserId=p.currentUser.uid,await G(),await z())}async function z(){if(window.chatModal.currentUserId){window.chatModal.unreadListener&&window.chatModal.unreadListener();try{const e=b(v(f,"live_chats"),x("userId","==",window.chatModal.currentUserId)),t=await L(e);if(t.empty){M(0);return}const s=t.docs[0].id;window.chatModal.currentChatId=s;const i=v(f,"live_chats",s,"messages"),o=b(i,x("read","==",!1),x("sender","==","admin"));window.chatModal.unreadListener=F(o,n=>{const a=n.size;window.chatModal.unreadCount=a,M(a)},n=>{console.error("Error listening to unread messages:",n)})}catch(e){console.error("Error setting up unread listener:",e)}}}function M(e){const t=document.getElementById("chatUnreadBadge");t&&(e>0?(t.textContent=e>99?"99+":e,t.classList.remove("hidden"),t.classList.add("animate-pulse"),setTimeout(()=>t.classList.remove("animate-pulse"),2e3)):t.classList.add("hidden"))}async function K(){if(window.chatModal.currentChatId)try{const e=v(f,"live_chats",window.chatModal.currentChatId,"messages"),t=b(e,x("read","==",!1),x("sender","==","admin")),s=await L(t),i=[];s.forEach(o=>{i.push(H(P(f,"live_chats",window.chatModal.currentChatId,"messages",o.id),{read:!0}))}),await Promise.all(i),M(0)}catch(e){console.error("Error marking messages as read:",e)}}async function G(){if(window.chatModal.currentUserId)try{const e=b(v(f,"live_chats"),x("userId","==",window.chatModal.currentUserId)),t=await L(e);t.empty||(window.chatModal.currentChatId=t.docs[0].id,await E(),T())}catch(e){console.error("Error loading chat:",e)}}async function E(){if(window.chatModal.currentChatId)try{const e=v(f,"live_chats",window.chatModal.currentChatId,"messages"),t=b(e,_("timestamp","asc")),s=await L(t),i=document.getElementById("liveChatMessages");if(i){i.classList.remove("hidden");const o=document.getElementById("faqTopicsSection");o&&o.classList.add("hidden");const n=document.getElementById("chatInputArea");n&&n.classList.remove("hidden"),i.innerHTML="",R();const a=[];s.forEach(c=>{a.push({id:c.id,...c.data()})}),a.sort((c,r)=>{var u,l;const d=(u=c.timestamp)!=null&&u.toDate?c.timestamp.toDate().getTime():c.timestamp||0,m=(l=r.timestamp)!=null&&l.toDate?r.timestamp.toDate().getTime():r.timestamp||0;return d-m}),a.forEach(c=>{j(c,!1)}),setTimeout(()=>{i.scrollTop=i.scrollHeight},100)}await T()}catch(e){console.error("Error loading messages:",e)}}async function T(){if(window.chatModal.currentChatId){window.chatModal.realtimeUnsubscribe&&window.chatModal.realtimeUnsubscribe();try{const e=v(f,"live_chats",window.chatModal.currentChatId,"messages"),t=b(e,_("timestamp","asc"));window.chatModal.realtimeUnsubscribe=F(t,s=>{const i=document.getElementById("liveChatMessages");if(!i){console.warn("Messages area not found in realtime listener");return}const o=new Set,n=new Set;if(i.querySelectorAll("[data-msg-id]").forEach(r=>{var u;const d=r.getAttribute("data-msg-id");d&&o.add(d);const m=(u=r.textContent)==null?void 0:u.trim();m&&n.add(m.substring(0,100))}),i.classList.contains("hidden")){console.log("Support: Making liveChatMessages visible for new messages"),i.classList.remove("hidden");const r=document.getElementById("faqTopicsSection");r&&r.classList.add("hidden");const d=document.getElementById("chatInputArea");d&&d.classList.remove("hidden")}const a=[];s.forEach(r=>{var g;const d=r.id,m=r.data(),u=((g=m.text)==null?void 0:g.trim())||"",l=i.querySelector(`[data-msg-id="${d}"]`),w=l!==null;let y=!1;if(w){const h=window.getComputedStyle(l);h.display!=="none"&&h.visibility!=="hidden"&&!l.classList.contains("hidden")?y=!0:(console.log("Support: Removing hidden duplicate message:",d),l.remove())}if(!y&&!o.has(d)){const h=u.substring(0,100);if(u.length>0&&n.has(h)){const B=Array.from(i.querySelectorAll("[data-msg-id]")).find(I=>{var A;return((A=I.textContent)==null?void 0:A.trim().substring(0,100))===h});if(B){const I=window.getComputedStyle(B);I.display!=="none"&&I.visibility!=="hidden"&&(y=!0)}}}if(!y){a.push({id:d,...m}),o.add(d);const h=u.substring(0,100);h&&n.add(h)}}),a.sort((r,d)=>{var l,w;const m=(l=r.timestamp)!=null&&l.toDate?r.timestamp.toDate().getTime():r.timestamp||0,u=(w=d.timestamp)!=null&&w.toDate?d.timestamp.toDate().getTime():d.timestamp||0;return m-u}),a.length>0&&console.log(`Adding ${a.length} new messages to UI`),a.forEach(r=>{j(r,!0),r.sender==="admin"&&!r.read&&(window.chatModal.unreadCount=(window.chatModal.unreadCount||0)+1,M(window.chatModal.unreadCount))});const c=()=>{i&&(i.scrollTop=i.scrollHeight)};c(),setTimeout(c,100),setTimeout(c,300),setTimeout(c,600)},s=>{console.error("Realtime listener error:",s)})}catch(e){console.error("Error setting up realtime listener:",e)}}}function j(e,t=!1){var w,y;const s=document.getElementById("liveChatMessages");if(!s){console.warn("Messages area not found");return}if(s.classList.contains("hidden")){console.log("Support: Making liveChatMessages visible for message display"),s.classList.remove("hidden");const g=document.getElementById("faqTopicsSection");g&&g.classList.add("hidden");const h=document.getElementById("chatInputArea");h&&h.classList.remove("hidden")}const i=e.sender==="user",o=e.id||`msg_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,n=s.querySelector(`[data-msg-id="${o}"]`);if(n){const g=window.getComputedStyle(n);if(g.display!=="none"&&g.visibility!=="hidden"){console.log("Message already exists and is visible, skipping:",o);return}else console.log("Message exists but is hidden, removing and re-adding:",o),n.remove()}const a=document.createElement("div");a.className=`flex ${i?"justify-end":"justify-start"} mb-3`,a.setAttribute("data-msg-id",o),a.setAttribute("data-timestamp",(w=e.timestamp)!=null&&w.toDate?e.timestamp.toDate().getTime():Date.now());let c="";const r=e.imageBase64||e.imageUrl;r&&(c=`
                <div class="mb-2 rounded-xl overflow-hidden shadow-md">
                    <img src="${r}" alt="Shared image" class="max-w-full max-h-64 cursor-pointer hover:opacity-90 transition-opacity rounded-lg" onclick="window.open('${r}', '_blank')">
                </div>
            `);const d=e.text||"",m=J(e.timestamp);i?a.innerHTML=`
                <div class="max-w-[75%] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl rounded-tr-sm p-3 shadow-md">
                    ${c}
                    ${d?`<div class="text-sm leading-relaxed">${q(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-300 opacity-80 flex items-center justify-end gap-1">
                        ${m}
                        <i class="fas fa-check ml-1 text-xs"></i>
                    </div>
                </div>
            `:a.innerHTML=`
                <div class="max-w-[75%] bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    ${c}
                    ${d?`<div class="text-sm leading-relaxed text-gray-800">${q(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-400">${m}</div>
                </div>
            `,s.appendChild(a),a.offsetHeight;const u=window.getComputedStyle(a);(u.display==="none"||u.visibility==="hidden")&&(console.warn("Support: Message element is hidden after append, forcing visibility:",o),a.style.display="flex",a.style.visibility="visible"),s.classList.contains("hidden")&&(console.warn("Support: Parent container was hidden, making visible"),s.classList.remove("hidden"));const l=()=>{s&&(s.scrollTop=s.scrollHeight)};l(),setTimeout(l,50),setTimeout(l,200),setTimeout(l,500),t&&setTimeout(()=>{const g=window.getComputedStyle(a);(g.display==="none"||g.visibility==="hidden"||a.classList.contains("hidden"))&&(console.warn("Support: Message became hidden after render, fixing:",o),a.style.display="flex",a.style.visibility="visible",a.classList.remove("hidden")),s.classList.contains("hidden")&&(console.warn("Support: Parent became hidden, fixing"),s.classList.remove("hidden"))},100),t&&console.log("Added message to UI:",{msgId:o,sender:e.sender,text:(y=e.text)==null?void 0:y.substring(0,50)})}function q(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function J(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}function R(){const e=document.getElementById("liveChatMessages");if(!e||document.getElementById("welcomeMessage"))return;const t=document.createElement("div");t.id="welcomeMessage",t.className="flex justify-center mb-4",t.innerHTML=`
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
        `,e.appendChild(t),e.scrollTop=e.scrollHeight}async function W(){var e;window.chatModal.currentUserId||(window.chatModal.currentUserId=p.currentUser.uid);try{const t=((e=p.currentUser)==null?void 0:e.email)||"User",s=await $(v(f,"live_chats"),{userId:window.chatModal.currentUserId,userName:t,isAnonymous:!1,status:"open",createdAt:C(),lastMessageAt:C()});window.chatModal.currentChatId=s.id,await T()}catch(t){throw console.error("Error creating chat:",t),alert("Failed to start chat. Please try again."),t}}window.sendChatMessage=async function(){const e=document.getElementById("chatMessageInput"),t=document.getElementById("sendMessageBtn"),s=e.value.trim(),i=window.chatModal.selectedImageBase64!==null;if(!s&&!i)return;const o=document.getElementById("liveChatMessages");if(o&&o.classList.contains("hidden")){console.log("Support: Making liveChatMessages visible before sending message"),o.classList.remove("hidden");const n=document.getElementById("faqTopicsSection");n&&n.classList.add("hidden");const a=document.getElementById("chatInputArea");a&&a.classList.remove("hidden"),window.chatModal.chatMode="live"}if(!window.chatModal.currentChatId)try{await W()}catch{return}t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{let n=null;i&&(n=window.chatModal.selectedImageBase64,removeImagePreview());const a={text:s||(i?"📷 Image":""),sender:"user",timestamp:C(),read:!1};n&&(a.imageBase64=n),await $(v(f,"live_chats",window.chatModal.currentChatId,"messages"),a),await H(P(f,"live_chats",window.chatModal.currentChatId),{lastMessageAt:C(),status:"open"}),e.value=""}catch(n){console.error("Error sending message:",n),alert("Failed to send message. Please try again.")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-paper-plane"></i>')}};window.startLiveChat=function(){window.chatModal.chatMode="live",document.getElementById("faqTopicsSection").classList.add("hidden"),document.getElementById("liveChatMessages").classList.remove("hidden"),document.getElementById("chatInputArea").classList.remove("hidden"),R(),window.chatModal.currentChatId?E():W().then(()=>{E()})};var U;(U=document.getElementById("imageInput"))==null||U.addEventListener("change",function(e){const t=e.target.files[0];if(!t)return;if(t.size>700*1024){alert("Image size must be less than 700KB. Please compress the image.");return}if(!t.type.startsWith("image/")){alert("Please select an image file");return}const s=new FileReader;s.onload=i=>{const o=document.getElementById("imagePreview"),n=document.getElementById("imagePreviewContainer");o.src=i.target.result,n.classList.remove("hidden"),window.chatModal.selectedImageBase64=i.target.result,window.chatModal.selectedImageFile=t},s.readAsDataURL(t)});window.removeImagePreview=function(){document.getElementById("imagePreviewContainer").classList.add("hidden"),document.getElementById("imageInput").value="",window.chatModal.selectedImageFile=null,window.chatModal.selectedImageBase64=null};document.querySelectorAll(".faq-topic-card").forEach(e=>{e.addEventListener("click",function(){const t=this.dataset.topic;O(t)})});function O(e){const t=N[e];if(!t)return;const s=document.getElementById("faqTopicsSection");s.innerHTML=`
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl">
                <div class="font-semibold text-blue-900 mb-2">${Q[e]}</div>
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
        `,document.querySelectorAll(".faq-topic-card").forEach(t=>{t.addEventListener("click",function(){const s=this.dataset.topic;O(s)})})};window.openChatModal=function(){document.getElementById("chatModal").classList.remove("hidden"),document.body.style.overflow="hidden",S(),K()};window.closeChatModal=function(){document.getElementById("chatModal").classList.add("hidden"),document.body.style.overflow="",window.chatModal.chatMode="faq",document.getElementById("faqTopicsSection").classList.remove("hidden"),document.getElementById("liveChatMessages").classList.add("hidden"),document.getElementById("chatInputArea").classList.add("hidden"),window.chatModal.realtimeUnsubscribe&&(window.chatModal.realtimeUnsubscribe(),window.chatModal.realtimeUnsubscribe=null)};var k;(k=document.getElementById("chatModal"))==null||k.addEventListener("click",function(e){e.target===this&&window.closeChatModal()});(async function(){const e=window.__onAuthStateChanged;if(!e){console.warn("Auth state listener unavailable.");return}p.currentUser&&S(),e(p,t=>{t?(window.chatModal.currentUserId=t.uid,S()):(window.chatModal.unreadListener&&(window.chatModal.unreadListener(),window.chatModal.unreadListener=null),M(0))})})();
