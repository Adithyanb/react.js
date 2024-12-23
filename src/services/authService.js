import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth';
  import { auth } from '../config/firebase';
  import { dbService } from './dbService';
  
  export const authService = {
    // Register user with Firebase Authentication and Firestore
    async registerUser(email, password, userData, userType) {
      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;
  
        // Prepare user data for Firestore
        const userDataForDb = {
          uid: user.uid,
          email: user.email,
          ...userData,
          userType: userType.toLowerCase(),
        };
  
        // Save user data to Firestore
        await dbService.saveUser(userType, userDataForDb);
  
        return userDataForDb;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
  
    // Login user and get their profile
    async loginUser(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;
  
        // Get user profile from Firestore
        const userProfile = await dbService.getUserProfile(user.uid);
        
        if (!userProfile) {
          throw new Error('User profile not found');
        }
  
        return userProfile;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
  
    // Verify teacher passkey using Firestore
    async verifyTeacherPasskey(passkey) {
      try {
        const isValid = await dbService.verifyTeacherPasskey(passkey);
        if (!isValid) {
          throw new Error('Invalid passkey');
        }
        return true;
      } catch (error) {
        console.error('Passkey verification error:', error);
        throw error;
      }
    },
  
    // Logout user
    async logout() {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    }
  };