import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDocs, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId: 'note-1ab72'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, 'Note'))
querySnapshot.forEach((doc) => {
  console.log(doc.data())
});

// const docRef = doc(db, "Note", "YMOxHzsDAg0lbAfM7ODt");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }