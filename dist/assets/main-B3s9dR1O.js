const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/firebase-client-C4wrmMWL.js","assets/firebase-config-BJbrxyFw.js"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css             */import{_ as T}from"./preload-helper-D7HrI6pR.js";import{b as W,q as H,h as O,a as $,w as P,p as z}from"./firebase-client-C4wrmMWL.js";import{onAuthStateChanged as R}from"https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";import"./firebase-config-BJbrxyFw.js";const q=document.createElement("style");q.textContent=`
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fade-in {
        animation: fade-in 0.3s ease-out;
    }
    #chatMessages::-webkit-scrollbar {
        width: 6px;
    }
    #chatMessages::-webkit-scrollbar-track {
        background: transparent;
    }
    #chatMessages::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
    }
    #chatMessages::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
    /* Prevent zoom on focus - iOS Safari fix */
    #chatMessageInput, #adminReplyInput, #imageInput {
        font-size: 16px !important;
    }
    #chatMessageInput:focus, #adminReplyInput:focus {
        font-size: 16px !important;
    }
    /* Global prevent zoom on all inputs */
    input[type="text"], input[type="email"], input[type="password"], 
    input[type="number"], input[type="tel"], input[type="search"],
    textarea, select {
        font-size: 16px !important;
    }
    input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus,
    input[type="number"]:focus, input[type="tel"]:focus, input[type="search"]:focus,
    textarea:focus, select:focus {
        font-size: 16px !important;
    }
    /* Prevent text size adjustment */
    html {
        -webkit-text-size-adjust: 100% !important;
        text-size-adjust: 100% !important;
    }
    /* Mobile-specific chat fixes */
    @media (max-width: 768px) {
        #chatWindow {
            width: calc(100vw - 24px) !important;
            max-width: 400px !important;
            height: calc(100vh - 120px) !important;
            max-height: 600px !important;
            bottom: 80px !important;
            right: 12px !important;
            left: auto !important;
        }
        #liveChatSection {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        #liveChatSection.hidden {
            display: none !important;
        }
        #liveChatSection > div {
            display: flex !important;
            visibility: visible !important;
        }
        #liveChatSection [data-msg-id] {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
    }
