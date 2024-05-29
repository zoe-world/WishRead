import { selector, selectorFamily, useRecoilState } from "recoil";
import { bookmarkState, recentState } from "recoil/atoms/atoms";

export const recentSelector = selector({
  key: "",
  get: ({ get }) => {
    const recent = get(recentState);
  },
});

export const filteredBookmarkSelector = selectorFamily({
  key: "filteredBookmark",
  get:
    (param: []) =>
    ({ get }) => {
      // 로컬스토리지에 있는 북마크 책
      const list = [get(bookmarkState)];
      let newList = [...list];
      // console.log(list);
      // newList.push(param);
      // console.log(newList);
    },
});
