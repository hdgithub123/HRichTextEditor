import React, { useState, useRef, useEffect, useCallback } from 'react';
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

import { exampleDataTable, exampleData } from '../../_constant/exampleData'
import { contentStateObjectExample, contentStateObjectExampleSimple } from '../../_constant/exampleData'




const HRichTextEditor = ({ contentStateObject = contentStateObjectExample, dynamicTables = exampleDataTable, dynamicTexts = exampleData }) => {
  // const newContentState =contentStateObject? convertFromRaw(contentStateObject): null
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [infoImageInline, setInfoImageInline] = useState({ entityKey: null, properties: null });
  const editorRef = useRef(null);
  const functionList = {
    onImagePropertiesChange: (imageinfo) => {
      setInfoImageInline(imageinfo);
    },
  };
  
  // useEffect(() => {

  //   // if(contentStateObject){
  //   //   const newContentState = convertFromRaw(contentStateObject)
  //   //   let newEditorState = EditorState.createWithContent(newContentState)
  //   //   newEditorState = decorateEditorState({ editorState:newEditorState, functionList });
  //   //   setEditorState(newEditorState);
  //   // } else {
  //   //   const newEditorState = decorateEditorState({ editorState, functionList });
  //   //   setEditorState(newEditorState);
  //   // }


  //   const updateState = async () => {
  //     if (contentStateObject) {
  //       const newContentState = convertFromRaw(contentStateObject)
  //       let newEditorState = EditorState.createWithContent(newContentState)
  //       newEditorState = decorateEditorState({ editorState: newEditorState, functionList });
  //       setEditorState(newEditorState);
  //     } else {
  //       const newEditorState = decorateEditorState({ editorState, functionList });
  //       setEditorState(newEditorState);
  //     }
  
  //     await new Promise(resolve => setTimeout(resolve, 0)); // Đảm bảo setEditorState hoàn thành trước khi focus
  //     if (editorRef.current) {
  //       editorRef.current.focus();
  //     console.log("editorState",editorState)
  //     }
  //   }

  //   updateState();

  // }, []);


  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateState = async () => {
      let newEditorState;
  
      if (contentStateObject) {
        const newContentState = convertFromRaw(contentStateObject);
        newEditorState = EditorState.createWithContent(newContentState);
      } else {
        newEditorState = editorState;
      }
  
      newEditorState = decorateEditorState({ editorState: newEditorState, functionList });
      setEditorState(newEditorState);
  
      // Đợi state cập nhật xong rồi mới focus
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          console.log("editorState", newEditorState);
        }
      }, 0);
    };
  
    updateState();
    updateState();
    setCount(1)
  }, [count]); // Thêm dependencies nếu có thể thay đổi
  





  // const updateState = async () => {
  //   if (contentStateObject) {
  //     const newContentState = convertFromRaw(contentStateObject)
  //     let newEditorState = EditorState.createWithContent(newContentState)
  //     newEditorState = decorateEditorState({ editorState: newEditorState, functionList });
  //     setEditorState(newEditorState);
  //   } else {
  //     const newEditorState = decorateEditorState({ editorState, functionList });
  //     setEditorState(newEditorState);
  //   }

  //   await new Promise(resolve => setTimeout(resolve, 0)); // Đảm bảo setEditorState hoàn thành trước khi focus
  //   if (editorRef.current) {
  //     editorRef.current.focus();
  //   }
  // }






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




  // useEffect(() => {
  //   const newContentState = convertFromRaw(contentStateObject)
  //   setEditorState(EditorState.createWithContent(newContentState))
  // }, []);


  //   const handleReplaceDataTables = async () => {
  //     const newContentState = replaceDatasTables({ contentStateObjectJS: contentExample,dataTables: tableData });
  //     const newEditor2 = EditorState.createWithContent(newContentState);
  //     setEditorState(newEditor2);
  //     await new Promise(resolve => setTimeout(resolve, 0)); // Đảm bảo setEditorState hoàn thành trước khi focus
  //     if (editorRef.current) {
  //         editorRef.current.focus();
  //     }
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
    infoImageInline: infoImageInline,
  }

  return (
    <div>
      <div className={style.toolBar} style={{ border: '2px black solid', borderRadius: '5px', padding: '5px', zIndex: '20' }}>
        <ToolbarsEditor editorState={editorState} setEditorState={setEditorState} variable={variable} onChange={onChange} data={{ dynamicTables, dynamicTexts }}></ToolbarsEditor>
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
            // blockStyleFn={contentBlock => blockStyleFn(contentBlock)}
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