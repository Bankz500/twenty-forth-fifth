// Banking Details Generator for Beal Offshore Ltd
// This module generates unique banking details for each user

class BankingDetailsGenerator {
    constructor() {
        // Initialize Firebase if not already done
        this.initializeFirebase();
    }

    initializeFirebase() {
        // Check if Firebase is already loaded
        if (typeof firebase !== 'undefined') {
            this.setupFirebase();
            return;
        }

        // Load Firebase from CDN
        const script1 = document.createElement('script');
        script1.src = 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js';
            script2.onload = () => {
                const script3 = document.createElement('script');
                script3.src = 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';
                script3.onload = () => {
                    this.setupFirebase();
                };
                script3.onerror = (error) => {
                    console.error('Error loading Firebase Firestore:', error);
                    this.handleFirebaseError();
                };
                document.head.appendChild(script3);
            };
            script2.onerror = (error) => {
                console.error('Error loading Firebase Auth:', error);
                this.handleFirebaseError();
            };
            document.head.appendChild(script2);
        };
        script1.onerror = (error) => {
            console.error('Error loading Firebase App:', error);
            this.handleFirebaseError();
        };
        document.head.appendChild(script1);
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

    // Save banking details to Firestore for a specific user
    async saveBankingDetails(userId, bankingDetails) {
        try {
            if (!this.db) {
                console.log('Firebase not available, using localStorage fallback');
                return this.saveToLocalStorage(bankingDetails);
            }

            const userDocRef = this.db.collection('users').doc(userId);
            const bankingDocRef = this.db.collection('bankingDetails').doc(userId);
            
            // Save banking details
            await bankingDocRef.set({
                ...bankingDetails,
                userId: userId,
                createdAt: new Date().toISOString(),
                isActive: true
            });

            // Update user document with banking details reference
            await userDocRef.set({
                hasBankingDetails: true,
                bankingDetailsId: userId,
                lastUpdated: new Date().toISOString()
            }, { merge: true });

            console.log('Banking details saved successfully to Firebase');
            return true;
        } catch (error) {
            console.error('Error saving banking details to Firebase:', error);
            console.log('Falling back to localStorage');
            return this.saveToLocalStorage(bankingDetails);
        }
    }

    // Fallback to localStorage
    saveToLocalStorage(bankingDetails) {
        try {
            const key = `beal_banking_details_${Date.now()}`;
            localStorage.setItem(key, JSON.stringify(bankingDetails));
            console.log('Banking details saved to localStorage as fallback');
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    // Get banking details for a specific user
    async getBankingDetails(userId) {
        try {
            if (!this.db) {
                console.log('Firebase not available, using localStorage fallback');
                return this.getFromLocalStorage();
            }

            const bankingDocRef = this.db.collection('bankingDetails').doc(userId);
            const bankingDoc = await bankingDocRef.get();

            if (bankingDoc.exists) {
                return bankingDoc.data();
            } else {
                // Generate new banking details if none exist
                const newDetails = this.generateBankingDetails();
                await this.saveBankingDetails(userId, newDetails);
                return newDetails;
            }
        } catch (error) {
            console.error('Error getting banking details from Firebase:', error);
            console.log('Falling back to localStorage');
            return this.getFromLocalStorage();
        }
    }

    // Fallback to localStorage
    getFromLocalStorage() {
        try {
            // Try to find existing details
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('beal_banking_details_')) {
                    const details = JSON.parse(localStorage.getItem(key));
                    if (details && details.accountNumber) {
                        return details;
                    }
                }
            }
            
            // Generate new details if none found
            const newDetails = this.generateBankingDetails();
            this.saveToLocalStorage(newDetails);
            return newDetails;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return this.generateBankingDetails();
        }
    }

    // Check if user is authenticated and get their ID
    getCurrentUserId() {
        if (this.auth && this.auth.currentUser) {
            return this.auth.currentUser.uid;
        }
        
        // Fallback: generate a temporary user ID for demo purposes
        let tempUserId = localStorage.getItem('beal_temp_user_id');
        if (!tempUserId) {
            tempUserId = 'temp_user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('beal_temp_user_id', tempUserId);
        }
        return tempUserId;
    }

    // Initialize banking details for current user
    async initializeUserBankingDetails() {
        const userId = this.getCurrentUserId();
        console.log('Initializing banking details for user:', userId);
        
        try {
            const bankingDetails = await this.getBankingDetails(userId);
            return bankingDetails;
        } catch (error) {
            console.error('Error initializing banking details:', error);
            return null;
        }
    }
}

// Export the class for use in other files
export default BankingDetailsGenerator; 