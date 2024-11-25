import React, { useEffect, useState } from "react";
import { useFirestore } from "./hooks/useFirestore";
import Home from "./pages/Home";
import NoteModal from "./components/NoteModal";
import Pagination from "./components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Marquee from "./components/Marquee";

const App = () => {
  const { fetchNotes, addNote, updateNote, deleteNote } = useFirestore();
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const notesPerPage = 6;

  useEffect(() => {
    const getNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
        console.log(fetchedNotes);
      } catch (error) {
        toast.error("Error fetching notes: " + error.message);
      }
    };
    getNotes();
  }, []);

  const handleAddNote = async (note) => {
    try {
      await addNote(note);
      setModalOpen(false);
      toast.success("Note added successfully!");
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      toast.error("Error adding note: " + error.message);
    }
  };

  const handlePinNote = async (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);

    const noteToUpdate = updatedNotes.find((note) => note.id === id);
    try {
      await updateNote(noteToUpdate.id, { pinned: noteToUpdate.pinned });
      toast.success("Note pinned/unpinned successfully!");
    } catch (error) {
      toast.error("Error updating note: " + error.message);
    }
  };

  const handleEditNote = async (updatedNote) => {
    try {
      if (!currentNote) return;
      await updateNote(currentNote.id, updatedNote);
      setModalOpen(false);
      toast.success("Note updated successfully!");
      const updatedNotes = await fetchNotes();
      setNotes(updatedNotes);
    } catch (error) {
      toast.error("Error updating note: " + error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.error("Error deleting note: " + error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedNotes = notes
    .sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    })
    .slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  return (
    <div className="flex flex-col items-center bg-teal-950 min-h-screen p-4">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Marquee */}
      <Marquee />

      {/* Main Content */}
      <div className="w-full z-10 mt-1 max-w-4xl p-10 bg-zinc-900 rounded-lg shadow-lg">
        <Home
          notes={sortedNotes}
          onEdit={(note) => {
            setCurrentNote(note);
            setModalOpen(true);
          }}
          onPinNote={handlePinNote}
          onDeleteNote={handleDeleteNote}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(notes.length / notesPerPage)}
          onPageChange={handlePageChange}
        />
      </div>

      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={currentNote ? handleEditNote : handleAddNote}
        initialData={currentNote}
      />

      <button
        className="bg-rose-900 text-white font-semibold px-4 py-2 rounded-lg fixed bottom-6"
        onClick={() => {
          setCurrentNote(null);
          setModalOpen(true);
        }}
      >
        Add Note
      </button>
    </div>
  );
};

export default App;
