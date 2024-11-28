import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, selectBook } from '../../../redux/slices/booksSlice'
import createBook from '../../../utils/createBook'
import Button from '../../common/button/Button'
import Modal from '../../common/modal/Modal'
import './RandomBookModal.css'

const RandomBookModal = ({ isOpen, onClose, randomBook }) => {
  const dispatch = useDispatch()

  const handleAddBook = (book) => {
    dispatch(addBook(createBook(book)))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-testid="modal_body">
      {randomBook ? (
        <div
          key={randomBook.bookId}
          data-testid={`modal_book_item id=${randomBook.bookId}`}
        >
          <div data-testid="modal_book_content">
            <div data-testid="book_left_content">
              {randomBook.image ? (
                <img
                  src={randomBook.image}
                  alt={`${randomBook.title} cover`}
                  data-testid="modal_book_img"
                />
              ) : (
                'No image available'
              )}
            </div>
            <div data-testid="book_right_content">
              <h2 data-testid="modal_book_title">{randomBook.title}</h2>
              <p>
                <strong>
                  {randomBook.authors && randomBook.authors.includes(', ')
                    ? 'Authors:'
                    : 'Author:'}
                </strong>{' '}
                {randomBook.authors || 'Unknown Authors'}
              </p>
              <p>
                <strong>Published Year:</strong>{' '}
                {randomBook.publishedDate || 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {randomBook.description || 'No description available'}
              </p>
            </div>
          </div>
          <Button
            text="Add Book"
            onClick={() => handleAddBook(randomBook)}
            data-testid="modal_add_book_btn"
          />
        </div>
      ) : (
        <p>No book details available</p>
      )}
    </Modal>
  )
}

export default RandomBookModal
