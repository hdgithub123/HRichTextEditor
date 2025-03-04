const customCss = `
.pagedjs_bleed pagedjs_bleed-right{
        '--pagedjs-pagebox-width': 120mm; 
        --pagedjs-pagebox-height: 150mm;

}
.pagedjs_margin-top-left-corner-holder::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%; /* Khớp với chiều rộng phần tử chính */
        height: 100%; /* Khớp với chiều cao phần tử chính */
        display: flex;
        justify-content: center;
        align-items: center;
        content: "Trang5 " counter(page) " / " counter(pages);
        text-align: center;
        font-size: 24px;
        color: black;
        z-index: 1000000;
}
`
export default customCss


const myCss = {

}