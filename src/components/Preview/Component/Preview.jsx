import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Previewer  } from "pagedjs";
import useRepeatTableHeaders from '../functions/useRepeatTableHeaders'
import changePageStyles from '../functions/changePageStyles'
import setCSSVariables from '../functions/setCSSVariables'
import createCssVarriable from "../functions/createCssVarriable";
import removeRepeatedTableHeaders from '../functions/removeRepeatedTableHeaders'
import RepeatTableHeadersHandler from "../functions/RepeatTableHeadersHandler";


const defaultCssVarriable = createCssVarriable({})

const Preview = ({ childrenRef, isRepeatThead = true, cssVariables = defaultCssVarriable, pageCss = {} }) => {
  const previewRef = useRef(null);

  useEffect(() => {
    if (!childrenRef?.current) return;

    const linkcss = ['./pagedjsCss/Preview.css',]
    const previewer= new Previewer();
    if (isRepeatThead) {
      previewer.registerHandlers(RepeatTableHeadersHandler)
    } else {
      previewer.on("rendered", () => {
        removeRepeatedTableHeaders()
      });
    }

    
    setCSSVariables(cssVariables)
    // 📌 Thêm beforeParsed để xử lý nội dung trước khi render
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



