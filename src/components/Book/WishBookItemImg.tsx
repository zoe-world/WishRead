import React from "react";
import styled, { css } from "styled-components";

type thumbProps = {
  title: string;
  thumbnail?: string;
  page: string;
};
function WishBookItemImg({ title, thumbnail, page }: thumbProps): JSX.Element {
  return (
    <ImgWrap $page={page}>
      <img
        src={thumbnail ? thumbnail : require("assets/images/noimage.png")}
        alt={`${title} 책커버`}
      ></img>
    </ImgWrap>
  );
}

export default WishBookItemImg;

const ImgWrap = styled.div<{ $page: string }>`
  ${({ $page }) =>
    $page === "main"
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: auto 3/4;
          border: 1px solid #ededed;
        `
      : css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0;
        `};
  text-align: center;
  & > img {
    display: inline-block;
    width: ${({ $page }) => ($page === "main" ? "80%" : "auto")};
    aspect-ratio: auto 135 / 190;
  }
`;
