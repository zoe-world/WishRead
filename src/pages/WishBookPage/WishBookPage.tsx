import { Title } from "pages/MainPage/MainPage";
import React, { Fragment, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookDetailState } from "recoil/books";
import styled from "styled-components";
import bgg from "../../assets/images/wood.jpg";
import { BookDTO } from "components/types/searchType";
import { Link, Navigate, useNavigate } from "react-router-dom";
import IconButton from "components/common/Button/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import media from "styles/media";
import { useWindowResize } from "utils";

function WishBookPage(): JSX.Element {
  const detail = useRecoilValue(bookDetailState);

  const division = (arr: [], n: number) => {
    let bookList = [...arr];
    const length = bookList.length;
    const row = Math.ceil(length / n);
    const newList = [];
    for (let i = 0; i < row; i++) {
      newList.push(bookList.splice(0, n));
    }
    return newList;
  };
  const isActive = (item: BookDTO): boolean => {
    const active = detail.map((item: BookDTO) => item.isbn).includes(item.isbn);
    return active;
  };

  const result = division(detail, 5);
  const mdResult = division(detail, 3);
  const smResult = division(detail, 1);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goDetail = (item: BookDTO) => {
    let bookCode = item.isbn.split(" ").join("");
    navigate(`/${bookCode}`, { state: { result: item } });
  };
  // window 사이즈 감시
  const [width, height] = useWindowResize();
  return (
    <div>
      <TopWrap>
        <IconButton
          icon={faChevronLeft}
          fontSize="20px"
          color="#0047AB"
          onClick={goBack}
        />
        <Title>My WishBook Shelf</Title>
      </TopWrap>
      <BookshelfBox>
        {detail.length > 0 && (
          <BookshelfBack>
            <div className="box__top"></div>
          </BookshelfBack>
        )}
        <BookshelfFront>
          {detail.length > 0 ? (
            width > 767 ? (
              result.map((wishBook: BookDTO[], idx: number) => (
                <BookRow key={idx}>
                  {[
                    ...wishBook,
                    ...(wishBook.length < 5
                      ? Array(5 - wishBook.length).fill({})
                      : []),
                  ].map((item: BookDTO, index: number) => {
                    const active = isActive(item);
                    return (
                      <BookBox key={index}>
                        {item.isbn ? (
                          <>
                            <div className="card__back"></div>
                            <div className="card__left"></div>
                            <div className="card__right"></div>
                            <div className="card__top"></div>
                            <div className="card__bottom"></div>
                            <BookLink
                              key={index}
                              $active={active}
                              onClick={() => (active ? goDetail(item) : null)}
                            >
                              <img
                                src={item["thumbnail"]}
                                alt={item["title"]}
                              />
                            </BookLink>
                          </>
                        ) : (
                          <>
                            <div className="card__back"></div>
                            <div className="card__left"></div>
                            <div className="card__right"></div>
                            <div className="card__top"></div>
                            <div className="card__bottom"></div>
                          </>
                        )}
                      </BookBox>
                    );
                  })}
                </BookRow>
              ))
            ) : width < 468 ? (
              smResult.map((wishBook: BookDTO[], idx: number) => (
                <BookRow key={idx}>
                  {wishBook.map((item: BookDTO, index: number) => {
                    const active = isActive(item);
                    return (
                      <BookBox key={index}>
                        {item.isbn ? (
                          <>
                            <div className="card__back"></div>
                            <div className="card__left"></div>
                            <div className="card__right"></div>
                            <div className="card__top"></div>
                            <div className="card__bottom"></div>
                            <BookLink
                              key={index}
                              $active={active}
                              onClick={() => (active ? goDetail(item) : null)}
                            >
                              <img
                                src={item["thumbnail"]}
                                alt={item["title"]}
                              />
                            </BookLink>
                          </>
                        ) : (
                          <>
                            <div className="card__back"></div>
                            <div className="card__left"></div>
                            <div className="card__right"></div>
                            <div className="card__top"></div>
                            <div className="card__bottom"></div>
                          </>
                        )}
                      </BookBox>
                    );
                  })}
                </BookRow>
              ))
            ) : (
              mdResult.map((wishBook: BookDTO[], idx: number) => (
                <BookRow key={idx}>
                  {[
                    ...wishBook,
                    ...(wishBook.length < 3
                      ? Array(3 - wishBook.length).fill({})
                      : []),
                  ].map((item: BookDTO, index: number) => {
                    const active = isActive(item);
                    return (
                      <BookBox key={index}>
                        {item.isbn ? (
                          <>
                            <div className="card__back"></div>
                            <div className="card__left"></div>
                            <div className="card__right"></div>
                            <div className="card__top"></div>
                            <div className="card__bottom"></div>
                            <BookLink
                              key={index}
                              $active={active}
                              onClick={() => (active ? goDetail(item) : null)}
                            >
                              <img
                                src={item["thumbnail"]}
                                alt={item["title"]}
                              />
                            </BookLink>
                          </>
                        ) : (
                          <>
                            <div className="card__back"></div>
                            <div className="card__left"></div>
                            <div className="card__right"></div>
                            <div className="card__top"></div>
                            <div className="card__bottom"></div>
                          </>
                        )}
                      </BookBox>
                    );
                  })}
                </BookRow>
              ))
            )
          ) : (
            <BookRow>북마크한 책이 없습니다.</BookRow>
          )}
        </BookshelfFront>
      </BookshelfBox>
    </div>
  );
}

