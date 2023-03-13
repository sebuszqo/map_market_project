import { FaSearchLocation } from "react-icons/fa";
import "./Header.css";
import { Btn } from "../common/Btn";
import { FormEvent, useContext, useState } from "react";
import { SearchContext } from "../../context/search.context";

export const Header = () => {
  const { setSearch, search } = useContext(SearchContext);
  const [inputVal, setInputVal] = useState(search);

  const setSearchFromLocalState = (e: FormEvent) => {
    e.preventDefault();
    setSearch(inputVal);
  };

  return (
    <header>
      <h1>
        <strong>Map</strong> Market
      </h1>
      <Btn to={"/add"} text={"New announcement"} />
      <form className="search" onSubmit={setSearchFromLocalState}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <Btn
          text={
            <p id={"icon"}>
              <FaSearchLocation />
            </p>
          }
        />
      </form>
    </header>
  );
};
