import React, { ReactElement } from "react";
import Header from "src/components/header";

const Layout = (Props: { children: ReactElement | ReactElement[] }) => {
  return (<>
    <Header />
    {Props.children}
  </>);
};

export default Layout;
