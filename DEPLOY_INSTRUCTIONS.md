# Deploy Firestore Security Rules

## Quick Deploy (Recommended)

### Option 1: Using the Deployment Script
```bash
./deploy-firestore-rules.sh
```

### Option 2: Using Firebase CLI Directly
```bash
firebase deploy --only firestore:rules
```

## Prerequisites

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Verify you're in the correct project**:
   ```bash
   firebase projects:list
   ```

## Manual Deployment via Firebase Console

If you prefer to deploy via the web console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **beal-offshore** or **beal-offshore-inc**
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy the contents of `firestore.rules` file
5. Paste into the rules editor
6. Click **Publish**

## Verify Deployment

After deployment, test the KYC upload functionality:
1. Go to the Security page
2. Upload a KYC document
3. You should see the success modal instead of a permissions error

## Troubleshooting

If you still get permission errors after deployment:

1. **Check the rules are deployed**:
   - Go to Firebase Console → Firestore → Rules
   - Verify the rules match `firestore.rules`

2. **Check user authentication**:
   - Ensure the user is logged in
   - Check that `request.auth.uid` matches the document `userId`

3. **Check the project**:
   - Verify you're deploying to the correct Firebase project
   - Check `.firebaserc` for the project ID

4. **Wait for propagation**:
   - Rules can take a few seconds to propagate
   - Try again after 10-30 seconds

