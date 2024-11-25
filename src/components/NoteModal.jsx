import React, { useState, useEffect } from "react";

const NoteModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  // Populate form fields with initial data when modal opens
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setTagline(initialData.tagline || "");
      setBody(
        Array.isArray(initialData.body)
          ? initialData.body.join("\n") // Convert array to a string
          : initialData.body || ""
      );
    } else {
      setTitle("");
      setTagline("");
      setBody("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title || !tagline || !body) {
      alert("All fields are required!");
      return;
    }

    // Ensure body is converted to an array if it's a string
    const bodyArray =
      typeof body === "string"
        ? body
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        : body; // If already an array, use it as-is

    onSave({ title, tagline, body: bodyArray });
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Note" : "Add Note"}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Tagline"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter points separated by commas"
          className="w-full p-2 mb-2 border rounded"
          rows="4"
        />

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-[6px] rounded-lg font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-rose-900 text-white px-4 py-[6px] rounded-lg font-bold"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
