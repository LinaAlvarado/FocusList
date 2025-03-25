import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
  } from "firebase/auth";
  import { app } from "../../firebaseConfig";

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

export const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  export const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  export const logout = () => {
    return signOut(auth);
  };
