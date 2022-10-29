/* eslint-disable jsx-a11y/anchor-is-valid */
import Book from "./Book";

const SearchPage = ({ setShowSearchPage, showSearchPage, searchResults, moveToShelf, search }) => (
  <div className="search-books">
    <div className="search-books-bar">
      <a
        className="close-search"
        onClick={() => setShowSearchPage(!showSearchPage)}
      >
        Close
      </a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={(e) => search(e.target.value)}
        />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
        {searchResults.map((book, index) => {
          return (
            <li key={index}>
              <Book
                imageUrl={book.imageLinks.thumbnail}
                title={book.title}
                authors={book.authors}
                onMoveToShelf={(e) => moveToShelf(e, book)}
              />
            </li>
          );
        })}
      </ol>
    </div>
  </div>
)

export default SearchPage;