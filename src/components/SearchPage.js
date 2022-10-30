/* eslint-disable array-callback-return */
import { useState } from "react";
import Book from "./Book";
import * as bookApi from "../BooksAPI";
import { Link } from "react-router-dom";

const SearchPage = ({ moveToShelf, getStatus }) => {

  const [searchResults, setSearchResulsts] = useState([]);

  const results = searchResults.filter((book) => {
    if(!!(book?.imageLinks?.thumbnail) && !!(book?.authors?.length > 0)) {
      return true;
    } 
  }) 

  function search(query) {
    if (query) {
      setSearchResulsts([]);
      bookApi.search(query.trim(), 20).then((results) => {
        if (results.length) {
          setSearchResulsts(results);
        }
      });
    } else {
      setSearchResulsts([]);
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
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
          {results.map((book, index) => {
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
};

export default SearchPage;
