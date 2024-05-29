import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./fonts.css";
import "./global.css";
const GlobalStyles = createGlobalStyle`
${reset}
    *{
        box-sizing: border-box;
    }
    html{
        font-size: 62.5%;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    body{
        background-color: var(--outer-bg-color);
        font-family: "Pretendard";
        font-size: 1.6rem;
        letter-spacing: -.5px;
    }
    ol, ul{
        list-style: none;
    }
    b {
        font-weight: bold;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    button {
        border: none;
        background: transparent;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        line-height: inherit;
    }
    input {
        border: none;
        border-color: transparent;
    }
`;

export default GlobalStyles;
