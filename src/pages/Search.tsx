import { useNavigate } from "react-router";
import leftArrow from "../assets/images/leftArrow.png";
import { useCallback } from "react";
import character from "../assets/images/searchCharacter.png";
import weatherIcon from "../assets/images/searchWeatherIcon.png";

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
                <li className="favoriteList">
                    <div className="left">
                        <h2 className="location">나의 위치</h2>
                        <span className="name">서울 특별시</span>
                        <div className="img"><img src={character} alt="character" /></div>
                    </div>
                    <div className="right">
                        <h3 className="degree">31&deg;</h3>
                        <div>
                            <p className="kindOfWeather">
                                <img src={weatherIcon} alt="weatherIcon" />
                                <span>맑음</span>
                            </p>
                            <p className="degrees">
                                <span>최저 30&deg;</span>
                                <span>최고 37&deg;</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li className="favoriteList">
                    <div className="left">
                        <h2 className="location">나의 위치</h2>
                        <span className="name">서울 특별시</span>
                        <div className="img"><img src={character} alt="character" /></div>
                    </div>
                    <div className="right">
                        <h3 className="degree">31&deg;</h3>
                        <div>
                            <p className="kindOfWeather">
                                <img src={weatherIcon} alt="weatherIcon" />
                                <span>맑음</span>
                            </p>
                            <p className="degrees">
                                <span>최저 30&deg;</span>
                                <span>최고 37&deg;</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
               