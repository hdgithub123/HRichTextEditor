import './App.css'
import HRichTextEditor from '../src/components/HRichTextMain/Main/HRichTextEditor'
import HRichTextEditorPreview from '../src/components/HRichTextMain/MainPreview/HRichTextEditorPreview'

import React, { useState } from 'react';
// import {contentStateObjectExample} from './components/_constant/exampleData'
import ContentPreviewEx from './components/Preview/Example/ContentEx'


function App() {
  const [theme, setTheme] = useState('light');
  const [isPrint, setIsPrint] = useState(false);
  const handleChange = (editor) => {
    // console.log("editor", editor.contentJSON);    
  }
  return (
    <>
      <div>hello</div>
      <button onClick={() => setIsPrint(!isPrint)}>Change print</button>
      <HRichTextEditor onEditorChange={handleChange} viewOnly={false} ></HRichTextEditor>
      {/* <HRichTextEditorPreview
        isPrint={isPrint}
        ></HRichTextEditorPreview> */}
      {/* <ContentPreviewEx></ContentPreviewEx> */}
    </>
  )
}

export default App
