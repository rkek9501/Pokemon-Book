import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <h1>
      <Link to={"/"}>Pokemon Book</Link>
    </h1>
  );
};

export default Header;
