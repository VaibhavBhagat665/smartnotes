import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function NoteForm() {
  const [text, setText] = useState('');

  const addNote = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addDoc(collection(db, 'notes'), { content: text, created: new Date() });
    setText('');
  };

  return (
    <form onSubmit={addNote} className="p-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border px-4 py-2 rounded"
        placeholder="Write a note..."
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
