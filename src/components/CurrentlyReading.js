import Book from "./Book";

const CurrentlyReading = ({ currentlyReading, moveToShelf}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {currentlyReading.map((book, index) => {
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
);

export default CurrentlyReading;