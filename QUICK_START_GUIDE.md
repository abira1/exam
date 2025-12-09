# Quick Start Guide - Google OAuth Setup

## 🚀 What's New?

✅ **Google OAuth Login** for Admin & Teachers (replaces username/password)
✅ **Role Management System** - Admins can manage authorized users
✅ **Default Admin Emails** - Pre-configured access for your team
✅ **Student Login Unchanged** - Students still use Student ID + password

## ⚡ Quick Setup (3 Steps)

### Step 1: Deploy Database Rules ⚠️ CRITICAL

**Firebase Console Method** (Fastest):
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select: **shah-sultan-s-ielts-academy**
3. Go to: **Realtime Database** → **Rules**
4. Copy ALL contents from `/app/database.rules.json`
5. Paste and click **Publish**

### Step 2: Enable Google Sign-In

1. In Firebase Console, go to: **Authentication** → **Sign-in method**
2. Click **Google** provider
3. Toggle to **Enable**
4. Add support email
5. Click **Save**

### Step 3: Test It!

1. Open app: `http://localhost:3000/staff/login`
2. Click "Sign in with Google"
3. Use one of these emails:
   - `abirsabirhossain@gmail.com` ✅
   - `shahsultanweb@gmail.com` ✅

## 🎯 Key URLs

| URL | Purpose | Authentication |
|-----|---------|----------------|
| `/staff/login` | Staff login | Google OAuth |
| `/admin` | Admin login | Google OAuth |
| `/student/login` | Student login | Student ID + Password |

## 👥 How to Add New Staff

### As Admin:
1. Login at `/staff/login` or `/admin`
2. Go to **Admin Dashboard**
3. Click **Role Management** tab
4. Click **Add User** button
5. Enter email and select role (Teacher/Admin)
6. Click **Add User**

The new user can now login with their Google account!

## 🔒 Default Admin Emails

These emails are automatically authorized as admins:
- ✅ `abirsabirhossain@gmail.com`
- ✅ `shahsultanweb@gmail.com`

## 🎨 UI Changes

### Staff Login Page
- ❌ Removed: Username/Password fields
- ✅ Added: "Sign in with Google" button
- ✅ Note: "Only authorized admin and teacher accounts can sign in"

### Admin Dashboard
- ✅ New Tab: **Role Management**
- Shows all authorized users with roles
- Add/Remove users easily
- See last login times

### Student Login Page
- ✅ No changes - still uses Student ID + password

## 🛠️ Troubleshooting

### Problem: "Permission denied" in console
**Solution**: Deploy database rules (Step 1 above)

### Problem: "Access Denied" after Google login
**Solution**: Email not authorized. Admin needs to add it in Role Management.

### Problem: Google popup doesn't appear
**Solution**: Check browser popup blocker settings

### Problem: Can't see Role Management tab
**Solution**: Only admins can see this. Teachers don't have access.

## 📱 Mobile Testing

The Google OAuth works on mobile browsers too! Just make sure:
- Users are authorized in the database
- Popup blockers are disabled

## 🔐 Security Notes

- Firebase API key in code is normal (it's a client-side app)
- Real security is in Firebase Database Rules
- Only authorized emails can access staff features
- Students are completely separate with their own authentication

## 📝 For Developers

### Adding More Default Admins
Edit: `/app/src/utils/initializeAuthorizedUsers.ts`
```typescript
const defaultAdmins = [
  'abirsabirhossain@gmail.com',
  'shahsultanweb@gmail.com',
  'yournewadmin@gmail.com'  // Add here
];
```

### Changing Permissions
Edit: `/app/src/services/authService.ts`
Look for the `permissions` object in `loginWithGoogle()` method.

## ✅ Testing Checklist

- [ ] Google login works at `/staff/login`
- [ ] Google login works at `/admin`
- [ ] Both admin emails can login
- [ ] Unauthorized email gets "Access Denied"
- [ ] Role Management tab visible for admins
- [ ] Can add new users successfully
- [ ] Can remove users (except self)
- [ ] Student login still works normally
- [ ] No console errors

## 🎉 You're All Set!

Once Steps 1 & 2 are complete, your Google OAuth authentication is fully functional!

## 📞 Need Help?

Check these files for more details:
- **Full Implementation Details**: `/app/GOOGLE_AUTH_IMPLEMENTATION.md`
- **Deployment Guide**: `/app/DEPLOYMENT_INSTRUCTIONS.md`

---

**Status**: ✅ Implementation Complete
**Next Step**: Deploy Firebase Database Rules!
