import { render, screen } from "@testing-library/react";
import Row from "./Row";

const puzzle = "RAISE";
const word = "ABCDE";

test("render 1st letter", () => {
  render(<Row word={word} puzzle={puzzle} checked={false} />);
  const a = screen.getByText("A");
  expect(a).toBeInTheDocument();
});
