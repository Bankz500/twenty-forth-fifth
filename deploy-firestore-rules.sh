#!/bin/bash

# Deploy Firestore Security Rules
# This script deploys the Firestore security rules to Firebase

echo "🚀 Deploying Firestore Security Rules..."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed."
    echo "Please install it using: npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase."
    echo "Please login using: firebase login"
    exit 1
fi

# Deploy only Firestore rules
echo "📝 Deploying rules from firestore.rules..."
firebase deploy --only firestore:rules

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Firestore rules deployed successfully!"
    echo "Your KYC upload functionality should now work."
else
    echo ""
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi

