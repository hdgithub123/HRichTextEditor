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
import getBlockRendererFnView from '../functionRender/getBlockRendererFnView';



import decorateEditorState from '../functionRender/decorateEditorState';
import updateImageInline from '../../Image/ImangeInline/function/updateImageInline';

import { exampleDataTable, exampleData } from '../../_constant/exampleData'
import { deleteTableEmpty } from '../../Table/replaceDatasTables/index'
import replaceDatasTables from '../../Table/replaceDatasTables/index'
import changeDynmaticText from '../../DynamicInsert/function/changeDynmaticText'

import { defaultEditorStyle } from '../../_constant/_constant'
import getMainblockStyle from '../../MainBlock/getMainblockStyle'
import getHeaderBlockStyle from '../../HeaderBlock/function/getHeaderBlockStyle'
import getFooterBlockStyle from '../../FooterBlock/function/getFooterBlockStyle'
import addAndUpdtaeMainBlockStyle from '../../MainBlock/addAndUpdateMainBlock'
import { pxToUnit } from '../../utilities'
import HRichTextEditorPreview from '../MainPreview/HRichTextEditorPreview';


import HPreview from '../../HPreview/HPreview';
import FloatHeaderAndFooter from '../../Preview/Component/FloatHeaderAndFooter';

const HRichTextEditor = ({ contentStateObject = newContent3, dynamicTables = exampleDataTable, dynamicTexts = exampleData, onEditorChange, viewOnly = false }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorStatePreview, setEditorStatePreview] = useState(EditorState.createEmpty());
 

  const [mainBlockStyle, setMainBlockStyle] = useState(defaultEditorStyle ? defaultEditorStyle : {});
  const [infoImageInline, setInfoImageInline] = useState({ entityKey: null, properties: null });
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
  const handlePrint = () => {
    setIsPrint(true)
  }


  const handleisPrinted = (e) => {
    setIsPrint(!e)
  }





  return (
    <div className={style.allContainer}>
      <button onClick={handlePrint}>Print or Save as PDF</button>
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
          ref={divEditorRef}
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
              blockRendererFn={getBlockRendererFn({ editorRef: editorRef.current, getEditorState: () => editorState, onChange: onChange, isEditable: true })}
              handleReturn={(e, editorState) => handleReturn(e, editorState)}
            />
          </div>
        </div>}
        <div className={style.displayPreview} style={{ display: viewOnly ? 'block' : contentView.rawContentView ? 'none' : contentView.previewContent ? 'block' : 'none', }}>Preview</div>

        <div
          ref={divEditorPrevewRef}
          className={style.editorPreview}
          // readOnly= {true}
          style={{ ...mainBlockStyle, display: viewOnly ? 'block' : contentView.rawContentView ? 'none' : contentView.previewContent ? 'block' : 'none' }}
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
                blockRendererFn={getBlockRendererFn({ editorRef: editorPrevewRef.current, getEditorState: () => editorStatePreview, onChange: onChangePreview, isEditable: false })}
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


const newContent3 = {
  "blocks": [
    {
      "key": "hst8",
      "text": " ",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "21sdh",
      "text": " ",
      "type": "tableStructure",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tablestyle": {
          "borderCollapse": "collapse"
        },
        "cellStyle": {
          "borderTopWidth": "1px",
          "borderTopStyle": "solid",
          "borderTopColor": "black",
          "borderLeftWidth": "1px",
          "borderLeftStyle": "solid",
          "borderLeftColor": "black",
          "borderRightWidth": "1px",
          "borderRightStyle": "solid",
          "borderRightColor": "black",
          "borderBottomWidth": "1px",
          "borderBottomStyle": "solid",
          "borderBottomColor": "black",
          "padding": "6px",
          "textAlign": "center",
          "wordWrap": "break-word",
          "whiteSpace": "normal"
        },
        "maxHeaderRow": "1",
        "tableShape": [
          [
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            },
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            },
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            }
          ],
          [
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            },
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            },
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            }
          ],
          [
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            },
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            },
            {
              "columnspan": 1,
              "rowspan": 1,
              "individualStyle": {}
            }
          ]
        ],
        "blockStyle": {
          "display": "flex",
          "justifyContent": "center"
        },
        "tableColumnWidth": {}
      }
    },
    {
      "key": "6jpeg",
      "text": " ",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "7tk16",
      "text": "sad",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "dsl9",
      "text": "a",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "ajhqk",
      "text": "sd",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "28tf1",
      "text": "á",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "a33vh",
      "text": "d",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },
    {
      "key": "mainBlock",
      "text": "",
      "type": "MAIN_BLOCK",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "blockStyle": {
          "paddingTop": "20mm",
          "width": "210mm",
          "marginTop": "0mm",
          "height": "auto",
          "paddingRight": "15mm",
          "marginRight": "0mm",
          "marginLeft": "0mm",
          "paddingLeft": "30mm",
          "marginBottom": "0mm",
          "paddingBottom": "20mm"
        }
      }
    },
    {
      "key": "headerBlock",
      "text": " 1\n2\n3",
      "type": "HEADER_BLOCK",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "blockStyle": {
          "height": "50mm",
          "background": "red"
        }
      }
    },
    {
      "key": "footerBlock",
      "text": " ",
      "type": "FOOTER_BLOCK",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "blockStyle": {
          "height": "20mm",
          "background": "green"
        }
      }
    },
    {
      "key": "9a225",
      "text": " huhu",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-0-0",
        "blockStyle": {
          "textAlign": "left"
        }
      }
    },
    {
      "key": "b2r5g",
      "text": " bbb",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-0-1",
        "blockStyle": {
          "textAlign": "right"
        }
      }
    },
    {
      "key": "9e8m9",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-0-2"
      }
    },
    {
      "key": "al93p",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-1-0"
      }
    },
    {
      "key": "ajltp",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-1-1"
      }
    },
    {
      "key": "31foq",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-1-2"
      }
    },
    {
      "key": "1aqrt",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-2-0"
      }
    },
    {
      "key": "bdt7n",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-2-1"
      }
    },
    {
      "key": "93gr2",
      "text": " ",
      "type": "cellTable",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {
        "tableKey": "21sdh",
        "cellPosition": "21sdh-2-2"
      }
    }
  ],
  "entityMap": {}
}