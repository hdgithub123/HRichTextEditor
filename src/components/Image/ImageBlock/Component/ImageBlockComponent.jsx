import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EditorState } from 'draft-js';

import styles from './ImageBlockComponent.module.css'
import pxToUnit from '../function/pxToUnit';


const ImageBlockComponent = props => {
    const image = useRef(null);
    const container = useRef(null);
    const {
        block,
        contentState,
        blockProps: { editorRef, getEditorState, onChange },
    } = props;

    const data = block.getData();
    const url = data.get('url');
    const width = data.get('width');
    const height = data.get('height');
    const unit = data.get('unit');
    const styleImage = data.get('styleImage');
    const blockStyle = data.get('blockStyle');

    const [imgUrl, setImgUrl] = useState(url);
    const [imgWidth, setImgWidth] = useState(width);
    const [imgHeight, setImgHeight] = useState(height);
    const [imgUnit, setImgUnit] = useState(unit);
    const [thisStyleImage, setThisStyleImage] = useState(styleImage);


    const imgRef = useRef(null);
    const [ratioPxPerUnit, setRatioPxPerUnit] = useState(null);

    useEffect(() => {
        setImgUrl(url);
        setImgWidth(width);
        setImgHeight(height);
        setImgUnit(unit);
        setThisStyleImage(styleImage);
    }, [url, width, height, unit, styleImage]);


    const updateBlockData = useCallback(
        (newData = {}, data = block.getData()) => {
            data = data.merge(newData);
            const newBlock = block.set('data', data);
            let blockMap = getEditorState().getCurrentContent().getBlockMap();
            blockMap = blockMap.set(block.getKey(), newBlock);
            const newContent = getEditorState().getCurrentContent().set('blockMap', blockMap);
            const selection = getEditorState().getSelection();
            let editorState = EditorState.push(getEditorState(), newContent, 'change-block-data');
            editorState = EditorState.forceSelection(editorState, selection);
            onChange(editorState);
        },
        [block, getEditorState, onChange]
    );


    useEffect(() => {
        if (unit === 'px') {
            setRatioPxPerUnit(1);
        } else {
            const ratio = pxToUnit(1, unit);
            setRatioPxPerUnit(ratio);
        }
    }, [width, height, unit]);


    const handleOnMouseDown = (e) => {
        // Chỉ xử lý sự kiện onMouseDown khi nhấn vào border
        if (e.target !== imgRef.current) return;


        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = imgRef.current.offsetWidth;
        const startHeight = imgRef.current.offsetHeight;
        let newWidth = null;
        let newHeight = null;

        const onMouseMove = (e) => {
            newWidth = startWidth + (e.clientX - startX);
            newHeight = startHeight + (e.clientY - startY);
            // setImgUnit('px');
            setImgWidth(newWidth * ratioPxPerUnit);
            setImgHeight(newHeight * ratioPxPerUnit);
        };

        const onMouseUp = (e) => {

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            const dataBlock = {
                url: imgUrl,
                width: newWidth ? newWidth * ratioPxPerUnit : startWidth * ratioPxPerUnit,
                height: newHeight ? newHeight * ratioPxPerUnit : startHeight * ratioPxPerUnit,
                unit: unit,
            };
            // thay thế data của block bang dataBlock
            updateBlockData(dataBlock);

        }


        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };


    return (
        <div style={blockStyle}>
            <div
                ref={imgRef}
                className={styles.container}
                style={{
                    width: `${imgWidth}${imgUnit}` || 'auto',
                    height: `${imgHeight}${imgUnit}` || 'auto',
                }}
                onMouseDown={handleOnMouseDown}
            // onDoubleClick={handleOnDoubleClick}
            >
                <img
                    src={imgUrl}
                    className={styles.image}
                    style={{
                        ...thisStyleImage,
                        width: '100%',
                        height: '100%',
                    }}
                    alt="Embedded"
                />
            </div>
        </div>

    );
};



export default ImageBlockComponent;