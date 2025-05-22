import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function NoteList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('created', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <ul className="p-4 space-y-2">
      {notes.map(note => (
        <li key={note.id} className="border p-2 rounded shadow">
          {note.content}
        </li>
      ))}
    </ul>
  );
}
