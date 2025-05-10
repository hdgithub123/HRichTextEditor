import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import style from './HRichTextEditorPreview.module.css';
import removeStyle from './removeStyleDefault.module.css';

import customStyleMap from '../functionRender/customStyleMap';
import blockStyleFn from '../functionRender/blockStyleFn';
import extendedBlockRenderMap from '../functionRender/blockRenderMap';
import getBlockRendererFnView from '../functionRender/getBlockRendererFnView';
import decorateEditorState from '../functionRender/decorateEditorState';

import { exampleDataTable, exampleData } from '../../_constant/exampleData';
import replaceDatasTables from '../../Table/replaceDatasTables/index';
import changeDynmaticText from '../../DynamicInsert/function/changeDynmaticText';
import changeExpressionsInString from '../../DynamicInsert/ExpressionsInString/function/changeExpressionsInString';
import getMainblockStyle from '../../MainBlock/function/getMainblockStyle';
import getPageSetup from '../../MainBlock/function/getPageSetup';
import getBackgroundStyle from '../../MainBlock/function/getBackgroundStyle';
import getHeaderBlockStyle from '../../HeaderBlock/function/getHeaderBlockStyle';
import getFooterBlockStyle from '../../FooterBlock/function/getFooterBlockStyle';
import { pxToUnit } from '../../utilities'

import HPreview from '../../HPreview/HPreview';



const HRichTextEditorPreview = ({
  contentStateObject,
  dynamicTables = exampleDataTable,
  dynamicTexts = exampleData,
  functionArray = null,
  isPrint,
  isPrinted,
  headerID,
  footerID,
  dynamicFunctions = [],
  dynamicFormats = [],
}) => {
  if (!contentStateObject) {
    return null;
  }

  const reContentStateObject = rearrangeSpecialBlocks({ inputObject: contentStateObject, targetKeys: ["headerBlock", "footerBlock", "mainBlock"] })
  const [editorStatePreview, setEditorStatePreview] = useState(EditorState.createEmpty());
  const [mainBlockStyle, setMainBlockStyle] = useState({});
  const [pageSetup, setPageSetup] = useState({});
  const [backgroundImageCss, setBackgroundImageCss] = useState({});

  const [isRepeatThead, setIsRepeatThead] = useState(true);

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
      if (reContentStateObject) {
        let newEditorStatePreview;
        const newContentStatePreview = replaceDatasTables({ contentStateObjectJS: reContentStateObject, dataTables: dynamicTablesChange })
        newEditorStatePreview = EditorState.createWithContent(newContentStatePreview);
        newEditorStatePreview = decorateEditorState({ editorState: newEditorStatePreview });
        newEditorStatePreview = changeDynmaticText({ editorState: newEditorStatePreview, dataDynamicText: dynamicTexts })
        newEditorStatePreview = changeExpressionsInString({ editorState: newEditorStatePreview, dynamicFunctions: dynamicFunctions, dynamicFormats: dynamicFormats });
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


  useLayoutEffect(() => {
    if (editorStatePreview) {
      const mainBlockStyle = getMainblockStyle({ editorState: editorStatePreview })
      const headerHeight = getHeaderBlockStyle({ editorState: editorStatePreview })
      const footerHeight = getFooterBlockStyle({ editorState: editorStatePreview })
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
      const newPageSetup = getPageSetup({ editorState: editorStatePreview })

      setPageSetup(newPageSetup)
      setIsRepeatThead(newPageSetup?.isRepeatThead ? newPageSetup.isRepeatThead : false)
    }
    const newBackgroundStyle = getBackgroundStyle({ editorState: editorStatePreview })
    setBackgroundImageCss(newBackgroundStyle)

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
        layoutSetup={{ width: mainBlockStyle.width, height: pageSetup?.pageHeight ? pageSetup.pageHeight : null, marginTop: mainBlockStyle.paddingTop, marginBottom: mainBlockStyle.paddingBottom, marginLeft: mainBlockStyle.paddingLeft, marginRight: mainBlockStyle.paddingRight, paddingTop: '0mm', paddingBottom: '0mm' }}
        pageNumberStyle={pageSetup?.pageNumber?.style ? pageSetup.pageNumber.style : null} ss
        backgroundImageCss={backgroundImageCss ? backgroundImageCss : {}}
        formatPageNumber={pageSetup?.pageNumber?.format ? pageSetup.pageNumber.format : null}
        positionPageNumber={pageSetup?.pageNumber?.position ? pageSetup.pageNumber.position : null}
        isRepeatThead={isRepeatThead}
        headerID={headerID ? headerID : null}
        footerID={footerID ? footerID : null}
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
            blockRendererFn={getBlockRendererFnView({ editorRef: editorPrevewRef.current, getEditorState: () => editorStatePreview, isEditable: false })}
          // handleReturn={(e, editorState) => handleReturn(e, editorState)}
          />
        </div>
      </HPreview>
    </div>
  );
};

export default HRichTextEditorPreview;

function rearrangeSpecialBlocks({ inputObject, targetKeys = ["headerBlock", "footerBlock", "mainBlock"] }) {
  // Tạo bản sao sâu của inputData để không làm thay đổi dữ liệu gốc
  const result = JSON.parse(JSON.stringify(inputObject));

  // Tách các block đặc biệt và block thường
  const specialBlocks = [];
  const regularBlocks = [];

  result.blocks.forEach(block => {
    if (targetKeys.includes(block.key)) {
      specialBlocks.push(block);
    } else {
      regularBlocks.push(block);
    }
  });

  // Chèn các block đặc biệt vào vị trí index 2
  const newBlocks = [...regularBlocks];
  newBlocks.splice(2, 0, ...specialBlocks);

  // Cập nhật lại mảng blocks trong kết quả
  result.blocks = newBlocks;

  return result;
}