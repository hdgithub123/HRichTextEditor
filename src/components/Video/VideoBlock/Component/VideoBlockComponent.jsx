import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EditorState, SelectionState } from 'draft-js';

import styles from './VideoBlockComponent.module.css'
import pxToUnit from '../function/pxToUnit';

const VideoBlockComponent = props => {
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
    const tag = data.get('videoTag');
    const style = data.get('styleVideo');
    const blockStyle = data.get('blockStyle');

    const [videoUrl, setImgUrl] = useState(url);
    const [videoWidth, setImgWidth] = useState(width);
    const [videoHeight, setImgHeight] = useState(height);
    const [videoUnit, setImgUnit] = useState(unit);
    const [videoTag, setVideoTag] = useState(tag);
    const [thisStyleVideo, setThisStyleVideo] = useState(style);


    const videoRef = useRef(null);
    const [ratioPxPerUnit, setRatioPxPerUnit] = useState(null);

    useEffect(() => {
        setImgUrl(url);
        setImgWidth(width);
        setImgHeight(height);
        setImgUnit(unit);
        setThisStyleVideo(style);
        setVideoTag(tag)
    }, [url, width, height, unit, style, tag]);


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
        if (e.target !== videoRef.current) return;
        // Ngăn chặn sự kiện chuột trên video
        videoRef.current.style.pointerEvents = 'none';

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = videoRef.current.offsetWidth;
        const startHeight = videoRef.current.offsetHeight;
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
            // Khôi phục sự kiện chuột trên video
            videoRef.current.style.pointerEvents = 'auto';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            const dataBlock = {
                url: videoUrl,
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
        <div data-tagtype="resizeBlock" style={blockStyle}>
            <div
                ref={videoRef}
                className={styles.container}
                style={{
                    width: `${videoWidth}${videoUnit}` || 'auto',
                    height: `${videoHeight}${videoUnit}` || 'auto',
                }}
                onMouseDown={handleOnMouseDown}
            //  onDoubleClick={handleOnDoubleClick}
            >
                {videoTag === 'video' && <video
                    src={videoUrl} controls autoPlay loop muted
                    width='100%'
                    height='100%'
                    style={{ border: 'none',pointerEvents:'auto' }}
                >
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>}

                {videoTag === 'iframe' && <iframe
                    width='100%'
                    height='100%'
                    src={videoUrl}
                    title="Embedded Video"
                    style={{ ...thisStyleVideo, border: 'none',pointerEvents:'auto' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>}
            </div>
        </div>

    );
};



export default VideoBlockComponent;