import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import WishBookItemInfo from "./WishBookItemInfo";
import WishBookItemImg from "./WishBookItemImg";
import media from "styles/media";
import { useRecoilValue } from "recoil";
import { detailBookSelector } from "recoil/books";

export interface ResultProps {
  result: {
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: string;
    publisher: string;
    sale_price: string;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
  };
}
function WishBookItem({ result }: ResultProps): JSX.Element {
  const {
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
  } = result;

  const { upDateDetailClick } = useRecoilValue(detailBookSelector);

  return (
    <>
      <Wrapper key={result.isbn}>
        <SLink
          to={`${result.isbn}`}
          state={{
            result: result,
          }}
          onClick={() => upDateDetailClick(result.isbn)}
        >
          <WishBookItemImg title={title} thumbnail={thumbnail} page="main" />
          <WishBookItemInfo
            authors={authors}
            contents={contents}
            datetime={datetime}
            isbn={isbn}
            price={price}
            publisher={publisher}
            sale_price={sale_price}
            status={status}
            thumbnail={thumbnail}
            title={title}
            translators={translators}
            url={url}
            page="main"
          ></WishBookItemInfo>
        </SLink>
      </Wrapper>
    </>
  );
}

export default WishBookItem;

const Wrapper = styled.li`
  width: calc(20% - 15px);
  background-color: var(--inner-bg-color);
  border-radius: 10px;
  ${media.medium`
    width: calc(33% - 15px)
  `}
  ${media.small`
    width: calc(50% - 15px)
  `}
`;

const SLink = styled(Link)`
  position: relative;
  width: 100%;
`;
