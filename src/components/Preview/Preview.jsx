import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Previewer } from "pagedjs";
import customCss from './customCss'
import useRepeatTableHeaders from './useRepeatTableHeaders'


const Preview = ({ childrenRef, repeatTableHeader = false }) => {
  const previewRef = useRef(null);
  if(repeatTableHeader){
    useRepeatTableHeaders();
  }
  
  useEffect(() => {
    if (!childrenRef?.current) return;
    const linkcss = ['./Preview.css',]
    const previewer = new Previewer();
    previewer
      .preview(childrenRef.current.innerHTML, linkcss, previewRef.current)
      .then((flow) => {
        changePageStyles(customCss)      
        console.log("Preview rendered, total pages:", flow.total);
      });

    return () => {
      document.head
        .querySelectorAll("[data-pagedjs-inserted-styles]")
        .forEach((e) => e.parentNode?.removeChild(e));
    };
  }, [childrenRef]);
  return <div id="preview" ref={previewRef}></div>;
};

export default Preview;



const changePageStyles = (css) => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
};