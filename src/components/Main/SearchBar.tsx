import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosError } from "axios";
import IconButton from "components/common/Button/IconButton";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchInfoState } from "recoil/books";
import styled from "styled-components";

function SearchBar(): JSX.Element {
  const wishbookSearchInputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useRecoilState(searchInfoState);
  const [text, setText] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setText(event.target.value);
  };
  const onSearch = () => {
    if (text === "") {
      // input 태그 안에 빈 값으로 검색했을 떼? searching default value
      setSearch("");
    } else {
      setSearch(text);
    }
  };
  // 입력된 검색어 삭제
  const onDelete = () => {
    setText("");
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (text === "") {
        // input 태그 안에 빈 값으로 검색했을 떼? searching default value
        // default 값으로 가지고 있어야하는 값이 필요함
        setSearch("");
      } else {
        setSearch(text);
      }
    }
  };

  // 검색 후 화면에 뿌리기
  return (
    <>
      <SearchForm>
        <IconButton
          fontSize="18px"
          icon={faMagnifyingGlass}
          onClick={onSearch}
        ></IconButton>
        <WishbookSearchInput
          type="text"
          placeholder="책 이름 혹은 작가 이름을 검색하세요"
          ref={wishbookSearchInputRef}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          value={text}
        />

        <IconButton
          fontSize="18px"
          icon={faXmark}
          onClick={onDelete}
          $hide={text === "" ? true : false}
        ></IconButton>
      </SearchForm>
    </>
  );
}

export default SearchBar;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  padding: 10px;
  background-color: var(--input-bg-color);
  border-radius: 10px;
`;
const WishbookSearchInput = styled.input`
  width: 100%;
  background-color: var(--input-bg-color);
  font-size: var(--fs-md);
`;
