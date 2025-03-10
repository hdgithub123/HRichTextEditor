import './App.css'
import HRichTextEditor from '../src/components/HRichTextMain/Main/HRichTextEditor'
import React, { useState } from 'react';
// import {contentStateObjectExample} from './components/_constant/exampleData'
import ContentPreviewEx from  './components/Preview/Example/ContentEx'

function App() {
  const [theme, setTheme] = useState('light');
  const handleChange = (editor) =>{
    // console.log("editor", editor.contentJSON);    
  }
  return (
    <>
        <div>hello</div>
        <HRichTextEditor  onEditorChange={handleChange} viewOnly={false} ></HRichTextEditor>
        {/* <ContentPreviewEx></ContentPreviewEx> */}
    </>
  )
}

export default App
