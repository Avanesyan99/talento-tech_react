import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../firebase/config";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        setRole(userDoc.exists() ? userDoc.data().role : "user");
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function register(email, password, name) {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase no está configurado todavía.");
    }
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });
    await setDoc(doc(db, "users", newUser.uid), {
      email,
      name,
      role: "user",
      createdAt: serverTimestamp(),
    });
  }

  function login(email, password) {
    if (!isFirebaseConfigured) {
      return Promise.reject(new Error("Firebase no está configurado todavía."));
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (!isFirebaseConfigured) return Promise.resolve();
    return signOut(auth);
  }

  const value = {
    user,
    role,
    isAdmin: role === "admin",
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
