import './App.css'
import HRichTextEditor from '../src/components/HRichTextMain/Main/HRichTextEditor'
import React, { useState } from 'react';
import TableRichEditorNew from '../src/components/Table/ViewTest/TableRichEditor'



function App() {
  const [theme, setTheme] = useState('light');
  return (
    <>
        <div>hello</div>
        <HRichTextEditor></HRichTextEditor>
        {/* <TableRichEditorNew></TableRichEditorNew> */}
    </>
  )
}

export default App
