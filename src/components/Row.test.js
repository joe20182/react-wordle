import { render, screen } from "@testing-library/react";
import Row from "./Row";

const puzzle = "RAISE";

describe("render words", () => {
  const word = "ABCDE";
  render(<Row word={word} puzzle={puzzle} checked={false} />);

  test("render 1st letter", () => {
    const ele = screen.getByText(word[0]);
    expect(ele).toBeInTheDocument();
  });

  // test("render 2nd letter", () => {
  //   const ele = screen.getByText(word[1]);
  //   expect(ele).toBeInTheDocument();
  // });

  // test("render 3rd letter", () => {
  //   const ele = screen.getByText(word[2]);
  //   expect(ele).toBeInTheDocument();
  // });

  // test("render 4th letter", () => {
  //   const ele = screen.getByText(word[3]);
  //   expect(ele).toBeInTheDocument();
  // });

  // test("render 5th letter", () => {
  //   const ele = screen.getByText(word[4]);
  //   expect(ele).toBeInTheDocument();
  // });
});
