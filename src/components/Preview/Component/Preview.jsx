import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Previewer } from "pagedjs";
import useRepeatTableHeaders from '../functions/useRepeatTableHeaders'
import changePageStyles from '../functions/changePageStyles'
import setCSSVariables from '../functions/setCSSVariables'
import createCssVarriable from "../functions/createCssVarriable";



const defaultCssVarriable = createCssVarriable({})

const Preview = ({ childrenRef, isRepeatThead = true, cssVariables = defaultCssVarriable, pageCss = {} }) => {
  const previewRef = useRef(null);
  if (isRepeatThead) {
    useRepeatTableHeaders();
  }


  useEffect(() => {
    if (!childrenRef?.current) return;

    const linkcss = ['./pagedjsCss/Preview.css',]
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



