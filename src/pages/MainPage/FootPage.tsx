import React from "react";
import styled from "styled-components";

interface Props {
  page: string;
}
function FootPage(props: Props): JSX.Element {
  const { page } = props;
  return <Footer $page={page}>© Kakao Corp. All rights reserved.</Footer>;
}

export default FootPage;
const Footer = styled.footer<{ $page: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9999;
  font-size: 1.4rem;
  padding: 2rem;
  margin-top: ${({ $page }) => $page === "detail" && "auto"};
`;
