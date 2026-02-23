# Firebase Password Reset Email Setup

If users see "success" but never receive the password reset email, verify these settings in Firebase Console.

## 1. Enable Email/Password Sign-in

1. Go to [Firebase Console](https://console.firebase.google.com/) → **twenty-forth-fifth** project
2. **Authentication** → **Sign-in method**
3. Ensure **Email/Password** is **Enabled**

## 2. Authorized Domains

1. **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `www.twentyforthfifth-fccu.com`
   - `twentyforthfifth-fccu.com`
   - `twenty-forth-fifth-fccu.vercel.app`
   - `localhost` (for local testing)

## 3. Password Reset Email Template

1. **Authentication** → **Templates** → **Password reset**
2. Ensure the template is enabled
3. Optionally customize the sender name and email body
4. The **Action URL** in the template is overridden by the `continueUrl` we pass in code (where users land after resetting)

## 4. Important Notes

- **Firebase returns success for ALL emails** (including unregistered ones) to prevent attackers from discovering which emails exist. The email is only sent if the address is registered in Firebase Auth.
- Emails are sent from `noreply@twenty-forth-fifth.firebaseapp.com` — some providers may filter these. Ask users to check spam/junk.
- The reset link expires in 1 hour by default.

## 5. Verify a User Exists

To confirm an email is registered:
1. **Authentication** → **Users**
2. Search for the email address
3. If it's not listed, the user must sign up first — no reset email will be sent

