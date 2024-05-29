import React from "react";
import styled, { css } from "styled-components";

interface PropsType {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
  page: string;
}

export function WishBookItemInfo({
  authors,
  contents,
  datetime,
  isbn,
  price,
  publisher,
  sale_price,
  status,
  thumbnail,
  title,
  translators,
  url,
  page,
}: PropsType): JSX.Element {
  // 트러블슈팅 처리
  const salePriceComma = sale_price.toLocaleString();
  const priceComma = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let date = datetime.split("T")[0];

  return (
    <Wrapper $page={page}>
      <WishBookTag $status={status}>{status}</WishBookTag>
      <WishBookTitle>{title}</WishBookTitle>
      <WishBookInfo>
        <WishBookInfoList>{authors[0]}</WishBookInfoList>
        <WishBookInfoList>{publisher}</WishBookInfoList>
      </WishBookInfo>
      <WishBookInfo>
        <WishBookInfoList>
          <WishBookDate>
            {date.split("-")[0]}년 {date.split("-")[1]}월 {date.split("-")[2]}일
          </WishBookDate>
        </WishBookInfoList>
      </WishBookInfo>
      {page === "main" ? null : (
        <WishBookInfo>
          <WishBookInfoList>
            {sale_price.toString() !== "-1" ? (
              <BookSalePrice>{salePriceComma}원</BookSalePrice>
            ) : null}
            <BookPrice $sale_price={sale_price}>
              <span className="sr-only">정가</span>
              {priceComma}원
            </BookPrice>
          </WishBookInfoList>
        </WishBookInfo>
      )}
      {page === "main" ? null : (
        <WishBookInfo className="last">
          <WishBookInfoList>{contents}</WishBookInfoList>
        </WishBookInfo>
      )}
    </Wrapper>
  );
}

export default WishBookItemInfo;

const Wrapper = styled.div<{ $page: string }>`
  width: 100%;
  padding: ${({ $page }) =>
    $page === "detail" ? "3rem var(--pd-content) 2rem" : "2rem  0 0"};
`;
const WishBookInfo = styled.dl`
  display: flex;
  align-items: center;
  gap: 0 1.3rem;
  margin-bottom: 1rem;
  &.last {
    margin-top: 2.5rem;
    margin-bottom: 0;
  }
  line-height: 1.5;
  &:first-of-type > dd:not(:last-child):after {
    position: absolute;
    inset: 50% auto 0 auto;
    content: "";
    width: 2px;
    height: 2px;
    margin-left: 0.6rem;
    display: inline-block;
    background-color: #595959;
  }
`;
const WishBookInfoList = styled.dd`
  position: relative;
  color: #595959;
  font-size: var(--fs-sm);
`;
const WishBookTitle = styled.h2`
  padding: 0 0 0.5rem;
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 1.2;
`;
const WishBookTag = styled.span<{ $status: string }>`
  ${({ $status }) => getButtonBorder($status)};
  display: ${({ $status }) => ($status && "inline-block") || "inline"};
  border-radius: 5px;
  padding: ${({ $status }) => ($status && "5px") || "0px"};
  margin-bottom: 0.7rem;
  font-size: var(--fs-xs);
`;
const BookSalePrice = styled.span`
  padding-right: 0.5rem;
  font-weight: bold;
  font-size: var(--fs-sm);
`;
const BookPrice = styled.span<{ $sale_price: number }>`
  font-size: var(--fs-sm);
  text-decoration: ${({ $sale_price }) =>
    $sale_price !== -1 ? "line-through" : null};
`;
const WishBookDate = styled.span`
  font-size: var(--fs-xs);
`;

// 상태값에 따른 버튼 스타일링
const getButtonBorder = ($status: string) => {
  let border;
  let color;
  switch ($status) {
    case "정상판매":
      border = "0.15rem solid var(--sym-color)";
      color = "var(--sym-color)";
      break;
    case "예약판매":
      border = "0.15rem solid red";
      color = "red";
      break;
    case "주문판매":
      border = "0.15rem solid green";
      color = "green";
      break;
    case "":
      border = "none";
      color = "none";
      break;
    default:
      border = "0.15rem solid var(--sym-color)";
      color = "var(--sym-color)";
      break;
  }
  return css`
    border: ${border};
    color: ${color};
  `;
};
