import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

function reviewsRef(productId) {
  return collection(db, "products", productId, "reviews");
}

export function subscribeToReviews(productId, callback) {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }

  const q = query(reviewsRef(productId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(reviews);
  });
}

export function addReview(productId, { uid, userName, rating, comment }) {
  return addDoc(reviewsRef(productId), {
    uid,
    userName,
    rating,
    comment,
    createdAt: serverTimestamp(),
  });
}
