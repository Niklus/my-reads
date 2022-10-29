import Book from "./Book";

const WantToRead = ({ wantToRead, moveToShelf, getStatus}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Want to Read</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {wantToRead.map((book, index) => {
          return (
            <li key={index}>
              <Book
                imageUrl={book.imageLinks.thumbnail}
                title={book.title}
                authors={book.authors}
                onMoveToShelf={(e) => moveToShelf(e, book)}
                getStatus={getStatus}
              />
            </li>
          );
        })}
      </ol>
    </div>
  </div>
);

export default WantToRead;