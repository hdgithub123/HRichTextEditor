import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EditorState } from 'draft-js';
import styles from './ImageInlineComponent.module.css'; // Đảm bảo bạn có file CSS tương ứng

const ImageComponentInline = (props) => {
  const { url, width, height, unit,styleImage } = props.contentState.getEntity(props.entityKey).getData();
  const { contentState, entityKey, children, blockKey, decoratedText, offsetKey, editorState, onImageSizeChange } = props;
  const [imgUrl, setImgUrl] = useState(url);
  const [imgWidth, setImgWidth] = useState(width);
  const [imgHeight, setImgHeight] = useState(height);
  const [imgUnit, setImgUnit] = useState(unit);
  const [thisStyleImage, setThisStyleImage] = useState(styleImage);
  const [isDragging, setIsDragging] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgUrl(url);
    setImgWidth(width);
    setImgHeight(height);
    setImgUnit(unit);
  }, [url, width, height, unit]);


  const handleOnDoubleClick = (e) => {
    // loại sự kiện click mặc định của thẻ image
    e.preventDefault();
    const blockInfo = {
      url,
      width,
      height,
      unit,
    }

    if (onImageSizeChange) {
      const imageinfo = {
        size: blockInfo,
        entityKey: entityKey
      }
      onImageSizeChange(imageinfo);
    }
  };

  const handleOnMouseDown = (e) => {
    // Chỉ xử lý sự kiện onMouseDown khi nhấn vào border
    if (e.target !== imgRef.current) return;

    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = imgRef.current.offsetWidth;
    const startHeight = imgRef.current.offsetHeight;
    let newWidth = null;
    let newHeight = null;

    const onMouseMove = (e) => {
      newWidth = startWidth + (e.clientX - startX);
      newHeight = startHeight + (e.clientY - startY);
      setImgWidth(newWidth);
      setImgHeight(newHeight);
    };

    const onMouseUp = (e) => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      const blockInfo = {
        ...thisStyleImage,
        url: imgUrl,
        width: newWidth?newWidth:width,
        height: newHeight?newHeight:height,
        unit: imgUnit,
      };
      
      if (onImageSizeChange) {
        const imageinfo = {
          size: blockInfo,
          entityKey: entityKey
        };
        onImageSizeChange(imageinfo);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={imgRef}
      className={`${styles.container} ${isDragging ? styles.dragging : ''}`}
      style={{
        width: `${imgWidth}${imgUnit}` || 'auto',
        height: `${imgHeight}${imgUnit}` || 'auto',
      }}
      onMouseDown={handleOnMouseDown}
      onDoubleClick={handleOnDoubleClick}
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
  );
};

export default ImageComponentInline;