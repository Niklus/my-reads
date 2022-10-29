import "./App.css";
import { useState } from "react";
import * as bookApi from "./BooksAPI";

import SearchPage from "./components/SearchPage";
import CurrentlyReading from "./components/CurrentlyReading";
import WantToRead from "./components/WantToRead";
import Read from "./components/Read";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [searchResults, setSearchResulsts] = useState([]);
  
  const [currentlyReading, setCurrentlyReading] = useState(() => {
    if (localStorage["currentlyReading"]) {
      return JSON.parse(localStorage["currentlyReading"]);
    } else {
      return [];
    }
  });

  const [wantToRead, setWantToRead] = useState(() => {
    if (localStorage["wantToRead"]) {
      return JSON.parse(localStorage["wantToRead"]);
    } else {
      return [];
    }
  });

  const [read, setRead] = useState(() => {
    if (localStorage["read"]) {
      return JSON.parse(localStorage["read"]);
    } else {
      return [];
    }
  });

  function search(query) {
    bookApi.search(query, 20).then((results) => {
      setSearchResulsts(results);
    });
  }

  function moveToShelf(event, book) {
    const value = event.target.value;

    if (value === "currentlyReading") {
      const found = currentlyReading.find((obj) => obj.title === book.title);
      if (!found) {
        const newArr = [...currentlyReading, book];
        setCurrentlyReading(newArr);
        localStorage.setItem("currentlyReading", JSON.stringify(newArr));
      }

      const wantToReadFiltered = wantToRead.filter(
        (obj) => obj.title !== book.title
      );
      setWantToRead(wantToReadFiltered);
      localStorage.setItem("wantToRead", JSON.stringify(wantToReadFiltered));

      const readFiltered = read.filter((obj) => obj.title !== book.title);
      setRead(readFiltered);
      localStorage.setItem("read", JSON.stringify(readFiltered));

      return;
    }

    if (value === "wantToRead") {
      const found = wantToRead.find((obj) => obj.title === book.title);
      if (!found) {
        const newArr = [...wantToRead, book];
        setWantToRead(newArr);
        localStorage.setItem("wantToRead", JSON.stringify(newArr));
      }

      const currentlyFiltered = currentlyReading.filter(
        (obj) => obj.title !== book.title
      );
      setCurrentlyReading(currentlyFiltered);
      localStorage.setItem(
        "currentlyReading",
        JSON.stringify(currentlyFiltered)
      );

      const readFiltered = read.filter((obj) => obj.title !== book.title);
      setRead(readFiltered);
      localStorage.setItem("read", JSON.stringify(readFiltered));

      return;
    }

    if (value === "read") {
      const found = read.find((obj) => obj.title === book.title);
      if (!found) {
        const newArr = [...read, book];
        setRead(newArr);
        localStorage.setItem("read", JSON.stringify(newArr));
      }

      const wantToReadFiltered = wantToRead.filter(
        (obj) => obj.title !== book.title
      );
      setWantToRead(wantToReadFiltered);
      localStorage.setItem("wantToRead", JSON.stringify(wantToReadFiltered));

      const currentlyFiltered = currentlyReading.filter(
        (obj) => obj.title !== book.title
      );
      setCurrentlyReading(currentlyFiltered);
      localStorage.setItem(
        "currentlyReading",
        JSON.stringify(currentlyFiltered)
      );

      return;
    }
  }

  function getStatus(title) {
    const currently_reading = currentlyReading.find((obj) => obj.title === title);
    const want_to_read = wantToRead.find((obj) => obj.title === title);
    const _read = read.find((obj) => obj.title === title);

    if(currently_reading) {
      return "currentlyReading";
    }

    if(want_to_read) {
      return "wantToRead";
    }

    if(_read) {
      return "read";
    }

    return "none";
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          search={search}
          showSearchPage={showSearchPage}
          setShowSearchPage={setShowSearchPage}
          searchResults={searchResults}
          moveToShelf={moveToShelf}
          getStatus={getStatus}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <CurrentlyReading 
                currentlyReading={currentlyReading} 
                moveToShelf={moveToShelf} 
                getStatus={getStatus}
              />
              <WantToRead 
                wantToRead={wantToRead} 
                moveToShelf={moveToShelf}
                getStatus={getStatus}
              />
              <Read 
                read={read} 
                moveToShelf={moveToShelf}
                getStatus={getStatus}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
