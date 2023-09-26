import "../assets/css/style.css";
import menu from "../assets/images/menu.png";
import reload from "../assets/images/reload.png";
import bookmarkOff from "../assets/images/bookmarkOff.png";
import weatherIcon from "../assets/images/weatherIcon.png";
import character from "../assets/images/character.png";
import sampleIcon from "../assets/images/sampleIcon.png";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";

interface locationType {
    loaded: boolean;
    coordinates?: {lat: number; lng: number};
    error?: {code: number; message: string};
}

export const Weather = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState<locationType>({
        loaded: false,
        coordinates: {lat: 0, lng: 0}
    });

    const onSuccess = useCallback((location: {coords: {latitude: number; longitude: number;}}) => {
        setLocation({
            loaded: true,
            coordinates: {lat: location.coords.latitude, lng: location.coords.longitude}
        });
    }, []);

    const onError = useCallback((error: {code:number; message: string}) => {
        setLocation({
            loaded: true,
            error
        });
    }, []);

    const onClickMenu = useCallback(() => {
        navigate("/search");
    }, [navigate]);

    const onClickReload = useCallback(() => {
        window.location.reload();
    }, []);

    useEffect(() => {
        if(!("geolocation" in navigator)){
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // api 전송
    }, []);

    return (
        <div id="body" className="blue">
            <div className="header">
                <img className="menu" src={menu} alt="menu" onClick={onClickMenu} />
                <p className="title">7월 27일 목요일</p>
                <img className="reload" src={reload} alt="reload" onClick={onClickReload} />
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
