import { Navigate, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { BooksList } from './components/BooksList'
import { AddBook } from './components/AddBook'
import { Nav } from './components/Nav'
import { getPosts } from './api'
import { Book } from './types'
import { EditBook } from './components/EditBook'

export const App = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [editBookId, setEditBookId] = useState<number>(0)
  const [error, setError] = useState('');

  useEffect(() => {
    // eslint-disable-next-line
    getPosts()
      .then(setBooks)
      .catch(() => {
        setError('Error with loading books');
      });
  }, [])

  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={(
                <BooksList
                  books={books}
                  setBooks={setBooks}
                  setEditBookId={setEditBookId}
                  errorWithServer={error}
                />
              )}
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
            <Route path="addBook" element={<AddBook books={books} />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="edit" element={<EditBook editBookId={editBookId} />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
