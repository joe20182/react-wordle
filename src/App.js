import { useEffect, useState } from "react";
import "./App.css";
import { WORDS } from "./utils/words";

// const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

function App() {
  const [puzzle, setPuzzle] = useState("");
  const [words, setWords] = useState(Array(6).fill(""));

  useEffect(() => {
    const getWord = async () => {
      // const res = await fetch(API_URL);
      // const data = await res.json();
      const randomIndex = Math.floor(Math.random() * WORDS.length);
      setPuzzle(WORDS[randomIndex]);
    };
    getWord();
  }, []);

  return (
    <div className="App">
      <span>{puzzle}</span>
      <div className="container">
        {words.map((word, i) => (
          <Row key={i} />
        ))}
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="row">
      <div className="letter">1</div>
      <div className="letter">2</div>
      <div className="letter">3</div>
      <div className="letter">4</div>
      <div className="letter">5</div>
    </div>
  );
}

export default App;
