import { useNavigate } from "react-router";
import leftArrow from "../assets/images/leftArrow.png";
import { useCallback } from "react";

export const Search = () => {
    const navigate = useNavigate();

    const onClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div id="body">
            <div className="header">
                <img className="back" src={leftArrow} alt="back" onClick={onClick}/>
                <h1 className="title">날씨</h1>
                <span> </span>
            </div>
            <div className="wrapper">
                <p className="searchBar">
                    <input type="text" placeholder="도시 또는 위치 검색" />
                    <span className="searchIcon"></span>
                </p>
            </div>
            <ul className="wrapper">
                <li className="favorite">
                </li>
            </ul>
        </div>
    )
}
               