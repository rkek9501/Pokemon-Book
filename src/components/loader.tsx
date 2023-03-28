import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { PokemonLoadingState, PokemonPageState } from "src/stores/pokeList";

const Loader = () => {
  const loader = useRef<HTMLSpanElement>(null);
  const loading = useRecoilValue(PokemonLoadingState);
  const setPage = useSetRecoilState(PokemonPageState);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
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

  return (
    <span key={0} className={`pokemon-block center ${!loading && "none"}`} ref={loader} >
      loading...
    </span>
  );
};

export default Loader;
