import React, { useLayoutEffect } from 'react';

const Img = (Props: any) => {
  useLayoutEffect(() => {
    const image = new Image();
    image.src = Props.src;
  }, []);

  return <img {...Props} />;
};

export default Img;
