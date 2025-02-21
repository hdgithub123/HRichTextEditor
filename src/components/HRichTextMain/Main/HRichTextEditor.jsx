import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
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
import { deleteTableEmpty } from '../../Table/replaceDatasTables/index'
import replaceDatasTables from '../../Table/replaceDatasTables/index'
import changeDynmaticText from '../../DynamicInsert/function/changeDynmaticText'

import { defaultEditorStyle } from '../../_constant/_constant'
import getMainblockStyle from '../../MainBlockStyle/getMainblockStyle'
import addAndUpdtaeMainBlockStyle from '../../MainBlockStyle/addAndUpdateMainBlockStyle'

const HRichTextEditor = ({ contentStateObject, dynamicTables = exampleDataTable, dynamicTexts = exampleData, onEditorChange, viewOnly = false }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorStatePreview, setEditorStatePreview] = useState(EditorState.createEmpty());
  const [mainBlockStyle, setMainBlockStyle] = useState(defaultEditorStyle ? defaultEditorStyle : {});
  const [infoImageInline, setInfoImageInline] = useState({ entityKey: null, properties: null });
  const editorRef = useRef(null);
  const editorPrevewRef = useRef(null);


  const functionList = {
    onImagePropertiesChange: (imageinfo) => {
      setInfoImageInline(imageinfo);
    },
  };


  const listRef = {
    editorRef: editorRef,
    editorPrevewRef: editorPrevewRef
  }

  const [firstview, setFirstView] = useState(true);

  const transformTablesChange = (obj) => {
    return Object.keys(obj).map(key => {
      return {
        tableId: key,
        data: obj[key]
      };
    });
  };

  const dynamicTablesChange = transformTablesChange(dynamicTables)

  useEffect(() => {
    const updateState = async () => {
      let newEditorState;
      let newEditorStatePreview;
      if (contentStateObject) {
        const newContentState = convertFromRaw(contentStateObject);
        newEditorState = EditorState.createWithContent(newContentState);
        newEditorState = addAndUpdtaeMainBlockStyle({ editorState: newEditorState })

        const newContentStatePreview = replaceDatasTables({ contentStateObjectJS: contentStateObject, dataTables: dynamicTablesChange })
        newEditorStatePreview = EditorState.createWithContent(newContentStatePreview);
        newEditorStatePreview = decorateEditorState({ editorState: newEditorStatePreview, functionList: functionList });
        newEditorStatePreview = changeDynmaticText({ editorState: newEditorStatePreview, dataDynamicText: dynamicTexts })


      } else {
        newEditorState = editorState;
        newEditorState = addAndUpdtaeMainBlockStyle({ editorState: newEditorState, style: defaultEditorStyle })
        newEditorStatePreview = editorState;
      }

      newEditorState = decorateEditorState({ editorState: newEditorState, functionList });
      setEditorState(newEditorState);
      setEditorStatePreview(newEditorStatePreview)
      // Đợi state cập nhật xong rồi mới focus
      setTimeout(() => {
        if (editorRef.current && !viewOnly) {
          editorRef.current.focus();
        }
        if (editorPrevewRef.current && viewOnly) {
          editorPrevewRef.current.focus();
        }

      }, 0);
    };

    updateState();
    setFirstView(false)
  }, [firstview]); // Thêm dependencies nếu có thể thay đổi


  useEffect(() => {
    if (infoImageInline.entityKey && infoImageInline.properties) {
      updateImageInline({ entityKey: infoImageInline.entityKey, imageInfo: infoImageInline.properties, editorState, setEditorState });
    }
  }, [infoImageInline])


  useEffect(() => {
    if (editorState) {
      const newMainBlockStyle = getMainblockStyle({ editorState })
      setMainBlockStyle(newMainBlockStyle)
      const contentJSON = JSON.stringify(convertToRaw(deleteTableEmpty({ editorState }).getCurrentContent()), null, 2)
      onEditorChange({ contentJSON: contentJSON })
    }
  }, [editorState])



  const onChange = useCallback((newEditorState) => {
    if (editorState !== newEditorState) {
      setEditorState(newEditorState);
    }

  }, [editorState]);


  const onChangePreview = useCallback((newEditorState) => {
    if (editorStatePreview !== newEditorState) {
      setEditorStatePreview(newEditorState);
    }
  }, [editorStatePreview]);


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


  const initContentView = {
    rawContentView: false,
    previewContent: false,

  }

  const [contentView, setContentView] = useState(initContentView);


  return (
    <div className={style.allContainer}>
      {!viewOnly && <div className={style.toolBar} style={{ border: '2px black solid', borderRadius: '5px', padding: '5px', zIndex: '20' }}>
        <ToolbarsEditor
          editorState={editorState}
          setEditorState={setEditorState}

          editorStatePreview={editorStatePreview}
          setEditorStatePreview={setEditorStatePreview}

          contentView={contentView}
          setContentView={setContentView}

          // setMainBlockStyle ={setMainBlockStyle}

          variable={variable}
          onChange={onChange}
          data={{ dynamicTables, dynamicTexts }}
          functionList={functionList}
          listRef={listRef}>
        </ToolbarsEditor>
      </div>}
      <div className={style.allEditor}>
        {!viewOnly && <div
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={style.editorContainer}
          style={{ ...mainBlockStyle, display: contentView.rawContentView ? 'none' : contentView.previewContent ? 'none' : 'block' }}
        >
          <div
            className={removeStyle.editorRemove}
          >
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={onChange}
              readOnly={false}
              placeholder="Write something interesting here..."
              customStyleMap={customStyleMap}
              blockStyleFn={blockStyleFn}
              blockRenderMap={extendedBlockRenderMap}
              blockRendererFn={getBlockRendererFn({ editorRef: editorRef.current, getEditorState: () => editorState, onChange: onChange })}
              handleReturn={(e, editorState) => handleReturn(e, editorState)}
            />
          </div>
        </div>}

        <div
          className={style.editorPreview}
          // readOnly= {true}
          style={{ ...mainBlockStyle, background: 'white', display: viewOnly ? 'block' : contentView.rawContentView ? 'none' : contentView.previewContent ? 'block' : 'none' }}
        // style={{display: contentView.rawContentView ? 'none' :contentView.previewContent? 'block' : 'none' }}
        >
          <div style={{ width: '100%', border: '2px black solid', borderRadius: '5px', background: 'gray', justifyContent: 'center', textAlign: 'center' }}> This Preview</div>
          <div
            className={removeStyle.editorRemove}
          >
            <Editor
              ref={editorPrevewRef}
              editorState={editorStatePreview}
              onChange={onChangePreview}
              readOnly={!firstview}
              placeholder="Empty document..."
              customStyleMap={customStyleMap}
              blockStyleFn={blockStyleFn}
              blockRenderMap={extendedBlockRenderMap}
              blockRendererFn={getBlockRendererFn({ editorRef: editorPrevewRef.current, getEditorState: () => editorStatePreview, onChange: onChangePreview })}
              handleReturn={(e, editorState) => handleReturn(e, editorState)}
            />
          </div>
        </div>
        {contentView.rawContentView && <div className={style.rawContentView} style={{ ...mainBlockStyle }}>
          <pre>{JSON.stringify(convertToRaw(deleteTableEmpty({ editorState }).getCurrentContent()), null, 2)}</pre>
        </div>}
      </div>

    </div>
  );
};

export default HRichTextEditor;
