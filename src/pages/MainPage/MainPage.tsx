import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "components/Main/SearchBar";
import IconButton from "components/common/Button/IconButton";
import { BookDTO, DetailDTO } from "components/types/searchType";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import {
  searchApiSelector,
  searchInfoState,
  bookDetailState,
  detailApiSelector,
} from "recoil/books";
import styled from "styled-components";
import FootPage from "./FootPage";
import WishBookItem from "components/Book/WishBookItem";

function MainPage(): JSX.Element {
  // 추천검색어 배열
  const item = ["이병률", "조예은", "정세랑", "김영하"];
  const randomKeyword = (min: number, max: number) => {
    return Math.trunc(Math.random() * (max - min + 1));
  };
  const random = useMemo(() => randomKeyword(1, item.length), []);
  const search = useRecoilValue(searchInfoState);

  /**
   * 겁색어가 있으면 검색어로 검색어 만약 없다면?
   * 검색어 대신 추천검색어를 랜덤으로 검색하는 함수
   * @param search atom 전역상태관리
   * @returns item[random] or search
   */
  const searchKeword = (search: string | []) => {
    if (!search) {
      return item[random];
    } else {
      return search;
    }
  };

  // 페이지 이동
  const navigate = useNavigate();
  const goToWishBookPage = () => navigate("/wishbook");

  // 검색한 결과값
  const bookSelector = useRecoilValue(searchApiSelector(searchKeword(search)));

  // 각 책이 가진 isMarked, isWatched 값
  const detail = useRecoilValue(bookDetailState);
  console.log(bookSelector, detail);
  // 최근 검색한 책
  const watchedBooks = detail
    .filter(
      (watchedBook: any) => watchedBook[Object.keys(watchedBook)[0]].isWatched
    )
    .map((watchedBook: DetailDTO) => Object.keys(watchedBook)[0]);

  // 최근에 검색한 책의 isbn 중 앞 숫자만 배열에 담기
  const watchedIsbn = watchedBooks.map(
    (watchedIsbn: any) => watchedIsbn.trim().split(" ")[0]
  );

  // 배열에 담긴 isbn 을 다시 재검색
  const bookDetailSelector = useRecoilValue(detailApiSelector(watchedIsbn));

  return (
    <>
      <Header>
        <Nav>
          <IconButton
            fontSize="20px"
            icon={faBookmark}
            title="위시리스트"
            onClick={goToWishBookPage}
            color={"#0047ab"}
          />
        </Nav>
        <Logo>
          <Link to="/">
            <LogoImg
              src={require("assets/images/logo.png")}
              alt="WISHREAD 로고"
            />
          </Link>
        </Logo>
        <SearchBar />
      </Header>
      {!search ? (
        <>
          <Title>최근 검색한 책</Title>
          <WishBookList>
            {detail.length !== 0 ? (
              bookDetailSelector.map((watchedBook: any) => (
                <WishBookItem result={watchedBook} key={watchedBook.isbn} />
              ))
            ) : (
              <>검색한 책이 없습니다.</>
            )}
          </WishBookList>
        </>
      ) : (
        ``
      )}

      {!search ? <Title>추천책</Title> : <Title>검색결과</Title>}
      <WishBookList>
        {bookSelector.map((result: BookDTO) => (
          <WishBookItem result={result} key={result.isbn} />
        ))}
      </WishBookList>
      <FootPage page="main" />
    </>
  );
}
export default MainPage;

const Header = styled.header`
  position: sticky;
  z-index: 9999;
  top: 0;
  padding: 10px var(--pd-content);
  background-color: var(--inner-bg-color);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Logo = styled.h1`
  display: flex;
  width: 200px;
  height: auto;
`;
const LogoImg = styled.img`
  display: block;
  width: 100%;
`;
const WishBookList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  row-gap: 15px;
  padding: 30px;
`;

export const Title = styled.h2`
  padding: 2rem var(--pd-content) 0;
  font-size: 2rem;
`;
