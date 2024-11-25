import React from "react";

const NoteCard = ({ note, onEdit }) => (
  <div className="bg-white p-4 shadow rounded-lg">
    <h3 className="text-lg font-bold">{note.title}</h3>
    <p className="text-sm text-gray-600">{note.tagline}</p>
    <p className="text-sm text-gray-600">{note.body}</p>
    <button
      onClick={() => onEdit(note)}
      className="mt-2 text-blue-500 underline"
    >
      Edit
    </button>
  </div>
);

export default NoteCard;
