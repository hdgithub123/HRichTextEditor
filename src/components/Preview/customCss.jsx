const customCss = `
@media print{

    @page {
    size:A5;
      // size: 148mm 210mm;
      //size: 210mm 297mm ;
    }



     .pagedjs_page {
        width:148mm !important;
        height: 210mm !important;
        margin: 0mm !important;
        margin-top: 40mm !important;
        margin-left: 40mm !important;
        padding: 0;
        border: 1px solid black;
    }




    // .pagedjs_page {
    //     width:215.9mm !important;
    //     height: 279.4mm !important;
    //     margin: 0mm !important;
    //     margin-top: 40mm !important;
    //     margin-left: 40mm !important;
    //     padding: 0;
    //     border: 1px solid black;
    // }


//     .pagedjs_first_page{
//         width:210mm !important;
//         height: 297mm !important;
//         margin: 0 !important;
//     }  
//     .pagedjs_right_page{
//         width:210mm !important;
//         height: 297mm !important;
//         margin: 0 !important;
//     }



        .pagedjs_area{
        background: 'red';
        
        }
    

        /* 📌 Header chạy xuyên suốt */
        header {
        position: fixed;
        top:0;
        left:0;
        width: 220mm;
        text-align: center;
        height: 50mm;
        z-index: 2;

        }


        /* 📌 Footer chạy xuyên suốt */
        footer {
        position: fixed;
        bottom:0;
        left:0;
        width:220mm;
        text-align: center;
        height: 30mm;
        z-index: 2;

        }




}


.pagedjs_margin-top-left-corner-holder {
  position: relative;
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