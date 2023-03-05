import {FaSearchLocation} from "react-icons/fa";
import "./Header.css";
import {Btn} from "../common/Btn";

export const Header = () => {
    return (
        <header>
            <h1>
                <strong>Map</strong> Market
            </h1>
            <Btn text={"New announcement"}/>
            <div className="search">
                <input type="text"/>
                <Btn
                    text={
                        <p id={"icon"}>
                            <FaSearchLocation/>
                        </p>
                    }
                />
            </div>
        </header>
    );
};
