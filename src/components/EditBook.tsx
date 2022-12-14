import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { getBook, updateBook } from '../api'
import { Book } from '../types'

interface Props {
  editBookId: number
}

export const EditBook: React.FC<Props> = ({ editBookId }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [isbn, setIsbn] = useState<string | number>('')
  const [error, setError] = useState('')

  useEffect(() => {
    getBook(editBookId).then(res => {
      setTitle(res.title)
      setAuthor(res.author)
      setIsbn(res.isbn)
      setCategory(res.category)
    }).catch(() => {
      setError('Unable to download books')
    })
  }, [])

  const clearForm = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setTitle('')
    setAuthor('')
    setIsbn(0)
    setCategory('')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const book: Book = {
        id: editBookId,
        title,
        author,
        category,
        isbn
      }

      await updateBook(book)
      window.location.assign('/')
    } catch {
      setError('Could not add a book')
    }
  }

  const checkIsbnValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^0-9]/g, '').trim()

    setIsbn(value)
  }

  return (
    <>
      {
        error.length !== 0 &&
        (
          <p className="message is-danger has-text-centered is-large">
            {error}
          </p>
        )
      }
      <form
        // eslint-disable-next-line max-len
        className="container-add is-medium is-flex is-flex-direction-column is-justify-content-center border bg-color"
        onSubmit={(e) => onSubmit(e)}
      >
        <h2
        // eslint-disable-next-line max-len
          className="content is-medium is-flex is-justify-content-center h2-color"
        >
          Edit a book
        </h2>
        <div className="field">
          <label className="label">
            Title
            <div className="control">
              <input
                className={cn(
                  'input',
                  { 'is-danger': title.trim().length === 0 },
                  { 'is-success': title.trim().length !== 0 }
                )}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>
          {title.trim().length === 0 &&
            <p className="help is-danger">This title is invalid</p>}
        </div>

        <div className="field">
          <label className="label">
            Author
            <div className="control">
              <input
                className={cn(
                  'input',
                  { 'is-danger': author.trim().length === 0 },
                  { 'is-success': author.trim().length !== 0 }
                )}
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
          </label>
          {author.trim().length === 0 &&
            <p className="help is-danger">This author is invalid</p>}
        </div>

        <div className="field">
          <label className="label">
            ISBN
            <div className="control">
              <input
                className={cn(
                  'input',
                  { 'is-danger': isbn === '' },
                  { 'is-success': isbn }
                )}
                type="text"
                placeholder="ISBN input"
                required
                value={isbn}
                onChange={(e) => checkIsbnValue(e)}
              />
            </div>
          </label>
          {isbn === '' &&
            <p className="help is-danger">This ISBN is invalid</p>}
        </div>

        <div className="field">
          <label className="label">
            Category
          </label>
          <div className="control">
            <div className="select">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select dropdown</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Triller">Triller</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {category === '' &&
            <p className="help is-danger">Please choose a category</p>}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
            >
              Save
            </button>
          </div>
          <div className="control">
            <button
              className="button is-link is-light"
              type="button"
              onClick={(e) => clearForm(e)}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
