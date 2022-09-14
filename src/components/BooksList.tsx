import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBook } from '../api'
import { Loader } from './Loader'

import { Book } from '../types'

import '../style.scss'

interface Props {
  books: Book[]
  setBooks: (books: Book[]) => void
  setEditBookId: (bookId: number) => void
  errorWithServer: string
}

export const BooksList: React.FC<Props> = (
  {
    books, setBooks, setEditBookId, errorWithServer
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
          {error}
       </p>
      }
      {errorWithServer.length !== 0 &&
        <p className="message is-danger has-text-centered is-large mt-4">
          {errorWithServer}
       </p>
      }
      <h2 className="content is-medium is-flex is-justify-content-center mt-4">
        List of books
      </h2>

      {!books.length && <p className="mb-4 has-text-centered">There are no books on the server, but you can add new book</p>}

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
                <td className="vertilac_align">{book.title}</td>
                <td className="vertilac_align">{book.author}</td>
                <td className="vertilac_align">{book.category}</td>
                <td className="vertilac_align">{book.isbn}</td>
                <td className="vertilac_align">
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
