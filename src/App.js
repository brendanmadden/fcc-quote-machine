import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from "./coloursArray.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDB = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {

  const [randomNumber, setRandomNumber] = useState(0);

  const generateRandomNumber = () => {
    let randomInt = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInt);
    setAccentColor(COLORS_ARRAY[randomInt]);
    setQuote(quotesArray[randomInt].quote);
    setAuthor(quotesArray[randomInt].author);
  }

  const [quote, setQuote] = useState("The most common way people give up their power is by thinking they don’t have any.");
  const [author, setAuthor] = useState("Alice Walker");

  const [quotesArray, setQuotesArray] = useState(null);

  const [accentColor, setAccentColor] = useState('#C5C3E9')


  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDB)
  }, [quoteDB])


  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <h2 id="text">
            "{quote}"
          </h2>
          <h5 id="author">
            - {author}
          </h5>
          <div className="buttons">
            <a style={{ backgroundColor: accentColor }} target="_blank" id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?text="${quote}" -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
          <button style={{ backgroundColor: accentColor }} id="new-quote" onClick={() => generateRandomNumber()}>
            New Quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
