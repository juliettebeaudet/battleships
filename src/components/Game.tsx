import { useState, useEffect } from "react";
import {
  BattleshipConfigurationOutput,
  generateBattleshipConfiguration,
} from "../utils/generateBattleshipConfiguration";
import Grid from "./Grid";

type GuessFeedback = "" | "hit" | "miss" | "sink";
type Guesses = {
  misses: string[];
  sinks: string[];
  hits: string[];
};

export const Game = () => {
  const [coordinateInput, setCoordinateInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [guesses, setGuesses] = useState<Guesses>({
    misses: [],
    sinks: [],
    hits: [],
  });
  const [feedback, setFeedback] = useState<GuessFeedback>("");
  const [generatedBoats, setGeneratedBoats] =
    useState<BattleshipConfigurationOutput>(() =>
      generateBattleshipConfiguration()
    );
  // console.log("GB", generatedBoats); // is successfully updated at each game but persists during one despite of re-renders

  // Flatten all ship coordinates into a single array
  const allGeneratedBoatsCoordinates = generatedBoats.flatMap(
    (boat) => boat.coordinates
  );

  const getFeedbackWording = () => {
    switch (feedback) {
      case "hit":
        return "Hit !";
      case "miss":
        return "Miss !";
      case "sink":
        return "Sink !";
      default:
        "";
        break;
    }
  };
  const feedbackWording = getFeedbackWording();

  const isGameFinished =
    guesses.sinks.length === allGeneratedBoatsCoordinates.length;

  const getComputerFeedbackOnGuess = (coordinate) => {
    // Miss scenario
    if (!allGeneratedBoatsCoordinates.includes(coordinate)) {
      setGuesses((prevGuesses) => ({
        ...prevGuesses,
        misses: [...prevGuesses.misses, coordinate],
      }));
      setFeedback("miss");
    } else {
      // Hit or sink scenario scenario
      // Determining if the current hit + existing hits are completing any boat
      const sinkedBoat = generatedBoats.find((boat) => {
        if (!boat.coordinates.includes(coordinate)) return false;

        const previousSameBoatHits = guesses.hits.filter((hit) =>
          boat.coordinates.includes(hit)
        );
        const combinedHits = [...previousSameBoatHits, coordinate]; // no need for a set since user was prevented from guessing the same coordinate twice

        return (
          combinedHits.length === boat.coordinates.length &&
          boat.coordinates.every((coord) => combinedHits.includes(coord))
        );
      });

      if (sinkedBoat) {
        setGuesses((prevGuesses) => ({
          ...prevGuesses,
          sinks: [...prevGuesses.sinks, ...sinkedBoat.coordinates],
          hits: prevGuesses.hits.filter(
            (hit) => !sinkedBoat.coordinates.includes(hit)
          ), // removing any hits for this boat so the corresponding coordinates are only counted as sink
        }));
        setFeedback("sink");
        return;
      } else {
        // Otherwise, it is just a hit
        setGuesses((prevGuesses) => ({
          ...prevGuesses,
          hits: [...prevGuesses.hits, coordinate],
        }));
        setFeedback("hit");
      }
    }
  };

  const flatGuesses = Object.values(guesses).flat();
  const numberOfGuesses =
    guesses.hits.length + guesses.misses.length + guesses.sinks.length;

  const resetInput = () => {
    setCoordinateInput("");
  };

  const validateCoordinateValue = (value) => {
    const regex = /^[A-J](10|[1-9])$/;
    if (!regex.test(value)) {
      setError(
        "Invalid format, please use A1, B2, etc, until J and 10 maximum."
      );
      resetInput();
    } else if (flatGuesses.includes(value)) {
      setError("Already tried this one !");
      resetInput();
    } else {
      setError("");
      getComputerFeedbackOnGuess(value);
      resetInput();
    }
  };

  const handleCoordinateSubmit = (event) => {
    event.preventDefault();
    validateCoordinateValue(coordinateInput);
  };

  const resetGame = () => {
    resetInput();
    setError("");
    setFeedback("");
    setGuesses({ hits: [], misses: [], sinks: [] });
    setGeneratedBoats(generateBattleshipConfiguration());
  };

  return (
    <section>
      <h1>Battleships Game</h1>
      <Grid gridSize={10} guesses={guesses} />
      <p>
        One battleship (5 squares) and 2 destroyers (4 squares) are hiding in
        this 10x10 grid. <br /> Try to sink them all in as few guesses as
        possible !
      </p>
      <form onSubmit={handleCoordinateSubmit}>
        <label htmlFor={"coordinateInputId"}>
          What square is your next guess ?
        </label>
        <input
          id={"coordinateInputId"}
          type="text"
          value={coordinateInput}
          placeholder={"A1"}
          onChange={(e) => setCoordinateInput(e.target.value.toUpperCase())} // already partly sanitize the input
          style={{
            marginRight: "1rem",
            marginLeft: "1rem",
            alignContent: "center",
            // border: error === "" ? "" : "1px solid red",
          }}
        />
        <button type="submit" disabled={isGameFinished}>
          OK
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
      <p>Number of guesses: {numberOfGuesses}</p>
      <h2 style={{ color: "red" }}>{feedbackWording}</h2>
      {isGameFinished ? (
        <h2 style={{ color: "red" }}>
          You finished the game in {numberOfGuesses} guesses !
        </h2>
      ) : null}
      <button onClick={resetGame}>Reset Game</button>
    </section>
  );
};
