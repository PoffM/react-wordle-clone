import { useState } from "react";

export interface WordleState {
  maxGuesses: number;
  wordLength: number;
  submittedGuesses: string[];
  currentGuess: string;
}

const initialState: WordleState = {
  maxGuesses: 6,
  wordLength: 5,
  submittedGuesses: [] as string[],
  currentGuess: "",
};

export function useWordleState() {
  const [wordleState, setWordleState] = useState<WordleState>(
    () => initialState
  );

  function addLetterToGuess(charCode: number) {
    setWordleState((state) => {
      const newGuess = (
        state.currentGuess + String.fromCharCode(charCode)
      ).slice(0, state.wordLength);
      return {
        ...state,
        currentGuess: newGuess,
      };
    });
  }

  function removeLastLetterFromGuess() {
    console.log("bs");
    setWordleState((state) => ({
      ...state,
      currentGuess: state.currentGuess.slice(0, -1),
    }));
  }

  function submitGuess() {
    setWordleState((state) => ({
      ...state,
      submittedGuesses: [...state.submittedGuesses, state.currentGuess],
      currentGuess: "",
    }));
  }

  return {
    wordleState,
    addLetterToGuess,
    removeLastLetterFromGuess,
    submitGuess,
  };
}
