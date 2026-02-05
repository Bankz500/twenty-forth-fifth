// Banking Details Generator for Beal Offshore Ltd
// This module generates unique banking details for each user

class BankingDetailsGenerator {
    constructor() {
        // Initialize Firebase if not already done (async, but don't wait)
        this.initializeFirebase().catch(err => {
            console.log('Firebase initialization deferred, will use fallback');
            this.handleFirebaseError();
        });
    }

    async initializeFirebase() {
        // For now, skip Firebase initialization to avoid module conflicts
        // Use localStorage fallback only
        console.log('Using localStorage fallback for banking details');
        this.handleFirebaseError();
    }

    setupFirebase() {
        try {
            // Initialize Firebase
            const firebaseConfig = {
                apiKey: "AIzaSyDyZiL4-h5n9Kqr24e7liROgHXMZau2ZmI",
                authDomain: "artis-stanbic-holdings.firebaseapp.com",
                projectId: "artis-stanbic-holdings",
                storageBucket: "artis-stanbic-holdings.firebasestorage.app",
                messagingSenderId: "124094969669",
                appId: "1:124094969669:web:54e6306dc5747a80ec8d8c",
                measurementId: "G-0WSC5YMY2C"
            };
            
            // Check if Firebase is already initialized
            if (!firebase.apps.length) {
                this.app = firebase.initializeApp(firebaseConfig);
            } else {
                this.app = firebase.app();
            }
            
            this.auth = firebase.auth();
            this.db = firebase.firestore();
            
            console.log('Firebase initialized successfully for banking details');
            
            // Set up auth state listener
            this.auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log('User authenticated:', user.uid);
                } else {
                    console.log('No user authenticated');
                }
            });
            
        } catch (error) {
            console.error('Error setting up Firebase:', error);
            this.handleFirebaseError();
        }
    }

    handleFirebaseError() {
        console.log('Firebase not available, using fallback mode');
        // Set fallback values
        this.app = null;
        this.auth = null;
        this.db = null;
    }

    // Generate a unique account number
    generateAccountNumber() {
        // Generate a 10-digit account number
        let accountNumber = '';
        for (let i = 0; i < 10; i++) {
            accountNumber += Math.floor(Math.random() * 10);
        }
        return accountNumber;
    }

    // Generate a unique Swift code
    generateSwiftCode() {
        // Swift codes are typically 8-11 characters
        const banks = ['FTBC', 'CHAS', 'WELL', 'CITI', 'JPMO', 'BANK', 'AMEX'];
        const countries = ['US', 'UK', 'CA', 'AU', 'SG'];
        const cities = ['NYC', 'LON', 'TOR', 'SYD', 'SIN'];
        
        const bank = banks[Math.floor(Math.random() * banks.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        
        return bank + city + country;
    }

    // Generate a unique routing number
    generateRoutingNumber() {
        // US routing numbers are 9 digits
        let routingNumber = '';
        for (let i = 0; i < 9; i++) {
            routingNumber += Math.floor(Math.random() * 10);
        }
        return routingNumber;
    }

    // Generate complete banking details
    generateBankingDetails() {
        return {
            accountNumber: this.generateAccountNumber(),
            swiftCode: this.generateSwiftCode(),
            routingNumber: this.generateRoutingNumber(),
            bankName: 'Beal Offshore Ltd',
            accountType: 'Personal Account',
            generatedAt: new Date().toISOString()
        };
    }

    // Save banking details to Firestore for a specific user (in user document's "bank" field)
    async saveBankingDetails(userId, bankingDetails, forceOverwrite = false) {
        try {
            // Try to use Firebase from the global scope (from dashboard.html or deposit.html)
            let db = null;
            try {
                // Check if db is available globally
                if (typeof window !== 'undefined' && window.db) {
                    db = window.db;
                } else if (this.db) {
                    db = this.db;
                }
            } catch (e) {
                console.error('Could not access global db:', e);
            }

            if (!db) {
                console.warn('Firebase not available, using localStorage fallback');
                return this.saveToLocalStorage(userId, bankingDetails);
            }

            // Use v9 modular syntax (assume it's available from the page)
            const { doc, getDoc, setDoc } = await import('https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js');
            const userDocRef = doc(db, 'users', userId);
            
            let userData = null;
            let existingDoc = null;
            
            try {
                existingDoc = await getDoc(userDocRef);
                if (existingDoc.exists()) {
                    userData = existingDoc.data();
                }
            } catch (getError) {
                console.error('Error reading existing document:', getError);
            }
            
            // Check if banking details already exist - only skip if forceOverwrite is false
            if (!forceOverwrite && userData && userData.bank && userData.bank.accountNumber) {
                console.log('⚠️ Banking details already exist for this user in "bank" field, not overwriting');
                console.log('📋 Existing details:', {
                    accountNumber: userData.bank.accountNumber ? '***' + userData.bank.accountNumber.slice(-4) : 'none',
                    hasSwiftCode: !!userData.bank.swiftCode,
                    hasRoutingNumber: !!userData.bank.routingNumber
                });
                // Still sync to localStorage
                this.saveToLocalStorage(userId, userData.bank);
                return true;
            }
            
            console.log('💾 Saving new banking details to Firebase...');
            
            // Prepare banking details data
            const detailsData = {
                accountNumber: bankingDetails.accountNumber,
                routingNumber: bankingDetails.routingNumber,
                bankName: bankingDetails.bankName,
                accountType: bankingDetails.accountType,
                accountHolderName: bankingDetails.accountHolderName || bankingDetails.accountName || 'Account Holder',
                swiftCode: bankingDetails.swiftCode || '',
                iban: bankingDetails.iban || '',
                createdAt: userData && userData.bank && userData.bank.createdAt ? userData.bank.createdAt : new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true,
                generatedAt: new Date().toISOString()
            };
            
            // Save to Firebase - use merge to preserve other user data
            try {
                console.log('💾 Attempting to save to Firebase:', {
                    userId: userId,
                    accountNumber: detailsData.accountNumber,
                    swiftCode: detailsData.swiftCode,
                    routingNumber: detailsData.routingNumber
                });
                
                await setDoc(userDocRef, {
                    bank: detailsData,
                    hasBankingDetails: true,
                    lastUpdated: new Date().toISOString()
                }, { merge: true });

                console.log('✅ Banking details saved successfully to Firebase in user document "bank" field');
                
                // Verify the save by reading it back
                console.log('🔍 Verifying save by reading back from Firebase...');
                const verifyDoc = await getDoc(userDocRef);
                if (verifyDoc.exists()) {
                    const verifyData = verifyDoc.data();
                    if (verifyData.bank && verifyData.bank.accountNumber === detailsData.accountNumber) {
                        console.log('✅ Verified: Banking details confirmed in Firebase');
                        console.log('📋 Verified details:', {
                            accountNumber: verifyData.bank.accountNumber,
                            swiftCode: verifyData.bank.swiftCode,
                            routingNumber: verifyData.bank.routingNumber
                        });
                    } else {
                        console.warn('⚠️ Verification failed: Account numbers do not match');
                        console.log('Expected:', detailsData.accountNumber);
                        console.log('Found:', verifyData.bank ? verifyData.bank.accountNumber : 'no bank field');
                    }
                } else {
                    console.warn('⚠️ Verification failed: User document does not exist after save');
                }
            } catch (saveError) {
                console.error('❌ Error saving to Firebase:', saveError);
                console.error('Save error details:', {
                    message: saveError.message,
                    code: saveError.code,
                    stack: saveError.stack
                });
                throw saveError; // Re-throw to trigger fallback
            }
            
            // Also save to localStorage as backup
            this.saveToLocalStorage(userId, detailsData);
            return true;
        } catch (error) {
            console.error('❌ Error saving banking details to Firebase:', error);
            console.log('Falling back to localStorage');
            // Still save to localStorage even if Firebase fails
            this.saveToLocalStorage(userId, bankingDetails);
            return false; // Return false to indicate Firebase save failed
        }
    }

    // Fallback to localStorage
    saveToLocalStorage(userId, bankingDetails) {
        try {
            const key = `beal_banking_details_${userId}`;
            localStorage.setItem(key, JSON.stringify({
                ...bankingDetails,
                userId: userId,
                savedAt: new Date().toISOString()
            }));
            console.log('Banking details saved to localStorage as fallback');
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    // Get banking details for a specific user (from user document's "bank" field)
    // Always prioritizes Firebase over localStorage to ensure consistency across devices
    async getBankingDetails(userId, autoGenerate = false) {
        try {
            // Try to use Firebase from the global scope
            let db = null;
            try {
                if (typeof window !== 'undefined' && window.db) {
                    db = window.db;
                } else if (this.db) {
                    db = this.db;
                }
            } catch (e) {
                console.log('Could not access global db, will use localStorage');
            }

            // ALWAYS try Firebase first to ensure consistency across devices
            if (db) {
                try {
                    console.log('🔍 Checking Firebase for banking details for user:', userId);
                    // Use v9 modular syntax to get from user document's "bank" field
                    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js');
                    const userDocRef = doc(db, 'users', userId);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log('📄 User document exists, checking for bank field:', {
                            hasBankField: !!userData.bank,
                            bankData: userData.bank ? {
                                hasAccountNumber: !!userData.bank.accountNumber,
                                accountNumber: userData.bank.accountNumber ? '***' + userData.bank.accountNumber.slice(-4) : 'none'
                            } : 'no bank field'
                        });
                        
                        // Check for banking details in "bank" field - this is the source of truth
                        if (userData.bank && userData.bank.accountNumber) {
                            console.log('✅ Found existing banking details in Firebase user document "bank" field');
                            console.log('📋 Banking details:', {
                                accountNumber: userData.bank.accountNumber,
                                swiftCode: userData.bank.swiftCode,
                                routingNumber: userData.bank.routingNumber
                            });
                            // Update localStorage to match Firebase (sync localStorage with Firebase)
                            this.saveToLocalStorage(userId, userData.bank);
                            return userData.bank;
                        } else {
                            console.log('⚠️ User document exists but no banking details found in "bank" field');
                        }
                    } else {
                        console.log('⚠️ User document does not exist in Firebase');
                    }
                } catch (firebaseError) {
                    console.error('❌ Error reading from Firebase:', firebaseError);
                    console.error('Error details:', {
                        message: firebaseError.message,
                        code: firebaseError.code,
                        stack: firebaseError.stack
                    });
                    // Continue to localStorage fallback
                }
            } else {
                console.log('⚠️ Firebase db not available, will check localStorage');
            }

            // If Firebase doesn't have details, check localStorage as fallback
            console.log('No banking details found in Firebase, checking localStorage');
            const localDetails = this.getFromLocalStorage(userId);
            if (localDetails && localDetails.accountNumber) {
                console.log('Found existing banking details in localStorage, syncing to Firebase');
                // Try to save to Firebase for future use (this ensures cross-device sync)
                if (db) {
                    try {
                        await this.saveBankingDetails(userId, localDetails, false);
                    } catch (saveError) {
                        console.log('Could not save to Firebase, but using localStorage details');
                    }
                }
                return localDetails;
            }
            
            // Only generate new details if autoGenerate is true
            if (autoGenerate) {
                console.log('No existing banking details found, generating new ones');
                const newDetails = this.generateBankingDetails();
                await this.saveBankingDetails(userId, newDetails, false);
                return newDetails;
            } else {
                // Return null if no details found and autoGenerate is false
                console.log('No existing banking details found');
                return null;
            }
        } catch (error) {
            console.error('Error getting banking details:', error);
            console.log('Falling back to localStorage');
            const localDetails = this.getFromLocalStorage(userId);
            if (localDetails && localDetails.accountNumber) {
                return localDetails;
            }
            // If autoGenerate is false and no details found, return null
            if (!autoGenerate) {
                return null;
            }
            // Otherwise generate new ones
            console.log('No existing details found, generating new ones');
            const newDetails = this.generateBankingDetails();
            await this.saveBankingDetails(userId, newDetails, false);
            return newDetails;
        }
    }

    // Fallback to localStorage
    getFromLocalStorage(userId) {
        try {
            // Use consistent key based on userId
            const key = `beal_banking_details_${userId}`;
            const stored = localStorage.getItem(key);
            
            if (stored) {
                const details = JSON.parse(stored);
                if (details && details.accountNumber) {
                    console.log('Found existing banking details in localStorage');
                    return details;
                }
            }
            
            // If no details found for this user, return null (don't generate new ones here)
            // Let the calling function decide whether to generate new details
            console.log('No existing banking details found in localStorage for user:', userId);
            return null;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    }

    // Check if user is authenticated and get their ID
    getCurrentUserId() {
        // Try to get from global auth (from dashboard.html or deposit.html)
        let auth = null;
        try {
            if (typeof window !== 'undefined' && window.auth) {
                auth = window.auth;
            } else if (this.auth) {
                auth = this.auth;
            }
        } catch (e) {
            console.log('Could not access global auth');
        }
        
        if (auth) {
            // Check if v9 modular (has currentUser property)
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.uid) {
                return currentUser.uid;
            }
        }
        
        // Fallback: generate a temporary user ID for demo purposes (should not happen in production)
        console.warn('No authenticated user found, using temporary ID');
        let tempUserId = localStorage.getItem('beal_temp_user_id');
        if (!tempUserId) {
            tempUserId = 'temp_user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('beal_temp_user_id', tempUserId);
        }
        return tempUserId;
    }

    // Initialize banking details for current user (with auto-generate option)
    async initializeUserBankingDetails(autoGenerate = false) {
        const userId = this.getCurrentUserId();
        console.log('🚀 Initializing banking details for user:', userId);
        
        if (!userId) {
            console.warn('⚠️ No user ID available');
            return null;
        }
        
        try {
            const bankingDetails = await this.getBankingDetails(userId, autoGenerate);
            if (bankingDetails) {
                console.log('✅ Successfully initialized banking details');
            } else {
                console.log('ℹ️ No banking details found (this is expected for new users)');
            }
            return bankingDetails;
        } catch (error) {
            console.error('❌ Error initializing banking details:', error);
            console.error('Error stack:', error.stack);
            return null;
        }
    }
}

// Export the class for use in other files
export default BankingDetailsGenerator; 