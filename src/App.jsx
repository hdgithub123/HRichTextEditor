import './App.css'
import HRichTextEditor from '../src/components/HRichTextMain/Editor'
import React, { useState } from 'react';
import TableRichEditorNew from '../src/components/Table/ViewTest/TableRichEditor'
import ImangeInlineEditor from '../src/components/Image/ImangeInline/ImangeInlineEditor'
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <>
        <div>hello</div>
        <HRichTextEditor></HRichTextEditor>
        <TableRichEditorNew></TableRichEditorNew>
        <ImangeInlineEditor></ImangeInlineEditor>
    </>
  )
}

export default App
