import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPokemonSpec } from 'src/utils/request';

const Pokemon = (Props: Pokemon) => {
  const [spec, setSpec] = useState<PokemonSpec|null>(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    (async () => {
      const poke = await getPokemonSpec(Props.name);
      setSpec(poke || null);
      setLoading(false);
    })();
  }, []);

  return (
    <Link
      className="pokemon-block border pointer"
      style={{ pointerEvents: loading ? "none" : "auto" }}
      to={`/character?name=${Props.name}`}
    >
      {loading
        ? <div className='pokemon-name'>Loading...</div>
        : <>
          <div className="pokemon-num">{spec?.id}.</div>
          <div className="pokemon-name">{spec?.name}</div>
          <img src={spec?.src} alt={spec?.name} />
      </>}
    </Link>
  );
};

export default React.memo(Pokemon);