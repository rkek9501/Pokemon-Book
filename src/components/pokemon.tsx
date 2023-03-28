import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { parsePathQuery } from 'src/utils/parser';
import { POKE_IMG_BASE_URL } from 'src/const';

const Pokemon = (Props: Pokemon) => {
  const location = useLocation();
  const src = `${POKE_IMG_BASE_URL}/${Props.id}.png`;

  const isSame = useMemo(() => {
    return location.pathname === "/character" && parsePathQuery("id", location?.search) === Props.id?.toString();
  }, [location, Props.id]);

  return (
    <Link
      className="pokemon-block border pointer"
      style={{ pointerEvents: isSame ? "none" : "auto" }}
      to={`/character?id=${Props.id}`}
    >
      <div className="pokemon-num">{Props?.id}.</div>
      <div className="pokemon-name">{Props?.koName || Props?.name}</div>
      <img src={src} alt={Props?.name} />
    </Link>
  );
};

export default React.memo(Pokemon);