`;document.head.appendChild(q);class F{constructor(){this.isOpen=!1,this.chatMode="faq",this.currentUserId=null,this.currentChatId=null,this.unreadCount=0,this.isAuthenticated=!1,this.userName=null,this.selectedImageFile=null,this.selectedImageBase64=null,this.realtimeUnsubscribe=null,window.location.hash==="#open-chat"&&sessionStorage.setItem("fci_open_chat","true"),this.init()}init(){this.createWidget(),this.loadUserAuth(),this.setupFAQ(),this.restoreChatSession(),this.checkAndOpenChat(),window.addEventListener("hashchange",()=>{this.checkAndOpenChat()}),setTimeout(()=>{this.shouldOpenChat()&&this.checkAndOpenChat()},1e3),setTimeout(()=>{this.shouldOpenChat()&&this.checkAndOpenChat()},2500)}shouldOpenChat(){return window.location.hash==="#open-chat"||sessionStorage.getItem("fci_open_chat")==="true"}checkAndOpenChat(){if(this.shouldOpenChat()){sessionStorage.getItem("fci_open_chat")==="true"&&sessionStorage.removeItem("fci_open_chat");const t=(e=0)=>{const s=document.getElementById("chatWindow"),h=document.getElementById("chatToggleBtn");if(s&&h&&!this.isOpen){this.toggleChat(),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},300);return}e<50?setTimeout(()=>t(e+1),100):setTimeout(()=>{const r=document.getElementById("chatWindow"),g=document.getElementById("chatToggleBtn");r&&g&&!this.isOpen&&this.toggleChat()},1e3)};t(0),setTimeout(()=>t(0),500),setTimeout(()=>t(0),1500)}}async restoreChatSession(){const t=localStorage.getItem("fci_chat_session_id");if(t){this.currentUserId=t,this.isAuthenticated=!1;const e=localStorage.getItem(`fci_chat_id_${t}`);if(e){this.currentChatId=e;const s=localStorage.getItem(`fci_chat_unread_${e}`);s&&(this.unreadCount=parseInt(s)||0,this.updateBadgeDisplay()),await this.initializeFirebase()&&window.db&&(await this.setupRealtimeListener(),await this.updateUnreadCount())}}}updateBadgeDisplay(){const t=document.getElementById("chatBadge");t&&(this.unreadCount>0?(t.textContent=this.unreadCount>99?"99+":this.unreadCount,t.classList.remove("hidden")):t.classList.add("hidden"))}createWidget(){const t=document.createElement("div");t.id="liveChatWidget",t.innerHTML=`
            <!-- Chat Button (always visible) -->
            <button id="chatToggleBtn" class="fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-full shadow-xl flex items-center justify-center transition-all z-50 group hover:scale-110 hover:shadow-2xl" style="box-shadow: 0 10px 25px rgba(22, 163, 74, 0.4);">
                <div class="relative">
                    <img src="chat bot.png" alt="Chat Support" class="w-10 h-10 object-contain drop-shadow-sm" onerror="this.onerror=null; this.src='chat icon.png'; this.onerror=function() { this.style.display='none'; this.nextElementSibling.style.display='block'; }">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-sm hidden">
                        <defs>
                            <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#e0f2fe;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <path d="M8 6C6.89543 6 6 6.89543 6 8V20L10 16H24C25.1046 16 26 15.1046 26 14V8C26 6.89543 25.1046 6 24 6H8Z" fill="url(#chatGradient)" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="11" cy="11" r="1.2" fill="#16a34a"/>
                        <circle cx="16" cy="11" r="1.2" fill="#16a34a"/>
                        <circle cx="21" cy="11" r="1.2" fill="#16a34a"/>
                        <path d="M8 20L6 22V8C6 6.89543 6.89543 6 8 6H24C25.1046 6 26 6.89543 26 8V14C26 15.1046 25.1046 16 24 16H10L8 20Z" fill="white" opacity="0.2"/>
                    </svg>
                </div>
                <span id="chatBadge" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center hidden shadow-md border-2 border-white">0</span>
            </button>

            <!-- Chat Window -->
            <div id="chatWindow" class="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col hidden z-50 border border-gray-100 overflow-hidden" style="box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);">
                <!-- Header -->
                <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <i class="fas fa-headset text-lg"></i>
                        </div>
                        <div>
                            <div class="font-semibold text-sm">Twenty Forth & Fifth Support</div>
                            <div class="text-xs text-green-100 flex items-center gap-1">
                                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Online now
                            </div>
                        </div>
                    </div>
                    <button id="closeChatBtn" class="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Messages Area -->
                <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
                    <!-- FAQ Section (shown first) -->
                    <div id="faqSection" class="space-y-2">
                        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">Frequently Asked Questions</div>
                        <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="account-setup">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                                    <i class="fas fa-user-plus text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-semibold text-sm text-gray-900">Account Setup</div>
                                    <div class="text-xs text-gray-500 mt-0.5">How do I open an offshore account?</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                            </div>
                        </div>
                        <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="transfers">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                                    <i class="fas fa-exchange-alt text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-semibold text-sm text-gray-900">International Transfers</div>
                                    <div class="text-xs text-gray-500 mt-0.5">How do I make international wire transfers?</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                            </div>
                        </div>
                        <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="fees">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                                    <i class="fas fa-dollar-sign text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-semibold text-sm text-gray-900">Fees & Charges</div>
                                    <div class="text-xs text-gray-500 mt-0.5">What are your financial fees?</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                            </div>
                        </div>
                        <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="security">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
                                    <i class="fas fa-shield-alt text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-semibold text-sm text-gray-900">Security & Compliance</div>
                                    <div class="text-xs text-gray-500 mt-0.5">How secure is my account?</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                            </div>
                        </div>
                        <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="multi-currency">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                                    <i class="fas fa-globe text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-semibold text-sm text-gray-900">Multi-Currency Accounts</div>
                                    <div class="text-xs text-gray-500 mt-0.5">What currencies do you support?</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                            </div>
                        </div>
                        <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="investment">
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                    <i class="fas fa-chart-line text-sm"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-semibold text-sm text-gray-900">Investment Services</div>
                                    <div class="text-xs text-gray-500 mt-0.5">What investment options are available?</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                            </div>
                        </div>
                        <div class="mt-4 pt-4 border-t border-gray-200">
                            <button id="startLiveChatBtn" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                <i class="fas fa-comment-dots"></i>
                                <span>Start Live Chat</span>
                            </button>
                        </div>
                    </div>

                    <!-- Live Chat Messages (hidden initially) -->
                    <div id="liveChatSection" class="hidden space-y-3">
                        <!-- Messages will be inserted here -->
                    </div>
                </div>

                <!-- Input Area (only shown in live chat mode) -->
                <div id="chatInputArea" class="hidden p-4 border-t border-gray-100 bg-white">
                    <!-- Image Preview -->
                    <div id="imagePreviewContainer" class="hidden mb-3">
                        <div class="relative inline-block">
                            <img id="imagePreview" src="" alt="Preview" class="max-w-32 max-h-32 rounded-xl border-2 border-gray-200 shadow-sm">
                            <button id="removeImageBtn" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow-lg transition-transform hover:scale-110">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-2 items-end">
                        <input type="file" id="imageInput" accept="image/*" class="hidden">
                        <button id="attachImageBtn" class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-3 rounded-xl transition-all hover:scale-105" title="Attach image">
                            <i class="fas fa-image"></i>
                        </button>
                        <div class="flex-1 relative">
                            <textarea id="chatMessageInput" placeholder="Type your message..." 
                                class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 resize-none"
                                style="font-size: 16px !important; min-height: 48px; max-height: 150px;"
                                rows="1"></textarea>
                        </div>
                        <button id="sendMessageBtn" class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(t),this.attachEventListeners()}attachEventListeners(){document.getElementById("chatToggleBtn").addEventListener("click",()=>{if(!window.auth||!window.auth.currentUser){sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}this.toggleChat()}),document.getElementById("closeChatBtn").addEventListener("click",()=>this.closeChat()),document.getElementById("startLiveChatBtn").addEventListener("click",()=>{if(!window.auth||!window.auth.currentUser){sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}this.startLiveChat()}),document.getElementById("sendMessageBtn").addEventListener("click",()=>{if(!window.auth||!window.auth.currentUser){sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}this.sendMessage()});const t=document.getElementById("chatMessageInput");t.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&e.preventDefault()}),t.addEventListener("input",()=>{t.style.height="auto",t.style.height=Math.min(t.scrollHeight,150)+"px"}),document.getElementById("attachImageBtn").addEventListener("click",()=>{document.getElementById("imageInput").click()}),document.getElementById("imageInput").addEventListener("change",e=>this.handleImageSelect(e)),document.getElementById("removeImageBtn").addEventListener("click",()=>this.removeImagePreview()),document.querySelectorAll(".faq-item").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.topic;this.showFAQAnswer(s)})})}handleImageSelect(t){const e=t.target.files[0];if(!e)return;if(e.size>700*1024){alert("Image size must be less than 700KB. Please compress the image or use a smaller file.");return}if(!e.type.startsWith("image/")){alert("Please select an image file");return}const s=new FileReader;s.onload=h=>{const r=document.getElementById("imagePreview"),g=document.getElementById("imagePreviewContainer"),n=h.target.result;r.src=n,g.classList.remove("hidden"),this.selectedImageBase64=n,this.selectedImageFile=e},s.onerror=()=>{alert("Error reading image file. Please try again.")},s.readAsDataURL(e)}removeImagePreview(){document.getElementById("imagePreviewContainer").classList.add("hidden"),document.getElementById("imageInput").value="",this.selectedImageFile=null,this.selectedImageBase64=null}setupFAQ(){this.faqAnswers={"account-setup":"To open an account with Twenty Forth & Fifth, please visit our sign-up page and complete the registration form. You'll need to provide identification documents and proof of address. Our compliance team will review your application within 1-2 business days.",transfers:"You can make international wire transfers through your online dashboard. Navigate to the Transfer section, enter the recipient details, amount, and currency. Transfers are typically processed within 1-3 business days. Fees vary by currency and destination.",fees:"Our fee structure is transparent and competitive. Account maintenance fees start at $50/month. Wire transfer fees range from $25-$75 depending on currency and destination. Please contact us for a detailed fee schedule tailored to your needs.",security:"Your account is protected by bank-level encryption, multi-factor authentication, and regular security audits. We comply with international financial regulations and maintain strict KYC/AML procedures. Your funds are held in segregated accounts.","multi-currency":"We support over 20 major currencies including USD, EUR, GBP, JPY, CHF, AUD, CAD, and more. You can hold multiple currencies in a single account and convert between them at competitive exchange rates.",investment:"We offer various investment options including fixed deposits, treasury bonds, and managed investment portfolios. Minimum investment amounts and returns vary by product. Please schedule a consultation with our investment team for personalized advice."}}showFAQAnswer(t){const e=this.faqAnswers[t];if(!e)return;const s=document.getElementById("faqSection");s.innerHTML=`
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div class="font-semibold text-green-900 mb-2">${this.getTopicTitle(t)}</div>
                <div class="text-sm text-gray-700">${e}</div>
                <button id="backToFAQ" class="mt-3 text-green-600 hover:text-green-800 text-sm font-semibold">
                    <i class="fas fa-arrow-left mr-1"></i>Back to FAQs
                </button>
            </div>
        `,document.getElementById("backToFAQ").addEventListener("click",()=>{this.resetFAQ()})}getTopicTitle(t){return{"account-setup":"📋 Account Setup",transfers:"💸 International Transfers",fees:"💰 Fees & Charges",security:"🔒 Security & Compliance","multi-currency":"🌍 Multi-Currency Accounts",investment:"📈 Investment Services"}[t]||t}resetFAQ(){const t=document.getElementById("faqSection");t.innerHTML=`
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">Frequently Asked Questions</div>
            <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="account-setup">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                        <i class="fas fa-user-plus text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">Account Setup</div>
                        <div class="text-xs text-gray-500 mt-0.5">How do I open an offshore account?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                </div>
            </div>
            <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="transfers">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                        <i class="fas fa-exchange-alt text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">International Transfers</div>
                        <div class="text-xs text-gray-500 mt-0.5">How do I make international wire transfers?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                </div>
            </div>
            <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="fees">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 group-hover:bg-yellow-100 transition-colors">
                        <i class="fas fa-dollar-sign text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">Fees & Charges</div>
                        <div class="text-xs text-gray-500 mt-0.5">What are your banking fees?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                </div>
            </div>
            <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="security">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
                        <i class="fas fa-shield-alt text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">Security & Compliance</div>
                        <div class="text-xs text-gray-500 mt-0.5">How secure is my account?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                </div>
            </div>
            <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="multi-currency">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                        <i class="fas fa-globe text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">Multi-Currency Accounts</div>
                        <div class="text-xs text-gray-500 mt-0.5">What currencies do you support?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                </div>
            </div>
            <div class="faq-item bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:border-green-300 hover:shadow-md transition-all group" data-topic="investment">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                        <i class="fas fa-chart-line text-sm"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold text-sm text-gray-900">Investment Services</div>
                        <div class="text-xs text-gray-500 mt-0.5">What investment options are available?</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-300 text-xs mt-1 group-hover:text-green-500 transition-colors"></i>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
                <button id="startLiveChatBtn" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <i class="fas fa-comment-dots"></i>
                    <span>Start Live Chat</span>
                </button>
            </div>
        `,document.querySelectorAll(".faq-item").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.topic;this.showFAQAnswer(s)})}),document.getElementById("startLiveChatBtn").addEventListener("click",()=>this.startLiveChat())}async initializeFirebase(){if(!window.db)try{const t={apiKey:"AIzaSyDk8K22XfrsAQAX7WarxSq_BnwO1YQLDSc",authDomain:"twenty-third-forth-ee57c.firebaseapp.com",projectId:"twenty-third-forth-ee57c",storageBucket:"twenty-third-forth-ee57c.firebasestorage.app",messagingSenderId:"47210898997",appId:"1:47210898997:web:d25c23eee45a7660cef37c",measurementId:"G-ESYD665GWG"};try{const{db:e,auth:s}=await T(async()=>{const{db:h,auth:r}=await import("./firebase-client-C4wrmMWL.js").then(g=>g.y);return{db:h,auth:r}},__vite__mapDeps([0,1]));return window.db=e,window.auth=s,!0}catch{const{initializeApp:s,getApps:h}=await T(async()=>{const{initializeApp:l,getApps:d}=await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");return{initializeApp:l,getApps:d}},[]),{getFirestore:r}=await T(async()=>{const{getFirestore:l}=await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js");return{getFirestore:l}},[]),{getAuth:g}=await T(async()=>{const{getAuth:l}=await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js");return{getAuth:l}},[]),{getAnalytics:n}=await T(async()=>{const{getAnalytics:l}=await import("https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js");return{getAnalytics:l}},[]),m=h().length?h()[0]:s(t);window.db=r(m),window.auth=g(m),window.analytics=typeof window<"u"?n(m):null}}catch(t){return console.error("Error initializing Firebase:",t),!1}return!0}async getFirestoreFunctions(){try{return await T(()=>import("./firebase-client-C4wrmMWL.js").then(e=>e.x),__vite__mapDeps([0,1]))}catch{return await T(()=>import("https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"),[])}}async loadUserAuth(){if(!await this.initializeFirebase()){console.error("Failed to initialize Firebase");return}window.auth?window.auth.currentUser?(this.currentUserId=window.auth.currentUser.uid,this.isAuthenticated=!0,await this.loadOrCreateChat(),this.setupRealtimeListener()):(window.auth.onAuthStateChanged(e=>{e?(this.currentUserId=e.uid,this.isAuthenticated=!0,this.loadOrCreateChat(),this.setupRealtimeListener()):this.setupAnonymousUser()}),this.setupAnonymousUser()):this.setupAnonymousUser()}setupAnonymousUser(){let t=localStorage.getItem("fci_chat_session_id");t||(t="anon_"+Date.now()+"_"+Math.random().toString(36).substr(2,9),localStorage.setItem("fci_chat_session_id",t)),this.currentUserId=t,this.isAuthenticated=!1,this.userName="Guest User"}async loadOrCreateChat(){if(this.currentUserId||this.setupAnonymousUser(),!!await this.initializeFirebase())try{const e=await this.getFirestoreFunctions(),{collection:s,query:h,where:r,getDocs:g}=e;if(!this.isAuthenticated)return;const n=String(this.currentUserId);let m=null,l=0;const d=3;for(;l<d&&!m;)try{const u=h(s(window.db,"live_chats"),r("userId","==",n));m=await g(u);break}catch(u){if(l++,console.warn(`Chat query attempt ${l} failed:`,u),l<d)await new Promise(f=>setTimeout(f,200*l));else throw u}if(m&&!m.empty){const u=m.docs.sort((f,a)=>{var o,p,x,v,w,L,b,A,y,I,E,B;const i=((x=(p=(o=f.data().lastMessageAt)==null?void 0:o.toDate)==null?void 0:p.call(o))==null?void 0:x.getTime())||((L=(w=(v=f.data().createdAt)==null?void 0:v.toDate)==null?void 0:w.call(v))==null?void 0:L.getTime())||0;return(((y=(A=(b=a.data().lastMessageAt)==null?void 0:b.toDate)==null?void 0:A.call(b))==null?void 0:y.getTime())||((B=(E=(I=a.data().createdAt)==null?void 0:I.toDate)==null?void 0:E.call(I))==null?void 0:B.getTime())||0)-i});this.currentChatId=u[0].id,console.log("Loaded existing chat:",this.currentChatId),await this.loadMessages()}else console.log("No existing chat found for user:",n)}catch(e){console.error("Error loading chat:",e),e.message&&console.error("Error details:",e.message)}}async loadMessages(){if(!(!this.currentChatId||!window.db))try{const t=await this.getFirestoreFunctions(),{collection:e,query:s,orderBy:h,getDocs:r}=t,g=e(window.db,"live_chats",this.currentChatId,"messages");let n=null,m=0;const l=3;for(;m<l&&!n;)try{const u=s(g,h("timestamp","asc"));n=await r(u);break}catch(u){if(m++,console.warn(`Messages query attempt ${m} failed:`,u),m<l)await new Promise(f=>setTimeout(f,200*m));else throw u}if(!n){console.error("Failed to load messages after retries");return}const d=document.getElementById("liveChatSection");if(d){d.classList.remove("hidden");const u=document.getElementById("faqSection");u&&u.classList.add("hidden");const f=document.getElementById("chatInputArea");f&&f.classList.remove("hidden"),this.chatMode="live",d.innerHTML="",this.showWelcomeMessage();const a=[];n.forEach(i=>{const c={id:i.id,...i.data()};a.push(c)}),a.sort((i,c)=>{var x,v;const o=(x=i.timestamp)!=null&&x.toDate?i.timestamp.toDate().getTime():i.timestamp||0,p=(v=c.timestamp)!=null&&v.toDate?c.timestamp.toDate().getTime():c.timestamp||0;return o-p}),a.forEach(i=>{this.addMessageToUI(i,!1)}),setTimeout(()=>{d.scrollTop=d.scrollHeight},100)}await this.setupRealtimeListener(),this.markAsRead()}catch(t){console.error("Error loading messages:",t)}}async setupRealtimeListener(){if(!(!this.currentChatId||!window.db)){this.realtimeUnsubscribe&&this.realtimeUnsubscribe();try{const t=await this.getFirestoreFunctions(),{collection:e,query:s,orderBy:h,onSnapshot:r}=t,g=e(window.db,"live_chats",this.currentChatId,"messages"),n=s(g,h("timestamp","asc"));this.realtimeUnsubscribe=r(n,m=>{const l=document.getElementById("liveChatSection");if(!l)return;const d=new Set;l.querySelectorAll("[data-msg-id]").forEach(c=>{d.add(c.getAttribute("data-msg-id"))});const u=new Set;l.querySelectorAll("[data-msg-id]").forEach(c=>{var p;const o=(p=c.textContent)==null?void 0:p.trim();o&&u.add(o.substring(0,100))});const f=[];if(m.forEach(c=>{var A;const o=c.id,p=c.data(),x=((A=p.text)==null?void 0:A.trim())||"",v=x.substring(0,100),w=l.querySelector(`[data-msg-id="${o}"]`),L=w!==null;let b=!1;if(L){const y=window.getComputedStyle(w);y.display!=="none"&&y.visibility!=="hidden"&&!w.classList.contains("hidden")?b=!0:(console.log("Removing hidden duplicate message:",o),w.remove())}if(!b&&!d.has(o)&&x.length>0&&u.has(v)){const y=Array.from(l.querySelectorAll("[data-msg-id]")).find(I=>{var E;return((E=I.textContent)==null?void 0:E.trim().substring(0,100))===v});if(y){const I=window.getComputedStyle(y);I.display!=="none"&&I.visibility!=="hidden"&&(b=!0)}}if(!b){const y={id:o,...p};f.push(y),d.add(o),v&&u.add(v)}}),f.sort((c,o)=>{var v,w;const p=(v=c.timestamp)!=null&&v.toDate?c.timestamp.toDate().getTime():c.timestamp||0,x=(w=o.timestamp)!=null&&w.toDate?o.timestamp.toDate().getTime():o.timestamp||0;return p-x}),f.length>0&&console.log(`Widget: Adding ${f.length} new messages`),f.length>0&&l.classList.contains("hidden")){console.log("Widget: Making liveChatSection visible for new messages"),l.classList.remove("hidden");const c=document.getElementById("faqSection");c&&c.classList.add("hidden");const o=document.getElementById("chatInputArea");o&&o.classList.remove("hidden"),this.chatMode="live"}let a=!1;f.forEach(c=>{this.addMessageToUI(c,!0),c.sender==="admin"&&(a=!0,this.isOpen||this.showNotification(),this.isOpen&&this.markAsRead())}),a&&this.updateUnreadCount();const i=()=>{l&&(l.scrollTop=l.scrollHeight)};i(),setTimeout(i,100),setTimeout(i,300),setTimeout(i,600)},m=>{console.error("Realtime listener error:",m)})}catch(t){console.error("Error setting up realtime listener:",t)}}}addMessageToUI(t,e=!1){var i,c;const s=document.getElementById("liveChatSection");if(!s){console.warn("Messages area not found in widget");return}if(s.classList.contains("hidden")){console.log("Widget: Making liveChatSection visible for message display"),s.classList.remove("hidden");const o=document.getElementById("faqSection");o&&o.classList.add("hidden");const p=document.getElementById("chatInputArea");p&&p.classList.remove("hidden"),this.chatMode="live"}const h=t.sender==="user",r=t.id||`msg_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,g=s.querySelector(`[data-msg-id="${r}"]`);if(g){const o=window.getComputedStyle(g);if(o.display!=="none"&&o.visibility!=="hidden"){console.log("Message already exists and is visible in widget, skipping:",r);return}else console.log("Message exists but is hidden, removing and re-adding:",r),g.remove()}const n=document.createElement("div");n.className=`flex ${h?"justify-end":"justify-start"} mb-3 ${e?"animate-fade-in":""}`,n.setAttribute("data-msg-id",r),n.setAttribute("data-timestamp",(i=t.timestamp)!=null&&i.toDate?t.timestamp.toDate().getTime():Date.now());let m="";const l=t.imageBase64||t.imageUrl;l&&(m=`
                <div class="mb-2 rounded-xl overflow-hidden shadow-md">
                    <img src="${l}" alt="Shared image" class="max-w-full max-h-64 cursor-pointer hover:opacity-90 transition-opacity rounded-lg" onclick="window.open('${l}', '_blank')">
                </div>
            `);const d=t.text||"",u=this.formatTime(t.timestamp);h?n.innerHTML=`
                <div class="max-w-[75%] bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl rounded-tr-sm p-3 shadow-md">
                    ${m}
                    ${d?`<div class="text-sm leading-relaxed">${this.escapeHtml(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-green-100 opacity-80 flex items-center justify-end gap-1">
                        ${u}
                        <i class="fas fa-check ml-1 text-xs"></i>
                    </div>
                </div>
            `:n.innerHTML=`
                <div class="max-w-[75%] bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    ${m}
                    ${d?`<div class="text-sm leading-relaxed text-gray-800">${this.escapeHtml(d)}</div>`:""}
                    <div class="text-xs mt-1.5 text-gray-400">${u}</div>
                </div>
            `,s.appendChild(n),n.offsetHeight;const f=window.getComputedStyle(n);(f.display==="none"||f.visibility==="hidden")&&(console.warn("Widget: Message element is hidden after append, forcing visibility:",r),n.style.display="flex",n.style.visibility="visible"),s.classList.contains("hidden")&&(console.warn("Widget: Parent container was hidden, making visible"),s.classList.remove("hidden"));const a=()=>{s&&(s.scrollTop=s.scrollHeight)};(e||this.isOpen)&&(a(),setTimeout(a,50),setTimeout(a,200),setTimeout(a,500)),e&&setTimeout(()=>{const o=window.getComputedStyle(n);(o.display==="none"||o.visibility==="hidden"||n.classList.contains("hidden"))&&(console.warn("Widget: Message became hidden after render, fixing:",r),n.style.display="flex",n.style.visibility="visible",n.classList.remove("hidden")),s.classList.contains("hidden")&&(console.warn("Widget: Parent became hidden, fixing"),s.classList.remove("hidden"))},100),e&&console.log("Widget: Added message to UI:",{msgId:r,sender:t.sender,text:(c=t.text)==null?void 0:c.substring(0,50)}),e&&!h&&this.updateUnreadCount()}escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}formatTime(t){return t?(t.toDate?t.toDate():new Date(t)).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):""}async sendMessage(){if(!window.auth||!window.auth.currentUser){sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}const t=document.getElementById("chatMessageInput"),e=document.getElementById("sendMessageBtn"),s=t.value.trim(),h=this.selectedImageBase64!==null;if(!s&&!h)return;const r=document.getElementById("liveChatSection");if(r&&r.classList.contains("hidden")){console.log("Widget: Making liveChatSection visible before sending message"),r.classList.remove("hidden");const n=document.getElementById("faqSection");n&&n.classList.add("hidden");const m=document.getElementById("chatInputArea");m&&m.classList.remove("hidden"),this.chatMode="live"}if(!await this.initializeFirebase()){alert("Failed to connect to chat service. Please refresh the page and try again.");return}if(this.currentUserId||(this.currentUserId=window.auth.currentUser.uid,this.isAuthenticated=!0),!this.currentChatId)try{await this.createNewChat()}catch(n){console.error("Error creating chat:",n),e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-paper-plane"></i>');return}if(!this.currentChatId){alert("Chat not initialized. Please try again."),e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-paper-plane"></i>');return}e&&(e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i>');try{const n=await this.getFirestoreFunctions(),{collection:m,addDoc:l,serverTimestamp:d,updateDoc:u,doc:f}=n;let a=null;if(h)try{e&&(e.innerHTML='<i class="fas fa-spinner fa-spin"></i> Processing...'),this.selectedImageBase64?a=this.selectedImageBase64:this.selectedImageFile&&(a=await this.convertImageToBase64(this.selectedImageFile)),this.removeImagePreview(),e&&(e.innerHTML='<i class="fas fa-spinner fa-spin"></i>')}catch(c){console.error("Error processing image:",c);const o=c.message||"Failed to process image. Please try again.";alert(`Image processing failed: ${o}`),e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-paper-plane"></i>');return}const i={text:s||(h?"📷 Image":""),sender:"user",timestamp:d(),read:!1};a&&(i.imageBase64=a),await l(m(window.db,"live_chats",this.currentChatId,"messages"),i),await u(f(window.db,"live_chats",this.currentChatId),{lastMessageAt:d(),status:"open"}),t.value=""}catch(n){console.error("Error sending message:",n),n.message&&n.message.includes("permission")?alert("Permission denied. Please refresh the page."):alert("Failed to send message: "+(n.message||"Please try again."))}finally{e&&(e.disabled=!1,e.innerHTML='<i class="fas fa-paper-plane"></i>')}}async convertImageToBase64(t){return new Promise((e,s)=>{if(t.size>700*1024){s(new Error("Image size must be less than 700KB. Please compress the image."));return}if(!t.type.startsWith("image/")){s(new Error("Please select an image file"));return}const h=new FileReader;h.onload=r=>{e(r.target.result)},h.onerror=()=>{s(new Error("Error reading image file. Please try again."))},h.readAsDataURL(t)})}async startLiveChat(){if(!window.auth||!window.auth.currentUser){sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html";return}this.currentUserId||(this.currentUserId=window.auth.currentUser.uid,this.isAuthenticated=!0),this.chatMode="live",document.getElementById("faqSection").classList.add("hidden"),document.getElementById("liveChatSection").classList.remove("hidden"),document.getElementById("chatInputArea").classList.remove("hidden"),this.showWelcomeMessage(),this.currentChatId?await this.loadMessages():await this.createNewChat()}showWelcomeMessage(){const t=document.getElementById("liveChatSection");if(!t||document.getElementById("welcomeMessage"))return;const e=document.createElement("div");e.id="welcomeMessage",e.className="flex justify-center mb-4",e.innerHTML=`
            <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-purple-50 border border-green-100 rounded-2xl p-5 max-w-[90%] shadow-lg">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                            <i class="fas fa-headset text-white text-lg"></i>
                        </div>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-900 mb-2 text-base">Welcome to Twenty Forth & Fifth Support! 👋</h4>
                        <p class="text-sm text-gray-700 leading-relaxed mb-3">
                            We're here to help you with any questions about our financial services. 
                            Our support team will respond to your message as soon as possible.
                        </p>
                        <div class="flex items-center gap-4 text-xs text-gray-600">
                            <div class="flex items-center gap-1.5">
                                <i class="far fa-clock text-green-500"></i>
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
        `,t.appendChild(e),t.scrollTop=t.scrollHeight}async createNewChat(){if(!window.auth||!window.auth.currentUser)throw sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html",new Error("User not authenticated");if(this.currentUserId||(this.currentUserId=window.auth.currentUser.uid,this.isAuthenticated=!0),!await this.initializeFirebase())throw new Error("Firebase not initialized");try{const e=await this.getFirestoreFunctions(),{collection:s,addDoc:h,serverTimestamp:r}=e,g=window.auth.currentUser.email||"User",n=window.auth.currentUser.email||"",m=String(this.currentUserId),{query:l,where:d,getDocs:u}=e,f=l(s(window.db,"live_chats"),d("userId","==",m)),a=await u(f);if(!a.empty){const c=a.docs.sort((o,p)=>{var w,L,b,A,y,I,E,B,k,M,_,D;const x=((b=(L=(w=o.data().lastMessageAt)==null?void 0:w.toDate)==null?void 0:L.call(w))==null?void 0:b.getTime())||((I=(y=(A=o.data().createdAt)==null?void 0:A.toDate)==null?void 0:y.call(A))==null?void 0:I.getTime())||0;return(((k=(B=(E=p.data().lastMessageAt)==null?void 0:E.toDate)==null?void 0:B.call(E))==null?void 0:k.getTime())||((D=(_=(M=p.data().createdAt)==null?void 0:M.toDate)==null?void 0:_.call(M))==null?void 0:D.getTime())||0)-x});this.currentChatId=c[0].id,console.log("Using existing chat:",this.currentChatId),localStorage.setItem(`fci_chat_id_${this.currentUserId}`,this.currentChatId),await this.setupRealtimeListener();return}const i=await h(s(window.db,"live_chats"),{userId:m,userName:g,userEmail:n,isAnonymous:!1,status:"open",createdAt:r(),lastMessageAt:r()});this.currentChatId=i.id,localStorage.setItem(`fci_chat_id_${this.currentUserId}`,this.currentChatId),await this.setupRealtimeListener()}catch(e){throw console.error("Error creating chat:",e),e.message&&e.message.includes("permission")?(alert("Please log in to start a chat."),sessionStorage.setItem("redirectAfterLogin","support.html?openChat=true"),window.location.href="login.html"):alert("Failed to start chat. Please try again."),e}}toggleChat(){this.isOpen=!this.isOpen;const t=document.getElementById("chatWindow");this.isOpen?(t.classList.remove("hidden"),this.markAsRead()):t.classList.add("hidden")}closeChat(){this.isOpen=!1,document.getElementById("chatWindow").classList.add("hidden")}async markAsRead(){if(!(!this.currentChatId||!window.db))try{const t=await this.getFirestoreFunctions(),{collection:e,query:s,where:h,getDocs:r,updateDoc:g,doc:n}=t,m=e(window.db,"live_chats",this.currentChatId,"messages"),l=s(m,h("read","==",!1),h("sender","==","admin")),d=await r(l),u=[];d.forEach(f=>{u.push(g(n(window.db,"live_chats",this.currentChatId,"messages",f.id),{read:!0}))}),await Promise.all(u),this.updateUnreadCount()}catch(t){console.error("Error marking as read:",t)}}async updateUnreadCount(){if(!(!this.currentChatId||!window.db))try{const t=await this.getFirestoreFunctions(),{collection:e,doc:s,query:h,where:r,getDocs:g}=t,n=s(window.db,"live_chats",this.currentChatId),m=e(n,"messages"),l=h(m,r("read","==",!1),r("sender","==","admin")),d=await g(l);this.unreadCount=d.size,this.currentChatId&&localStorage.setItem(`fci_chat_unread_${this.currentChatId}`,this.unreadCount.toString());const u=document.getElementById("chatBadge");u&&(this.unreadCount>0?(u.textContent=this.unreadCount>99?"99+":this.unreadCount,u.classList.remove("hidden"),u.classList.add("animate-pulse"),setTimeout(()=>u.classList.remove("animate-pulse"),2e3)):u.classList.add("hidden"))}catch(t){console.error("Error updating unread count:",t)}}showNotification(){"Notification"in window&&Notification.permission==="granted"&&new Notification("New message from Twenty Forth & Fifth",{body:"You have a new message in your chat",icon:"/app-icon.svg"})}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{window.liveChatWidget=new F}):window.liveChatWidget=new F;function S(){return window.location.hash==="#open-chat"||sessionStorage.getItem("fci_open_chat")==="true"}window.addEventListener("load",()=>{window.liveChatWidget&&S()&&(setTimeout(()=>{window.liveChatWidget.checkAndOpenChat()},500),setTimeout(()=>{window.liveChatWidget.checkAndOpenChat()},1500),setTimeout(()=>{window.liveChatWidget.checkAndOpenChat()},3e3))});document.addEventListener("visibilitychange",()=>{!document.hidden&&window.liveChatWidget&&S()&&setTimeout(()=>{window.liveChatWidget.checkAndOpenChat()},500)});document.readyState==="complete"?setTimeout(()=>{window.liveChatWidget&&S()&&window.liveChatWidget.checkAndOpenChat()},100):window.addEventListener("pageshow",C=>{window.liveChatWidget&&S()&&setTimeout(()=>{window.liveChatWidget.checkAndOpenChat()},300)});document.readyState==="complete"?setTimeout(()=>{window.liveChatWidget&&S()&&window.liveChatWidget.checkAndOpenChat()},100):window.addEventListener("pageshow",C=>{window.liveChatWidget&&S()&&setTimeout(()=>{window.liveChatWidget.checkAndOpenChat()},300)});function U(C){const t=document.getElementById("auth-nav-button"),e=document.getElementById("auth-nav-button-mobile");!t||!e||(C?(t.innerHTML=`
              <a href="dashboard.html" class="btn-blue px-5 py-2.5 rounded-xl font-semibold inline-flex items-center shadow-sm">
                Dashboard
              </a>
            `,e.innerHTML=`
              <a href="dashboard.html" class="w-full py-3 text-center border border-green-200 text-blue-900 text-sm font-medium bg-white rounded hover:bg-green-50 hover:border-blue-300 transition duration-300 block">
                Dashboard
              </a>
            `):(t.innerHTML=`
              <a href="login.html" class="btn-blue px-5 py-2.5 rounded-xl font-semibold inline-flex items-center shadow-sm">
                Sign in
              </a>
            `,e.innerHTML=`
              <a href="login.html" class="w-full py-3 text-center border border-green-200 text-blue-900 text-sm font-medium bg-white rounded hover:bg-green-50 hover:border-blue-300 transition duration-300 block">
                Sign in
              </a>
            `))}function j(){U(!1),R(W,C=>U(!!C))}window.addEventListener("site:fragments-loaded",j,{once:!0});try{let t=function(s){const h=document.getElementById("testimonials-grid");if(s.length===0){h.innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">No testimonials available yet.</p>
        </div>
                    `;return}h.innerHTML=s.map((r,g)=>{const n="⭐".repeat(r.rating||0),m=r.createdAt.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),l=Number.isFinite(r.likeCount)?`<span class="text-xs text-gray-500 flex items-center gap-1">
                            <i class="fas fa-thumbs-up text-blue-500"></i>
                            <span class="font-medium">${r.likeCount}</span>
                          </span>`:"";let d=r.reviewText||"";d.length>180&&(d=d.substring(0,180)+"...");const u=["from-blue-50 to-indigo-50","from-purple-50 to-pink-50","from-blue-50 to-emerald-50"],f=["border-green-200","border-purple-200","border-green-200"],a=["text-green-600","text-purple-600","text-green-600"],i=u[g%u.length],c=f[g%f.length],o=a[g%a.length];return`
                        <div class="group bg-gradient-to-br ${i} rounded-2xl shadow-lg p-6 md:p-8 border-2 ${c} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                            <!-- Decorative element -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                            
                            <div class="relative z-10">
                                <!-- Header -->
                                <div class="flex items-start justify-between mb-5">
                                    <div class="flex items-center gap-4 flex-1">
                                        ${r.authorImage?`<div class="relative">
                                                <img src="${r.authorImage}" alt="${r.authorName}" class="w-14 h-14 rounded-full object-cover border-3 border-white shadow-md">
                                                ${r.verified?'<div class="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`:`<div class="relative w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center border-3 border-white shadow-md">
                                                <i class="fas fa-user text-white text-lg"></i>
                                                ${r.verified?'<div class="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white"><i class="fas fa-check text-white text-xs"></i></div>':""}
                                              </div>`}
                                        <div class="flex-1 min-w-0">
                                            <h4 class="font-bold text-gray-900 text-base md:text-lg mb-1 truncate">${e(r.authorName)}</h4>
                                            <p class="text-sm text-gray-600 truncate">${e(r.company||"")}</p>
                                            ${r.country?`<p class="text-xs text-gray-500 flex items-center gap-1 mt-1"><i class="fas fa-map-marker-alt"></i> ${e(r.country)}</p>`:""}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Rating -->
                                <div class="mb-4">
                                    <div class="text-yellow-500 text-lg md:text-xl mb-3">${n}</div>
                                </div>
                                
                                <!-- Review Text -->
                                <div class="mb-5">
                                    <div class="relative">
                                        <i class="fas fa-quote-left ${o} text-2xl opacity-20 absolute -top-2 -left-1"></i>
                                        <p class="text-gray-700 text-sm md:text-base leading-relaxed pl-6 relative z-10">${e(d)}</p>
                                    </div>
                                </div>
                                
                                <!-- Footer -->
                                <div class="flex items-center justify-between pt-5 border-t-2 border-white/50">
                                    <div class="flex items-center gap-3">
                                        ${l}
                                        <span class="text-xs text-gray-500 font-medium">${m}</span>
                                    </div>
                                    <div class="${o}">
                                        <i class="fas fa-quote-right text-xl opacity-30"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join("")},e=function(s){const h=document.createElement("div");return h.textContent=s,h.innerHTML};async function C(){try{let n=function(a){const i=(a||"").toLowerCase().trim().replace(/\s+/g," ");return s.some(c=>{const o=c.toLowerCase().trim();return i.includes(o)||o.includes(i)})},m=function(a){const i=(a||"").toLowerCase().trim().replace(/\s+/g," ");return i.includes("point")&&i.includes("speed")?"point speed":i.includes("invest")&&i.includes("wise")?"invest wise":i.includes("blue")&&(i.includes("line")||i.includes("gadget"))?"blueline gadgets":null};const s=["point speed","pointspeed","point-speed","invest wise","investwise","invest-wise","blueline gadgets","blueline","blue line gadgets","blue-line gadgets"],h=H(O($,"testimonials"),P("published","==",!0)),r=await z(h),g=[];r.forEach(a=>{var c;const i=a.data();g.push({id:a.id,authorName:i.authorName||"",company:i.company||"",country:i.country||"",rating:i.rating||0,reviewText:i.reviewText||"",verified:i.verified||!1,authorImage:i.authorImage||"",likeCount:i.likeCount!==void 0?i.likeCount:null,createdAt:(c=i.createdAt)!=null&&c.toDate?i.createdAt.toDate():i.createdAt?new Date(i.createdAt):new Date})});const l=g.filter(a=>n(a.company));l.sort((a,i)=>{const c=a.createdAt instanceof Date?a.createdAt.getTime():new Date(a.createdAt).getTime();return(i.createdAt instanceof Date?i.createdAt.getTime():new Date(i.createdAt).getTime())-c});const d=[],u=["point speed","invest wise","blueline gadgets"];u.forEach(a=>{const i=l.find(c=>m(c.company)===a&&!d.find(p=>p.id===c.id));i&&d.push(i)}),d.length<3&&u.forEach(a=>{if(d.length>=3)return;const i=l.find(c=>{const o=(c.company||"").toLowerCase().trim();return(a==="point speed"&&o.includes("point")&&o.includes("speed")||a==="invest wise"&&o.includes("invest")&&o.includes("wise")||a==="blueline gadgets"&&o.includes("blue")&&(o.includes("line")||o.includes("gadget")))&&!d.find(x=>x.id===c.id)});i&&d.push(i)}),d.length<3&&l.forEach(a=>{d.length<3&&!d.find(i=>i.id===a.id)&&d.push(a)}),d.length<3&&g.forEach(a=>{d.length<3&&!d.find(i=>i.id===a.id)&&d.push(a)});const f=d.slice(0,3);console.log("Featured testimonials:",f.map(a=>({company:a.company,author:a.authorName}))),t(f)}catch(s){console.error("Error loading testimonials:",s),document.getElementById("testimonials-grid").innerHTML=`
                        <div class="col-span-full text-center py-8">
                            <p class="text-gray-600">Unable to load testimonials at this time.</p>
            </div>
                    `}}C()}catch(C){console.error("Firebase initialization error:",C),document.getElementById("testimonials-grid").innerHTML=`
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-600">Unable to load testimonials at this time.</p>
                </div>
            `}
