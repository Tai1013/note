import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface DocData {
  Id: string
  CreateTime: string
  Postion: number[]
  Color: string
  Name: string
  Content: string
  Image: string
}

interface UpdateDoc {
  Id: string
  Postion: number[]
}

interface DeleteDoc {
  Id: string
}

export type AddDoc = Omit<DocData, 'Id'>

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId: 'note-1ab72'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getNoteDocs = async () => {
  const notes:DocData[] = []
  const querySnapshot = await getDocs(collection(db, 'Note'))
  querySnapshot.forEach((doc) => {
    notes.push({
      Id: doc.id,
      ...doc.data() as Omit<DocData, 'Id'>
    })
  });
  return notes
}

export const updateNoteDoc = async (data: UpdateDoc) => {
  const docRef = doc(db, "Note", data.Id);
  await updateDoc(docRef, {
    Postion: data.Postion
  })
}

export const addNotDoc = async (data: AddDoc) => {
  const docRef = collection(db, "Note");
  await addDoc(docRef, data)
}

export const deleteNotDoc = async (data: DeleteDoc) => {
  const docRef = doc(db, "Note", data.Id);
  await deleteDoc(docRef)
}