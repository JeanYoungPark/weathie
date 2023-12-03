import "../assets/css/style.css";
import menu from "../assets/images/menu.png";
import reload from "../assets/images/reload.png";
import bookmarkOff from "../assets/images/bookmarkOff.png";
import weatherIcon from "../assets/images/weatherIcon.png";
import sampleIcon from "../assets/images/sampleIcon.png";
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
const week = ["일", "월", "화", "수", "목", "금", "토"];

export const Weather = () => {  
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>();
    const [temp, setTemp] = useState<tempType>();
    const [info, setInfo] = useState<info>();
    const [icon, setIcon] = useState<string>();
    const [character, setCharacter] = useState<string>(sunnyCloudy5dg);
    const [location, setLocation] = useState<locationType>();
    
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
                setTemp({now: data?.temp, max: data?.temp_max, min: data?.temp_min, feel: data?.feels_like});
                setInfo({place:data?.name, wind:data?.speed, rain:data?.rain_1h, dust: '', des:data?.description});
    
                if(data?.temp < 5) {
                    switch(data?.id){
                        case 500:
                            // 비 아이콘, 캐릭터 세팅
                            setCharacter(rainy5dg);
                            break;
                        case 600:
                            // 눈
                            setCharacter(snowy5dg);
                            break;
                        case 800:
                        case 801:
                            // 맑음, 구름
                            setCharacter(sunnyCloudy5dg);
                            break;
                    }
                }else if(data?.temp <= 5 && data?.temp < 10){
                    switch(data?.id){
                        case 500:
                            // 비 아이콘, 캐릭터 세팅
                            setCharacter(rainy10dg);
                            break;
                        case 600:
                            // 눈
                            setCharacter(snowy10dg);
                            break;
                        case 800:
                        case 801:
                            // 맑음, 구름
                            setCharacter(sunnyCloudy10dg);
                            break;
                    }
                }else if(data?.temp <= 10 && data?.temp < 22){
                    switch(data?.id){
                        case 500:
                            // 비 아이콘, 캐릭터 세팅
                            setCharacter(rainy22dg);
                            break;
                        case 800:
                        case 801:
                            // 맑음, 구름
                            setCharacter(sunnyCloudy22dg);
                            break;
                    }
                }else if(data?.temp <= 22 && data?.temp < 26){
                    switch(data?.id){
                        case 500:
                            // 비 아이콘, 캐릭터 세팅
                            setCharacter(rainy26dg);
                            break;
                        case 800:
                        case 801:
                            // 맑음, 구름
                            setCharacter(sunnyCloudy26dg);
                            break;
                    }
                }else{
                    switch(data?.id){
                        case 500:
                            // 비 아이콘, 캐릭터 세팅
                            setCharacter(rainy27dg);
                            break;
                        case 800:
                            // 맑음, 구름
                            setCharacter(sunny27dg);
                            break;
                        case 801:
                            // 맑음, 구름
                            setCharacter(cloudy27dg);
                            break;
                    }
                }
            }
        }

    }, [location]);
                
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

    useEffect(() => {
        const today = new Date();
        setDate(today);
    }, []);

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
        <div id="body" className="blue">
            <div className="header">
                <img className="menu" src={menu} alt="menu" onClick={onClickMenu} />
                <p className="title">{date?.getMonth()}월 {date?.getDate()}일 {date?.getDay()}요일</p>
                <img className="reload" src={reload} alt="reload" onClick={onClickReload} />
            </div>
            <div id="weather" className="wrapper">
                <div className="cont">
                    <h1 className="place">{info?.place}<img className="bookmark" src={bookmarkOff} alt="bookmark off" /></h1>
                    <p className="weather"><img src={weatherIcon} alt="weather icon" />{info?.des}</p>
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
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />풍속</span>
                            <div>{info?.wind}km/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />강수량</span>
                            <div>{info?.rain}mm/h</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />미세먼지</span>
                            <div>데이터 없음</div>
                        </li>
                        <li>
                            <span><img className="kindOfWeather" src={sampleIcon} alt="샘플 이미지" />체감온도</span>
                            <div>{temp?.feel}&deg;</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
