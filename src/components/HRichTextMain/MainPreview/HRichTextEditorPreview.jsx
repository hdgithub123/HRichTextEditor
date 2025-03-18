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
import getMainblockStyle from '../../MainBlockStyle/getMainblockStyle'
import getHeaderBlockStyle from '../../HeaderBlock/function/getFooterBlockStyle'
import getFooterBlockStyle from '../../FooterBlock/function/getHeaderBlockStyle'
import { pxToUnit } from '../../utilities'


import HPreview from '../../HPreview/HPreview';



const HRichTextEditorPreview = ({
  contentStateObject,
  dynamicTables = exampleDataTable,
  dynamicTexts = exampleData,
  isPrint,
  isPrinted,
  headerID,
  footerID,
}) => {
  if (!contentStateObject) {
    return null;
  }

  const [editorStatePreview, setEditorStatePreview] = useState(EditorState.createEmpty());
  const [mainBlockStyle, setMainBlockStyle] = useState({});
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
    if (editorStatePreview) {
      const mainBlockStyle = getMainblockStyle({ editorState:editorStatePreview })
      const headerHeight = getHeaderBlockStyle({ editorState:editorStatePreview })
      const footerHeight = getFooterBlockStyle({ editorState:editorStatePreview })
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
        // layoutSetup={layoutSetup ? layoutSetup : null}
        layoutSetup={{ width: '148mm', height: '210mm', marginTop:mainBlockStyle.paddingTop, marginBottom: mainBlockStyle.paddingBottom, marginLeft: mainBlockStyle.paddingLeft, marginRight: mainBlockStyle.paddingRight, paddingTop: '0mm', paddingBottom: '0mm' }}
        
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
