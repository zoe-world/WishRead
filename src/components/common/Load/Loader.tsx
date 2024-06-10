import { BookDTO } from "components/types/searchType";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { searchApiSelector, searchInfoState } from "recoil/books";
import styled from "styled-components";
function Loader(): JSX.Element {
  const item = ["이병률", "조예은", "정세랑", "김영하"];
  const randomKeyword = (min: number, max: number) => {
    return Math.trunc(Math.random() * (max - min + 1));
  };
  const random = useMemo(() => randomKeyword(1, item.length), []);
  const search = useRecoilValue(searchInfoState);
  const bookSelector = useRecoilValueLoadable<any>(
    searchApiSelector(item[random])
  );
  const [quiz, setQuiz] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await bookSelector.contents;
        setQuiz(result[random]);
      } catch (error) {
        console.error("퀴즈를 가져오는 데 실패했습니다:", error);
      }
    };

    getData();
  }, [bookSelector, setQuiz]);

  return (
    <Wrapper>
      <Text>나는 어떤 책을 읽고 싶을까?</Text>
      <Box>
        <BookList>
          <li>
            <img src={quiz["thumbnail"]} alt="" />
          </li>
          <li>
            {quiz["authors"]} <small>{quiz["title"]}</small>
          </li>
        </BookList>
      </Box>
      <Spinner></Spinner>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Text = styled.h2`
  font-family: "HANAMDAUM";
  font-size: var(--fs-1xl);
`;
const Box = styled.div`
  display: block;
  margin-bottom: 2rem;
`;
const BookList = styled.ul`
  & {
    font-family: "HANAMDAUM";
    text-align: center;
  }
  & li {
    margin-top: 10px;
  }
  & > :first-of-type {
    margin-top: 20px;
  }
  & small {
    font-size: 1.3rem;
  }
`;
const Spinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #0047ab;
  border-radius: 50%;
  display: block;
  box-sizing: border-box;

  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const QuotesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const QuoteItem = styled.li`
  margin-bottom: 20px;
  p {
    margin: 0;
  }
`;

const ErrorText = styled.p`
  color: red;
`;
