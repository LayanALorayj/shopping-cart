import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./firebase"; 

const db = getFirestore(app);

export const addUserToFirestore = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User added to Firestore!");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const getUserFromFirestore = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default db;
