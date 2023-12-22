import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "axiosConfig";
import leftArrow from "assets/images/leftArrow.png";
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
    latitude: number;
    longitude: number;
}

interface FavList {
    place: string;
    lat: number;
    lon: number;
}

type favWeatherIconType = {
    icon: string,
    character: string,
    bg: string
}

type favWeatherInfoType = {
    tmpList : tempType,
    infoList : info,
    assetList: favWeatherIconType
}

export const Search = () => {
    const navigate = useNavigate();
    const [favList, setFavList] = useState<FavList[]>([]);
    const [favWeatherInfo, setFavWeatherInfo] = useState<favWeatherInfoType[]>([]);
    const [searchWeatherInfo, setSearchWeatherInfo] = useState<favWeatherInfoType[]>([]);
    const [inputVal, setInputVal] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    const onSearch = useCallback(() => {
        // inputVal가 변화함애 따라 검색 내용 변경
        const searchWeatherInfoList = [];
        for(let favWeatherInfoData of favWeatherInfo){
            const str = favWeatherInfoData.infoList.place;
            
            if(str.includes(inputVal)){
                searchWeatherInfoList.push({
                    tmpList: favWeatherInfoData.tmpList,
                    infoList: favWeatherInfoData.infoList,
                    assetList: favWeatherInfoData.assetList
                });
            }
        }
        
        setSearchWeatherInfo(searchWeatherInfoList);
    }, [favWeatherInfo, inputVal]);

    const onClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const handleApi = useCallback(async (locations: FavLocation[]) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/list-weather", locations);
            const data = response.data;

            if(data){   
                setLoading(false);  
                const favWeatherInfoList = [];
    
                for(let list of data){
                    const tmpList = {now: list?.temp, max: list?.temp_max, min: list?.temp_min, feel: list?.feels_like};
                    const infoList = {place:list?.name, wind:list?.speed, rain:list?.rain_1h, dust: list?.air, des:list?.description};
                    const assetList : favWeatherIconType = {
                        icon: "",
                        character: "",
                        bg: ""
                    };
                    
                    switch(list?.id){
                        case 500:
                            assetList['icon'] = rainyIcon;
                            assetList['bg'] = 'rainy';
                            break;
                        case 600:
                            assetList['icon'] = snowyIcon;
                            assetList['bg'] = 'snowy';
                            break;
                        case 800:
                            assetList['icon'] = sunnyIcon;
                            assetList['bg'] = 'sunny';
                            break;
                        case 801:
                            assetList['icon'] = cloudyIcon;
                            assetList['bg'] = 'cloudy';
                            break;
                    }
        
                    if(data?.temp < 5) {
                        switch(data?.id){
                            case 500:
                                assetList['character'] = rainy5dg;
                                break;
                            case 600:
                                assetList['character'] = snowy5dg;
                                break;
                            case 800:
                            case 801:
                                assetList['character'] = sunnyCloudy5dg;
                                break;
                        }
                    }else if(list?.temp <= 5 && list?.temp < 10){
                        switch(list?.id){
                            case 500:
                                assetList['character'] = rainy10dg;
                                break;
                            case 600:
                                assetList['character'] = snowy10dg;
                                break;
                            case 800:
                            case 801:
                                    assetList['character'] = sunnyCloudy10dg;
                                break;
                        }
                    }else if(list?.temp <= 10 && list?.temp < 22){
                        switch(list?.id){
                            case 500:
                                    assetList['character'] = rainy22dg;
                                break;
                            case 800:
                            case 801:
                                    assetList['character'] = sunnyCloudy22dg;
                                break;
                        }
                    }else if(list?.temp <= 22 && list?.temp < 26){
                        switch(list?.id){
                            case 500:
                                    assetList['character'] = rainy26dg;
                                break;
                            case 800:
                            case 801:
                                    assetList['character'] = sunnyCloudy26dg;
                                break;
                        }
                    }else{
                        switch(list?.id){
                            case 500:
                                    assetList['character'] = rainy27dg;
                                break;
                            case 800:
                                    assetList['character'] = sunny27dg;
                                break;
                            case 801:
                                    assetList['character'] = cloudy27dg;
                                break;
                        }
                    }
    
                    favWeatherInfoList.push({
                        tmpList: tmpList,
                        infoList: infoList,
                        assetList: assetList
                    });
                }
    
                setFavWeatherInfo(favWeatherInfoList);
    
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        

    }, []);

    // 즐겨찾기 리스트 호출
    useEffect(() => {
        const handleFavweather = async() => {
            const placeInfo = localStorage.getItem("place");
            const locationInfo = localStorage.getItem("location");
            const favLocations = [];
            
            if(placeInfo !== null){
                const favInfo = JSON.parse(placeInfo);
                setFavList(favInfo);
            }
    
            if(locationInfo !== null){
                const favLocationInfo = JSON.parse(locationInfo);
    
                for(let list of favLocationInfo){
                    favLocations.push({
                        latitude: list.lat,
                        longitude: list.lon
                    })
                }
            }
    
            handleApi(favLocations);
        }

        handleFavweather();
    }, [handleApi]);
    
    useEffect(() => {
        onSearch();
    }, [onSearch]);
    
    return (
        <div id="body">
            <div className="header">
                <img className="back" src={leftArrow} alt="back" onClick={onClick}/>
                <h1 className="title">날씨</h1>
                <span> </span>
            </div>
            <div className="wrapper">
                <p className="searchBar">
                    <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="도시 또는 위치 검색" />
                    <span className="searchIcon" onClick={onSearch}></span>
                </p>
            </div>
            <ul className="wrapper">
                {(inputVal ? searchWeatherInfo : favWeatherInfo).map((data, i) => (
                    <li key={i} className={`favoriteList ${data.assetList.bg}`}>
                        <div className="left">
                            <h2 className="location">나의 위치</h2>
                            <span className="name">{data.infoList.place}</span>
                            <div className="img"><img src={data.assetList.character} alt="character" /></div>
                        </div>
                        <div className="right">
                            <h3 className="degree">{data.tmpList.now}&deg;</h3>
                            <div>
                                <p className="kindOfWeather">
                                    {/* <img src={weatherIcon} alt="weatherIcon" /> */}
                                    <span>{data.infoList.des}</span>
                                </p>
                                <p className="degrees">
                                    <span>최저 {data.tmpList.min}&deg;</span>
                                    <span>최고 {data.tmpList.max}&deg;</span>
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
               