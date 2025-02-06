import './App.css'
import HEditor from '../src/components/FontChange/Editor'
import React, { useState } from 'react';
import TableRichEditorNew from '../src/components/Table/ViewTest/TableRichEditor'

// if (typeof global === 'undefined') {
//   var global = window;
// }

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <>
        <div>hello</div>
        <HEditor></HEditor>
        <TableRichEditorNew></TableRichEditorNew>
    </>
  )
}

export default App
