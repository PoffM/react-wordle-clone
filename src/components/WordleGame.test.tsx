import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionConfig } from "framer-motion";
import { WordleGame } from "./WordleGame";

function renderWordleGame() {
  const ui = render(<WordleGame solution="HELLO" />, {
    wrapper: ({ children }) => (
      <MotionConfig reducedMotion="always">{children}</MotionConfig>
    ),
  });
  const user = userEvent.setup();

  return { ui, user };
}

describe("WordleGame component", () => {
  it("Renders the initial blank state.", () => {
    const { ui } = renderWordleGame();
    const letterRows = ui.getAllByTestId("letter-grid-row");
    const letterBoxes = ui.getAllByTestId("letter-box");

    // Renders all letter rows and boxes:
    expect(letterRows.length).toEqual(6);
    expect(letterBoxes.length).toEqual(30);

    // All letter boxes are blank:
    expect(letterBoxes.filter((node) => node.innerText)).toEqual([]);
  });

  it("Plays through a game where you win.", async () => {
    // Using test solution "HELLO":
    const { ui, user } = renderWordleGame();

    // Guess 1 with all wrong letters:
    {
      await user.keyboard("{a}{m}{i}{s}{s}{Enter}");
      const firstRowBoxes = ui.getAllByTestId("letter-box").slice(0, 5);

      // The guess is rendered in the first row:
      expect(firstRowBoxes.map((node) => node.textContent)).toEqual([
        "A",
        "M",
        "I",
        "S",
        "S",
      ]);

      // All boxes should have the gray "usedLetter" color:
      expect(
        firstRowBoxes.map((node) => node.getAttribute("data-background-color"))
      ).toEqual([
        "usedLetter.500",
        "usedLetter.500",
        "usedLetter.500",
        "usedLetter.500",
        "usedLetter.500",
      ]);
    }

    // Guess 2 with a mix of correct and misplaced letters:
    {
      // Guess "OLLIE" because it has a mix of different results:
      await user.keyboard("{o}{l}{l}{i}{e}{Enter}");
      const secondRowBoxes = ui.getAllByTestId("letter-box").slice(5, 10);

      // The guess is rendered in the second row:
      expect(secondRowBoxes.map((node) => node.textContent)).toEqual([
        "O",
        "L",
        "L",
        "I",
        "E",
      ]);

      // The correct letter box colors are shown:
      expect(
        secondRowBoxes.map((node) => node.getAttribute("data-background-color"))
      ).toEqual([
        "misplaced.500", // O: misplaced
        "misplaced.500", // First L: misplaced
        "correct.500", // Second L: correct spot
        "usedLetter.500", // I: Not in the solution
        "misplaced.500", // E: misplaced
      ]);
    }

    // Guess 3 with the correct word:
    {
      // // Enter the solution:
      await user.keyboard("{h}{e}{l}{l}{o}{Enter}");
      const thirdRowBoxes = ui.getAllByTestId("letter-box").slice(10, 15);

      // The letter boxes are all the correct green color:
      expect(
        thirdRowBoxes.map((node) => node.getAttribute("data-background-color"))
      ).toEqual([
        "correct.500",
        "correct.500",
        "correct.500",
        "correct.500",
        "correct.500",
      ]);
    }
  });
});
