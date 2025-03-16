import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import style from './HRichTextEditorPreview.module.css';
import removeStyle from './removeStyleDefault.module.css';

import customStyleMap from '../functionRender/customStyleMap';
import blockStyleFn from '../functionRender/blockStyleFn';
import extendedBlockRenderMap from '../functionRender/blockRenderMap';
import getBlockRendererFnView from '../functionRender/getBlockRendererFnView';
import decorateEditorState from '../functionRender/decorateEditorState';

import { exampleDataTable, exampleData } from '../../_constant/exampleData'
import replaceDatasTables from '../../Table/replaceDatasTables/index'
import changeDynmaticText from '../../DynamicInsert/function/changeDynmaticText'
import HPreview from '../../HPreview/HPreview';



const HRichTextEditorPreview = ({
  contentStateObject,
  dynamicTables = exampleDataTable,
  dynamicTexts = exampleData,
  isPrint,
  isPrinted,
  layoutSetup,
  headerID,
  footerID,
}) => {
  if (!contentStateObject) {
    return null;
  }

  const [editorStatePreview, setEditorStatePreview] = useState(EditorState.createEmpty());
  const editorPrevewRef = useRef(null);
  const divEditorPrevewRef = useRef(null);

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
      if (contentStateObject) {
        let newEditorStatePreview;
        const newContentStatePreview = replaceDatasTables({ contentStateObjectJS: contentStateObject, dataTables: dynamicTablesChange })
        newEditorStatePreview = EditorState.createWithContent(newContentStatePreview);
        newEditorStatePreview = decorateEditorState({ editorState: newEditorStatePreview });
        newEditorStatePreview = changeDynmaticText({ editorState: newEditorStatePreview, dataDynamicText: dynamicTexts })

        setEditorStatePreview(newEditorStatePreview)
      } else {
      }
    };
    setTimeout(() => {
      if (editorPrevewRef.current) {
        editorPrevewRef.current.focus();
      }

    }, 0);


    updateState();
  }, [contentStateObject]);

  const onChangePreview = useCallback((newEditorState) => {
    if (editorStatePreview !== newEditorState) {
      setEditorStatePreview(newEditorState);
    }
  }, [editorStatePreview]);



  const handleisPrinted = () => {
    isPrinted(true)
  }


  return (
    <div
      ref={divEditorPrevewRef}
      className={style.editorPreview}
    >
      <HPreview
        isPrint={isPrint ? isPrint : false}
        isPrinted={handleisPrinted}
        layoutSetup={layoutSetup ? layoutSetup : null}
        headerID={headerID}
        footerID={footerID}
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
            customStyleMap={customStyleMap}
            blockStyleFn={blockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={getBlockRendererFnView({ editorRef: editorPrevewRef.current, getEditorState: () => editorStatePreview, isEditable: false })}
          // handleReturn={(e, editorState) => handleReturn(e, editorState)}
          />
        </div>
      </HPreview>
    </div>
  );
};

export default HRichTextEditorPreview;
