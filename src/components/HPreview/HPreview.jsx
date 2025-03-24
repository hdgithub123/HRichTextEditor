import React, { forwardRef, useRef, useState, useEffect, Children } from 'react';

import CreatePreviewWithPrint, { createCssVarriable, generatePageNumberCss } from '../Preview/index'


const HPreview = ({ 
    children, 
    pageNumberStyle,
    formatPageNumber,
    positionPageNumber,
    layoutSetup, 
    isPrint, 
    isPrinted, 
    isRepeatThead,
    headerID =  null,
    footerID = null,
 }) => {

    const handleisPrinted = () => {
        isPrinted(true)
    }
console.log("isRepeatThead sau",isRepeatThead)

    const pageCssDefault = generatePageNumberCss({ style:pageNumberStyle?pageNumberStyle: {}, format:formatPageNumber?formatPageNumber: 'Trang {page}/{pages}', position :positionPageNumber?positionPageNumber: 'bottom-right' })
    const newCssVarriable = createCssVarriable(layoutSetup ? layoutSetup : { width: '210mm', height: '297mm', marginTop: '30mm', marginBottom: '20mm', marginLeft: "15mm", marginRight: '20mm', paddingTop: '15mm', paddingBottom: '15mm' })

    return (
        <CreatePreviewWithPrint
            pageCss={pageCssDefault}
            isPrint={isPrint ? isPrint : false}
            isPrinted={handleisPrinted}
            isRepeatThead={isRepeatThead ===false? isRepeatThead : true}
            // isRepeatThead={isRepeatThead !== false}
            //isRepeatThead = {false}
            cssVariables={newCssVarriable}
            headerID={headerID}
            footerID={footerID}
        >
            {children}
        </CreatePreviewWithPrint>
    );
};

export default HPreview;