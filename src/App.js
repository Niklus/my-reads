import { useState, useEffect } from "react";
import * as bookApi from "./BooksAPI";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";

function App() {

  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    bookApi.getAll().then((data) => {
      const currentlyReading = data.filter(
        (book) => book.shelf === "currentlyReading"
      );
      const wanToRead = data.filter((book) => book.shelf === "wantToRead");
      const read = data.filter((book) => book.shelf === "read");
      setCurrentlyReading(currentlyReading);
      setWantToRead(wanToRead);
      setRead(read);
    });
  });
 

  function moveToShelf(event, book) {
    const shelf = event.target.value;
    bookApi.update(book, shelf);
  }

  function getStatus(title) {
    const currently_reading = currentlyReading.find(
      (obj) => obj.title === title
    );
    const want_to_read = wantToRead.find((obj) => obj.title === title);
    const _read = read.find((obj) => obj.title === title);

    if (currently_reading) {
      return "currentlyReading";
    }

    if (want_to_read) {
      return "wantToRead";
    }

    if (_read) {
      return "read";
    }

    return "none";
  }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={ 
            <MainPage 
              read={read} 
              currentlyReading={currentlyReading} 
              wantToRead={wantToRead} 
              getStatus={getStatus}
              moveToShelf={moveToShelf}
            /> 
          }>
          </Route>
            <Route path="/search" element={ 
              <SearchPage 
                moveToShelf={moveToShelf} 
                getStatus={getStatus} 
              />  
            }>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
