import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../redux/slices/booksSlice'
import createBook from '../../utils/createBook'
import './SearchBookModal.css'
import Button from '../common/button/Button'

const SearchBookModal = ({ isOpen, onClose, booksFoundList }) => {
  const dispatch = useDispatch()
  const books = useSelector(selectBook)

  if (!isOpen) return null

  if (!booksFoundList || booksFoundList.length === 0)
    return <p>No books found, try again!</p>

  const filteredAddedBooks = booksFoundList.filter(
    (bookFound) =>
      !books.some(
        (book) =>
          book.title.toLowerCase() === bookFound.title.toLowerCase() &&
          book.authors &&
          bookFound.authors &&
          book.authors.toLowerCase() === bookFound.authors.toLowerCase()
      )
  )

  const handleAddBook = (bookFound) => {
    dispatch(addBook(createBook(bookFound)))
  }

  return (
    <div open={isOpen} data-testid="modal_overlay">
      <div data-testid="modal_component">
        <div data-testid="modal_header">
          <Button
            text="Close"
            data-testid="modal_close_btn"
            onClick={onClose}
          ></Button>
        </div>
        <div data-testid="modal_body">
          {filteredAddedBooks.map((bookFound, _) => (
            <div
              key={bookFound.bookId}
              data-testid={`modal_book_item id=${bookFound.bookId}`}
            >
              <h2 data-testid="modal_book_title">{bookFound.title}</h2>
              <div>
                {bookFound.image ? (
                  <img
                    src={bookFound.image}
                    alt={`${bookFound.title} cover`}
                    data-testid="modal_book_img"
                  />
                ) : (
                  'No image available'
                )}
              </div>
              <p>
                <strong>
                  {bookFound.authors && bookFound.authors.includes(', ')
                    ? 'Authors:'
                    : 'Author:'}
                </strong>{' '}
                {bookFound.authors || 'Unknown Authors'}
              </p>
              <p>
                <strong>Published Year:</strong>{' '}
                {bookFound.publishedDate || 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {bookFound.description || 'No description available'}
              </p>
              <Button
                text="Add Book"
                onClick={() => handleAddBook(bookFound)}
                data-testid="modal_add_book_btn"
              ></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBookModal