import React, {useRef, useState, useEffect } from 'react';
import Preview from './Preview';
import { useReactToPrint } from 'react-to-print';
import createCssVarriable from "../defaultValue/createCssVarriable";
import updatePageSize from '../functions/updatePageSize';
import removePageStyle from '../functions/removePageSize';

const defaultCssVarriable = createCssVarriable({})

const CreatePreviewWithPrint = ({ 
    childrenRef, 
    isRepeatThead = true,
    cssVariables = defaultCssVarriable, 
    pageCss, 
    isPrint = false, 
    isPrinted, 
}) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        // documentTitle: 'Title',
        contentRef: componentRef,
        onBeforePrint: async () => {
            await updatePageSize({ 
                width: cssVariables['--pagedjs-pagebox-width'], 
                height: cssVariables['--pagedjs-pagebox-height'] });
            // await updatePageSize({ width: '210mm', height: '297mm' });
            console.log(" Prepair printing")
        },

        onAfterPrint: () => {
            isPrinted(true)
            removePageStyle();
            console.log(" Printed")
        }
    })

    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
    }, [isPrint]);

    return (
        <div ref={componentRef} style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <Preview childrenRef={childrenRef} isRepeatThead={isRepeatThead} cssVariables={cssVariables} pageCss={pageCss} />
        </div>
    );
};

export default CreatePreviewWithPrint;