![logo](https://github.com/zoe-world/Wishread/assets/114548167/ab9c46cd-519d-4178-a720-f213d850da72)

# 📚 WISHREAD

🚀 배포 링크: <a href="https://zoe-world.github.io/Wishread/" target="_blank" title="새창열림">위시리드 바로가기</a>

> kakao 검색 api 를 활용하여 읽고 싶은 책을 검색하고, 나만의 위시리스트를 조회하고, 필러팅할 수 있는 책 위시리스트 앱입니다.

- 인원 : FE 및 디자인: 이조은 인원 1명
- 기간 : 약 1개월 (24/5 ~)

## 🔧 기술스택

<div align="center">
     <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
</div>
<div align="center">
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
    <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
</div>
<div align="center">
    <img src="https://img.shields.io/badge/fontawesome-538DD7?style=for-the-badge&logo=fontawesome&logoColor=white">
    <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
</div>

| 책 검색 | 책 상세정보 |
| ![검색창 화면](https://github.com/zoe-world/Wishread/assets/114548167/f943933a-9ef9-480a-bd89-d953801706cf) | ![책 상세보기](https://github.com/zoe-world/Wishread/assets/114548167/158b5566-b378-49b6-a3b1-00ea35b9651f) |
| ------- | ------ |
| 로딩 랜덤 추천책 | 위시리스트 책장 |
| ![랜덤추천 및 추천책](https://github.com/zoe-world/Wishread/assets/114548167/0d5276d9-49cf-46c1-8d82-2b0b12168a6b) | ![위시리스트](https://github.com/zoe-world/Wishread/assets/114548167/69cba3d4-d74f-4bcd-bcf7-fc1f1ab21b3b)|

## 사용기술

- 라이브러리 : react(router)
- 프로그래밍 언어 : typescript
- 상태관리 : recoil
- style : styled-component, fontawesome
- 데이터 : kakao api

## 프로젝트의 주요 목표

- 오픈 API 다루기연습
- recoil의 selector를 통해 API로 받아온 데이터 캐싱
- react-router-dom을 활용한 상세페이지 이동
- recoil의 atom, selector를 이용하여 검색, 필터링 기능 구현
- 학습한 typescript를 이용한 타입지정
- Styled-Component을 활용하여 스타일 관리

## 주요기능에 대한 간단한 설명

- Promise all 사용하여 최근 검색한 책 결과값 API 호출 병렬 처리
- recoil의 selectorFamily를 통해 Kakao API로 받아온 데이터 캐싱
- React Suspense를 통해 비동기 데이터를 가져오는 동안 로딩 UI 렌더링
- recoil의 atom, selector, selectorFamily을 이용해서 검색, 정렬 기능 구현
- 최근 검색한 책 localStorage에 데이터 저장
- 랜덤 추천책 기능 구현
- My WistList를 모아볼 수 있으며, localStorage에 데이터 저장

### 📝 스타일링

Styled-Component을 활용하여 전역적 관리가 필요한 스타일은 Global Style을 사용  
다양한 디바이스에 유연한 반응형 작업을 위해 Breakpoints로 일관되게 관리
Props를 활용한 공통 스타일링 작업

## ver 2.1

- recoil의 selector(getCallback, snapshots) 사용하여 불필요한 재렌더링 방지  
  (기존) 검색결과, 최근 검색한 책, 북마크 책 개별 localStorage 저장  
  (변경) 검색한 책 localStorage 로 저장 => isMarked, isWatched 라는 속성추가
  > <b>하나의 데이터로 북마크, 최근 검색한 책을 필러링 가능하게 처리</b>

## ver 2.0

- 실시간 검색 기능
- 최근 검색한 책 localStorage 데이터 저장
- 북마크 책 localStorage 데이터 저장
- 반응형 대응 윈도우 사이즈 커스텀 훅 사용

- recoil의 selectorFamily를 통해 데이터를 캐싱  
  (기존) 메인화면이 마운트될 때마다 API 호출  
  (변경) 초기 앱 실행 시에만 API를 호출하고, 이후에는 캐싱된 데이터 사용

## ver 1.0

- 검색한 책 조회 (Axios, Kakao API)
- 선택한 책 상세 정보 전달(Router)
