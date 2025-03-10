import React, { forwardRef, useRef, useState, useEffect, Children } from 'react';

import CreatePreviewWithPrint, { createCssVarriable, generatePageNumberCss } from '../Preview/index'


const HPreview = ({ children, pageNumberStyle, layoutSetup, isPrint, isPrinted, isRepeatThead }) => {
    const handleisPrinted = () => {
        isPrinted(true)
    }

    const pageCss = generatePageNumberCss(pageNumberStyle ? pageNumberStyle : { style: {}, format: 'Trang {page}/{pages}', isBottomPosition: false })
    const newCssVarriable = createCssVarriable(layoutSetup ? layoutSetup : { width: '210mm', height: '297mm', headerHeight: '30mm', footerHeight: '20mm', marginLeft: "15mm", marginRight: '20mm', paddingTop: '15mm', paddingBottom: '15mm' })

    return (
        <CreatePreviewWithPrint
            pageCss={pageCss}
            isPrint={isPrint ? isPrint : false}
            isPrinted={handleisPrinted}
            isRepeatThead={isRepeatThead ? isRepeatThead : true}
            cssVariables={newCssVarriable}
        >
            {children}
        </CreatePreviewWithPrint>
    );
};

export default HPreview;