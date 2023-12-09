import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import leftArrow from "../assets/images/leftArrow.png";
import axios from "axios";
import sunnyIcon from 'assets/images/weatherIcon/sunnyIcon.png'
import cloudyIcon from 'assets/images/weatherIcon/cloudyIcon.png'
import rainyIcon from 'assets/images/weatherIcon/rainyIcon.png'
import snowyIcon from 'assets/images/weatherIcon/snowyIcon.png'
import sunnyCloudy5dg from 'assets/images/cahracters/sunny_cloudy_5dg.png'
import snowy5dg from 'assets/images/cahracters/snowy_5dg.png'
import rainy5dg from 'assets/images/cahracters/rainy_5dg.png'
import sunnyCloudy10dg from 'assets/images/cahracters/sunny_cloudy_10dg.png'
import snowy10dg from 'assets/images/cahracters/snowy_10dg.png'
import rainy10dg from 'assets/images/cahracters/rainy_10dg.png'
import sunnyCloudy22dg from 'assets/images/cahracters/sunny_cloudy_22dg.png'
import rainy22dg from 'assets/images/cahracters/rainy_22dg.png'
import sunnyCloudy26dg from 'assets/images/cahracters/sunny_cloudy_26dg.png'
import rainy26dg from 'assets/images/cahracters/rainy_26dg.png'
import sunny27dg from 'assets/images/cahracters/sunny_27dg.png'
import cloudy27dg from 'assets/images/cahracters/cloudy_27dg.png'
import rainy27dg from 'assets/images/cahracters/rainy_27dg.png'

interface locationType {
    loaded: boolean;
    coordinates?: {latitude: number; longitude: number};
    error?: {code: number; message: string};
}

interface tempType {
    now: number; //현재온도
    max: number; // 최고 온도
    min: number; // 최저 온도
    feel: number; // 체감 온도
}

interface info {
    place: string,
    wind: string,
    rain: string,
    dust: string
    des: string
}

interface FavLocation {
    place: string;
    lat: number;
    lon: number;
}

export const Search = () => {
    const navigate = useNavigate();
    const [temp, setTemp] = useState<tempType>();
    const [info, setInfo] = useState<info>();
    const [icon, setIcon] = useState<string>();
    const [bg, setBg] = useState<string>();
    const [character, setCharacter] = useState<string>('');
    const [location, setLocation] = useState<locationType>();
    const [favLocations, setFavLocations] = useState<FavLocation[]>([]);
    const [favList, setFavList] = useState<string[]>([]);

    const onClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const handleApi = useCallback(async () => {
        const response = await axios.post("http://localhost:8080/curr-weather", location?.coordinates);
        const data = response.data;
        
        if(data){                
            setTemp({now: data?.temp, max: data?.temp_max, min: data?.temp_min, feel: data?.feels_like});
            setInfo({place:data?.name, wind:data?.speed, rain:data?.rain_1h, dust: '', des:data?.description});

            switch(data?.id){
                case 500:
                    setIcon(rainyIcon);
                    setBg('rainy');
                    break;
                case 600:
                    setIcon(snowyIcon);
                    setBg('snowy');
                    break;
                case 800:
                    setIcon(sunnyIcon);
                    setBg('sunny');
                    break;
                case 801:
                    setIcon(cloudyIcon);
                    setBg('cloudy');
                    break;
            }

            if(data?.temp < 5) {
                switch(data?.id){
                    case 500:
                        setCharacter(rainy5dg);
                        break;
                    case 600:
                        setCharacter(snowy5dg);
                        break;
                    case 800:
                    case 801:
                        setCharacter(sunnyCloudy5dg);
                        break;
                }
            }else if(data?.temp <= 5 && data?.temp < 10){
                switch(data?.id){
                    case 500:
                        setCharacter(rainy10dg);
                        break;
                    case 600:
                        setCharacter(snowy10dg);
                        break;
                    case 800:
                    case 801:
                        setCharacter(sunnyCloudy10dg);
                        break;
                }
            }else if(data?.temp <= 10 && data?.temp < 22){
                switch(data?.id){
                    case 500:
                        setCharacter(rainy22dg);
                        break;
                    case 800:
                    case 801:
                        setCharacter(sunnyCloudy22dg);
                        break;
                }
            }else if(data?.temp <= 22 && data?.temp < 26){
                switch(data?.id){
                    case 500:
                        setCharacter(rainy26dg);
                        break;
                    case 800:
                    case 801:
                        setCharacter(sunnyCloudy26dg);
                        break;
                }
            }else{
                switch(data?.id){
                    case 500:
                        setCharacter(rainy27dg);
                        break;
                    case 800:
                        setCharacter(sunny27dg);
                        break;
                    case 801:
                        setCharacter(cloudy27dg);
                        break;
                }
            }
        }

    }, [location?.coordinates]);

    // 즐겨찾기 리스트 호출
    useEffect(() => {
        const placeInfo = localStorage.getItem("place");
        const locationInfo = localStorage.getItem("location");

        if(placeInfo !== null){
            const favInfo = JSON.parse(placeInfo);
            setFavList(favInfo);
        }

        if(locationInfo !== null){
            const favLocationInfo = JSON.parse(locationInfo);
            setFavLocations(favLocationInfo);
        }
    }, []);

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
                {favList.map(() => (
                    <li className="favoriteList">
                        <div className="left">
                            <h2 className="location">나의 위치</h2>
                            <span className="name">서울 특별시</span>
                            {/* <div className="img"><img src={character} alt="character" /></div> */}
                        </div>
                        <div className="right">
                            <h3 className="degree">31&deg;</h3>
                            <div>
                                <p className="kindOfWeather">
                                    {/* <img src={weatherIcon} alt="weatherIcon" /> */}
                                    <span>맑음</span>
                                </p>
                                <p className="degrees">
                                    <span>최저 30&deg;</span>
                                    <span>최고 37&deg;</span>
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
               