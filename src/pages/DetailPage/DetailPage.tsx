import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import WishBookItemImg from "components/Book/WishBookItemImg";
import WishBookItemInfo from "components/Book/WishBookItemInfo";
import IconButton from "components/common/Button/IconButton";
import { BookDTO } from "components/types/searchType";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookmarkState, recentState } from "recoil/atoms/atoms";
import { filteredBookmarkSelector } from "recoil/selectors/selectors";
import styled from "styled-components";
import FootPage from "pages/MainPage/FootPage";

function DetailPage(): JSX.Element {
  const location = useLocation();
  // 선택된 책 정보
  const result = location.state.result;
  const barcode = location.state.result.isbn;
  // 선택됐는지 확인 여부
  const watch = location.state.watch;
  console.log(result);
  // 최근 검색기록
  const [recent, setRecent] = useRecoilState(recentState);
  const [bookmarkList, setBookmarkList] = useRecoilState(bookmarkState);
  const filteredBookmark = useRecoilValue(filteredBookmarkSelector(result));

  // 1.먼저 선택됐는지 안됐는지 상태값과
  //  선택된 첵 isbn 값을 가지고 새로운 배열에 추가
  // 만약 선택된 책 isbn 값이 배열에 있으면 빼고, 없으면 추가
  //
  useEffect(() => {
    if (watch) {
      if (recent.findIndex((item: BookDTO) => item.isbn === barcode) === -1) {
        const newRecent: string[] = [...recent];
        newRecent.push(result);
        setRecent(newRecent);
      }
    }
  }, [recent]);

  // 뒤로가기
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // 나의 위시북

  const isWishBook = bookmarkList.find(({ isbn }: BookDTO) =>
    isbn.includes(String(barcode))
  );
  const toggleBookmark = () => {
    let wishBookList = [...bookmarkList];

    if (!isWishBook) {
      wishBookList.push(result);
      setBookmarkList(wishBookList);
    } else {
      wishBookList = wishBookList.filter(({ isbn }) => isbn !== barcode);
      setBookmarkList(wishBookList);
    }
  };

  return (
    <Wrapper>
      <IconWrap>
        <IconButton
          icon={faChevronLeft}
          fontSize="20px"
          color="#0047AB"
          onClick={goBack}
        />
        <IconButton
          icon={isWishBook ? fasBookmark : farBookmark}
          fontSize="20px"
          color="#0047AB"
          onClick={toggleBookmark}
        ></IconButton>
      </IconWrap>
      <WishBookItemImg
        title={result.title}
        thumbnail={result.thumbnail}
        page="detail"
      ></WishBookItemImg>
      <WishBookItemInfo
        authors={result.authors}
        contents={result.contents}
        datetime={result.datetime}
        isbn={result.isbn}
        price={result.price}
        publisher={result.publisher}
        sale_price={result.sale_price}
        status={result.status}
        thumbnail={result.thumbnail}
        title={result.title}
        translators={result.translators}
        url={result.url}
        page="detail"
      ></WishBookItemInfo>
      <FootPage page="detail" />
    </Wrapper>
  );
}

export default DetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--pd-content);
`;
