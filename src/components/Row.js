export default function Row({ word, puzzle, checked }) {
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
