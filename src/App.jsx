import './App.css'
import HEditor from '../src/components/FontChange/Editor'
import React, { useState } from 'react';


// if (typeof global === 'undefined') {
//   var global = window;
// }

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <>
     <div className={`App ${theme}`}>
        <div>hello</div>
        <HEditor></HEditor>
    </div>
      
    </>
  )
}

export default App
