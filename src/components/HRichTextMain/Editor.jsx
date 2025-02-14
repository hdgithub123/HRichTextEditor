import React, { useState, useRef, useEffect,useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import customStyleMap from './customStyleMap';
import blockStyleFn from './blockStyleFn';
import extendedBlockRenderMap from './blockRenderMap';

import editorStyle from './Editor.module.css';
import removeStyle from './removeStyleDefault.module.css';
import { Modifier, EditorBlock, SelectionState, ContentBlock, ContentState, genKey, convertToRaw, convertFromRaw } from 'draft-js';
import getBlockRendererFn from './getBlockRendererFn';
import ToolbarsEditor from './ToolbarsEditor';
import decorateEditorState from './decorateEditorState';
import updateImageInline from '../Image/ImangeInline/function/updateImageInline';



const HRichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [infoImageInline, setInfoImageInline] = useState({ entityKey: null, properties: null });
  const editor = useRef(null);

  useEffect(() => {
    const newEditorState = decorateEditorState({ editorState, functionList });
    setEditorState(newEditorState);
  }, []);

  const functionList = {
    onImagePropertiesChange: (imageinfo) => {
      setInfoImageInline(imageinfo);
    },
  };


  useEffect(() => {
    if (infoImageInline.entityKey && infoImageInline.properties) {
      updateImageInline({ entityKey: infoImageInline.entityKey, imageInfo: infoImageInline.properties, editorState, setEditorState });
    }
  }, [infoImageInline])



  const onChange = useCallback((newEditorState) => {
    if (editorState !== newEditorState) {
      setEditorState(newEditorState);
    }
  }, [editorState]);


  // const focusEditor = () => {
  //   editor.current.focus();
  // };

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

  const handleReturn = (e, editorState) => {
    if (RichUtils.getCurrentBlockType(editorState) === 'cellTable') {
      onChange(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }
    return 'not-handled';
  };
  
  const variable = {
    infoImageInline:infoImageInline,
  }

  return (
    <div
    // onBlur={handleBlur}
    // onFocus={handleFocus}
    // style={{width: '500px', padding: '20px'}}
    // style={{ border: '1px black solid' }}
    >
      <div style={{ border: '2px black solid', borderRadius: '5px', padding: '5px' }}>
        <ToolbarsEditor editorState={editorState} setEditorState={setEditorState} variable={variable} onChange={onChange}></ToolbarsEditor>
      </div>

      <div
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={editorStyle.editorContainer}
        style={{ border: '2px black solid', borderRadius: '5px', padding: '0px' }}
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
            blockRendererFn={getBlockRendererFn({ editorRef: editor.current, getEditorState: () => editorState, onChange: onChange })}
            handleReturn={(e, editorState) => handleReturn(e, editorState)}
          // className={editorStyle.editor}
          />
        </div>
      </div>
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default HRichTextEditor;