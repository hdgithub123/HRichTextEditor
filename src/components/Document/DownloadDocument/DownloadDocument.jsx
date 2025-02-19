import React from 'react';
import { convertToRaw } from 'draft-js';
import imageIcon from './downloadDocument.svg';
import style from './DownloadDocument.module.scss'
import { deleteTableEmpty } from '../../Table/replaceDatasTables/index'


const DownloadDocument = ({ editorState, setEditorState }) => {

    const handleClick = () => {
        const newEditorState = deleteTableEmpty({ editorState })
        const RawJsonContent = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()), null, 2)
        // tạo file txt có RawJsonContent lan noi dung cho người dùng download
        const blob = new Blob([RawJsonContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // a.download = 'Document.txt';
        a.download = 'Document.HEditor';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    }

    return (
        <div className={style.container}>
            <button className={style.button} onMouseDown={handleClick}>
                <img src={imageIcon} alt="Download Document" title="Download Document" className={`${style.img} ${style.active}`} />
            </button>
        </div>
    );
}

export default DownloadDocument