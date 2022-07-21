import { useEffect, useState } from "react";
import "./App.css";
import { WORDS } from "./utils/words";
import Row from "./components/Row";

// const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

function App() {
  const [puzzle, setPuzzle] = useState("");
  const [words, setWords] = useState(Array(6).fill(""));
  const [currentWord, setCurrentWord] = useState("");
  const [endGame, setEndGame] = useState(false);

  // currentIndex will be -1 if game lost
  const currentIndex = words.findIndex((word) => word === "");

  useEffect(() => {
    const getWord = async () => {
      // const res = await fetch(API_URL);
      // const data = await res.json();
      const randomIndex = Math.floor(Math.random() * WORDS.length);
      setPuzzle(WORDS[randomIndex]);
    };
    getWord();
  }, []);

  useEffect(() => {
    const keyDownHandler = (e) => {
      // console.log(e.key);
      if (!/[a-zA-Z]/.test(e.key)) return;
      if (endGame) return;
      switch (e.key) {
        case "Tab":
        case "CapsLock":
        case "Shift":
        case "Control":
        case "Alt":
        case "Meta":
        case "Escape":
          break;
        case "Backspace":
          if (currentWord.length > 0) {
            setCurrentWord((oldVal) => oldVal.slice(0, -1));
          }
          break;
        case "Enter":
          if (currentWord.length === 5) {
            const newWords = [...words];
            newWords.splice(currentIndex, 1, currentWord);
            setWords(newWords);
            setCurrentWord("");
            // win
            if (currentWord === puzzle) {
              setEndGame(true);
              alert("You Win!");
              return;
            }
            // lose
            if (currentIndex === 5) {
              setEndGame(true);
              alert("You Lose Q_Q");
            }
          }
          break;
        default:
          if (currentWord.length < 5) {
            setCurrentWord((oldVal) => oldVal + e.key.toUpperCase());
          }
          break;
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [currentWord, words, currentIndex, puzzle, endGame]);

  return (
    <div className="App">
      {/* <span>{puzzle}</span> */}
      <h1>WORDLE</h1>
      <div className="container">
        {words.map((word, i) => (
          <Row
            key={i}
            word={currentIndex === i ? currentWord : word}
            puzzle={puzzle}
            checked={i < currentIndex || currentIndex === -1}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
