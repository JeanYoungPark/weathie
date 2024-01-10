# 날씨 어플 - Weathie (2023.08 ~ 2023.12)
날씨 정보를 알려주는 모바일 웹 사이트<br/>
실시간으로 사용자 위치에 해당하는 날씨 정보 전달<br/>
사용자가 즐겨찾기한 날씨 정보 전달

## 배포 주소
**url**<br/>
~~[https://weathie.vercel.app/](https://weathie.vercel.app/)~~ ___현재 backend 서버 중단___<br/><br/>
**backend-git-url**<br/>
[https://github.com/SkynI25/weather_app](https://github.com/SkynI25/weather_app)

## 기술 스택
  ### frontend
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ### backend
  ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
  ### Hosting
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
 ### Social
 ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

## 실행방법
### 1. 프로젝트 클론
```
git clone https://github.com/JeanYoungPark/weather-app.git
```
### 2. 프로젝트 디렉터리로 이동
```
cd weathe
```
### 3. 종속석 설치
```
npm install
```
### 4. 개발 서버 실행
```
npm start
```

## 회고
기획을 꼼꼼히 해야겠다는 생각이 들었다.<br/>
회원가입이 없는데 즐겨찾기를 만들었다니.. 우리는 `localStorage`에 배열로 즐겨찾기 기능을 대신하기로 하였다.<br/>
localStorage를 사용해 볼 일이 없었는데 이렇게 기회가 오다니 좋은기회였다.<br/><br/>

그 외에 나의 위치를 호출하는 로직은 애초에 사용해본적이 없어서 좀 더 깊게 알아보고 싶어서 블로그로 정리해보았다.<br/>
[Geolocation이란? [ 바로가기 ]](https://velog.io/@jjing9/%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9C%84%EC%B9%98-%EC%B0%BE%EA%B8%B0-Geolocation)

그 중 기본적으로 기억하고 있어야할만한 내용은 아래의 내용인 것 같다.<br/>
- javascript 내장함수인 navigator에 포함되어있는 api
- Geolocation API는 브라우저가 지원해야하는 표준 API라서 대부분의 브라우저에서 사용할 수 있다.
