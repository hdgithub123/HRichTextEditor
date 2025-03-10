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
            removePageStyle();
            console.log("Printed!");
        }
    });

    // Cập nhật previewContent khi children thay đổi
    useEffect(() => {
        setPreviewContent(
            <Preview 
                key={Date.now()} // Đảm bảo React tạo component mới
                childrenRef={previewRef} 
                isRepeatThead={isRepeatThead} 
                cssVariables={cssVariables} 
                pageCss={pageCss} 
            />
        );
    }, [children, cssVariables, pageCss, isRepeatThead]); // Theo dõi sự thay đổi của children và các props quan trọng

    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
    }, [isPrint]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div ref={previewRef} style={{ display: 'none' }}>
                <FloatHeaderAndFooter onLoad={() => setPreviewContent(previewContent)}>
                    {children}
                </FloatHeaderAndFooter>
            </div>

            {/* Khi previewContent có dữ liệu, render lại Preview */}
            {previewContent && (
                <div ref={componentRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {previewContent}
                </div>
            )}
        </div>
    );
};

export default CreatePreviewWithPrint;
