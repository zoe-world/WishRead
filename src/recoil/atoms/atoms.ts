import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 검색어
export const searchInfoState = atom({
  key: "searchInfoState",
  default: "",
});

// 최근 자세한 검색
export const recentState = atom({
  key: "recentState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 북마크한 책
export const bookmarkState = atom({
  key: "bookmark",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const watchState = atom({
  key: "watchState",
  default: false,
});
