import './App.css'
import HRichTextEditor from '../src/components/HRichTextMain/Main/HRichTextEditor'
import React, { useState } from 'react';
import handleUpload from './components/Image/utilities/handleUpload';


function App() {
  const [theme, setTheme] = useState('light');
  const handleChange = (editor) =>{
    console.log("editor", editor.contentJSON);    
  }
  return (
    <>
        <div>hello</div>
        <HRichTextEditor onEditorChange={handleChange} viewOnly={true} ></HRichTextEditor>
        {/* <TableRichEditorNew></TableRichEditorNew> */}
    </>
  )
}

export default App
