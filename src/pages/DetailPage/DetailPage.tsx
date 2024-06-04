import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import WishBookItemImg from "components/Book/WishBookItemImg";
import WishBookItemInfo from "components/Book/WishBookItemInfo";
import IconButton from "components/common/Button/IconButton";
import { BookDTO } from "components/types/searchType";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookDetailState, detailBookSelector } from "recoil/books";
import styled from "styled-components";
import FootPage from "pages/MainPage/FootPage";

function DetailPage(): JSX.Element {
  const location = useLocation();

  // 선택된 책 정보
  const result = location.state?.result;
  let barcode = location.state?.result.isbn;
  barcode = barcode.split(" ").join("");

  // 상세보기 변경
  const [detail, setDetail] = useRecoilState(bookDetailState);
  const detailBook = useRecoilValue(detailBookSelector(barcode));

  const onBookmarkToggle = (bookCode: string) => {
    setDetail((prevBooks: any) => {
      return prevBooks.map((b: any) => {
        return b.isbn.split(" ").join("") === bookCode
          ? { ...b, isMarked: !b.isMarked }
          : b;
      });
    });
  };

  useEffect(() => {
    if (detailBook !== undefined) {
      // 중복확인
      const isDuplicate = detail.some(
        (item: BookDTO) => item.isbn === detailBook.isbn
      );
      if (!isDuplicate) {
        setDetail((prev: any) => [...prev, detailBook]);
      }
    } else {
    }
    console.log(detailBook);
  }, [detailBook]);

  // 뒤로가기
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // 나의 위시북
  const isWishBook = detail?.some(
    (v: BookDTO) => v.isbn.split(" ").join("") === barcode && v.isMarked
  );

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
          onClick={() => onBookmarkToggle(barcode)}
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
