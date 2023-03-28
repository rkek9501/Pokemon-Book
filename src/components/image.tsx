import React, { ReactElement, useLayoutEffect, ComponentProps } from "react";

// type ImageProps = {
//   src: string;
//   alt?: string;
// };

const Img = (Props: any) => {
  useLayoutEffect(() => {
    const image = new Image();
    image.src = Props.src;
  }, []);

  return <img {...Props}/>;
};

export default Img;
