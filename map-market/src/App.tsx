import React from "react";
import "./App.css";
import {FaSearchLocation} from "react-icons/fa";
// import {FaSearchLocation} from "react-icons/all";

export const App = () => {
  return (
      <>
        <div className="wrapper">
          <header>
            <h1>
              <strong>Map</strong> Market
            </h1>
            <button>New announcement</button>
            <div className="search">
              <input type="text"/>
              <button>
                <FaSearchLocation/>
              </button>
            </div>
          </header>
          <div className="map"></div>
        </div>
      </>
  );
};
