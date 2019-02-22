import { css } from "styled-components";

const sizes = {
  desktop: 2560,
  tablet: 768,
  phone: 576,
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  laptop: 1024,
  laptopL: 1440
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
