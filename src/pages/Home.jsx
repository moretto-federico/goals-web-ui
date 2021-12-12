import React from "react";
import News from "../compoents/News/News";
import Toolbar from "../compoents/Tootlbar/Toolbar";

function Home() {
  return (
    <div className="goals-page goals-page--home">
      <Toolbar />
      <News />
    </div>
  );
}

export default Home;
