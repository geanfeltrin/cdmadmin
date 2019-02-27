import { createGlobalStyle } from "styled-components";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "react-circular-progressbar/dist/styles.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
    outline:0,
    
}
html,body, #root{
    height:100%;
}

body{
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #F3F5F6 !important;
    font-family: "Lato" !important, sans-serif;
}
small{
    text-decoration: none !important;
}
ul{
    list-style-type:none !important;
    list-style: none !important;
}
`;
export default GlobalStyle;
