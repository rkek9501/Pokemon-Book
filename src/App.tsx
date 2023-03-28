import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Home from "./pages/home";
import Character from "./pages/charater";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/character" component={Character} />
      </Router>
    </RecoilRoot>
  );
};

export default App;
