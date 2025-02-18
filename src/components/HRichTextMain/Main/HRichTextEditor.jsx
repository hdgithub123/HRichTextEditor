import React, { useState, useRef, useEffect,useCallback } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Modifier, EditorBlock, SelectionState, ContentBlock, ContentState, genKey, convertToRaw, convertFromRaw } from 'draft-js';
import style from './HRichTextEditor.module.css';
import removeStyle from './removeStyleDefault.module.css';

import ToolbarsEditor from '../ToolBars/ToolbarsEditor';
import customStyleMap from '../functionRender/customStyleMap';
import blockStyleFn from '../functionRender/blockStyleFn';
import extendedBlockRenderMap from '../functionRender/blockRenderMap';
import getBlockRendererFn from '../functionRender/getBlockRendererFn';
import decorateEditorState from '../functionRender/decorateEditorState';
import updateImageInline from '../../Image/ImangeInline/function/updateImageInline';

import {exampleDataTable, exampleData} from '../../_constant/exampleData'


const HRichTextEditor = ({dynamicTables =  exampleDataTable, dynamicTexts = exampleData}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [infoImageInline, setInfoImageInline] = useState({ entityKey: null, properties: null });
  const editorRef = useRef(null);

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
    <div>
      <div className={style.toolBar}  style={{ border: '2px black solid', borderRadius: '5px', padding: '5px', zIndex:'20' }}>
        <ToolbarsEditor editorState={editorState} setEditorState={setEditorState} variable={variable} onChange={onChange} data ={{dynamicTables, dynamicTexts}}></ToolbarsEditor>
      </div>

      <div
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={style.editorContainer}
        style={{ border: '2px black solid', borderRadius: '5px', padding: '0px' }}
      >
        <div
          className={removeStyle.editorRemove}
        >
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={onChange}
            // readOnly ={true}
            customStyleMap={customStyleMap}
            blockStyleFn={blockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={getBlockRendererFn({ editorRef: editorRef.current, getEditorState: () => editorState, onChange: onChange })}
            handleReturn={(e, editorState) => handleReturn(e, editorState)}
          />
        </div>
      </div>
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default HRichTextEditor;