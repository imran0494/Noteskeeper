import { db } from "../firebase";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc, // Import deleteDoc
} from "firebase/firestore";

export const useFirestore = () => {
  const fetchNotes = async () => {
    const notesSnapshot = await getDocs(collection(db, "notes"));
    return notesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const addNote = async (note) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Formatted date and time
    const dayOfWeek = currentDate.toLocaleDateString("en-GB", {
      weekday: "long",
    }); // Day of the week

    const noteWithTimestamp = {
      ...note,
      pinned: false, // Default to not pinned
      createdAt: currentDate,
      updatedAt: currentDate,
      dateTimeString: formattedDate,
      day: dayOfWeek,
    };

    await addDoc(collection(db, "notes"), noteWithTimestamp);
  };

  const updateNote = async (id, updatedNote) => {
    await updateDoc(doc(db, "notes", id), updatedNote);
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id)); // Delete document by ID
  };

  return { fetchNotes, addNote, updateNote, deleteNote }; // Include deleteNote
};
