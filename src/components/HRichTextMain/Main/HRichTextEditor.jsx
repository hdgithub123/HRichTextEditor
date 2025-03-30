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
import getMainblockStyle from '../../MainBlock/function/getMainblockStyle'

import getHeaderBlockStyle from '../../HeaderBlock/function/getHeaderBlockStyle'
import getFooterBlockStyle from '../../FooterBlock/function/getFooterBlockStyle'
import addAndUpdtaeMainBlockStyle from '../../MainBlock/function/addAndUpdateMainBlock'
import { pxToUnit } from '../../utilities'


import HRichTextEditorPreview from '../MainPreview/HRichTextEditorPreview';


const HRichTextEditor = ({ contentStateObject, dynamicTables = exampleDataTable, dynamicTexts = exampleData, onEditorChange, viewOnly = false }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorStatePreview, setEditorStatePreview] = useState(EditorState.createEmpty());
  const [mainBlockStyle, setMainBlockStyle] = useState(defaultEditorStyle ? defaultEditorStyle : {});
  const [infoImageInline, setInfoImageInline] = useState({ entityKey: null, properties: null });
  const [contentStateObjectPreview, setContentStateObjectPreview] = useState(null);
  const [zoomRate, setZoomRate] = useState(1);
  const editorRef = useRef(null);
  const editorPrevewRef = useRef(null);

  const divEditorRef = useRef(null);
  const divEditorPrevewRef = useRef(null);

  const functionList = {
    onImagePropertiesChange: (imageinfo) => {
      setInfoImageInline(imageinfo);
    },
  };


  const listRef = {
    editorRef: editorRef,
    editorPrevewRef: editorPrevewRef
  }


  const transformTablesChange = (obj) => {
    return Object.keys(obj).map(key => {
      return {
        tableId: key,
        data: obj[key]
      };
    });
  };

  const dynamicTablesChange = transformTablesChange(dynamicTables)

  useLayoutEffect(() => {
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
        newEditorStatePreview = newEditorState;
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
    // setFirstView(false)
  }, []); // Thêm dependencies nếu có thể thay đổi


  useEffect(() => {
    if (infoImageInline.entityKey && infoImageInline.properties) {
      updateImageInline({ entityKey: infoImageInline.entityKey, imageInfo: infoImageInline.properties, editorState, setEditorState });
    }
  }, [infoImageInline])


  const getPxStyle = ({ blockStyle, child }) => {
    let styleValue = 0;

    if (blockStyle && blockStyle[child]) {
      const padding = blockStyle[child];
      const matches = padding.match(/(\d+)(\D+)/);
      if (matches) {
        styleValue = matches[1] / pxToUnit(1, matches[2]);
      }
    }

    return styleValue;
  }



  useEffect(() => {
    if (editorState) {
      const mainBlockStyle = getMainblockStyle({ editorState })
      const headerHeight = getHeaderBlockStyle({ editorState })
      const footerHeight = getFooterBlockStyle({ editorState })
      const pxHeaderHeight = getPxStyle({ blockStyle: headerHeight, child: 'height' })
      const pxFooterHeight = getPxStyle({ blockStyle: footerHeight, child: 'height' })
      const pxPaddingTopMainBlock = getPxStyle({ blockStyle: mainBlockStyle, child: 'paddingTop' })
      const pxBottomTopMainBlock = getPxStyle({ blockStyle: mainBlockStyle, child: 'paddingBottom' })
      const newMainBlockStyle = {
        ...mainBlockStyle,
        paddingTop: `${pxPaddingTopMainBlock + pxHeaderHeight}px`,
        paddingBottom: `${pxBottomTopMainBlock + pxFooterHeight}px`,
      };


      setMainBlockStyle(newMainBlockStyle)
      const contentObject = convertToRaw(deleteTableEmpty({ editorState }).getCurrentContent());
      onEditorChange({ contentObject: contentObject })
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
    if (RichUtils.getCurrentBlockType(editorState) === 'cellTable' || RichUtils.getCurrentBlockType(editorState) === 'HEADER_BLOCK' || RichUtils.getCurrentBlockType(editorState) === 'FOOTER_BLOCK') {
      onChange(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }
    return 'not-handled';
  };

  const variable = {
    infoImageInline: infoImageInline,
  }


  const initContentView = {
    documentView: true,
    previewContent: false,
    printPreview: false,
    rawContentView: false,
  }

  const [contentView, setContentView] = useState(initContentView);

  const [isPrint, setIsPrint] = useState(false);
  const handleisPrinted = (e) => {
    setIsPrint(false)
  }

  const handlePrintPreview = () => {
    const contentObject = convertToRaw(editorState.getCurrentContent());
    setContentStateObjectPreview(contentObject)
  }



  // const handleKeyCommand = (command, editorState) => {
  //   if (command === 'backspace' || command === 'delete') {
  //     const selection = editorState.getSelection();
  //     const content = editorState.getCurrentContent();

  //     const block = content.getBlockForKey(selection.getStartKey());

  //     if (block.getType() === 'MAIN_BLOCK') {
  //       return 'handled';
  //     }
  //   }
  //   return 'not-handled';
  // };


  const handleKeyCommand = (command, editorState) => {
    if (command === 'backspace' || command === 'delete') {
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      const block = content.getBlockForKey(selection.getStartKey());

      // Prevent deletion if block type is 'MAIN_BLOCK'
      if (block.getType() === 'MAIN_BLOCK') {
        return 'handled';
      }
    }
    return 'not-handled';
  };





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
          handlePrintPreview={handlePrintPreview}
          setIsPrint={setIsPrint}
          variable={variable}
          onChange={onChange}
          data={{ dynamicTables, dynamicTexts }}
          functionList={functionList}
          listRef={listRef}
          zoomRate={zoomRate}
          setZoomRate={setZoomRate}
          
          >
        </ToolbarsEditor>
      </div>}
      <div className={style.allEditor} >
        {!viewOnly && <div
          ref={divEditorRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={style.editorContainer}
          style={{ ...mainBlockStyle, display: contentView.documentView ? 'block' : 'none',transform: `scale(${zoomRate})`,transformOrigin: 'top center', }}
        >
          <div
            className={removeStyle.editorRemove}
          >
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={onChange}
              readOnly={false}
              handleKeyCommand={handleKeyCommand}
              placeholder="Please click to open your new document..."
              customStyleMap={customStyleMap({})}
              blockStyleFn={blockStyleFn}
              blockRenderMap={extendedBlockRenderMap}
              blockRendererFn={getBlockRendererFn({ editorRef: editorRef.current, getEditorState: () => editorState, onChange: onChange, isEditable: true })}
              handleReturn={(e, editorState) => handleReturn(e, editorState)}
            />
          </div>
        </div>}
        <div className={style.displayPreview} style={{ display: contentView.previewContent ? 'block' : 'none' }}>Preview</div>
        <div
          ref={divEditorPrevewRef}
          className={style.editorPreview}
          // readOnly= {true}
          style={{ ...mainBlockStyle, display: contentView.previewContent ? 'block' : 'none',transform: `scale(${zoomRate})`,transformOrigin: 'top center', }}
        >

          <div

            className={removeStyle.editorRemove}
          >
            <Editor
              ref={editorPrevewRef}
              editorState={editorStatePreview}
              onChange={onChangePreview}
              readOnly={true}
              placeholder="Empty document..."
              customStyleMap={customStyleMap({})}
              blockStyleFn={blockStyleFn}
              blockRenderMap={extendedBlockRenderMap}
              blockRendererFn={getBlockRendererFn({ editorRef: editorPrevewRef.current, getEditorState: () => editorStatePreview, onChange: onChangePreview, isEditable: false })}
              handleReturn={(e, editorState) => handleReturn(e, editorState)}
            />
          </div>

        </div>
        <div className={style.displayPreview} style={{ display: contentView.printPreview ? 'block' : 'none' }}>Print Preview</div>
        {contentView.printPreview &&
          <div >
            <HRichTextEditorPreview
              contentStateObject={contentStateObjectPreview}
              dynamicTables={dynamicTables}
              dynamicTexts={dynamicTexts}
              headerID='hrteHeaderID'
              footerID='hrteFooterID'
              isPrint={isPrint}
              isPrinted={handleisPrinted}
            />

          </div>}
        {contentView.rawContentView && <div className={style.rawContentView} style={{ ...mainBlockStyle }}>
          <pre>{JSON.stringify(convertToRaw(deleteTableEmpty({ editorState }).getCurrentContent()), null, 2)}</pre>
        </div>}
      </div>

    </div>
  );
};

export default HRichTextEditor;