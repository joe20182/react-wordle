import { useEffect, useState } from "react";
import "./App.css";
import { WORDS } from "./utils/words";

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
      if (!/[a-zA-Z]/.test(e.key)) return;
      if (endGame) return;
      switch (e.key) {
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
              console.log("88");
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

function Row({ word, puzzle, checked }) {
  // console.log(word);
  const getClassNames = (i) => {
    let classes = "letter";
    if (!checked) return classes;
    if (puzzle.indexOf(word[i]) >= 0) {
      if (word[i] === puzzle[i]) {
        classes += " correct";
      } else {
        classes += " almost";
      }
    } else {
      classes += " none";
    }
    return classes;
  };

  return (
    <div className="row">
      {Array(5)
        .fill(1)
        .map((_, i) => {
          return (
            <div key={i} className={getClassNames(i)}>
              {word[i] || ""}
            </div>
          );
        })}
    </div>
  );
}

export default App;
