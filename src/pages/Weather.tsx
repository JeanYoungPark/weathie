import "../assets/css/style.css";
import menu from "../assets/images/menu.png";
import reload from "../assets/images/reload.png";
import bookmarkOn from "../assets/images/bookmarkOn.png";
import bookmarkOff from "../assets/images/bookmarkOff.png";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
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
import sunnyIcon from 'assets/images/weatherIcon/sunnyIcon.png'
import cloudyIcon from 'assets/images/weatherIcon/cloudyIcon.png'
import rainyIcon from 'assets/images/weatherIcon/rainyIcon.png'
import snowyIcon from 'assets/images/weatherIcon/snowyIcon.png'
import windSpeed from 'assets/images/weatherIcon/windSpeed.png'
import precipitation from 'assets/images/weatherIcon/precipitation.png'

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

const week = ["일", "월", "화", "수", "목", "금", "토"];

export const Weather = () => {  
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>();
    const [temp, setTemp] = useState<tempType>();
    const [info, setInfo] = useState<info>();
    const [icon, setIcon] = useState<string>();
    const [bg, setBg] = useState<string>();
    const [character, setCharacter] = useState<string>('');
    const [location, setLocation] = useState<locationType>();
    const [favList, setFavList] = useState<string[]>([]);
    const [favLocations, setFavLocations] = useState<FavLocation[]>([]);
    const [fav, setFav] = useState<Boolean>(false);
    
    const onClickMenu = useCallback(() => {
        navigate("/search");
    }, [navigate]);

    const onClickReload = useCallback(() => {
        window.location.reload();
    }, []);

    const handleApi = useCallback(async () => {
        if(location?.loaded){
            const response = await axios.post("http://localhost:8080/curr-weather", location?.coordinates);
            const data = response.data;
            
            if(data){
                
                for(const list of favList){
                    if(list === data?.name){
                        setFav(true);
                        break;
                    }
                }
                
                setTemp({now: data?.temp, max: data?.temp_max, min: data?.temp_min, feel: data?.feels_like});
                setInfo({place:data?.name, wind:data?.speed, rain:data?.rain_1h, dust: data?.air, des:data?.description});
    
                switch(data?.id){
                    case 200:
                    case 300:
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
                    case 700:
                    case 801:
                        setIcon(cloudyIcon);
                        setBg('cloudy');
                        break;
                }

                if(data?.temp < 5) {
                    switch(data?.id){
                        case 200:
                        case 300:
                        case 500:
                            setCharacter(rainy5dg);
                            break;
                        case 600:
                            setCharacter(snowy5dg);
                            break;
                        case 700:
                        case 800:
                        case 801:
                            setCharacter(sunnyCloudy5dg);
                            break;
                    }
                }else if(data?.temp <= 5 && data?.temp < 10){
                    switch(data?.id){
                        case 200:
                        case 300:
                        case 500:
                            setCharacter(rainy10dg);
                            break;
                        case 600:
                            setCharacter(snowy10dg);
                            break;
                        case 700:
                        case 800:
                        case 801:
                            setCharacter(sunnyCloudy10dg);
                            break;
                    }
                }else if(data?.temp <= 10 && data?.temp < 22){
                    switch(data?.id){
                        case 200:
                        case 300:
                        case 500:
                            setCharacter(rainy22dg);
                            break;
                        case 700:                            
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
                        case 700:
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
                        case 700:
                        case 801:
                            setCharacter(cloudy27dg);
                            break;
                    }
                }
            }
        }

    }, [favList, location?.coordinates, location?.loaded]);
                
    const onSuccess = useCallback((locations: {coords: {latitude: number; longitude: number;}}) => {
        if(!location?.loaded){
            setLocation({
                loaded: true,
                coordinates: {latitude: locations.coords.latitude, longitude: locations.coords.longitude}
            });
        }
    }, [location]);

    const onError = useCallback((error: {code:number; message: string}) => {
        setLocation({
            loaded: true,
            error
        });
    }, []);

    const handleFav = useCallback(() => {
        if(fav){
            const arr = favList?.filter((item) => item !== info?.place);
            const arr2 = favLocations?.filter((item) => item.place !== info?.place);
            // 배열에서 제거 ( 즐겨찾기 해제 )
            setFavList(arr);
            localStorage.setItem("place", JSON.stringify(arr));
            setFavLocations(arr2);
            localStorage.setItem("location", JSON.stringify(arr2));
        }else{
            if(info?.place && location?.coordinates){
                const newFav = {
                    place: info?.place,
                    lat: location?.coordinates?.latitude,
                    lon: location?.coordinates?.longitude
                };
                
                // 배열에 추가 ( 즐겨찾기 등록 )
                setFavList([...favList, info?.place]);
                setFavLocations([...favLocations, newFav]);
                localStorage.setItem("place", JSON.stringify([...favList, info?.place]));
                localStorage.setItem("location", JSON.stringify([...favLocations, newFav]));
            }
        }
        
        setFav(!fav);
    }, [fav, favList, favLocations, info?.place, location?.coordinates])

    // 즐겨찾기 리스트 호출
    useEffect(() => {
        const today = new Date();
        setDate(today);

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

    // 나의 위치 호출
    useEffect(() => {
        const geo = async() => {
            if(!("geolocation" in navigator)){
                onError({
                    code: 0,
                    message: "Geolocation not supported"
                })
            }else{
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
                handleApi();
            }
        }
        
        geo();
        
    }, [onError, onSuccess, handleApi]);

    return (
        <div id="body" className={bg}>
            <div className="header">
                <img className="menu" src={menu} alt="menu" onClick={onClickMenu} />
                <p className="title">{date?.getMonth()}월 {date?.getDate()}일 {week[date?.getDay() ?? 0]}요일</p>
                <img className="reload" src={reload} alt="reload" onClick={onClickReload} />
            </div>
            <div id="weather" className="wrapper">
                <div className="cont">
                    <h1 className="place">{info?.place}<img className="bookmark" src={fav ? bookmarkOn : bookmarkOff} alt="bookmark off" onClick={handleFav}/></h1>
                    <p className="weather"><img src={icon} alt="weather icon" />{info?.des}</p>
                </div>
                <img className="character" src={character} alt="character"/>
                <div className="cont">
                    <h2 className="degree">{temp?.now}&deg;</h2>
                    <h3 className="text">데이터 없음</h3>
                    <p className="degrees">
                        <span>최저 {temp?.min}&deg;</span>
                        <span>최고 {temp?.max}&deg;</span>
                    </p>
                    <ul className="info">
                        <li>
                            <span><img className="kindOfWeather" src={windSpeed} alt="샘플 이미지" />풍속</span>
                            <div>{info?.wind}km/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={precipitation} alt="샘플 이미지" />강수량</span>
                            <div>{info?.rain}mm/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={precipitation} alt="샘플 이미지" />미세먼지</span>
                            <div>{info?.dust}</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={precipitation} alt="샘플 이미지" />체감온도</span>
                            <div>{temp?.feel}&deg;</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
