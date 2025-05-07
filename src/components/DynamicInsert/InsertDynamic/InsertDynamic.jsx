import React, { useEffect, useState, useRef } from 'react';
import imageIcon from './viewDocument.svg';
import style from './InsertDynamic.module.scss'
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';
import changeDynmaticText from '../function/changeDynmaticText'
import replaceDatasTables from '../../Table/Component/replaceDataTable/replaceDatasTables'
import { convertToRaw, EditorState } from "draft-js";
import decorateEditorState from '../../HRichTextMain/functionRender/decorateEditorState'
import changeExpressionsInString from '../ExpressionsInString/function/changeExpressionsInString';

const InsertDynamic = ({ editorState, setEditorState, contentView, setContentView,  dynamicTexts, dynamicTables,functionExpressArray=null, editorRef, functionList }) => {
    const contentState = editorState.getCurrentContent();
    const contentStateObjectJS = convertToRaw(contentState)

    const transformTablesChange = (obj) => {
        return Object.keys(obj).map(key => {
            return {
                tableId: key,
                data: obj[key]
            };
        });
    };

    const dynamicTablesChange = transformTablesChange(dynamicTables)

    const handleClick = async () => {
        const content = replaceDatasTables({ contentStateObjectJS:contentStateObjectJS, dataTables: dynamicTablesChange })
        let newEditorState = EditorState.createWithContent(content);
        newEditorState = decorateEditorState({ editorState: newEditorState, functionList:functionList });
        newEditorState = changeDynmaticText({editorState: newEditorState, dataDynamicText:dynamicTexts})
        newEditorState = changeExpressionsInString({ editorState: newEditorState, functionExpressArray:functionExpressArray });
        setEditorState(newEditorState);

        await new Promise(resolve => setTimeout(resolve, 0)); // Đảm bảo setEditorState hoàn thành trước khi focus
        if (editorRef.current) {
            editorRef.current.focus();
        }

        const newcontentView = {
            // ...contentView,
            // previewContent : !contentView.previewContent
            documentView: !contentView.documentView,
            previewContent: !contentView.previewContent,
            printPreview: false,
            rawContentView: false,
        }
        setContentView(newcontentView)


    }


    return (
        <div className={style.container}>
            <button className={style.button} onMouseDown={handleClick}>
                <img src={imageIcon} alt="View Result" title="View Result" className={`${style.img} ${style.active}`} />
            </button>
        </div>
    );
};

export default InsertDynamic;