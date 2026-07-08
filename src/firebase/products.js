import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

function productsRef() {
  return collection(db, "products");
}

export function subscribeToProducts(callback) {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }

  return onSnapshot(productsRef(), (snapshot) => {
    const products = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(products);
  });
}

export async function getProductById(id) {
  if (!isFirebaseConfigured) return null;
  const snap = await getDoc(doc(db, "products", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function addProduct(data) {
  return addDoc(productsRef(), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export function updateProduct(id, data) {
  return updateDoc(doc(db, "products", id), data);
}

export function deleteProduct(id) {
  return deleteDoc(doc(db, "products", id));
}

export async function seedProductsFromFakeStore() {
  const existing = await getDocs(productsRef());
  if (!existing.empty) {
    return { seeded: false, count: existing.size };
  }

  const res = await fetch("https://fakestoreapi.com/products");
  const fakeProducts = await res.json();

  await Promise.all(
    fakeProducts.map((product) =>
      addDoc(productsRef(), {
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        stock: Math.floor(Math.random() * 40) + 10,
        createdAt: serverTimestamp(),
      })
    )
  );

  return { seeded: true, count: fakeProducts.length };
}
