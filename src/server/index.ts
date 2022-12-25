import { initializeApp } from 'firebase/app';
import { getFirestore, doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface NoteData {
  Id: string
  CreateTime: string
  Postion: [number, number]
  Name: string
  Color: string
  Content: string
  Image: string
}
type GetXr = {
  method: 'get'
}

export type AddNote = Omit<NoteData, 'Id'>
type AddXhr = {
  method: 'add'
  data: AddNote
}

export type DeleteNote = Pick<NoteData, 'Id'>
type DeleteXhr = {
  method: 'delete'
  data: DeleteNote
}

export type UpdateNote = Pick<NoteData, 'Id' | 'Postion'>
type UpdateXhr = {
  method: 'update'
  data: UpdateNote
}

type FirebaseXhr = AddXhr | DeleteXhr | UpdateXhr | GetXr

const url = 'Note'
const firebaseConfig = {
  projectId: 'note-1ab72'
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firebaseXhr = async (config: FirebaseXhr) => {
  if (config.method === 'add') {
    const docRef = collection(db, url);
    return await addDoc(docRef, config.data)
      .then(() => Promise.resolve('新增成功'))
  }

  if (config.method === 'get') {
    const docRef = collection(db, url);
    const notes:NoteData[]  = []
    return await getDocs(docRef)
      .then((docs) => {
        docs.forEach(doc => {
          notes.push({
            Id: doc.id,
            ...doc.data() as Omit<NoteData, 'Id'>
          })
        })
        return Promise.resolve(notes)
      })
  }

  if (config.method === 'delete') {
    const docRef = doc(db, url, config.data.Id)
    return await deleteDoc(docRef)
      .then(() => Promise.resolve('刪除成功'))
  }

  if (config.method === 'update') {
    const docRef = doc(db, url, config.data.Id)
    return await updateDoc(docRef, { ...config.data })
      .then(() => Promise.resolve('更新成功'))
  }

  return Promise.reject('連線失敗')
}