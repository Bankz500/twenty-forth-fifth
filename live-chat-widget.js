// Live Chat Widget for Twenty Forth & Fifth
// Replaces WhatsApp button with FAQ + Live Chat

// Add custom styles for animations
const chatStyles = document.createElement('style');
chatStyles.textContent = `
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
`;
document.head.appendChild(chatStyles);

class LiveChatWidget {
    constructor() {
        this.isOpen = false;
        this.chatMode = 'faq'; // 'faq' or 'live'
        this.currentUserId = null;
        this.currentChatId = null;
        this.unreadCount = 0;
        this.isAuthenticated = false;
        this.userName = null;
        this.selectedImageFile = null;
        this.selectedImageBase64 = null;
        this.realtimeUnsubscribe = null;
        
        // Store hash intent for mobile devices (in case hash is lost during navigation)
        if (window.location.hash === '#open-chat') {
            sessionStorage.setItem('fci_open_chat', 'true');
        }
        
        this.init();
    }

    init() {
        this.createWidget();
        this.loadUserAuth();
        this.setupFAQ();
        this.restoreChatSession();
        
        // Check if URL has #open-chat hash and auto-open chat widget
        // Multiple checks for mobile devices
        this.checkAndOpenChat();
        
        // Listen for hash changes (in case user navigates with hash)
        window.addEventListener('hashchange', () => {
            this.checkAndOpenChat();
        });
        
        // Additional check after a delay for mobile (widget might not be ready immediately)
        setTimeout(() => {
            if (this.shouldOpenChat()) {
                this.checkAndOpenChat();
            }
        }, 1000);
        
        // Another check after longer delay for slow mobile connections
        setTimeout(() => {
            if (this.shouldOpenChat()) {
                this.checkAndOpenChat();
            }
        }, 2500);
    }

    shouldOpenChat() {
        // Check both hash and sessionStorage (for mobile devices where hash might be lost)
        return window.location.hash === '#open-chat' || sessionStorage.getItem('fci_open_chat') === 'true';
    }

