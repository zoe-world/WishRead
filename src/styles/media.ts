import {
  css,
  type CSSObject,
  type SimpleInterpolation,
} from "styled-components";

export type Breakpoints = "small" | "medium" | "large";

export const breakpoints: Record<Breakpoints, string> = {
  small: "@media (max-width: 468px)",
  medium: "@media (max-width: 767px)",
  large: "@media (min-width: 1048px)",
};

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<Breakpoints, any>;

export default media;
