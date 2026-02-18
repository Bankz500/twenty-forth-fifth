// Script to update admin password using Firebase Admin SDK
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to download this from Firebase Console

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function updateAdminPassword() {
  try {
    const email = 'ericrotter51@gmail.com';
    const newPassword = 'Peculiar500@';
    
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Update password
    await admin.auth().updateUser(user.uid, {
      password: newPassword
    });
    
    console.log(`✅ Password updated successfully for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating password:', error.message);
    process.exit(1);
  }
}

updateAdminPassword();