    checkAndOpenChat() {
        if (this.shouldOpenChat()) {
            // Clear the sessionStorage flag once we've detected it (only if it was set)
            if (sessionStorage.getItem('fci_open_chat') === 'true') {
                sessionStorage.removeItem('fci_open_chat');
            }
            // Wait for widget to be fully created and DOM to be ready
            const tryOpen = (attempts = 0) => {
                const chatWindow = document.getElementById('chatWindow');
                const chatToggleBtn = document.getElementById('chatToggleBtn');
                
                if (chatWindow && chatToggleBtn) {
                    if (!this.isOpen) {
                        // Widget is ready, open it
                        this.toggleChat();
                        // Scroll to top to ensure chat is visible on mobile
                        setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 300);
                        return; // Success, stop retrying
                    }
                }
                
                // Widget not ready yet, try again (max 50 attempts = 5 seconds for mobile)
                if (attempts < 50) {
                    setTimeout(() => tryOpen(attempts + 1), 100);
                } else {
                    // Last resort: try one more time after a longer delay
                    setTimeout(() => {
                        const chatWindow = document.getElementById('chatWindow');
                        const chatToggleBtn = document.getElementById('chatToggleBtn');
                        if (chatWindow && chatToggleBtn && !this.isOpen) {
                            this.toggleChat();
                        }
                    }, 1000);
                }
            };
            
            // Start checking immediately, then again after delays for mobile
            tryOpen(0);
            setTimeout(() => tryOpen(0), 500);
            setTimeout(() => tryOpen(0), 1500);
        }
    }

    async restoreChatSession() {
        // Restore chat session from localStorage
        // First, try to get saved session ID
        const savedSessionId = localStorage.getItem('fci_chat_session_id');
        if (savedSessionId) {
            this.currentUserId = savedSessionId;
            this.isAuthenticated = false;
            
            // Try to restore chat ID
            const savedChatId = localStorage.getItem(`fci_chat_id_${savedSessionId}`);
            if (savedChatId) {
                this.currentChatId = savedChatId;
                
                // Restore unread count from localStorage
                const savedUnread = localStorage.getItem(`fci_chat_unread_${savedChatId}`);
                if (savedUnread) {
                    this.unreadCount = parseInt(savedUnread) || 0;
                    this.updateBadgeDisplay();
                }
                
                // Initialize Firebase and set up real-time listener
                const initialized = await this.initializeFirebase();
                if (initialized && window.db) {
                    await this.setupRealtimeListener();
                    await this.updateUnreadCount();
                }
            }
        }
    }

    updateBadgeDisplay() {
        const badge = document.getElementById('chatBadge');
        if (badge) {
            if (this.unreadCount > 0) {
                badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.id = 'liveChatWidget';
        widget.innerHTML = `
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
        `;
        document.body.appendChild(widget);
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('chatToggleBtn').addEventListener('click', () => {
            // CRITICAL: Redirect to login then support.html for authenticated chat
            // Check if user is authenticated
            if (!window.auth || !window.auth.currentUser) {
                // Store redirect intent and go to login
                sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
                window.location.href = 'login.html';
                return;
            }
            // If authenticated, toggle chat normally
            this.toggleChat();
        });
        document.getElementById('closeChatBtn').addEventListener('click', () => this.closeChat());
        document.getElementById('startLiveChatBtn').addEventListener('click', () => {
            // CRITICAL: Ensure authentication before starting live chat
            if (!window.auth || !window.auth.currentUser) {
                sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
                window.location.href = 'login.html';
                return;
            }
            this.startLiveChat();
        });
        document.getElementById('sendMessageBtn').addEventListener('click', () => {
            // CRITICAL: Ensure authentication before sending messages
            if (!window.auth || !window.auth.currentUser) {
                sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
                window.location.href = 'login.html';
                return;
            }
            this.sendMessage();
        });
        
        // Handle textarea auto-resize and prevent Enter from sending
        const chatInput = document.getElementById('chatMessageInput');
        chatInput.addEventListener('keydown', (e) => {
            // Prevent Enter from sending, allow Shift+Enter for new line
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
            }
        });
        chatInput.addEventListener('input', () => {
            // Auto-resize textarea
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
        });
        document.getElementById('attachImageBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });
        document.getElementById('imageInput').addEventListener('change', (e) => this.handleImageSelect(e));
        document.getElementById('removeImageBtn').addEventListener('click', () => this.removeImagePreview());

        // FAQ item clicks
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const topic = item.dataset.topic;
                this.showFAQAnswer(topic);
            });
        });
    }

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file size (max 700KB to account for base64 encoding overhead)
        // Base64 increases size by ~33%, so 700KB original = ~930KB base64 (under 1MB Firestore limit)
        if (file.size > 700 * 1024) {
            alert('Image size must be less than 700KB. Please compress the image or use a smaller file.');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Convert to base64 and show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('imagePreview');
            const container = document.getElementById('imagePreviewContainer');
            const base64String = e.target.result; // This is already a data URL (base64)
            preview.src = base64String;
            container.classList.remove('hidden');
            
            // Store base64 string (remove data:image/...;base64, prefix for storage)
            // We'll add it back when displaying
            this.selectedImageBase64 = base64String;
            this.selectedImageFile = file; // Keep file reference for size/type checks
        };
        reader.onerror = () => {
            alert('Error reading image file. Please try again.');
        };
        reader.readAsDataURL(file);
    }

    removeImagePreview() {
        document.getElementById('imagePreviewContainer').classList.add('hidden');
        document.getElementById('imageInput').value = '';
        this.selectedImageFile = null;
        this.selectedImageBase64 = null;
    }

    setupFAQ() {
        this.faqAnswers = {
            'account-setup': 'To open an account with Twenty Forth & Fifth, please visit our sign-up page and complete the registration form. You\'ll need to provide identification documents and proof of address. Our compliance team will review your application within 1-2 business days.',
            'transfers': 'You can make international wire transfers through your online dashboard. Navigate to the Transfer section, enter the recipient details, amount, and currency. Transfers are typically processed within 1-3 business days. Fees vary by currency and destination.',
            'fees': 'Our fee structure is transparent and competitive. Account maintenance fees start at $50/month. Wire transfer fees range from $25-$75 depending on currency and destination. Please contact us for a detailed fee schedule tailored to your needs.',
            'security': 'Your account is protected by bank-level encryption, multi-factor authentication, and regular security audits. We comply with international financial regulations and maintain strict KYC/AML procedures. Your funds are held in segregated accounts.',
            'multi-currency': 'We support over 20 major currencies including USD, EUR, GBP, JPY, CHF, AUD, CAD, and more. You can hold multiple currencies in a single account and convert between them at competitive exchange rates.',
            'investment': 'We offer various investment options including fixed deposits, treasury bonds, and managed investment portfolios. Minimum investment amounts and returns vary by product. Please schedule a consultation with our investment team for personalized advice.'
        };
    }

    showFAQAnswer(topic) {
        const answer = this.faqAnswers[topic];
        if (!answer) return;

        const faqSection = document.getElementById('faqSection');
        faqSection.innerHTML = `
            <div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div class="font-semibold text-green-900 mb-2">${this.getTopicTitle(topic)}</div>
                <div class="text-sm text-gray-700">${answer}</div>
                <button id="backToFAQ" class="mt-3 text-green-600 hover:text-green-800 text-sm font-semibold">
                    <i class="fas fa-arrow-left mr-1"></i>Back to FAQs
                </button>
            </div>
        `;

        document.getElementById('backToFAQ').addEventListener('click', () => {
            this.resetFAQ();
        });
    }

    getTopicTitle(topic) {
        const titles = {
            'account-setup': '📋 Account Setup',
            'transfers': '💸 International Transfers',
            'fees': '💰 Fees & Charges',
            'security': '🔒 Security & Compliance',
            'multi-currency': '🌍 Multi-Currency Accounts',
            'investment': '📈 Investment Services'
        };
        return titles[topic] || topic;
    }

    resetFAQ() {
        const faqSection = document.getElementById('faqSection');
        // Use the same styling as the original FAQ section
        faqSection.innerHTML = `
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
        `;

        // Re-attach event listeners
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const topic = item.dataset.topic;
                this.showFAQAnswer(topic);
            });
        });
        document.getElementById('startLiveChatBtn').addEventListener('click', () => this.startLiveChat());
    }

    async initializeFirebase() {
        // Initialize Firebase if not already available
        if (!window.db) {
            try {
                const firebaseConfig = {
                    apiKey: "AIzaSyDk8K22XfrsAQAX7WarxSq_BnwO1YQLDSc",
                    authDomain: "twenty-third-forth-ee57c.firebaseapp.com",
                    projectId: "twenty-third-forth-ee57c",
                    storageBucket: "twenty-third-forth-ee57c.firebasestorage.app",
                    messagingSenderId: "47210898997",
                    appId: "1:47210898997:web:d25c23eee45a7660cef37c",
                    measurementId: "G-ESYD665GWG"
                };

                // Try npm Firebase first (if firebase-client.js is loaded)
                try {
                    const { db, auth } = await import('./firebase-client.js');
                    window.db = db;
                    window.auth = auth;
                    return true;
                } catch (npmError) {
                    // Fallback to CDN Firebase
                    const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
                    const { getFirestore } = await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js');
                    const { getAuth } = await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js');
                    const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js');

                    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
                    window.db = getFirestore(app);
                    window.auth = getAuth(app);
                    window.analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
                }
            } catch (error) {
                console.error('Error initializing Firebase:', error);
                return false;
            }
        }
        return true;
    }
    
    // Helper to get Firebase functions - uses npm Firebase if window.db exists from firebase-client.js
    async getFirestoreFunctions() {
        // If window.db exists, it's likely from firebase-client.js (npm Firebase)
        // Check if we can use npm Firebase imports
        try {
            const firestoreModule = await import('firebase/firestore');
            return firestoreModule;
        } catch {
            // Fallback to CDN
            return await import('https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js');
        }
    }

    async loadUserAuth() {
        // Initialize Firebase first
        const initialized = await this.initializeFirebase();
        if (!initialized) {
            console.error('Failed to initialize Firebase');
            return;
        }

        // Try to get current user from Firebase auth
        if (window.auth) {
            if (window.auth.currentUser) {
                this.currentUserId = window.auth.currentUser.uid;
                this.isAuthenticated = true;
                await this.loadOrCreateChat();
                this.setupRealtimeListener();
            } else {
                // Wait for auth to be ready, but don't block anonymous users
                window.auth.onAuthStateChanged((user) => {
                    if (user) {
                        this.currentUserId = user.uid;
                        this.isAuthenticated = true;
                        this.loadOrCreateChat();
                        this.setupRealtimeListener();
                    } else {
                        // Anonymous user - use session ID
                        this.setupAnonymousUser();
                    }
                });
                
                // Set up anonymous user immediately (don't wait for auth state)
                this.setupAnonymousUser();
            }
        } else {
            // No Firebase auth available - use anonymous session
            this.setupAnonymousUser();
        }
    }

    setupAnonymousUser() {
        // Generate or retrieve anonymous session ID
        let sessionId = localStorage.getItem('fci_chat_session_id');
        if (!sessionId) {
            sessionId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('fci_chat_session_id', sessionId);
        }
        this.currentUserId = sessionId;
        this.isAuthenticated = false;
        this.userName = 'Guest User';
    }

    async loadOrCreateChat() {
        if (!this.currentUserId) {
            // Setup anonymous user if needed
            this.setupAnonymousUser();
        }

        // Ensure Firebase is initialized
        const initialized = await this.initializeFirebase();
        if (!initialized) {
            return;
        }

        try {
            // Use Firebase SDK (npm or CDN depending on what's available)
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, query, where, getDocs } = firestoreModule;
            
            // For anonymous users, skip loading existing chats - they'll create new ones
            // This avoids permission errors since anonymous users can't query by userId
            if (!this.isAuthenticated) {
                return; // Anonymous users will create new chat when they start chatting
            }
            
            // CRITICAL FIX: Ensure userId is a string for consistent querying
            // This fixes issues on iPhone 16/17 where type mismatches can cause query failures
            const userIdString = String(this.currentUserId);
            
            // CRITICAL FIX: Try query with retry logic for iPhone compatibility
            let snapshot = null;
            let retryCount = 0;
            const maxRetries = 3;
            
            while (retryCount < maxRetries && !snapshot) {
                try {
                    // Query for existing chat - ensure userId matches exactly
                    const q = query(collection(window.db, 'live_chats'), where('userId', '==', userIdString));
                    snapshot = await getDocs(q);
                    break; // Success, exit retry loop
                } catch (queryError) {
                    retryCount++;
                    console.warn(`Chat query attempt ${retryCount} failed:`, queryError);
                    if (retryCount < maxRetries) {
                        // Wait before retry (exponential backoff for iPhone)
                        await new Promise(resolve => setTimeout(resolve, 200 * retryCount));
                    } else {
                        throw queryError; // Re-throw on final failure
                    }
                }
            }
            
            if (snapshot && !snapshot.empty) {
                // Get the most recent chat (in case user has multiple)
                const chats = snapshot.docs.sort((a, b) => {
                    const timeA = a.data().lastMessageAt?.toDate?.()?.getTime() || a.data().createdAt?.toDate?.()?.getTime() || 0;
                    const timeB = b.data().lastMessageAt?.toDate?.()?.getTime() || b.data().createdAt?.toDate?.()?.getTime() || 0;
                    return timeB - timeA; // Most recent first
                });
                
                this.currentChatId = chats[0].id;
                console.log('Loaded existing chat:', this.currentChatId);
                await this.loadMessages();
            } else {
                console.log('No existing chat found for user:', userIdString);
            }
        } catch (error) {
            console.error('Error loading chat:', error);
            // Don't throw - allow user to create new chat
            // But log the error for debugging
            if (error.message) {
                console.error('Error details:', error.message);
            }
        }
    }

    async loadMessages() {
        if (!this.currentChatId || !window.db) return;

        try {
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, query, orderBy, getDocs } = firestoreModule;
            const messagesRef = collection(window.db, 'live_chats', this.currentChatId, 'messages');
            
            // CRITICAL FIX: Add retry logic for iPhone 16/17 compatibility
            let snapshot = null;
            let retryCount = 0;
            const maxRetries = 3;
            
            while (retryCount < maxRetries && !snapshot) {
                try {
                    const q = query(messagesRef, orderBy('timestamp', 'asc')); // Oldest first
                    snapshot = await getDocs(q);
                    break; // Success, exit retry loop
                } catch (queryError) {
                    retryCount++;
                    console.warn(`Messages query attempt ${retryCount} failed:`, queryError);
                    if (retryCount < maxRetries) {
                        // Wait before retry (exponential backoff for iPhone)
                        await new Promise(resolve => setTimeout(resolve, 200 * retryCount));
                    } else {
                        throw queryError; // Re-throw on final failure
                    }
                }
            }
            
            if (!snapshot) {
                console.error('Failed to load messages after retries');
                return;
            }

            const messagesArea = document.getElementById('liveChatSection');
            if (messagesArea) {
                // CRITICAL MOBILE FIX: Ensure section is visible before loading messages
                messagesArea.classList.remove('hidden');
                const faqSection = document.getElementById('faqSection');
                if (faqSection) faqSection.classList.add('hidden');
                const chatInputArea = document.getElementById('chatInputArea');
                if (chatInputArea) chatInputArea.classList.remove('hidden');
                this.chatMode = 'live';
                
                // Clear and show welcome message first
                messagesArea.innerHTML = '';
                this.showWelcomeMessage();

                // Load messages in chronological order (oldest to newest)
                const messages = [];
                snapshot.forEach(doc => {
                    const msg = { id: doc.id, ...doc.data() };
                    messages.push(msg);
                });

                // Sort by timestamp to ensure correct order
                messages.sort((a, b) => {
                    const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestamp || 0);
                    const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestamp || 0);
                    return timeA - timeB;
                });

                // Append messages in order (oldest first, newest last)
                messages.forEach(msg => {
                    this.addMessageToUI(msg, false);
                });

                // Scroll to bottom after loading
                setTimeout(() => {
                    messagesArea.scrollTop = messagesArea.scrollHeight;
                }, 100);
            }

            // Set up real-time listener after loading initial messages
            await this.setupRealtimeListener();

            // Mark as read
            this.markAsRead();
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    async setupRealtimeListener() {
        if (!this.currentChatId || !window.db) return;

        // Remove existing listener if any
        if (this.realtimeUnsubscribe) {
            this.realtimeUnsubscribe();
        }

        try {
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, query, orderBy, onSnapshot } = firestoreModule;
            const messagesRef = collection(window.db, 'live_chats', this.currentChatId, 'messages');
            const q = query(messagesRef, orderBy('timestamp', 'asc')); // Changed to asc to maintain order

            this.realtimeUnsubscribe = onSnapshot(q, (snapshot) => {
                const messagesArea = document.getElementById('liveChatSection');
                if (!messagesArea) return;

                // Track which messages we already have
                const existingIds = new Set();
                messagesArea.querySelectorAll('[data-msg-id]').forEach(el => {
                    existingIds.add(el.getAttribute('data-msg-id'));
                });

                // More reliable duplicate checking
                const existingContent = new Set();
                messagesArea.querySelectorAll('[data-msg-id]').forEach(el => {
                    const textContent = el.textContent?.trim();
                    if (textContent) existingContent.add(textContent.substring(0, 100));
                });

                // Collect new messages and sort them by timestamp
                const newMessages = [];
                snapshot.forEach(doc => {
                    const msgId = doc.id;
                    const msgData = doc.data();
                    const msgText = msgData.text?.trim() || '';
                    const contentKey = msgText.substring(0, 100);
                    
                    // Check if message exists in DOM
                    const existingMsgEl = messagesArea.querySelector(`[data-msg-id="${msgId}"]`);
                    const msgExistsInDOM = existingMsgEl !== null;
                    
                    // Less aggressive duplicate check for mobile - only skip if truly visible
                    let shouldSkip = false;
                    if (msgExistsInDOM) {
                        const computedStyle = window.getComputedStyle(existingMsgEl);
                        // Only skip if element is actually visible
                        if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden' && 
                            !existingMsgEl.classList.contains('hidden')) {
                            shouldSkip = true;
                        } else {
                            // Element exists but is hidden - remove it so we can re-add
                            console.log('Removing hidden duplicate message:', msgId);
                            existingMsgEl.remove();
                        }
                    }
                    
                    // Also check ID and content sets (for messages that might not be in DOM yet)
                    if (!shouldSkip && !existingIds.has(msgId)) {
                        // Only check content if message text is substantial (avoid false positives)
                        if (msgText.length > 0 && existingContent.has(contentKey)) {
                            // Content match found - check if it's actually visible
                            const contentMatch = Array.from(messagesArea.querySelectorAll('[data-msg-id]'))
                                .find(el => el.textContent?.trim().substring(0, 100) === contentKey);
                            if (contentMatch) {
                                const matchStyle = window.getComputedStyle(contentMatch);
                                if (matchStyle.display !== 'none' && matchStyle.visibility !== 'hidden') {
                                    shouldSkip = true;
                                }
                            }
                        }
                    }
                    
                    if (!shouldSkip) {
                        const msg = { id: msgId, ...msgData };
                        newMessages.push(msg);
                        existingIds.add(msgId);
                        if (contentKey) existingContent.add(contentKey);
                    }
                });

                // Sort new messages by timestamp to maintain chronological order
                newMessages.sort((a, b) => {
                    const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestamp || 0);
                    const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestamp || 0);
                    return timeA - timeB;
                });

                if (newMessages.length > 0) {
                    console.log(`Widget: Adding ${newMessages.length} new messages`);
                }

                // CRITICAL: Ensure liveChatSection is visible before adding messages
                if (newMessages.length > 0) {
                    if (messagesArea.classList.contains('hidden')) {
                        console.log('Widget: Making liveChatSection visible for new messages');
                        messagesArea.classList.remove('hidden');
                        const faqSection = document.getElementById('faqSection');
                        if (faqSection) faqSection.classList.add('hidden');
                        const chatInputArea = document.getElementById('chatInputArea');
                        if (chatInputArea) chatInputArea.classList.remove('hidden');
                        this.chatMode = 'live';
                    }
                }

                // Add new messages in order (oldest first, newest last)
                let hasNewAdminMessage = false;
                newMessages.forEach(msg => {
                    this.addMessageToUI(msg, true); // Mark as new for animation
                    
                    if (msg.sender === 'admin') {
                        hasNewAdminMessage = true;
                        
                        // Show notification if chat is closed
                        if (!this.isOpen) {
                            this.showNotification();
                        }
                        
                        // Mark as read if chat is open
                        if (this.isOpen) {
                            this.markAsRead();
                        }
                    }
                });

                // Update unread count badge when new admin messages arrive
                if (hasNewAdminMessage) {
                    this.updateUnreadCount();
                }

                // Enhanced scrolling for mobile
                const scrollToBottom = () => {
                    if (messagesArea) {
                        messagesArea.scrollTop = messagesArea.scrollHeight;
                    }
                };
                
                scrollToBottom();
                setTimeout(scrollToBottom, 100);
                setTimeout(scrollToBottom, 300);
                setTimeout(scrollToBottom, 600);
            }, (error) => {
                console.error('Realtime listener error:', error);
            });
        } catch (error) {
            console.error('Error setting up realtime listener:', error);
        }
    }

    addMessageToUI(msg, isNew = false) {
        const messagesArea = document.getElementById('liveChatSection');
        if (!messagesArea) {
            console.warn('Messages area not found in widget');
            return;
        }

        // CRITICAL FIX: Ensure liveChatSection is visible when adding messages
        // This fixes the mobile issue where messages aren't visible
        if (messagesArea.classList.contains('hidden')) {
            console.log('Widget: Making liveChatSection visible for message display');
            messagesArea.classList.remove('hidden');
            // Also ensure FAQ is hidden and input area is visible
            const faqSection = document.getElementById('faqSection');
            if (faqSection) faqSection.classList.add('hidden');
            const chatInputArea = document.getElementById('chatInputArea');
            if (chatInputArea) chatInputArea.classList.remove('hidden');
            // Set chat mode to live
            this.chatMode = 'live';
        }

        const isUser = msg.sender === 'user';
        // Use document ID as primary identifier
        const msgId = msg.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // More reliable duplicate check - but less aggressive for mobile
        const existingMsg = messagesArea.querySelector(`[data-msg-id="${msgId}"]`);
        if (existingMsg) {
            // On mobile, sometimes elements exist but aren't visible - check visibility
            const computedStyle = window.getComputedStyle(existingMsg);
            if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
                console.log('Message already exists and is visible in widget, skipping:', msgId);
                return;
            } else {
                // Element exists but is hidden - remove it and re-add (mobile fix)
                console.log('Message exists but is hidden, removing and re-adding:', msgId);
                existingMsg.remove();
            }
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 ${isNew ? 'animate-fade-in' : ''}`;
        msgDiv.setAttribute('data-msg-id', msgId);
        msgDiv.setAttribute('data-timestamp', msg.timestamp?.toDate ? msg.timestamp.toDate().getTime() : Date.now());
        
        let imageHtml = '';
        // Support both imageUrl (legacy) and imageBase64 (new method)
        const imageSrc = msg.imageBase64 || msg.imageUrl;
        if (imageSrc) {
            imageHtml = `
                <div class="mb-2 rounded-xl overflow-hidden shadow-md">
                    <img src="${imageSrc}" alt="Shared image" class="max-w-full max-h-64 cursor-pointer hover:opacity-90 transition-opacity rounded-lg" onclick="window.open('${imageSrc}', '_blank')">
                </div>
            `;
        }
        
        const messageText = msg.text || '';
        const timeStr = this.formatTime(msg.timestamp);
        
        if (isUser) {
            msgDiv.innerHTML = `
                <div class="max-w-[75%] bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl rounded-tr-sm p-3 shadow-md">
                    ${imageHtml}
                    ${messageText ? `<div class="text-sm leading-relaxed">${this.escapeHtml(messageText)}</div>` : ''}
                    <div class="text-xs mt-1.5 text-green-100 opacity-80 flex items-center justify-end gap-1">
                        ${timeStr}
                        <i class="fas fa-check ml-1 text-xs"></i>
                    </div>
                </div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="max-w-[75%] bg-white text-gray-900 border border-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                    ${imageHtml}
                    ${messageText ? `<div class="text-sm leading-relaxed text-gray-800">${this.escapeHtml(messageText)}</div>` : ''}
                    <div class="text-xs mt-1.5 text-gray-400">${timeStr}</div>
                </div>
            `;
        }
        
        // Always append messages at the bottom (after welcome message)
        // This ensures chronological order: old messages on top, new messages at bottom
        messagesArea.appendChild(msgDiv);
        
        // CRITICAL MOBILE FIX: Ensure message is visible after appending
        // Force reflow and ensure visibility
        msgDiv.offsetHeight;
        
        // Double-check visibility on mobile - sometimes elements are added but not visible
        const computedStyle = window.getComputedStyle(msgDiv);
        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
            console.warn('Widget: Message element is hidden after append, forcing visibility:', msgId);
            msgDiv.style.display = 'flex';
            msgDiv.style.visibility = 'visible';
        }
        
        // Ensure parent container is also visible
        if (messagesArea.classList.contains('hidden')) {
            console.warn('Widget: Parent container was hidden, making visible');
            messagesArea.classList.remove('hidden');
        }
        
        // Enhanced scrolling for mobile devices
        const scrollToBottom = () => {
            if (messagesArea) {
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }
        };
        
        // Auto-scroll to bottom for new messages or when chat is open
        if (isNew || this.isOpen) {
            scrollToBottom();
            setTimeout(scrollToBottom, 50);
            setTimeout(scrollToBottom, 200);
            setTimeout(scrollToBottom, 500);
        }
        
        // CRITICAL MOBILE FIX: Periodic visibility check for mobile devices
        // Sometimes mobile browsers hide elements after render - check and fix
        if (isNew) {
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(msgDiv);
                if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || 
                    msgDiv.classList.contains('hidden')) {
                    console.warn('Widget: Message became hidden after render, fixing:', msgId);
                    msgDiv.style.display = 'flex';
                    msgDiv.style.visibility = 'visible';
                    msgDiv.classList.remove('hidden');
                }
                // Also check parent
                if (messagesArea.classList.contains('hidden')) {
                    console.warn('Widget: Parent became hidden, fixing');
                    messagesArea.classList.remove('hidden');
                }
            }, 100);
        }
        
        // Log for debugging on mobile
        if (isNew) {
            console.log('Widget: Added message to UI:', { msgId, sender: msg.sender, text: msg.text?.substring(0, 50) });
        }

        if (isNew && !isUser) {
            this.updateUnreadCount();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(timestamp) {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    async sendMessage() {
        // CRITICAL: Require authentication - no anonymous messages
        if (!window.auth || !window.auth.currentUser) {
            sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
            window.location.href = 'login.html';
            return;
        }
        
        const input = document.getElementById('chatMessageInput');
        const sendBtn = document.getElementById('sendMessageBtn');
        const text = input.value.trim();
        const hasImage = this.selectedImageBase64 !== null;
        
        // Validate input
        if (!text && !hasImage) {
            return;
        }
        
        // CRITICAL MOBILE FIX: Ensure liveChatSection is visible before sending
        const messagesArea = document.getElementById('liveChatSection');
        if (messagesArea && messagesArea.classList.contains('hidden')) {
            console.log('Widget: Making liveChatSection visible before sending message');
            messagesArea.classList.remove('hidden');
            const faqSection = document.getElementById('faqSection');
            if (faqSection) faqSection.classList.add('hidden');
            const chatInputArea = document.getElementById('chatInputArea');
            if (chatInputArea) chatInputArea.classList.remove('hidden');
            this.chatMode = 'live';
        }
        
        // Ensure Firebase is initialized
        const initialized = await this.initializeFirebase();
        if (!initialized) {
            alert('Failed to connect to chat service. Please refresh the page and try again.');
            return;
        }
        
        // Ensure we have a user ID from authenticated user
        if (!this.currentUserId) {
            this.currentUserId = window.auth.currentUser.uid;
            this.isAuthenticated = true;
        }
        
        // Ensure we have a chat ID - create one if needed
        if (!this.currentChatId) {
            try {
                await this.createNewChat();
            } catch (error) {
                console.error('Error creating chat:', error);
                if (sendBtn) {
                    sendBtn.disabled = false;
                    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                }
                return;
            }
        }
        
        // Double-check we have a valid chat ID
        if (!this.currentChatId) {
            alert('Chat not initialized. Please try again.');
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }
            return;
        }

        // Disable send button while sending
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }

        try {
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, addDoc, serverTimestamp, updateDoc, doc } = firestoreModule;
            
            let imageBase64 = null;
            
            // Convert image to base64 if selected
            if (hasImage) {
                try {
                    // Show processing progress
                    if (sendBtn) {
                        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    }
                    
                    // Use already converted base64 if available, otherwise convert
                    if (this.selectedImageBase64) {
                        imageBase64 = this.selectedImageBase64;
                    } else if (this.selectedImageFile) {
                        imageBase64 = await this.convertImageToBase64(this.selectedImageFile);
                    }
                    
                    this.removeImagePreview();
                    
                    // Reset button text
                    if (sendBtn) {
                        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    }
                } catch (convertError) {
                    console.error('Error processing image:', convertError);
                    const errorMsg = convertError.message || 'Failed to process image. Please try again.';
                    alert(`Image processing failed: ${errorMsg}`);
                    if (sendBtn) {
                        sendBtn.disabled = false;
                        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    }
                    return;
                }
            }
            
            // Add message
            const messageData = {
                text: text || (hasImage ? '📷 Image' : ''),
                sender: 'user',
                timestamp: serverTimestamp(),
                read: false
            };
            
            // Store image as base64 string in Firestore
            if (imageBase64) {
                messageData.imageBase64 = imageBase64;
            }
            
            await addDoc(collection(window.db, 'live_chats', this.currentChatId, 'messages'), messageData);

            // Update chat last message time
            await updateDoc(doc(window.db, 'live_chats', this.currentChatId), {
                lastMessageAt: serverTimestamp(),
                status: 'open'
            });

            input.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.message && error.message.includes('permission')) {
                alert('Permission denied. Please refresh the page.');
            } else {
                alert('Failed to send message: ' + (error.message || 'Please try again.'));
            }
        } finally {
            // Re-enable send button
            if (sendBtn) {
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
            }
        }
    }

    async convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            // Validate file size (max 700KB to account for base64 encoding overhead)
            if (file.size > 700 * 1024) {
                reject(new Error('Image size must be less than 700KB. Please compress the image.'));
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                reject(new Error('Please select an image file'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                // Return the full data URL (includes data:image/...;base64, prefix)
                resolve(e.target.result);
            };
            reader.onerror = () => {
                reject(new Error('Error reading image file. Please try again.'));
            };
            reader.readAsDataURL(file);
        });
    }

    async startLiveChat() {
        // CRITICAL: Require authentication - no anonymous users
        if (!window.auth || !window.auth.currentUser) {
            sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
            window.location.href = 'login.html';
            return;
        }
        
        // Ensure we have a user ID from authenticated user
        if (!this.currentUserId) {
            this.currentUserId = window.auth.currentUser.uid;
            this.isAuthenticated = true;
        }

        this.chatMode = 'live';
        document.getElementById('faqSection').classList.add('hidden');
        const liveChatSection = document.getElementById('liveChatSection');
        liveChatSection.classList.remove('hidden');
        document.getElementById('chatInputArea').classList.remove('hidden');
        
        // Show welcome message
        this.showWelcomeMessage();
        
        if (this.currentChatId) {
            await this.loadMessages();
        } else {
            await this.createNewChat();
        }
    }

    showWelcomeMessage() {
        const messagesArea = document.getElementById('liveChatSection');
        if (!messagesArea) return;

        // Check if welcome message already exists
        if (document.getElementById('welcomeMessage')) return;

        const welcomeDiv = document.createElement('div');
        welcomeDiv.id = 'welcomeMessage';
        welcomeDiv.className = 'flex justify-center mb-4';
        welcomeDiv.innerHTML = `
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
        `;
        messagesArea.appendChild(welcomeDiv);
        
        // Scroll to bottom
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    async createNewChat() {
        // CRITICAL: Require authentication - no anonymous chats
        if (!window.auth || !window.auth.currentUser) {
            sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
            window.location.href = 'login.html';
            throw new Error('User not authenticated');
        }
        
        // Ensure we have a user ID from authenticated user
        if (!this.currentUserId) {
            this.currentUserId = window.auth.currentUser.uid;
            this.isAuthenticated = true;
        }
        
        // Ensure Firebase is initialized
        const initialized = await this.initializeFirebase();
        if (!initialized) {
            throw new Error('Firebase not initialized');
        }

        try {
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, addDoc, serverTimestamp } = firestoreModule;
            
            // Get user name and email from authenticated user
            const userName = window.auth.currentUser.email || 'User';
            const userEmail = window.auth.currentUser.email || '';
            
            // CRITICAL FIX: Ensure userId is always stored as string for consistent querying
            // This fixes issues on iPhone 16/17 where type mismatches can cause query failures
            const userId = String(this.currentUserId);
            
            // CRITICAL FIX: Check if chat already exists before creating (prevent duplicates)
            const firestoreModule = await this.getFirestoreFunctions();
            const { query, where, getDocs } = firestoreModule;
            const existingChatQuery = query(collection(window.db, 'live_chats'), where('userId', '==', userId));
            const existingSnapshot = await getDocs(existingChatQuery);
            
            if (!existingSnapshot.empty) {
                // Use existing chat instead of creating new one
                const existingChats = existingSnapshot.docs.sort((a, b) => {
                    const timeA = a.data().lastMessageAt?.toDate?.()?.getTime() || a.data().createdAt?.toDate?.()?.getTime() || 0;
                    const timeB = b.data().lastMessageAt?.toDate?.()?.getTime() || b.data().createdAt?.toDate?.()?.getTime() || 0;
                    return timeB - timeA; // Most recent first
                });
                this.currentChatId = existingChats[0].id;
                console.log('Using existing chat:', this.currentChatId);
                localStorage.setItem(`fci_chat_id_${this.currentUserId}`, this.currentChatId);
                await this.setupRealtimeListener();
                return;
            }
            
            const chatRef = await addDoc(collection(window.db, 'live_chats'), {
                userId: userId,
                userName: userName,
                userEmail: userEmail,
                isAnonymous: false,
                status: 'open',
                createdAt: serverTimestamp(),
                lastMessageAt: serverTimestamp()
            });
            this.currentChatId = chatRef.id;
            
            // Save chat ID to localStorage for persistence
            localStorage.setItem(`fci_chat_id_${this.currentUserId}`, this.currentChatId);
            
            await this.setupRealtimeListener();
        } catch (error) {
            console.error('Error creating chat:', error);
            if (error.message && error.message.includes('permission')) {
                alert('Please log in to start a chat.');
                sessionStorage.setItem('redirectAfterLogin', 'support.html?openChat=true');
                window.location.href = 'login.html';
            } else {
                alert('Failed to start chat. Please try again.');
            }
            throw error;
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        if (this.isOpen) {
            chatWindow.classList.remove('hidden');
            this.markAsRead();
        } else {
            chatWindow.classList.add('hidden');
        }
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatWindow').classList.add('hidden');
    }

    async markAsRead() {
        if (!this.currentChatId || !window.db) return;
        
        try {
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, query, where, getDocs, updateDoc, doc } = firestoreModule;
            const messagesRef = collection(window.db, 'live_chats', this.currentChatId, 'messages');
            const q = query(messagesRef, where('read', '==', false), where('sender', '==', 'admin'));
            const snapshot = await getDocs(q);
            
            const updatePromises = [];
            snapshot.forEach((msgDoc) => {
                updatePromises.push(
                    updateDoc(doc(window.db, 'live_chats', this.currentChatId, 'messages', msgDoc.id), {
                        read: true
                    })
                );
            });
            
            await Promise.all(updatePromises);
            this.updateUnreadCount();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    }

    async updateUnreadCount() {
        if (!this.currentChatId || !window.db) return;

        try {
            const firestoreModule = await this.getFirestoreFunctions();
            const { collection, doc, query, where, getDocs } = firestoreModule;
            const chatDocRef = doc(window.db, 'live_chats', this.currentChatId);
            const messagesRef = collection(chatDocRef, 'messages');
            const q = query(messagesRef, where('read', '==', false), where('sender', '==', 'admin'));
            
            const snapshot = await getDocs(q);
            this.unreadCount = snapshot.size;
            
            // Save unread count to localStorage for persistence
            if (this.currentChatId) {
                localStorage.setItem(`fci_chat_unread_${this.currentChatId}`, this.unreadCount.toString());
            }
            
            const badge = document.getElementById('chatBadge');
            if (badge) {
                if (this.unreadCount > 0) {
                    badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
                    badge.classList.remove('hidden');
                    // Add pulse animation for new messages
                    badge.classList.add('animate-pulse');
                    setTimeout(() => badge.classList.remove('animate-pulse'), 2000);
                } else {
                    badge.classList.add('hidden');
                }
            }
        } catch (error) {
            console.error('Error updating unread count:', error);
        }
    }

    showNotification() {
        // Show browser notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New message from Twenty Forth & Fifth', {
                body: 'You have a new message in your chat',
                icon: '/app-icon.svg'
            });
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.liveChatWidget = new LiveChatWidget();
    });
} else {
    window.liveChatWidget = new LiveChatWidget();
}

// Helper function to check if chat should open
function shouldOpenChatWidget() {
    return window.location.hash === '#open-chat' || sessionStorage.getItem('fci_open_chat') === 'true';
}

// Also check hash on window load (in case page loads slowly, especially on mobile)
window.addEventListener('load', () => {
    if (window.liveChatWidget && shouldOpenChatWidget()) {
        // Multiple attempts for mobile devices that may load slower
        setTimeout(() => {
            window.liveChatWidget.checkAndOpenChat();
        }, 500);
        setTimeout(() => {
            window.liveChatWidget.checkAndOpenChat();
        }, 1500);
        setTimeout(() => {
            window.liveChatWidget.checkAndOpenChat();
        }, 3000);
    }
});

// Also check when page becomes visible (for mobile browsers that pause scripts)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.liveChatWidget && shouldOpenChatWidget()) {
        setTimeout(() => {
            window.liveChatWidget.checkAndOpenChat();
        }, 500);
    }
});

// Check when page becomes fully interactive (mobile optimization)
if (document.readyState === 'complete') {
    // Page already loaded, check immediately
    setTimeout(() => {
        if (window.liveChatWidget && shouldOpenChatWidget()) {
            window.liveChatWidget.checkAndOpenChat();
        }
    }, 100);
} else {
    // Wait for page to be fully loaded
    window.addEventListener('pageshow', (event) => {
        // Handle back/forward cache on mobile
        if (window.liveChatWidget && shouldOpenChatWidget()) {
            setTimeout(() => {
                window.liveChatWidget.checkAndOpenChat();
            }, 300);
        }
    });
}



// Check when page becomes fully interactive (mobile optimization)
if (document.readyState === 'complete') {
    // Page already loaded, check immediately
    setTimeout(() => {
        if (window.liveChatWidget && shouldOpenChatWidget()) {
            window.liveChatWidget.checkAndOpenChat();
        }
    }, 100);
} else {
    // Wait for page to be fully loaded
    window.addEventListener('pageshow', (event) => {
        // Handle back/forward cache on mobile
        if (window.liveChatWidget && shouldOpenChatWidget()) {
            setTimeout(() => {
                window.liveChatWidget.checkAndOpenChat();
            }, 300);
        }
    });
}

