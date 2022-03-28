import { useState } from "react";
import COMMON_WORDS from "../word-list/common-words.json";
import UNCOMMON_WORDS from "../word-list/uncommon-words.json";

export interface WordleState {
  solution: string;
  maxGuesses: number;
  wordLength: number;
  submittedGuesses: string[];
  currentGuess: string;
  currentGuessError: { message: string } | null;
  status: "PLAYING" | "WON" | "LOST" | "WAITING";
}

const VALID_WORDS = [...COMMON_WORDS, ...UNCOMMON_WORDS];

export function useWordleState() {
  const [wordleState, setWordleState] = useState<WordleState>(getInitialState);

  function addLetterToGuess(charCode: number) {
    setWordleState((state) => {
      const newGuess = (
        state.currentGuess + String.fromCharCode(charCode)
      ).slice(0, state.wordLength);
      return {
        ...state,
        currentGuessError: null,
        currentGuess: newGuess,
      };
    });
  }

  function removeLastLetterFromGuess() {
    setWordleState((state) => ({
      ...state,
      currentGuessError: null,
      currentGuess: state.currentGuess.slice(0, -1),
    }));
  }

  function submitGuess() {
    setWordleState((state) => {
      const currentGuessError =
        state.currentGuess.length < state.solution.length
          ? { message: "Not enough letters." }
          : !VALID_WORDS.includes(state.currentGuess)
          ? { message: "Word not in word list." }
          : null;

      if (currentGuessError) {
        return { ...state, currentGuessError };
      }

      const newSubmittedGuesses = [
        ...state.submittedGuesses,
        state.currentGuess,
      ];

      const newStatus = "WAITING";

      return {
        ...state,
        submittedGuesses: newSubmittedGuesses,
        currentGuess: "",
        status: newStatus,
      };
    });
  }

  function continueGame() {
    setWordleState((state) => {
      const lastGuess = state.submittedGuesses.at(-1);

      const newStatus =
        lastGuess === state.solution
          ? "WON"
          : state.submittedGuesses.length >= state.maxGuesses
          ? "LOST"
          : "PLAYING";

      return { ...state, status: newStatus };
    });
  }

  function restart() {
    setWordleState(getInitialState);
  }

  return {
    wordleState,
    restart,
    ...(wordleState.status === "WAITING" && {
      continueGame,
    }),
    ...(wordleState.status === "PLAYING" && {
      addLetterToGuess,
      removeLastLetterFromGuess,
      submitGuess,
    }),
  };
}

function getInitialState(): WordleState {
  const randomWord =
    COMMON_WORDS[
      Math.floor(Math.random() * COMMON_WORDS.length)
    ]?.toUpperCase();

  if (!randomWord) {
    // Shouldn't happen:
    throw new Error("Random word selection failed.");
  }

  return {
    solution: randomWord,
    maxGuesses: 6,
    wordLength: randomWord.length,
    submittedGuesses: [] as string[],
    currentGuess: "",
    currentGuessError: null,
    status: "PLAYING",
  };
}
