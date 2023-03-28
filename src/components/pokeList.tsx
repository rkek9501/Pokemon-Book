import React from "react";
import Loader from "./loader";
import Pokemon from "./pokemon";

type PokeListProps = {
  list: Pokemon[];
  withLoader?: boolean;
};

const PokeList = (Props: PokeListProps) => {
  const { list, withLoader } = Props;
  return (
    <div className="pokemon-list">
      {list?.map((pokemon: Pokemon, i: number) => <Pokemon key={i+1} {...pokemon}/>)}
      {withLoader && <Loader />}
    </div>
  );
};

export default PokeList;
