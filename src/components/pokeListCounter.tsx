import React from "react";

const PokeListCounter = (Props: { count: number; }) => {
  return <div className="length">total:<br/>{Props.count}</div>;
};

export default PokeListCounter;
