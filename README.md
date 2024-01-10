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

조금 더 깊게 알아보고 싶은 부분은 나의 위치를 호출하는 로직이다. (벨로그 주소 추가)
