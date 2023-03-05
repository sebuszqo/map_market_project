import React from "react";
import "./App.css";
import {Header} from "./componens/layout/Header";
import {Map} from "./componens/Map/Map";

export const App = () => {
    return (
        <>
            <div className="wrapper">
                <Header/>
                <Map/>
            </div>
        </>
    );
};
