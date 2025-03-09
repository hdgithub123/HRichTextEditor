import React, { useEffect, useRef, useState } from "react";


const FloatHeaderAndFooter = ({ children, headerID = null, footerID = null , onLoad }) => {
    const bodyRef = useRef(null);
    const [headerContent, setHeaderContent] = useState(null);
    const [footerContent, setFooterContent] = useState(null);

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
            headerEl.remove(); // Xóa header khỏi bodyRef
        }

        if (footerEl) {
            // setFooterContent(footerEl.outerHTML);
            setFooterContent(wrapWithParentClasses(footerEl));
            footerEl.remove(); // Xóa footer khỏi bodyRef
        }

        if (onLoad) {
            onLoad();
        }

    }, [children, headerID, footerID]);

    return (
        <div>
             <div dangerouslySetInnerHTML={{ __html: headerContent }} />
             <div dangerouslySetInnerHTML={{ __html: footerContent }} />
             <div ref={bodyRef}>{children}</div>
        </div>

    );
}

export default FloatHeaderAndFooter



const wrapWithParentClasses = (element) => {
    if (!element) return '';
    let parent = element.parentElement;
    let classList = [];
    while (parent) {
        if (parent.classList.length > 0) {
            classList = [...parent.classList, ...classList]; // Thêm class của cha vào đầu danh sách
        }
        parent = parent.parentElement; // Tiếp tục đi lên cha của phần tử hiện tại
    }
    // Gộp class vào thẻ gốc
    const newElement = element.cloneNode(true);
    newElement.classList.add(...classList);

    return newElement.outerHTML;
};
