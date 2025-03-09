import React, { useRef, useState, useEffect } from 'react';
import Preview from './Preview';
import { useReactToPrint } from 'react-to-print';
import createCssVarriable from "../functions/createCssVarriable";
import updatePageSize from '../functions/updatePageSize';
import removePageStyle from '../functions/removePageSize';
import FloatHeaderAndFooter from './FloatHeaderAndFooter';


const defaultCssVarriable = createCssVarriable({})

const CreatePreviewWithPrint = ({
    children,
    isRepeatThead = true,
    cssVariables = defaultCssVarriable,
    pageCss,
    isPrint = false,
    isPrinted,
}) => {
    const [isFloatHeaderAndFooterLoaded, setIsFloatHeaderAndFooterLoaded] = useState(false)
    const componentRef = useRef();
    const previewRef = useRef();
    const handlePrint = useReactToPrint({
        // documentTitle: 'Title',
        contentRef: componentRef,
        onBeforePrint: async () => {
            await updatePageSize({
                width: cssVariables['--pagedjs-pagebox-width'],
                height: cssVariables['--pagedjs-pagebox-height']
            });
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div ref={previewRef} style={{display:'none'}}>
                <FloatHeaderAndFooter onLoad={() => setIsFloatHeaderAndFooterLoaded(true)}>
                    {children}
                </FloatHeaderAndFooter>
            </div>
            {isFloatHeaderAndFooterLoaded &&(   <div ref={componentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <Preview childrenRef={previewRef} isRepeatThead={isRepeatThead} cssVariables={cssVariables} pageCss={pageCss} />
            </div>)}
        </div>

    );
};

export default CreatePreviewWithPrint;