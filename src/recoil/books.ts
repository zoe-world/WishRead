import axios, { AxiosError } from "axios";
import { BookDTO } from "components/types/searchType";
import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// kakao API 호출
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

// 검색한 결과값
export const bookDataState = atom<BookDTO[]>({
  key: "bookDataState",
  default: [],
});

// 입력한 검색어
export const searchInfoState = atom({
  key: "searchInfoState",
  default: "",
});

// 상세보기 책
export const bookDetailState = atom({
  key: "bookDetailState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 검색 api 호출
export const bookDataSelectorFamily = selectorFamily({
  key: "bookDataSelectorFamily",
  get:
    (search) =>
    async ({ get }) => {
      // API 호출
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

//검색을 하고 눌르면 watch 추가
// 그럼 추가된 아이템을 detail 담아두고 나중에 또 검색했을 때, watch 가 있으면? 그냥 냅두기
// 없으면? detail 에 추가

// 검색한 책 중 눌러본 책 필터링 후 watch 속성 추가
export const detailBookSelector = selectorFamily({
  key: "detailBookSelector",
  get:
    (barcode) =>
    ({ get }) => {
      const bookState = get(bookDataState);
      const findItem = bookState.find(
        (item: any) =>
          item.isbn.split(" ").join("") === barcode && item.watch === true
      );
      return findItem;
    },
  set:
    (barcode) =>
    ({ set, get }, newValue) => {
      const bookState = get(bookDataState);
      const updatedData = bookState.map((item: any) => {
        
        if (item === newValue) {
          return { ...item, watch: !item.watch, isMarked: !item.isMarked };
        }
        return { ...item, watch: false, isMarked: false };
      });
      set(bookDataState, updatedData);
    },
});
