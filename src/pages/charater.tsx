import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getPokemonSpecWithEvolution } from "src/utils/request";
import Layout from "src/containers/layout";
import PokeList from "src/components/pokeList";

const parseNameByQuery = (queryString: string) => {
  const params = new URLSearchParams(queryString);
  const pokemonName = params.get("name");
  return pokemonName;
};

const Character = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [{src, genus, name, flavor_text, evolutions}, setSpecs] = useState<PokemonSpec>({ id: 0, src: "", genus: "", name: "", flavor_text: "", evolutions: [] });

  useLayoutEffect(() => {
    const pokemonName = parseNameByQuery(location.search);
    setLoading(true);

    if (pokemonName) {
      (async () => {
        const response = await getPokemonSpecWithEvolution(pokemonName);
        if (response) {
          setSpecs(response);
        }
        setLoading(false);
      })();
    } else {
      setError("경로가 올바르지 않습니다.");
    }
  }, [location]);

  return (<Layout>
    {error
      ? <div className="center">{error}</div>
      : loading
        ? <div className="center">
          Loading...
          </div>
        : <div className="center">
        <span>
          <img src={src} alt={name} width={160} height={160} />
          <div>이름 : {name}</div>
          <div>분류 : {genus}</div>
          <div>설명 : {flavor_text}</div>
        </span>
        <hr/>
        <div>진화</div>
        <PokeList list={evolutions || []} />
      </div>
    }
  </Layout>);
};

export default Character;
