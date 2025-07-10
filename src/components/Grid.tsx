import { alphabet } from "../utils/constants";

type GridProps = {
  gridSize: number;
  guesses: {
    hits: string[];
    misses: string[];
    sinks: string[];
  };
};
export const Grid = ({ gridSize, guesses }: GridProps) => {
  const letters = alphabet.slice(0, gridSize); // ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numbers = Array.from({ length: gridSize });

  const getSquareBackgroundColor = (coordinate: string) => {
    if (guesses.hits.includes(coordinate)) {
      return "lightblue";
    } else if (guesses.misses.includes(coordinate)) {
      return "gray";
    } else if (guesses.sinks.includes(coordinate)) {
      return "darkblue";
    } else {
      return "white"; // default color for unguessed squares
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {numbers.map((_, index) => (
          <div
            key={index}
            style={{
              height: "3rem",
              width: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              color: "white",
              marginLeft: index === 0 ? "51px" : "",
            }}
          >
            <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {index + 1}
            </p>
          </div>
        ))}
      </div>
      {letters.map((letter) => {
        return (
          <div key={letter}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  height: "3rem",
                  width: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid black",
                  color: "white",
                }}
              >
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {letter}
                </p>
              </div>
              {numbers.map((_, index) => (
                <div
                  key={`${letter}${index + 1}`}
                  id={`${letter}${index + 1}`}
                  style={{
                    backgroundColor: getSquareBackgroundColor(
                      `${letter}${index + 1}`
                    ),
                    border: "1px solid black",
                    height: "3rem",
                    width: "3rem",
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
