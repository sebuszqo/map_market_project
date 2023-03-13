import React, { useState } from "react";
import "./App.css";
import { Header } from "./componens/layout/Header";
import { Map } from "./componens/Map/Map";
import { SearchContext } from "./context/search.context";
import { Route, Routes } from "react-router-dom";
import { AddForm } from "./componens/add.form";

export const App = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ search, setSearch }}>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path={"/add"} element={<AddForm />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </>
  );
};
