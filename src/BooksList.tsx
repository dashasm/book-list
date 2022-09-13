import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBook } from './api'
import { Loader } from './components/Loader'

import { Book } from './types'

interface Props {
  books: Book[]
  setBooks: (books: Book[]) => void
  setEditBookId: (bookId: number) => void
}

export const BooksList: React.FC<Props> = (
  {
    books, setBooks, setEditBookId
  }
) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeBookId, setActiveBookId] = useState<null | number>(null)

  const navigate = useNavigate()

  const removeBook = async (bookId: number) => {
    setLoading(true)
    setActiveBookId(bookId)

    try {
      await deleteBook(bookId)
      setBooks(books.filter(book => book.id !== bookId))
    } catch {
      setError('Unable to delete a book')
    }

    setLoading(false)
  }

  const editBook = (bookId: number): void => {
    setEditBookId(bookId)
    navigate('/edit')
  }

  return (
    <>
      {error.length !== 0 &&
        <p className="message is-danger has-text-centered is-large mt-4">
          Hello
       </p>
      }
      <h2 className="content is-medium is-flex is-justify-content-center mt-4">
        List of books
      </h2>

      <table
        data-cy="peopleTable"
        className="table is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Book title</th>
            <th>Author name</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {(books.length > 0) && books.map(book => {
            if (loading && book.id === activeBookId) {
              return <Loader key={book.id}/>
            }

            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.isbn}</td>
                <td>
                  <button
                    type="button"
                    className="button mr-1"
                    onClick={() => editBook(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={() => removeBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
