import React from "react";
import "../App.css";

const Home = ({ notes, onEdit, onPinNote, onDeleteNote }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-2 ">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`relative bg-black rounded-2xl w-full h-60 p-6 flex flex-col justify-between ${
            note.pinned
              ? "border-0 border-gradient-to-r from-yellow-400 to-orange-500"
              : "border-0 border-gray-200"
          } `}
          style={{
            boxShadow: "0.5px 0.5px 2px 3.5px rgba(255, 255, 255, 0.30)",
          }}
        >
          {/* Pin Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-yellow-500"
            onClick={() => onPinNote(note.id)}
          >
            {note.pinned ? (
              <span
                className="relative"
                style={{ textShadow: "1px 1px 2px white" }}
              >
                📌
                <span className="absolute w-[100%] h-[1.5px] bg-yellow-400 rotate-45 top-[60%] left-[60%] -translate-x-[50%] -translate-y-[50%]"></span>
              </span>
            ) : (
              "📌"
            )}
          </button>

          {/* Title */}
          <h2
            className="flex justify-center text-2xl font-bold text-white mb-2 uppercase mt-[-10px] "
            style={{
              textShadow: "1px 1px 2px yellow",
              borderBottom: "1.5px solid yellow",
            }}
          >
            {note.title}
          </h2>

          {/* Tagline */}
          <p className="flex justify-center text-xs text-yellow-400 mb-4 mt-[-10px] opacity-90">
            {note.tagline || "No tagline provided"}
          </p>

          {/* Body Content as List */}
          {/* Body Content */}
          <ul className="text-[15px] text-green-500 flex-1 list-disc pl-5">
            {note.body.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>

          {/* Date, Time, Day */}
          <div className="mt-4 text-xs text-gray-400">
            {note.dateTimeString} | {note.day}
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="text-blue-500 hover:underline text-sm"
              onClick={() => onEdit(note)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline text-sm"
              onClick={() => onDeleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
