import React, { ReactElement } from "react";

import Header from "src/components/header";

/**
 * 페이지 레이아웃 용 컨테이너
 * @param Props 
 * @returns 
 */
const Layout = (Props: { children: ReactElement | ReactElement[] }) => {
  return (<>
    <Header />
    {Props.children}
  </>);
};

export default Layout;
