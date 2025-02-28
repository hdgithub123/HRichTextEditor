import React, { useEffect, useRef, useState } from "react";


const ComponentPrintHeaderAndFooter = ({ children, headerID = null, footerID = null }) => {
    const bodyRef = useRef(null);
    const [headerContent, setHeaderContent] = useState(null);
    const [footerContent, setFooterContent] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        if (!bodyRef.current) return;

        let headerEl = null;
        let footerEl = null;
        if (headerID && footerID) {
            headerEl = bodyRef.current.querySelector(`#${headerID}`);
            footerEl = bodyRef.current.querySelector(`#${footerID}`);
        } else {
            headerEl = bodyRef.current.querySelectorAll("header")[0];
            footerEl = bodyRef.current.querySelectorAll("footer")[0];
        }


        if (headerEl) {
            // setHeaderContent(headerEl.outerHTML);
            setHeaderContent(wrapWithParentClasses(headerEl));
            setHeaderHeight(headerEl.offsetHeight);
            headerEl.remove(); // Xóa header khỏi bodyRef
        }

        if (footerEl) {
            // setFooterContent(footerEl.outerHTML);
            setFooterContent(wrapWithParentClasses(footerEl));
            setFooterHeight(footerEl.offsetHeight);
            footerEl.remove(); // Xóa footer khỏi bodyRef
        }


    }, [children, headerID, footerID]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style={{ height: headerHeight }}>
                            <div dangerouslySetInnerHTML={{ __html: headerContent }} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div ref={bodyRef}>{children}</div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td style={{ height: footerHeight }}>
                            <div dangerouslySetInnerHTML={{ __html: footerContent }} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

    );
}

export default ComponentPrintHeaderAndFooter



const wrapWithParentClasses = (element) => {
    console.log("element",element)
    if (!element) return '';

    let parent = element.parentElement;
    console.log("parent",parent)
    let classList = [];

    while (parent) {
        if (parent.classList.length > 0) {
            classList = [...parent.classList, ...classList]; // Thêm class của cha vào đầu danh sách
        }
        parent = parent.parentElement; // Tiếp tục đi lên cha của phần tử hiện tại
    }

console.log("classList",classList)

    // Gộp class vào thẻ gốc
    const newElement = element.cloneNode(true);
    newElement.classList.add(...classList);

    return newElement.outerHTML;
};
