import { Navigate, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { BooksList } from './BooksList'
import { AddBook } from './AddBook'
import { Nav } from './Nav'
import { getPosts } from './api'
import { Book } from './types'
import { EditBook } from './EditBook'

export const App = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [editBookId, setEditBookId] = useState<number>(0)

  useEffect(() => {
    // eslint-disable-next-line
    getPosts()
      .then(setBooks)
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
