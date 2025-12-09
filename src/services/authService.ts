import { getDatabase, ref, get, set } from 'firebase/database';
import { app, auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import bcrypt from 'bcryptjs';
import { createEmailKey } from '../utils/initializeAuthorizedUsers';

export interface User {
  userId: string;
  username?: string;
  studentId?: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
  name: string;
  email: string;
  status: 'active' | 'inactive';
  permissions?: {
    manageStudents?: boolean;
    manageBatches?: boolean;
    manageTracks?: boolean;
    manageAudio?: boolean;
    createExamSessions?: boolean;
    viewAllSubmissions?: boolean;
    gradeSubmissions?: boolean;
    publishResults?: boolean;
    exportResults?: boolean;
    manageUsers?: boolean;
  };
  assignedTracks?: string[];
  batch?: string;
  batchId?: string;
  enrollmentDate?: string;
  createdAt?: string;
  lastLoginAt?: string;
  photoURL?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

const db = getDatabase(app);

export const authService = {
  // Google Sign-In for Staff (Admin/Teacher)
  async loginWithGoogle(): Promise<AuthResponse> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      if (!firebaseUser.email) {
        return { success: false, error: 'No email associated with this Google account' };
      }

      // Check if user is authorized
      const emailKey = createEmailKey(firebaseUser.email);
      const authorizedUserRef = ref(db, `authorizedUsers/${emailKey}`);
      const authorizedUserSnapshot = await get(authorizedUserRef);

      if (!authorizedUserSnapshot.exists()) {
        // Sign out immediately if not authorized
        await signOut(auth);
        return { 
          success: false, 
          error: 'Access Denied. Your email is not authorized. Please contact an administrator.' 
        };
      }

      const authorizedUser = authorizedUserSnapshot.val();

      if (authorizedUser.status !== 'active') {
        await signOut(auth);
        return { 
          success: false, 
          error: 'Your account is inactive. Please contact administrator.' 
        };
      }

      // Update last login
      await set(ref(db, `authorizedUsers/${emailKey}/lastLoginAt`), new Date().toISOString());

      // Create user object
      const user: User = {
        userId: firebaseUser.uid,
        role: authorizedUser.role,
        name: firebaseUser.displayName || firebaseUser.email,
        email: firebaseUser.email,
        status: 'active',
        photoURL: firebaseUser.photoURL || undefined,
        password: '', // Not used for Google auth
        permissions: authorizedUser.role === 'admin' ? {
          manageStudents: true,
          manageBatches: true,
          manageTracks: true,
          manageAudio: true,
          createExamSessions: true,
          viewAllSubmissions: true,
          gradeSubmissions: true,
          publishResults: true,
          exportResults: true,
          manageUsers: true
        } : {
          viewAllSubmissions: true,
          gradeSubmissions: true,
          publishResults: false,
          exportResults: true,
          manageUsers: false
        },
        assignedTracks: authorizedUser.assignedTracks || []
      };

      return { success: true, user };
    } catch (error: any) {
      console.error('Google login error:', error);
      
      // Handle user cancellation
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return { success: false, error: 'Login cancelled' };
      }
      
      return { success: false, error: 'Failed to sign in with Google. Please try again.' };
    }
  },

  // Student Login (unchanged)
  async loginStudent(studentId: string, password: string): Promise<AuthResponse> {
    try {
      const snapshot = await get(ref(db, `students/${studentId}`));
      
      if (!snapshot.exists()) {
        return { success: false, error: 'Invalid Student ID or password' };
      }

      const student = snapshot.val();

      if (student.status !== 'active') {
        return { success: false, error: 'Your account is inactive. Please contact administrator.' };
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);
      
      if (!isPasswordValid) {
        return { success: false, error: 'Invalid Student ID or password' };
      }

      // Update last login
      await set(ref(db, `students/${studentId}/lastLoginAt`), new Date().toISOString());

      const user: User = {
        userId: studentId,
        studentId: studentId,
        role: 'student',
        name: student.name,
        email: student.email,
        status: student.status,
        batch: student.batch,
        batchId: student.batchId,
        password: '' // Don't send password back
      };

      return { success: true, user };
    } catch (error) {
      console.error('Student login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  },

  // Verify token (check if user exists in sessionStorage)
  verifyToken(): User | null {
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Save user to session
  saveUserSession(user: User): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('adminAuth');
  }
};
