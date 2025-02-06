import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import customStyleMap from './customStyleMap';
import blockStyleFn from './blockStyleFn';
import extendedBlockRenderMap from './blockRenderMap';

import editorStyle from './Editor.module.css';
import removeStyle from './removeStyleDefault.module.css';
import FontInput from './FontInput';
import { Modifier, EditorBlock, SelectionState, ContentBlock, ContentState, genKey, convertToRaw, convertFromRaw } from 'draft-js';

const HEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef(null);
  const selectionStateRef = useRef(null);


  const onChange = (newState) => {
    setEditorState(newState);
  };


  // useEffect(() => {
  //   focusEditor();
  // }, []);

  const focusEditor = () => {
    editor.current.focus();
  };

  const lastSelectionState = useRef(null);

  const handleBlur = () => {
    // Lưu trữ trạng thái lựa chọn cuối cùng khi mất focus
    lastSelectionState.current = editorState.getSelection();
  };

  const handleFocus = () => {
    if (lastSelectionState.current) {
      // Khôi phục trạng thái lựa chọn khi focus lại editor
      setEditorState(EditorState.forceSelection(editorState, lastSelectionState.current));
    }
  };


  const getCurrentFont = () => {
    const currentStyle = editorState.getCurrentInlineStyle();
    const fontStyle = Array.from(currentStyle).find(style => style.startsWith('fontFamily.'));
    return fontStyle ? fontStyle.split('.')[1] : 'Arial'; // Default to Arial if no font is selected
  };



  return (
    <div
    // onBlur={handleBlur}
    // onFocus={handleFocus}
      style={{width: '500px', padding: '20px'}}
    >
      <FontInput editorState={editorState} setEditorState={setEditorState}></FontInput>
      <div
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={editorStyle.editorContainer}
      >
        <div
          className={removeStyle.editorRemove}
        >
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={onChange}
            customStyleMap={customStyleMap}
            blockStyleFn={blockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
          // className={editorStyle.editor}
          />
        </div>
      </div>
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default HEditor;