import"./modulepreload-polyfill-B5Qt9EMX.js";import{o as H,b as w,s as z,e as T,f as F,h as b,a as y,u as _,d as R,q as S,w as C,p as E,r as j,j as W}from"./firebase-client-C4wrmMWL.js";import"./firebase-config-BJbrxyFw.js";window.__onAuthStateChanged=H;H(w,async e=>{e||(console.log("No user signed in, redirecting to sign-in page."),window.location.href="login.html")});window.signOut=function(){z(w).then(()=>{alert("Signed out successfully!"),window.location.href="login.html"}).catch(e=>{alert("Error signing out: "+e.message)})};window.chatModal={currentChatId:null,currentUserId:null,realtimeUnsubscribe:null,unreadListener:null,unreadCount:0,selectedImageBase64:null,selectedImageFile:null,chatMode:"faq"};const K={"account-setup":"To open an banking account with Twenty Forth & Fifth, please visit our sign-up page and complete the registration form. You'll need to provide identification documents and proof of address. Our compliance team will review your application within 1-2 business days.",transfers:"You can make international wire transfers through your online dashboard. Navigate to the Transfer section, enter the recipient details, amount, and currency. Transfers are typically processed within 1-3 business days. Fees vary by currency and destination.",fees:"Our fee structure is transparent and competitive. Account maintenance fees start at $50/month. Wire transfer fees range from $25-$75 depending on currency and destination. Please contact us for a detailed fee schedule tailored to your needs.",security:"Your account is protected by bank-level encryption, multi-factor authentication, and regular security audits. We comply with international banking regulations and maintain strict KYC/AML procedures. Your funds are held in segregated accounts.","multi-currency":"We support over 20 major currencies including USD, EUR, GBP, JPY, CHF, AUD, CAD, and more. You can hold multiple currencies in a single account and convert between them at competitive exchange rates.",investment:"We offer various investment options including fixed deposits, treasury bonds, and managed investment portfolios. Minimum investment amounts and returns vary by product. Please schedule a consultation with our investment team for personalized advice."},G={"account-setup":"📋 Account Setup",transfers:"💸 International Transfers",fees:"💰 Fees & Charges",security:"🔒 Security & Compliance","multi-currency":"🌍 Multi-Currency Accounts",investment:"📈 Investment Services"};async function B(){if(!w.currentUser){console.warn("Cannot initialize chat: User not authenticated");return}window.chatModal.currentUserId=w.currentUser.uid,await X(),await J()}async function J(){if(window.chatModal.currentUserId){window.chatModal.unreadListener&&window.chatModal.unreadListener();try{const e=S(b(y,"live_chats"),C("userId","==",window.chatModal.currentUserId)),t=await E(e);if(t.empty){L(0);return}const s=t.docs[0].id;window.chatModal.currentChatId=s;const r=b(y,"live_chats",s,"messages"),n=S(r,C("read","==",!1),C("sender","==","admin"));window.chatModal.unreadListener=W(n,i=>{const a=i.size;window.chatModal.unreadCount=a,L(a)},i=>{console.error("Error listening to unread messages:",i)})}catch(e){console.error("Error setting up unread listener:",e)}}}function L(e){const t=document.getElementById("chatUnreadBadge");t&&(e>0?(t.textContent=e>99?"99+":e,t.classList.remove("hidden"),t.classList.add("animate-pulse"),setTimeout(()=>t.classList.remove("animate-pulse"),2e3)):t.classList.add("hidden"))}async function V(){if(window.chatModal.currentChatId)try{const e=b(y,"live_chats",window.chatModal.currentChatId,"messages"),t=S(e,C("read","==",!1),C("sender","==","admin")),s=await E(t),r=[];s.forEach(n=>{r.push(_(R(y,"live_chats",window.chatModal.currentChatId,"messages",n.id),{read:!0}))}),await Promise.all(r),L(0)}catch(e){console.error("Error marking messages as read:",e)}}async function X(){if(window.chatModal.currentUserId)try{const e=String(window.chatModal.currentUserId);let t=null,s=0;const r=3;for(;s<r&&!t;)try{const n=S(b(y,"live_chats"),C("userId","==",e));t=await E(n);break}catch(n){if(s++,console.warn(`Chat query attempt ${s} failed:`,n),s<r)await new Promise(i=>setTimeout(i,200*s));else throw n}if(t&&!t.empty){const n=t.docs.sort((i,a)=>{var d,h,l,c,f,p,u,g,x,v,M,I;const m=((l=(h=(d=i.data().lastMessageAt)==null?void 0:d.toDate)==null?void 0:h.call(d))==null?void 0:l.getTime())||((p=(f=(c=i.data().createdAt)==null?void 0:c.toDate)==null?void 0:f.call(c))==null?void 0:p.getTime())||0;return(((x=(g=(u=a.data().lastMessageAt)==null?void 0:u.toDate)==null?void 0:g.call(u))==null?void 0:x.getTime())||((I=(M=(v=a.data().createdAt)==null?void 0:v.toDate)==null?void 0:M.call(v))==null?void 0:I.getTime())||0)-m});window.chatModal.currentChatId=n[0].id,console.log("Loaded existing chat:",window.chatModal.currentChatId),await U(),A()}else console.log("No existing chat found for user:",e)}catch(e){console.error("Error loading chat:",e),e.message&&console.error("Error details:",e.message)}}async function U(){if(window.chatModal.currentChatId)try{const e=b(y,"live_chats",window.chatModal.currentChatId,"messages");let t=null,s=0;const r=3;for(;s<r&&!t;)try{const i=S(e,j("timestamp","asc"));t=await E(i);break}catch(i){if(s++,console.warn(`Messages query attempt ${s} failed:`,i),s<r)await new Promise(a=>setTimeout(a,200*s));else throw i}if(!t){console.error("Failed to load messages after retries");return}const n=document.getElementById("liveChatMessages");if(n){n.classList.remove("hidden");const i=document.getElementById("faqTopicsSection");i&&i.classList.add("hidden");const a=document.getElementById("chatInputArea");a&&a.classList.remove("hidden"),n.innerHTML="",O();const m=[];t.forEach(o=>{m.push({id:o.id,...o.data()})}),m.sort((o,d)=>{var c,f;const h=(c=o.timestamp)!=null&&c.toDate?o.timestamp.toDate().getTime():o.timestamp||0,l=(f=d.timestamp)!=null&&f.toDate?d.timestamp.toDate().getTime():d.timestamp||0;return h-l}),m.forEach(o=>{N(o,!1)}),setTimeout(()=>{n.scrollTop=n.scrollHeight},100)}await A()}catch(e){console.error("Error loading messages:",e)}}async function A(){if(window.chatModal.currentChatId){window.chatModal.realtimeUnsubscribe&&window.chatModal.realtimeUnsubscribe();try{const e=b(y,"live_chats",window.chatModal.currentChatId,"messages"),t=S(e,j("timestamp","asc"));window.chatModal.realtimeUnsubscribe=W(t,s=>{const r=document.getElementById("liveChatMessages");if(!r){console.warn("Messages area not found in realtime listener");return}const n=new Set,i=new Set;if(r.querySelectorAll("[data-msg-id]").forEach(o=>{var l;const d=o.getAttribute("data-msg-id");d&&n.add(d);const h=(l=o.textContent)==null?void 0:l.trim();h&&i.add(h.substring(0,100))}),r.classList.contains("hidden")){console.log("Support: Making liveChatMessages visible for new messages"),r.classList.remove("hidden");const o=document.getElementById("faqTopicsSection");o&&o.classList.add("hidden");const d=document.getElementById("chatInputArea");d&&d.classList.remove("hidden")}const a=[];s.forEach(o=>{var u;const d=o.id,h=o.data(),l=((u=h.text)==null?void 0:u.trim())||"",c=r.querySelector(`[data-msg-id="${d}"]`),f=c!==null;let p=!1;if(f){const g=window.getComputedStyle(c);g.display!=="none"&&g.visibility!=="hidden"&&!c.classList.contains("hidden")?p=!0:(console.log("Support: Removing hidden duplicate message:",d),c.remove())}if(!p&&!n.has(d)){const g=l.substring(0,100);if(l.length>0&&i.has(g)){const x=Array.from(r.querySelectorAll("[data-msg-id]")).find(v=>{var M;return((M=v.textContent)==null?void 0:M.trim().substring(0,100))===g});if(x){const v=window.getComputedStyle(x);v.display!=="none"&&v.visibility!=="hidden"&&(p=!0)}}}if(!p){a.push({id:d,...h}),n.add(d);const g=l.substring(0,100);g&&i.add(g)}}),a.sort((o,d)=>{var c,f;const h=(c=o.timestamp)!=null&&c.toDate?o.timestamp.toDate().getTime():o.timestamp||0,l=(f=d.timestamp)!=null&&f.toDate?d.timestamp.toDate().getTime():d.timestamp||0;return h-l}),a.length>0&&console.log(`Adding ${a.length} new messages to UI`),a.forEach(o=>{N(o,!0),o.sender==="admin"&&!o.read&&(window.chatModal.unreadCount=(window.chatModal.unreadCount||0)+1,L(window.chatModal.unreadCount))});const m=()=>{r&&(r.scrollTop=r.scrollHeight)};m(),setTimeout(m,100),setTimeout(m,300),setTimeout(m,600)},s=>{console.error("Realtime listener error:",s)})}catch(e){console.error("Error setting up realtime listener:",e)}}}function N(e,t=!1){var f,p;const s=document.getElementById("liveChatMessages");if(!s){console.warn("Messages area not found");return}if(s.classList.contains("hidden")){console.log("Support: Making liveChatMessages visible for message display"),s.classList.remove("hidden");const u=document.getElementById("faqTopicsSection");u&&u.classList.add("hidden");const g=document.getElementById("chatInputArea");g&&g.classList.remove("hidden")}const r=e.sender==="user",n=e.id||`msg_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,i=s.querySelector(`[data-msg-id="${n}"]`);if(i){const u=window.getComputedStyle(i);if(u.display!=="none"&&u.visibility!=="hidden"){console.log("Message already exists and is visible, skipping:",n);return}else console.log("Message exists but is hidden, removing and re-adding:",n),i.remove()}const a=document.createElement("div");a.className=`flex ${r?"justify-end":"justify-start"} mb-3`,a.setAttribute("data-msg-id",n),a.setAttribute("data-timestamp",(f=e.timestamp)!=null&&f.toDate?e.timestamp.toDate().getTime():Date.now());let m="";const o=e.imageBase64||e.imageUrl;o&&(m=`
                <div class="mb-2 rounded-xl overflow-hidden shadow-md">
                    <img src="${o}" alt="Shared image" class="max-w-full max-h-64 cursor-pointer hover:opacity-90 transition-opacity rounded-lg" onclick="window.open('${o}', '_blank')">
                </div>
            `);const d=e.text||"",h=Z(e.timestamp);r?a.innerHTML=`
                <div class="max-w-[75%] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl rounded-tr-sm p-3 shadow-md">
                    ${m}
                    ${d?`<div class="text-sm leading-relaxed">${D(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-300 opacity-80 flex items-center justify-end gap-1">
                        ${h}
                        <i class="fas fa-check ml-1 text-xs"></i>
                    </div>
                </div>
            `:a.innerHTML=`
                <div class="max-w-[75%] bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    ${m}
                    ${d?`<div class="text-sm leading-relaxed text-gray-800">${D(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-400">${h}</div>
                </div>
            `,s.appendChild(a),a.offsetHeight;const l=window.getComputedStyle(a);(l.display==="none"||l.visibility==="hidden")&&(console.warn("Support: Message element is hidden after append, forcing visibility:",n),a.style.display="flex",a.style.visibility="visible"),s.classList.contains("hidden")&&(console.warn("Support: Parent container was hidden, making visible"),s.classList.remove("hidden"));const c=()=>{s&&(s.scrollTop=s.scrollHeight)};c(),setTimeout(c,50),setTimeout(c,200),setTimeout(c,500),t&&setTimeout(()=>{const u=window.getComputedStyle(a);(u.display==="none"||u.visibility==="hidden"||a.classList.contains("hidden"))&&(console.warn("Support: Message became hidden after render, fixing:",n),a.style.display="flex",a.style.visibility="visible",a.classList.remove("hidden")),s.classList.contains("hidden")&&(console.warn("Support: Parent became hidden, fixing"),s.classList.remove("hidden"))},100),t&&console.log("Added message to UI:",{msgId:n,sender:e.sender,text:(p=e.text)==null?void 0:p.substring(0,50)})}function D(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function Z(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}function O(){const e=document.getElementById("liveChatMessages");if(!e||document.getElementById("welcomeMessage"))return;const t=document.createElement("div");t.id="welcomeMessage",t.className="flex justify-center mb-4",t.innerHTML=`
            <div class="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 border border-gray-200 rounded-2xl p-5 max-w-[90%] shadow-lg">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center shadow-md">
                            <i class="fas fa-headset text-white text-lg"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900 mb-2 text-base">Welcome to Twenty Forth & Fifth Support! 👋</h4>
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
                                <i class="fas fa-shield-alt text-green-500"></i>
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,e.appendChild(t),e.scrollTop=e.scrollHeight}async function Q(){var e;if(!w.currentUser)throw alert("Please log in to start a chat."),sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html",new Error("User not authenticated");window.chatModal.currentUserId||(window.chatModal.currentUserId=w.currentUser.uid);try{const t=String(window.chatModal.currentUserId),s=S(b(y,"live_chats"),C("userId","==",t)),r=await E(s);if(!r.empty){const a=r.docs.sort((m,o)=>{var l,c,f,p,u,g,x,v,M,I,q,k;const d=((f=(c=(l=m.data().lastMessageAt)==null?void 0:l.toDate)==null?void 0:c.call(l))==null?void 0:f.getTime())||((g=(u=(p=m.data().createdAt)==null?void 0:p.toDate)==null?void 0:u.call(p))==null?void 0:g.getTime())||0;return(((M=(v=(x=o.data().lastMessageAt)==null?void 0:x.toDate)==null?void 0:v.call(x))==null?void 0:M.getTime())||((k=(q=(I=o.data().createdAt)==null?void 0:I.toDate)==null?void 0:q.call(I))==null?void 0:k.getTime())||0)-d});window.chatModal.currentChatId=a[0].id,console.log("Using existing chat:",window.chatModal.currentChatId),A();return}const n=((e=w.currentUser)==null?void 0:e.email)||"User",i=await F(b(y,"live_chats"),{userId:t,userName:n,userEmail:w.currentUser.email||"",isAnonymous:!1,status:"open",createdAt:T(),lastMessageAt:T()});window.chatModal.currentChatId=i.id,await A()}catch(t){throw console.error("Error creating chat:",t),alert("Failed to start chat. Please try again."),t}}window.sendChatMessage=async function(){if(!w.currentUser){alert("Please log in to send messages."),sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}const e=document.getElementById("chatMessageInput"),t=document.getElementById("sendMessageBtn"),s=e.value.trim(),r=window.chatModal.selectedImageBase64!==null;if(!s&&!r)return;const n=document.getElementById("liveChatMessages");if(n&&n.classList.contains("hidden")){console.log("Support: Making liveChatMessages visible before sending message"),n.classList.remove("hidden");const i=document.getElementById("faqTopicsSection");i&&i.classList.add("hidden");const a=document.getElementById("chatInputArea");a&&a.classList.remove("hidden"),window.chatModal.chatMode="live"}if(!window.chatModal.currentChatId)try{await Q()}catch{return}t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{let i=null;r&&(i=window.chatModal.selectedImageBase64,removeImagePreview());const a={text:s||(r?"📷 Image":""),sender:"user",timestamp:T(),read:!1};i&&(a.imageBase64=i),await F(b(y,"live_chats",window.chatModal.currentChatId,"messages"),a),await _(R(y,"live_chats",window.chatModal.currentChatId),{lastMessageAt:T(),status:"open"}),e.value=""}catch(i){console.error("Error sending message:",i),alert("Failed to send message. Please try again.")}finally{t&&(t.disabled=!1,t.innerHTML='<i class="fas fa-paper-plane"></i>')}};window.startLiveChat=function(){if(!w.currentUser){alert("Please log in to start a live chat."),sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}window.chatModal.chatMode="live",document.getElementById("faqTopicsSection").classList.add("hidden"),document.getElementById("liveChatMessages").classList.remove("hidden"),document.getElementById("chatInputArea").classList.remove("hidden"),O(),window.chatModal.currentChatId?U():Q().then(()=>{U()})};var P;(P=document.getElementById("imageInput"))==null||P.addEventListener("change",function(e){const t=e.target.files[0];if(!t)return;if(t.size>700*1024){alert("Image size must be less than 700KB. Please compress the image.");return}if(!t.type.startsWith("image/")){alert("Please select an image file");return}const s=new FileReader;s.onload=r=>{const n=document.getElementById("imagePreview"),i=document.getElementById("imagePreviewContainer");n.src=r.target.result,i.classList.remove("hidden"),window.chatModal.selectedImageBase64=r.target.result,window.chatModal.selectedImageFile=t},s.readAsDataURL(t)});window.removeImagePreview=function(){document.getElementById("imagePreviewContainer").classList.add("hidden"),document.getElementById("imageInput").value="",window.chatModal.selectedImageFile=null,window.chatModal.selectedImageBase64=null};document.querySelectorAll(".faq-topic-card").forEach(e=>{e.addEventListener("click",function(){const t=this.dataset.topic;Y(t)})});function Y(e){const t=K[e];if(!t)return;const s=document.getElementById("faqTopicsSection");s.innerHTML=`
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
                <div class="font-semibold text-green-900 mb-2">${G[e]}</div>
                <div class="text-sm text-gray-700 mb-4">${t}</div>
                <button onclick="resetFAQ()" class="text-green-600 hover:text-green-800 text-sm font-semibold flex items-center gap-1">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to Topics</span>
                </button>
            </div>
        `}window.resetFAQ=function(){const e=document.getElementById("faqTopicsSection");e.innerHTML=`
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-1">Popular Topics</div>
            
            <div class="faq-topic-card bg-white p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all group" data-topic="account-setup">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors flex-shrink-0">
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
                    <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors flex-shrink-0">
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
        `,document.querySelectorAll(".faq-topic-card").forEach(t=>{t.addEventListener("click",function(){const s=this.dataset.topic;Y(s)})})};window.openChatModal=function(){if(!w.currentUser){sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}document.getElementById("chatModal").classList.remove("hidden"),document.body.style.overflow="hidden",B(),V()};window.closeChatModal=function(){document.getElementById("chatModal").classList.add("hidden"),document.body.style.overflow="",window.chatModal.chatMode="faq",document.getElementById("faqTopicsSection").classList.remove("hidden"),document.getElementById("liveChatMessages").classList.add("hidden"),document.getElementById("chatInputArea").classList.add("hidden"),window.chatModal.realtimeUnsubscribe&&(window.chatModal.realtimeUnsubscribe(),window.chatModal.realtimeUnsubscribe=null)};var $;($=document.getElementById("chatModal"))==null||$.addEventListener("click",function(e){e.target===this&&window.closeChatModal()});(async function(){const e=window.__onAuthStateChanged;if(!e){console.warn("Auth state listener unavailable.");return}w.currentUser&&(B(),new URLSearchParams(window.location.search).get("openChat")==="true"&&(window.history.replaceState({},document.title,window.location.pathname),setTimeout(()=>{window.openChatModal()},500))),e(w,t=>{t?(window.chatModal.currentUserId=t.uid,B(),new URLSearchParams(window.location.search).get("openChat")==="true"&&(window.history.replaceState({},document.title,window.location.pathname),setTimeout(()=>{window.openChatModal()},500))):(window.chatModal.unreadListener&&(window.chatModal.unreadListener(),window.chatModal.unreadListener=null),L(0))})})();
