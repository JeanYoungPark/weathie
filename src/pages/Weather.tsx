import "../assets/css/style.css";
import menu from "../assets/images/menu.png";
import reload from "../assets/images/reload.png";
import bookmarkOff from "../assets/images/bookmarkOff.png";
import weatherIcon from "../assets/images/weatherIcon.png";
import character from "../assets/images/character.png";
import sampleIcon from "../assets/images/sampleIcon.png";


export const Weather = () => {
    return (
        <div id="body">
            <div className="header">
                <img className="menu" src={menu} alt="menu"/>
                <p className="date">7월 27일 목요일</p>
                <img className="reload" src={reload} alt="reload"/>
            </div>
            <div className="wrapper">
                <div className="cont">
                    <h1 className="place">서울특별시<img className="bookmark" src={bookmarkOff} alt="bookmark off" /></h1>
                    <p><img className="weather" src={weatherIcon} alt="weather icon" />맑음</p>
                </div>
                <img className="character" src={character} alt="character"/>
                <div className="cont">
                    <h2 className="degree">31&deg;</h2>
                    <h3 className="text">너무나도 쨍쨍한 날</h3>
                    <p className="degrees">
                        <span>최저 30&deg;</span>
                        <span>최고 37&deg;</span>
                    </p>
                    <ul className="info">
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />풍속</span>
                            <div>20km/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />풍속</span>
                            <div>20km/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />풍속</span>
                            <div>20km/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />풍속</span>
                            <div>20km/h</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
