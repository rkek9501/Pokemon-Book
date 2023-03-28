import React, { useCallback, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { PokemonLoadingState } from "src/stores/pokeList";

const Loader = () => {
  const loader = useRef<HTMLSpanElement>(null);
  const loading = useRecoilValue(PokemonLoadingState);
  const setLoading = useSetRecoilState(PokemonLoadingState);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      const handler = setTimeout(() => {
        setLoading(prev => prev === "init" ? "init" : prev === "finish" ? "load" : prev);
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
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
