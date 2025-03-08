import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Previewer } from "pagedjs";
import customCss from './defaultValue/PageNumberCss'
import useRepeatTableHeaders from './functions/useRepeatTableHeaders'
import changePageStyles from './functions/changePageStyles'
import setCSSVariables from './functions/setCSSVariables'
import createCssVarriable from "./defaultValue/defaultCssVariables";
import { useReactToPrint } from "react-to-print";
import updatePageSize from "./functions/updatePageSize";




const newCssVarriable = createCssVarriable({})

const Preview = ({ childrenRef, isRepeatThead = true, cssVariables = newCssVarriable, pageCss = customCss }) => {
  const previewRef = useRef(null);
  if (isRepeatThead) {
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
        changePageStyles(pageCss)
        console.log("Preview rendered, total pages:", flow.total);
      });

      
    return () => {
      document.head
        .querySelectorAll("[data-pagedjs-inserted-styles]")
        .forEach((e) => e.parentNode?.removeChild(e));
    };
  }, [childrenRef]);


 return <div id="idPreview" ref={previewRef} style={{width: 'auto', display:'inline-block'}}></div>;

};

export default Preview;



