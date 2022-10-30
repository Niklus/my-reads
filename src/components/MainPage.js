
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import { Link } from "react-router-dom";


const MainPage = (props) => {

  const { 
    read, 
    currentlyReading, 
    wantToRead, 
    moveToShelf, 
    getStatus 
  } = props;

  return (
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
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default MainPage;