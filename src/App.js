import { useEffect, useState } from "react";
import "./App.css";
import { WORDS } from "./utils/words";

// const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

function App() {
  const [puzzle, setPuzzle] = useState("");

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
    </div>
  );
}

export default App;
