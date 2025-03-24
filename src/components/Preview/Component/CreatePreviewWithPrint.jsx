import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Preview from './Preview';
import { useReactToPrint } from 'react-to-print';
import createCssVarriable from "../functions/createCssVarriable";
import updatePageSize from '../functions/updatePageSize';
import removePagedStyles from '../functions/removePagedStyles';
import removePageSize from '../functions/removePageSize';
import FloatHeaderAndFooter from './FloatHeaderAndFooter';

const defaultCssVarriable = createCssVarriable({})

const CreatePreviewWithPrint = ({
    children,
    isRepeatThead = true,
    cssVariables = defaultCssVarriable,
    pageCss,
    isPrint = false,
    isPrinted,
    headerID = null,
    footerID = null,
}) => {
    const [previewContent, setPreviewContent] = useState(null); // State lưu nội dung đã cập nhật
    const componentRef = useRef();
    const previewRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        onBeforePrint: async () => {
            await updatePageSize({
                width: cssVariables['--pagedjs-pagebox-width'],
                height: cssVariables['--pagedjs-pagebox-height']
            });
            console.log("Preparing to print...");
        },
        onAfterPrint: () => {
            isPrinted(true);
            removePageSize();
            console.log("Printed!");
        }
    });


    useEffect(() => {
        removePagedStyles();        
        setTimeout(() => {
            setPreviewContent(
                <Preview
                    key={Date.now()} // Đảm bảo React tạo component mới
                    childrenRef={previewRef}
                    isRepeatThead={isRepeatThead}
                    cssVariables={cssVariables}
                    pageCss={pageCss}
                />
            );
        }, 0); // Đảm bảo rằng Preview mới được tạo sau khi Preview cũ bị xóa    
    }, [children]); // Theo dõi sự thay đổi của children và các props quan trọng



    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
    }, [isPrint]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div ref={previewRef} style={{ display: 'none' }}>
                <FloatHeaderAndFooter headerID={headerID} footerID={footerID}>
                    {children}
                </FloatHeaderAndFooter>
            </div>
            <div ref={componentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {previewContent}
            </div>
        </div>
    );
};

export default CreatePreviewWithPrint;
