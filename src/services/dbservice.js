import { 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    query, 
    where, 
    getDocs 
  } from 'firebase/firestore';
  import { db, COLLECTIONS } from '../config/firebase';
  
  export const dbService = {
    // Create or update user document
    async saveUser(userType, userData) {
      const userRef = doc(db, COLLECTIONS[userType.toUpperCase()], userData.uid);
      await setDoc(userRef, {
        ...userData,
        userType: userType.toLowerCase(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    },
  
    // Get user profile by UID
    async getUserProfile(uid) {
      // Check in both teachers and students collections
      const collections = [COLLECTIONS.TEACHERS, COLLECTIONS.STUDENTS];
      
      for (const collectionName of collections) {
        const userRef = doc(db, collectionName, uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          return {
            ...userDoc.data(),
            id: userDoc.id
          };
        }
      }
      return null;
    },
  
    // Get user by email
    async getUserByEmail(email) {
      const collections = [COLLECTIONS.TEACHERS, COLLECTIONS.STUDENTS];
      
      for (const collectionName of collections) {
        const q = query(
          collection(db, collectionName),
          where("email", "==", email)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          return {
            ...doc.data(),
            id: doc.id
          };
        }
      }
      return null;
    },
  
    // Verify teacher passkey
    async verifyTeacherPasskey(passkey) {
      // In a real application, you might want to store valid passkeys in Firestore
      // and check against them, or implement a more secure verification method
      const passkeysRef = doc(db, 'settings', 'teacherPasskeys');
      const passkeysDoc = await getDoc(passkeysRef);
      
      if (passkeysDoc.exists()) {
        const validPasskeys = passkeysDoc.data().validPasskeys || [];
        return validPasskeys.includes(passkey);
      }
      return false;
    }
  };