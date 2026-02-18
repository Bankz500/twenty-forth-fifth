# Twenty Forth & Fifth - Dynamic Banking Details System

## Overview

This system automatically generates unique banking details (account number, swift code, and routing number) for each user. Each signed-up user gets their own personalized banking information that is stored securely and can be regenerated if needed.

## Features

- **Unique Banking Details**: Each user gets their own account number, swift code, and routing number
- **Automatic Generation**: Details are generated automatically when a user first visits the deposit page
- **Regeneration**: Users can generate new banking details using the refresh button
- **Secure Storage**: Details are stored securely in Firebase Firestore (or localStorage for demo)
- **Real-time Updates**: Changes are reflected immediately in the UI
- **Copy to Clipboard**: Easy copying of banking details

## How It Works

### 1. User Registration
When a new user signs up, the system automatically generates:
- **Account Number**: 10-digit unique number
- **Swift Code**: 8-11 character unique code (e.g., FTBCNYCUS)
- **Routing Number**: 9-digit unique routing number

### 2. Storage
- **Production**: Details are stored in Firebase Firestore under `bankingDetails` collection
- **Demo**: Details are stored in browser localStorage for testing

### 3. Retrieval
- Details are automatically loaded when users visit the deposit page
- If no details exist, new ones are generated automatically
- Users can refresh to get new details at any time

## Files

### Core Files
- `banking-details-generator.js` - Main Firebase-integrated generator
- `banking-details-demo.js` - Simplified demo version for testing
- `deposit.html` - Production deposit page with Firebase integration
- `deposit-demo.html` - Demo version for testing without Firebase

### Key Functions

#### BankingDetailsGenerator Class
```javascript
// Generate new banking details
const details = bankingGenerator.generateBankingDetails();

// Save details to Firebase
await bankingGenerator.saveBankingDetails(userId, details);

// Get existing details
const details = await bankingGenerator.getBankingDetails(userId);

// Check if user has details
const hasDetails = bankingGenerator.hasExistingDetails();
```

## Implementation Details

### Account Number Generation
- 10-digit random number
- Ensures uniqueness through Firebase document IDs

### Swift Code Generation
- Combines bank prefix + city + country
- Examples: FTBCNYCUS, CHASLONUK, WELLTOCA

### Routing Number Generation
- 9-digit random number
- Follows US banking standards

## Usage

### For Production (with Firebase)
1. Ensure Firebase is configured in `firebase-config.js`
2. Use `deposit.html` which imports `banking-details-generator.js`
3. Users must be authenticated to access banking details

### For Testing/Demo
1. Use `deposit-demo.html` which imports `banking-details-demo.js`
2. No authentication required
3. Details are stored in browser localStorage

## Security Features

- Each user's details are isolated by user ID
- Details are only accessible to authenticated users
- Regeneration creates completely new details
- No cross-user data leakage

## Customization

### Adding New Bank Types
```javascript
// In the generateSwiftCode function
const banks = ['FTBC', 'CHAS', 'WELL', 'CITI', 'JPMO', 'BANK', 'AMEX', 'NEWBANK'];
```

### Changing Number Formats
```javascript
// Modify generateAccountNumber for different formats
generateAccountNumber() {
    // Example: 12-digit format
    let accountNumber = '';
    for (let i = 0; i < 12; i++) {
        accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
}
```

### Adding New Fields
```javascript
generateBankingDetails() {
    return {
        accountNumber: this.generateAccountNumber(),
        swiftCode: this.generateSwiftCode(),
        routingNumber: this.generateRoutingNumber(),
        bankName: 'Twenty Forth & Fifth',
        accountType: 'Personal Account',
        // Add new fields here
        branchCode: this.generateBranchCode(),
        generatedAt: new Date().toISOString()
    };
}
```

## Testing

1. Open `deposit-demo.html` in a browser
2. Banking details will load automatically
3. Click the refresh button (🔄) to generate new details
4. Use copy buttons to copy details to clipboard
5. Check browser console for any errors

## Production Deployment

1. Ensure Firebase project is properly configured
2. Deploy `deposit.html` (not the demo version)
3. Test with authenticated users
4. Monitor Firebase console for any errors
5. Verify banking details are being generated and stored correctly

## Troubleshooting

### Common Issues

1. **Details not loading**: Check Firebase configuration and authentication
2. **Copy not working**: Ensure HTTPS or localhost (clipboard API requirement)
3. **Firebase errors**: Check console for authentication or permission issues

### Debug Mode
```javascript
// Add to banking generator for debugging
console.log('Generated details:', details);
console.log('User ID:', userId);
console.log('Firebase status:', this.db ? 'Connected' : 'Not connected');
```

## Future Enhancements

- **Multiple Account Types**: Business vs Personal accounts
- **International Banking**: Support for different countries
- **Audit Trail**: Track when details were generated/changed
- **Admin Panel**: Manage banking details from admin interface
- **API Integration**: Connect with real banking systems

## Support

For technical support or questions about the banking details system, contact the development team or refer to the Firebase documentation. 