import { useState } from "react";

function Quantity() {
  const [setIncrement, isSetIncrement] = useState(1);
  const [click, isClicked] = useState(null);

  function handleIncrement() {
    if (setIncrement < 3) {
      isSetIncrement(setIncrement + 1);
      isClicked("increment");
      setTimeout(() => isClicked(null), 200);
    }
  }
  function handleDecrement() {
    if (setIncrement > 1) {
      isSetIncrement(setIncrement - 1);
      isClicked("decrement");
      setTimeout(() => isClicked(null), 200);
    }
  }
  return (
    <div className="inline-flex select-none">
      <p
        className={`border-2 border-r-0  rounded-l-sm px-2 cursor-pointer ${
          click === "decrement" ? "bg-red-400" : ""
        }`}
        onClick={handleDecrement}
      >
        -
      </p>
      <p className="border-2 px-4">{setIncrement}</p>
      <p
        className={`border-2 border-l-0  rounded-r-sm px-2 cursor-pointer ${
          click === "increment" ? "bg-red-400" : ""
        }`}
        onClick={handleIncrement}
      >
        +
      </p>
    </div>
  );
}

export default Quantity;
