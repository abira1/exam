import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase, ref as dbRef, set, get } from "firebase/database";
import { app } from "../firebase";

const storage = getStorage(app);
const database = getDatabase(app);

const AUDIO_DB_PATH = "exam/audio";

export const audioService = {
  // Upload audio file to Firebase Storage
  async uploadAudio(file: File): Promise<string> {
    try {
      const fileName = `exam-audio-${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `audio/${fileName}`);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save URL to Realtime Database
      await set(dbRef(database, AUDIO_DB_PATH), {
        url: downloadURL,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        size: file.size
      });
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading audio:", error);
      throw error;
    }
  },

  // Get current audio URL from database
  async getAudioURL(): Promise<string | null> {
    try {
      const snapshot = await get(dbRef(database, AUDIO_DB_PATH));
      if (snapshot.exists()) {
        return snapshot.val().url;
      }
      return null;
    } catch (error) {
      console.error("Error fetching audio URL:", error);
      return null;
    }
  },

  // Delete audio from storage and database
  async deleteAudio(): Promise<void> {
    try {
      const snapshot = await get(dbRef(database, AUDIO_DB_PATH));
      if (snapshot.exists()) {
        const audioURL = snapshot.val().url;
        
        // Extract file path from URL for deletion
        const fileNameMatch = audioURL.match(/audio%2F([^?]+)/);
        if (fileNameMatch) {
          const fileName = decodeURIComponent(fileNameMatch[1]);
          const storageRef = ref(storage, `audio/${fileName}`);
          await deleteObject(storageRef);
        }
        
        // Delete from database
        await set(dbRef(database, AUDIO_DB_PATH), null);
      }
    } catch (error) {
      console.error("Error deleting audio:", error);
      throw error;
    }
  },

  // Get audio metadata
  async getAudioMetadata(): Promise<{ fileName: string; uploadedAt: string; size: number } | null> {
    try {
      const snapshot = await get(dbRef(database, AUDIO_DB_PATH));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return {
          fileName: data.fileName || "Unknown",
          uploadedAt: data.uploadedAt || "",
          size: data.size || 0
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching audio metadata:", error);
      return null;
    }
  }
};
