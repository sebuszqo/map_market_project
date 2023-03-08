import React, { useState } from "react";
import "./App.css";
import { Header } from "./componens/layout/Header";
import { Map } from "./componens/Map/Map";
import { SearchContext } from "./context/search.context";

export const App = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ search, setSearch }}>
        <div className="wrapper">
          <Header />
          <Map />
        </div>
      </SearchContext.Provider>
    </>
  );
};
