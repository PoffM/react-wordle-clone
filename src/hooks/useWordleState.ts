import { useState } from "react";
import COMMON_WORDS from "../word-list/common-words.json";
import UNCOMMON_WORDS from "../word-list/uncommon-words.json";

export interface WordleState {
  hiddenWord: string;
  maxGuesses: number;
  wordLength: number;
  submittedGuesses: string[];
  currentGuess: string;
  status: "PLAYING" | "WON" | "LOST";
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
        currentGuess: newGuess,
      };
    });
  }

  function removeLastLetterFromGuess() {
    setWordleState((state) => ({
      ...state,
      currentGuess: state.currentGuess.slice(0, -1),
    }));
  }

  function submitGuess() {
    setWordleState((state) => {
      if (!VALID_WORDS.includes(state.currentGuess)) {
        return state;
      }

      const newSubmittedGuesses = [
        ...state.submittedGuesses,
        state.currentGuess,
      ];

      const newStatus =
        state.currentGuess === state.hiddenWord
          ? "WON"
          : newSubmittedGuesses.length >= state.maxGuesses
          ? "LOST"
          : "PLAYING";

      return {
        ...state,
        submittedGuesses: newSubmittedGuesses,
        currentGuess: "",
        status: newStatus,
      };
    });
  }

  return {
    wordleState,
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
    throw new Error("Random word selection failed.");
  }

  return {
    hiddenWord: "TESTS",
    maxGuesses: 6,
    wordLength: randomWord.length,
    submittedGuesses: [] as string[],
    currentGuess: "",
    status: "PLAYING",
  };
}
