import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function NoteForm({ user }) {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "users", user.uid, "notes"), {
        content: text,
        created: new Date(),
        category: 'personal', // You can add category selection later
      });
      setText('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20"> {/* Add top margin for fixed navbar */}
      {/* Hero section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Capture Your Ideas
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Transform your thoughts into organized notes with our smart writing experience
        </p>
      </div>

      {/* Note form */}
      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={addNote} className="relative">
          <div className={`relative transition-all duration-300 ${
            isExpanded ? 'transform scale-102' : ''
          }`}>
            <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  onBlur={() => !text && setIsExpanded(false)}
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-lg leading-relaxed"
                  placeholder={isExpanded ? "Start writing your note... Press Ctrl+Enter to save quickly" : "What's on your mind?"}
                  rows={isExpanded ? 4 : 1}
                  style={{ minHeight: isExpanded ? '120px' : '60px' }}
                  onKeyDown={(e) => {
                    if (e.ctrlKey && e.key === 'Enter') {
                      addNote(e);
                    }
                  }}
                />
                
                {/* Action buttons */}
                <div className={`flex items-center justify-between mt-4 transition-all duration-300 ${
                  isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm">Add Tag</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm">Favorite</span>
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!text.trim() || isSubmitting}
                    className="relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Add Note</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}