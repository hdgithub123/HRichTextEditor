import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import style from './Print.module.scss'
import ComponentPrintHeaderAndFooter from "./ComponentPrintHeaderAndFooter"
import PageNumbers from './PageNumbers'

const Print = ({
    children,
    isPrint = false,
    width,
    headerID = null,
    footerID = null,
    unit = "mm",
    positionPageNumber = "bottom-right",
    formatPageNumber = "Page {page} of {total}",
    stylePageNumber = null,
    isPrinted,
}) => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({

        documentTitle: 'Title',
        contentRef: componentRef,
        // onBeforePrint: async () => {
        //     // Thực hiện thao tác bất đồng bộ trước khi in
        //     await new Promise(resolve => setTimeout(resolve, 2000)); // Ví dụ: Chờ 2 giây
        //     console.log('Before print');
        // },
        onAfterPrint: () => {
            isPrinted(true)
          },

    })



    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }

    }, [children, headerID, footerID, isPrint]);

    return (
        <div className={style.container} ref={componentRef} style={{ width: width }}>
            <ComponentPrintHeaderAndFooter>{children}</ComponentPrintHeaderAndFooter>
            <div className={style.pageNumbers}>
                <PageNumbers contentRef={componentRef} unit={unit} position={positionPageNumber} format={formatPageNumber} style={stylePageNumber}></PageNumbers>
            </div>

        </div>

    )


}

export default Print
