import { selector, selectorFamily } from "recoil";
import axios, { AxiosError } from "axios";
import { searchInfoState } from "recoil/atoms/atoms";

// kakao API 호출
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

export const bookData = selectorFamily({
  key: "bookData",
  get:
    (search) =>
    async ({ get }) => {
      const searchValue = get(searchInfoState);

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
