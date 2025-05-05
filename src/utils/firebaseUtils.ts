import { storage, db } from "@/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export async function uploadImageAndGetUrl(file: File): Promise<string> {
  const storageRef = ref(storage, `profileImages/${file.name}_${Date.now()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  const imageRef = ref(storage, imageUrl);
  await deleteObject(imageRef);
}

export async function createUserInFirestore(user: any): Promise<void> {
  const collectionRef = collection(db, "users");
  await addDoc(collectionRef, user);
}
