import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import HRichTextEditor from '../MainEditor/HRichTextEditor';
import HRichTextEditorPreview from '../MainPreview/HRichTextEditorPreview';


const layoutSetup = { width: '148mm', height: '210mm', headerHeight: '30mm', footerHeight: '20mm', marginLeft: "15mm", marginRight: '20mm', paddingTop: '15mm', paddingBottom: '15mm' }

const HMain = () =>{
    const [contentStateObjectPreview, setContentStateObjectPreview] = useState(null);
    const [contentStateObject, setContentStateObject] = useState(null);
    const [view, setView] = useState(true);
    const handleChange = (value) => {
        console.log("value", value);
        setContentStateObjectPreview(value);
    }

    const handleView = () => {
        setView(!view);
        setContentStateObject(contentStateObjectPreview.contentObject);
    }

    return (
        <div>
            <button onClick={handleView}>click</button>
            <HRichTextEditor onEditorChange={handleChange} viewOnly={!view} ></HRichTextEditor>
           { !view &&   <HRichTextEditorPreview
            contentStateObject={contentStateObject}
            layoutSetup={layoutSetup}
            headerID='hrteHeaderID'
            footerID='hrteFooterID'
            ></HRichTextEditorPreview>}
        </div>
    )
}

export default HMain
