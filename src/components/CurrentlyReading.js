import Book from "./Book";

const CurrentlyReading = ({ currentlyReading, moveToShelf, getStatus }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {currentlyReading.map((book, index) => {
          return (
            <li key={index}>
              <Book
                book={book}
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

export default CurrentlyReading;
