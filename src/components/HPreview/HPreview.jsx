import React, { forwardRef, useRef, useState, useEffect, Children } from 'react';

import CreatePreviewWithPrint, { createCssVarriable, generatePageNumberCss, generateBackgroundImage } from '../Preview/index'


const HPreview = ({ 
    children, 
    pageNumberStyle,
    backgroundImageCss= backgroundImage,
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

    const pageCssDefault = generatePageNumberCss({ style:pageNumberStyle?pageNumberStyle: {}, format:formatPageNumber?formatPageNumber: 'Page: {page}/{pages}', position :positionPageNumber?positionPageNumber: 'bottom-right' })

    
    const backgroundCssDefault = generateBackgroundImage(backgroundImageCss)
    const cssDefault = `${pageCssDefault} ${backgroundCssDefault}`
    const newCssVarriable = createCssVarriable(layoutSetup ? layoutSetup : { width: '210mm', height: '297mm', marginTop: '30mm', marginBottom: '20mm', marginLeft: "15mm", marginRight: '20mm', paddingTop: '15mm', paddingBottom: '15mm' })

    return (
        <CreatePreviewWithPrint
            pageCss={cssDefault}
            isPrint={isPrint ? isPrint : false}
            isPrinted={handleisPrinted}
            isRepeatThead={isRepeatThead ===false? isRepeatThead : true}
            cssVariables={newCssVarriable}
            headerID={headerID}
            footerID={footerID}
        >
            {children}
        </CreatePreviewWithPrint>
    );
};

export default HPreview;


const backgroundImage = {
    backgroundImage: "url('https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-10.jpg.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundAttachment: 'fixed',
    backgroundClip: 'content-box',
    backgroundRepeat: 'no-repeat',
    opacity: 0.2,
    backgroundColor: 'red',
    // backdropFilter: 'blur(5px)',
    // backdropFilter: 'invert(80%)',
    
}