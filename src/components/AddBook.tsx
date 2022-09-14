import React, { useState } from 'react'
import cn from 'classnames'
import { Book } from '../types/Book'

import { addBook } from '../api'

import '../style.scss'

interface Props {
  books: Book[]
}

export const AddBook: React.FC<Props> = ({ books }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [isbn, setIsbn] = useState<string | number>('')
  const [error, setError] = useState('')

  const [titleCheck, setTitleCheck] = useState(false);
  const [authorCheck, setAuthorCheck] = useState(false);
  const [isbnCheck, setIsbnCheck] = useState(false);
  const [categoryCheck, setCategoryCheck] = useState(false);

  const clearForm = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setTitle('')
    setAuthor('')
    setIsbn(0)
    setCategory('')
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newId = Math.max(...books.map(book => book.id)) + 1

      const book: Book = {
        id: newId,
        title,
        author,
        category,
        isbn
      }

      await addBook(book)
      window.location.assign('/')
    } catch {
      setError('Could not add a book')
    }
  }

  const checkIsbnValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^0-9]/g, '').trim()

    setIsbn(value)
  }


  const validation = () => {
    titleValidation(title);
    authorValidation(author);
    isbnValidation(isbn);
    selectValidation(category)
  }

  const selectValidation = (value: string) => {
    if (value === '') {
      setCategoryCheck(true);
    } else {
      setCategoryCheck(false);
    }
  }

  const titleValidation = (value: string) => {
    if (value.trim().length === 0) {
      setTitleCheck(true);
    } else {
      setTitleCheck(false);
    }
  }

  const authorValidation = (value: string) => {
    if (value.trim().length === 0) {
      setAuthorCheck(true);
    } else {
      setAuthorCheck(false);
    }
  }

  const isbnValidation = (value: string | number) => {
    if (value === '') {
      setIsbnCheck(true);
    } else {
      setIsbnCheck(false);
    }
  }

  return (
    <>
      {error.length !== 0 &&
        <p className="message is-danger has-text-centered is-large mt-4">
          {error}
       </p>
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
          Add a book
        </h2>
        <div className="field">
          <label className="label">
            Title
            <div className="control">
              <input
                className={cn(
                  'input',
                  { 'is-danger': titleCheck },
                  { 'is-success': title.trim().length !== 0 }
                )}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  titleValidation(e.target.value)
                  // validation()
                }}
                required
              />
            </div>
          </label>
          {titleCheck &&
            <p className="help is-danger">This title is invalid</p>}
        </div>

        <div className="field">
          <label className="label">
            Author
            <div className="control">
              <input
                className={cn(
                  'input',
                  { 'is-danger': authorCheck },
                  { 'is-success': author.trim().length !== 0 }
                )}
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value)
                  authorValidation(e.target.value)
                  // validation()
                }}
                required
              />
            </div>
          </label>
          {authorCheck &&
            <p className="help is-danger">This author is invalid</p>}
        </div>

        <div className="field">
          <label className="label">
            ISBN number
            <div className="control">
              <input
                className={cn(
                  'input',
                  { 'is-danger': isbnCheck },
                  { 'is-success': isbn }
                )}
                type="text"
                placeholder="ISBN number input"
                required
                value={isbn}
                onChange={(e) => {
                  checkIsbnValue(e)
                  isbnValidation(e.target.value)
                  // validation()
                }}
              />
            </div>
          </label>
          {isbnCheck &&
            <p className="help is-danger">This ISBN is invalid</p>}
        </div>

        <div className="field">
          <label className="label">
            Category
          </label>
          <div className="control">
            <div className={cn("select", {"is-danger": categoryCheck},{ 'is-success': category !== '' })}>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  selectValidation(e.target.value)
                }}
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
          {categoryCheck &&
            <p className="help is-danger">Please choose a category</p>}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              type="submit"
              onClick={() => {
                validation()
                selectValidation(category)
              }}
            >
              Submit
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
