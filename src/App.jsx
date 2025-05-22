import React from 'react';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <NoteForm />
      <NoteList />
    </div>
  );
}
