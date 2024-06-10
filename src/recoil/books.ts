import axios, { AxiosError, AxiosResponse } from "axios";
import { BookDTO } from "components/types/searchType";
import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// kakao API 호출
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

// 입력한 검색어
export const searchInfoState = atom({
  key: "searchInfoState",
  default: "",
});

// 하나의 책이 가진 고유의 값(isMarked와 isWatched 값 관리) atom 으로 전역적으로 상태관리
export const bookDetailState = atom({
  key: "bookDetailState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 검색창 or 추천책을 가지고 검색 api 호출
export const searchApiSelector = selectorFamily({
  key: "searchApiSelector",
  get: (search) => async () => {
    // 검색할 내용이 없는 경우 빈 배열 반환
    if (!search) return [];

    try {
      const res = await axios({
        method: "get",
        baseURL: "https://dapi.kakao.com/v3/search/book",
        headers: {
          Authorization: "KakaoAK " + KAKAO_API_KEY,
        },
        params: {
          query: search,
          size: 50,
          target: ["title", "person"],
        },
      });
      return res.data.documents;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          console.log(error);
        }
      }
    }
  },
});
// 최근 본 책의 isbn을 가지고 검색 api 호출
export const detailApiSelector = selectorFamily({
  key: "detailApiSelector",
  get: (isbns: []) => async () => {
    // 검색할 isbns이 없는 경우
    if (isbns.length === 0) return [];

    const bookDetails = await Promise.all(
      isbns.map(async (isbn) => {
        try {
          const res = await axios({
            method: "get",
            baseURL: "https://dapi.kakao.com/v3/search/book",
            headers: {
              Authorization: "KakaoAK " + KAKAO_API_KEY,
            },
            params: {
              query: isbn,
              target: "isbn",
            },
          });
          return res.data.documents[0];
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
              console.log(error);
            }
          }
        }
      })
    );

    // 검색 결과값 중 undefined 가 있을 경우 아무것도 안 뜨면 안되니까, 필터링 후 결과 리턴
    return bookDetails.filter(Boolean);
  },
});

export const detailBookSelector = selector({
  key: "detailBookSelector",
  get: ({ getCallback }) => {
    // 북마크 버튼 클릭시 일어나는 함수
    const upDateBookmarkClick = getCallback(
      ({ set, snapshot }) =>
        async (bookCode) => {
          const details = await snapshot.getPromise(bookDetailState);
          set(
            bookDetailState,
            details.map((detail: any) => {
              const detailKey = Object.keys(detail)[0];
              if (detailKey === bookCode) {
                // bookDetailState에 등록된 책이라면?
                // 각각의 책이 지닌 isMarked, isWatched 의 값을 업데이트
                const updatedDetail = { ...detail[detailKey] };
                console.log(detailKey, updatedDetail);
                updatedDetail.isMarked = !updatedDetail.isMarked;
                return {
                  [detailKey]: updatedDetail,
                };
              }
              return detail;
            })
          );
        }
    );
    // 책 상세보기 누르면 시작되는 함수
    const upDateDetailClick = getCallback(
      ({ set, snapshot }) =>
        async (bookCode) => {
          const details = await snapshot.getPromise(bookDetailState);
          //중복확인
          const isDuplicated = details.some(
            (v: BookDTO) => Object.keys(v)[0] === bookCode
          );

          if (isDuplicated) {
            return false;
          } else {
            // 새로운 책 추가
            const newBook = {
              [String(bookCode)]: {
                isMarked: false,
                isWatched: true,
              },
            };
            const updatedDetails = [...details, newBook]; // 새로운 책 추가
            set(bookDetailState, updatedDetails);
          }
        }
    );
    return { upDateDetailClick, upDateBookmarkClick };
  },
});
