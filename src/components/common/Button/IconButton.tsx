import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
interface IconTypes {
  fontSize: string;
  icon: IconDefinition;
  color?: string;
  $hide?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  tabIndex?: number;
}
function IconButton({
  icon,
  fontSize,
  color,
  $hide = false,
  onClick,
  title,
  tabIndex,
}: IconTypes): JSX.Element {
  return (
    <Wrapper
      type="button"
      fontSize={fontSize}
      $hide={$hide}
      onClick={onClick}
      title={title}
      tabIndex={tabIndex}
    >
      <FontAwesomeIcon
        icon={icon}
        fontSize={fontSize}
        color={color}
      ></FontAwesomeIcon>
    </Wrapper>
  );
}

export default IconButton;

const Wrapper = styled.button<{
  fontSize: string;
  $hide: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ fontSize }) =>
    fontSize === "20px" &&
    css`
      width: 40px;
      height: 40px;
    `}

  ${({ fontSize }) =>
    fontSize === "18px" &&
    css`
      width: 36px;
      height: 36px;
    `}

  ${({ $hide }) =>
    $hide &&
    css`
      visibility: hidden;
    `}

  ${({ tabIndex }) =>
    tabIndex === -1 &&
    css`
      cursor: default;
    `};
`;
