const defaultCssVariables2 = {
    '--pagedjs-width': '210mm',
    '--pagedjs-height': '297mm',
    '--pagedjs-width-right': '210mm',
    '--pagedjs-height-right': '297mm',
    '--pagedjs-width-left': '210mm',
    '--pagedjs-height-left': '297mm',

    '--pagedjs-pagebox-width': '190mm',
    '--pagedjs-pagebox-height': '237mm',// lây chiều cao của tổng - chiều cao header và footer 
    '--pagedjs-footnotes-height': '0',
    '--pagedjs-margin-top': '30mm', // chiều cao header
    '--pagedjs-margin-right': '20mm',
    '--pagedjs-margin-bottom': '20mm',// chiều cao footer
    '--pagedjs-margin-left': '30mm',

    '--pagedjs-padding-top': '5mm',
    '--pagedjs-padding-right': '0mm',
    '--pagedjs-padding-bottom': '50mm',
    '--pagedjs-padding-left': '0mm',

    '--pagedjs-border-top': '0',
    '--pagedjs-border-right': '0',
    '--pagedjs-border-bottom': '0',
    '--pagedjs-border-left': '0',

    '--pagedjs-bleed-top': '0',
    '--pagedjs-bleed-right': '0',
    '--pagedjs-bleed-bottom': '0',
    '--pagedjs-bleed-left': '0',

    '--pagedjs-bleed-right-top': '0',
    '--pagedjs-bleed-right-right': '0',
    '--pagedjs-bleed-right-bottom': '0',
    '--pagedjs-bleed-right-left': '0',

    '--pagedjs-crop-color': 'black',
    '--pagedjs-crop-shadow': 'white',
    '--pagedjs-crop-offset': '2mm',
    '--pagedjs-crop-stroke': '1px',
    '--pagedjs-cross-size': '5mm',

    '--pagedjs-mark-cross-display': 'none',
    '--pagedjs-mark-crop-display': 'none',
    '--pagedjs-page-count': 'auto',
    '--pagedjs-page-counter-increment': '1',
    '--pagedjs-footnotes-count': '0',

    '--pagedjs-column-gap-offset': '100px',
};

const defaultCssVariables = {
    '--pagedjs-width': '210mm', // width tong
    '--pagedjs-height': '297mm',// height tong
    '--pagedjs-width-right': '210mm',// width tong
    '--pagedjs-height-right': '297mm',// height tong
    '--pagedjs-width-left': '210mm',// width tong
    '--pagedjs-height-left': '297mm',// height tong

    '--pagedjs-margin-top': '30mm', // chiều cao header
    '--pagedjs-margin-bottom': '30mm',// chiều cao footer
    '--pagedjs-margin-right': '10mm', // lề phải
    '--pagedjs-margin-left': '10mm', // lề trái

    '--pagedjs-pagebox-width': '210mm',// width tong
    '--pagedjs-pagebox-height': '297mm',// height tong


    '--pagedjs-padding-left': '0mm', // luôn để = 0
    '--pagedjs-padding-right': '0mm', // luôn để = 0

    '--pagedjs-padding-top': '10mm', // lề trên
    '--pagedjs-padding-bottom': '10mm', // lề dưới
};



const defaultCssVariables3 = {
    '--pagedjs-width': '120mm', // width tong
    '--pagedjs-height': '207mm',// height tong
    '--pagedjs-width-right': '120mm',// width tong
    '--pagedjs-height-right': '207mm',// height tong
    '--pagedjs-width-left': '120mm',// width tong
    '--pagedjs-height-left': '207mm',// height tong

    '--pagedjs-margin-top': '30mm', // chiều cao header
    '--pagedjs-margin-bottom': '30mm',// chiều cao footer
    '--pagedjs-margin-right': '10mm', // lề phải
    '--pagedjs-margin-left': '10mm', // lề trái

    '--pagedjs-pagebox-width': '120mm',// width tong
    '--pagedjs-pagebox-height': '207mm',// height tong


    '--pagedjs-padding-left': '0mm', // luôn để = 0
    '--pagedjs-padding-right': '0mm', // luôn để = 0

    '--pagedjs-padding-top': '5mm', // lề trên
    '--pagedjs-padding-bottom': '10mm', // lề dưới
};







const createCssVarriable = ({width = '148mm', height= '210mm', headerHeight='50mm', footerHeight, marginRight, marginLeft, paddingTop, paddingBottom}) =>{
    return {
        '--pagedjs-width': width? width :'210mm', // width tong
        '--pagedjs-height': height? height : '297mm',// height tong
        '--pagedjs-width-right': width? width :'210mm',// width tong
        '--pagedjs-height-right': height? height : '297mm',// height tong
        '--pagedjs-width-left': width? width :'210mm',// width tong
        '--pagedjs-height-left': height? height : '297mm',// height tong
        '--pagedjs-pagebox-width': width? width :'210mm',// width tong
        '--pagedjs-pagebox-height': height? height : '297mm',// height tong
        '--pagedjs-padding-left': '0mm', // luôn để = 0
        '--pagedjs-padding-right': '0mm', // luôn để = 0
        '--pagedjs-margin-top':headerHeight? headerHeight: '30mm', // chiều cao header
        '--pagedjs-margin-bottom':footerHeight? footerHeight: '30mm',// chiều cao footer
        '--pagedjs-margin-right': marginRight? marginRight: '10mm', // lề phải
        '--pagedjs-margin-left': marginLeft? marginLeft:'10mm', // lề trái
        '--pagedjs-padding-top': paddingTop?paddingTop:'10mm', // lề trên
        '--pagedjs-padding-bottom':paddingBottom? paddingBottom: '10mm', // lề dưới
    };
}

export default createCssVarriable
