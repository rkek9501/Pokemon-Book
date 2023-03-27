import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import cachingRequest from "../utils/cachingRequest";

type Pokemon = {
  id: number;
  name: string;
  img: string;
};
const LIMIT = 20;
const getPokemomList = async (page: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${(page-1) * LIMIT}`;
  const response = await cachingRequest(url);

  if (response?.results?.length > 0) {
    const list: Pokemon[] = [];
    await Promise.all(
      response?.results?.map(async (poke: { url: string }) => {
        const mon = await cachingRequest(poke.url);
        list.push({
          id: mon?.id,
          name: mon?.name,
          img: mon?.sprites?.front_default
        });
      })
    );
    return list.sort((a, b) => a.id - b.id);
  }
  return [];
};

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useLayoutEffect(() => {
    (async () => {
      const list = await getPokemomList(page);
      setPokemonList(prev => (prev.concat(...list)));
    })();
  }, [page]);

  useEffect(() => {
    console.log("pokemonList.length", pokemonList.length);
  }, [pokemonList]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    console.log({target});
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  
  return (<>
    <h1>Pokemon List</h1>
    <div className="pokemon-list">
      {pokemonList.map((pokemon:Pokemon, i: number) => {
        return (
          <a key={i+1} className="pokemon-block pointer" href={`/character?name=${pokemon.name}`}>
            <div className="pokemon-num">{pokemon.id}.</div>
            <div className="pokemon-name">{pokemon.name}</div>
            <img src={pokemon?.img} alt={pokemon.name} />
          </a>
        );
      })}
      <span key={0} className="pokemon-block pointer none" ref={loader} />
    </div>
    <div className="length">{pokemonList.length}</div>
  </>);
};

export default Home;
