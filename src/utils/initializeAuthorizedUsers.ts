import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from '../firebase';

const db = getDatabase(app);

// Function to create email-safe key
const createEmailKey = (email: string): string => {
  return email.replace(/[.#$\[\]]/g, '_');
};

export const initializeAuthorizedUsers = async () => {
  try {
    // Default admin emails
    const defaultAdmins = [
      'abirsabirhossain@gmail.com',
      'shahsultanweb@gmail.com'
    ];

    // Initialize authorized users node
    
    for (const email of defaultAdmins) {
      const emailKey = createEmailKey(email);
      const userRef = ref(db, `authorizedUsers/${emailKey}`);
      const userSnapshot = await get(userRef);
      
      // Only add if doesn't exist
      if (!userSnapshot.exists()) {
        await set(userRef, {
          email: email,
          role: 'admin',
          addedAt: new Date().toISOString(),
          addedBy: 'system',
          status: 'active'
        });
        console.log(`✅ Added default admin: ${email}`);
      }
    }

    console.log('✅ Authorized users initialized successfully');
  } catch (error) {
    console.error('Error initializing authorized users:', error);
  }
};

export { createEmailKey };
