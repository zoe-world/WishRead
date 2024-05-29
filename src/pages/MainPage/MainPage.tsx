import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import WishBookItem from "components/Book/WishBookItem";
import SearchBar from "components/Main/SearchBar";
import IconButton from "components/common/Button/IconButton";
import { BookDTO } from "components/types/searchType";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { recentState, searchInfoState } from "recoil/atoms/atoms";
import { bookData } from "recoil/selectors/api";
import styled from "styled-components";
import FootPage from "./FootPage";

function MainPage(): JSX.Element {
  // 검색어 초기값 설정
  const item = ["이병률", "조예은", "정세랑", "김영하"];
  const randomKeyword = (min: number, max: number) => {
    return Math.trunc(Math.random() * (max - min + 1));
  };

  const random = useMemo(() => randomKeyword(1, item.length), []);
  const [search, setSearch] = useRecoilState(searchInfoState);
  const searchKeword = (search: any) => {
    if (!search) {
      return item[random];
    } else {
      return search;
    }
    return true;
  };
  // 페이지 이동
  const navigate = useNavigate();
  const goToWishBookPage = () => navigate("/wishbook");

  const bookSelector = useRecoilValue(bookData(searchKeword(search)));

  const [data, setData] = useState<BookDTO[]>();
  const [recent, setRecent] = useRecoilState(recentState);

  const getData = () => {
    if (recent || recent !== null) setData(recent);
    else setData([]);
  };

  useEffect(() => {
    getData();
  }, []);

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
            {data !== undefined ? (
              data.map((result: any) => {
                let bookCode = result.isbn.split(" ").join("");
                return <WishBookItem result={result} key={bookCode} />;
              })
            ) : (
              <p>최근 검색한 책이 없습니다.</p>
            )}
          </WishBookList>
        </>
      ) : (
        ``
      )}

      {!search ? <Title>추천책</Title> : <Title>검색결과</Title>}
      <WishBookList>
        {bookSelector.map((result: any) => {
          return <WishBookItem result={result} key={result.isbn} />;
        })}
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