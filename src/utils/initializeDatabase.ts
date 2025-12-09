import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from '../firebase';
import bcrypt from 'bcryptjs';

const db = getDatabase(app);

export const initializeDatabase = async () => {
  try {
    // Check if admin already exists
    const usersSnapshot = await get(ref(db, 'users'));
    
    if (usersSnapshot.exists()) {
      const users = usersSnapshot.val();
      const adminExists = Object.values(users).some(
        (user: any) => user.username === 'admin' && user.role === 'admin'
      );
      
      if (adminExists) {
        console.log('Default admin account already exists');
        return;
      }
    }

    // Create default admin account
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const defaultAdmin = {
      userId: 'admin-default',
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      name: 'System Administrator',
      email: 'admin@system.com',
      status: 'active',
      permissions: {
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
      },
      assignedTracks: [],
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };

    await set(ref(db, 'users/admin-default'), defaultAdmin);
    console.log('✅ Default admin account created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
