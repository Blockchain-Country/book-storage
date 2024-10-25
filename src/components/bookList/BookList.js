import { useDispatch, useSelector } from 'react-redux'
import { TbStar } from 'react-icons/tb'
import { TbStarFilled } from 'react-icons/tb'
import './BookList.css'
import {
  selectBook,
  deleteBook,
  toggleFavorite,
} from '../../redux/slices/BooksSlice'
import {
  selectTitleFilter,
  selectAuthorFilter,
} from '../../redux/slices/FilterSlice'

const BookList = () => {
  const books = useSelector(selectBook)
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)

  const handleDeleteBook = (id) => {
    books.forEach((book) => {
      if (book.id === id && !book.isFavorite) {
        dispatch(deleteBook(id))
      }
    })
  }

  const toggleFavoriteBook = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filteredBooksArr = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase())
    )
  })

  return (
    <div className="app-block book-list" data-testid="book_list_component">
      <h2>My Book List</h2>
      <div className="book-list">
        <ul>
          {!filteredBooksArr.length ? (
            <p data-testid="no_books_sign">No books in my list...</p>
          ) : (
            filteredBooksArr.map((book, i) => (
              <li key={book.id} data-testid={book.id}>
                <div className="book-info">
                  <span>{++i}. </span>
                  <span>{book.title}</span>
                  <span>
                    {' '}
                    by <strong>{book.author}</strong>
                  </span>
                </div>
                <div className="book-actions">
                  <span
                    onClick={() => toggleFavoriteBook(book.id)}
                    data-testid={`isFavorite_${book.isFavorite}`}
                  >
                    {book.isFavorite ? (
                      <TbStarFilled className="star-icon" />
                    ) : (
                      <TbStar className="star-icon" />
                    )}
                  </span>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    data-testid="delete_book_btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default BookList