export default WishBookPage;
const TopWrap = styled.div`
  display: flex;
  padding: 3rem 0 2rem;
  align-items: center;
  justify-content: center;
  & button {
    position: absolute;
    left: 3rem;
  }
  & h2 {
    padding: 0;
  }
`;
// 책장 전체박스
const BookshelfBox = styled.div`
  position: relative;
  width: 700px;
  margin: 0 auto;
  padding: 5rem 0;
  ${media.medium`
    width:100%
  `}
`;
// 책장 뒷면
const BookshelfBack = styled.div`
  position: absolute;
  top: 50px;
  ${media.medium`
  position: static;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
  & > [class*="__top"] {
    position: absolute;
    top: -10px;
    left: -16px;
    width: 740px;
    height: 10px;
    background: url("${bgg}") no-repeat center;
    border: 2.5px solid rgba(0, 0, 0, 0.4);
    filter: brightness(0.5);
    clip-path: polygon(5% 0%, 94% 0%, 99.1% 100%, 0% 100%);
    ${media.medium`
    position:static;
      width: 450px
    `}
    ${media.small`
      width:150px;
    `}
  }
`;
// 책장 앞쪽
const BookshelfFront = styled.div``;
const BookRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
  perspective-origin: top;
`;
const BookBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  position: relative;
  transform-style: preserve-3d;
  &:last-of-type img {
    box-shadow: 3px 0px 10px #666;
  }

  & > [class*="card__"] {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: url("${bgg}") no-repeat center;
    border: 2.5px solid rgba(0, 0, 0, 0.4);
  }
  & > [class*="__front"] {
    transform: translateZ(70px);
  }
  & > [class*="__back"] {
    transform: rotateY(180deg) translateZ(70px);
    filter: brightness(0.65);
  }
  & > [class*="__left"] {
    transform: rotateY(-90deg) translateZ(70px);
  }
  & > [class*="__right"] {
    transform: rotateY(90deg) translateZ(70px);
  }
  & > [class*="__top"] {
    transform: rotateX(90deg) translateZ(70px);
  }
  & > [class*="__bottom"] {
    transform: rotateX(-90deg) translateZ(70px);
  }
`;
const BookLink = styled.a<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  transform-style: preserve-3d;
  margin-left: 15px;
  width: 100px;
  height: 120px;
  cursor: ${({ $active }) => ($active ? "pointer" : "initial")};
  transition: 1s ease;
  transform: rotateY(-30deg);
  animation: 1s ease 0s 1 hover;
  @keyframes hover {
    0% {
      transform: rotateY(0);
    }
    100% {
      transform: rotateY(-30deg);
    }
  }
  &:hover {
    transform: rotateY(0deg);
  }
  & > img {
    width: 90px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateZ(15px);
    box-shadow: 4px 4px 20px #666;
  }
  &:before {
    position: absolute;
    display: inline-block;
    transform: translateX(34px) rotateY(90deg);
    content: "";
    width: 20px;
    height: 100%;
    background: linear-gradient(
      90deg,
      #fff 0%,
      #c6c6c6 5%,
      #fff 10%,
      #c6c6c6 15%,
      #fff 20%,
      #c6c6c6 25%,
      #fff 30%,
      #c6c6c6 35%,
      #fff 40%,
      #c6c6c6 45%,
      #fff 50%,
      #c6c6c6 55%,
      #fff 60%,
      #c6c6c6 65%,
      #fff 70%,
      #c6c6c6 75%,
      #fff 80%,
      #c6c6c6 85%,
      #fff 90%,
      #c6c6c6 80%,
      #fff 100%
    );
    z-index: -1;
  }
  &:after {
    position: absolute;
    content: "";
  }
`;
