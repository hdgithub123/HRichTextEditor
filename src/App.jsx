import './App.css'
 import HRichTextEditor from '../src/components/HRichTextMain/Main/HRichTextEditor'
//import HRichTextEditorPreview from '../src/components/HRichTextMain/MainPreview/HRichTextEditorPreview'

import React, { useState } from 'react';
// import {contentStateObjectExample} from './components/_constant/exampleData'
import ContentPreviewEx from  './components/Preview/Example/ContentEx'

import ColorPicker from './components/utilities/Component/ColorPicker/ColorPicker'

function App() {
  const [theme, setTheme] = useState('light');
  const [isPrint, setIsPrint] = useState(false);
  const handleChange = (editor) =>{
    // console.log("editor", editor.contentJSON);    
  }
  return (
    <>
        <div>hello</div>
           <ContentPreviewEx></ContentPreviewEx>
        <button onClick={()=> setIsPrint(!isPrint)}>Change Theme</button>
        <HRichTextEditor  onEditorChange={handleChange} viewOnly={false} ></HRichTextEditor>
        {/* <HRichTextEditorPreview
        isPrint={isPrint}
        ></HRichTextEditorPreview> */}
        {/* <ContentPreviewEx></ContentPreviewEx> */}
        <div style={{width:'200px'}}>
        <ColorPicker></ColorPicker>
        </div>
        
    </>
  )
}

export default App
