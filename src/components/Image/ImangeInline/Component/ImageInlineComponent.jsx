import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EditorState } from 'draft-js';
import  pxToUnit  from '../function/pxToUnit';
import styles from './ImageInlineComponent.module.css';

const ImageComponentInline = (props) => {
  const { url, width, height, unit, styleImage } = props.contentState.getEntity(props.entityKey).getData();
  const { contentState, entityKey, children, blockKey, decoratedText, offsetKey, editorState, onImageSizeChange } = props;
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
    setThisStyleImage(styleImage)
  }, [url, width, height, unit,styleImage]);

  //lấy chiều dài, cao của imgRef thì làm thế nào?
  useEffect(() => {
    if (unit === 'px') {
      setRatioPxPerUnit(1);
    } else {
      const ratio = pxToUnit(1, unit);
      setRatioPxPerUnit(ratio);
    }
  }, [width, height, unit]);


  const handleOnDoubleClick = (e) => {
    // loại sự kiện click mặc định của thẻ image
    e.preventDefault();
    const blockInfo = {
      url,
      width: imgWidth,
      height: imgHeight,
      unit: imgUnit,
      styleImage: thisStyleImage,
    }

    if (onImageSizeChange) {
      const imageinfo = {
        properties: blockInfo,
        entityKey: entityKey
      }
      onImageSizeChange(imageinfo);
    }
  };

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
      const blockInfo = {
        ...thisStyleImage,
        url: imgUrl,
        width: newWidth ? newWidth * ratioPxPerUnit : startWidth * ratioPxPerUnit,
        height: newHeight ? newHeight * ratioPxPerUnit : startHeight * ratioPxPerUnit,
        unit: unit,
        styleImage: thisStyleImage,
      };

      if (onImageSizeChange) {
        const imageinfo = {
          properties: blockInfo,
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
    tagType="resize"
      ref={imgRef}
      className={styles.container }
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

// Hàm chuyển đổi giữa px và các đơn vị khác
