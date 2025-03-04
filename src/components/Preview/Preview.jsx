import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Previewer } from "pagedjs";
import customCss from './customCss'
import useRepeatTableHeaders from './functions/useRepeatTableHeaders'
import changePageStyles from './functions/changePageStyles'
import setCSSVariables from './functions/setCSSVariables'
import defaultCssVariables from "./defaultValue/defaultCssVariables";





const Preview = ({ childrenRef, isRepeatThead = false,cssVariables=defaultCssVariables, pageCss=customCss  }) => {
  const previewRef = useRef(null);
  if(isRepeatThead){
    useRepeatTableHeaders();
  }
  
  useEffect(() => {
    if (!childrenRef?.current) return;
    
    const linkcss = ['./Preview.css',]
    const previewer = new Previewer();
     setCSSVariables(cssVariables)
    previewer
      .preview(childrenRef.current.innerHTML, linkcss, previewRef.current)
      .then((flow) => {
       
        // changePageStyles(pageCss) 
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



