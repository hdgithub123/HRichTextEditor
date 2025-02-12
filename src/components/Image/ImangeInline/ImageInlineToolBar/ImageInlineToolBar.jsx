import React, { useEffect, useState, useRef } from 'react';
import { EditorState } from 'draft-js';

import addImageInline from '../function/addImageInline'
import updateImageInline from '../function/updateImageInline';
import style from './ImageInlineToolBar.module.scss';
import useOnClickOutside from '../../../utilities/useOnClickOutside';
import getCurrentBlock from '../../../utilities/getCurrentBlock';
import handleUpload from '../../utilities/handleUpload'
import insertIcon from './insertImage.svg'
import updateIcon from './update.svg'
import uploadIcon from './upload.svg'
import imageIcon from './image.svg'
import { _NOTCHANGEBLOCK } from '../../../_constant/_constant';


const notChangeBlock = _NOTCHANGEBLOCK
const defaultImageInfo = {
    styleImage: { objectFit: 'contain' }
}
const ImageInlineToolBar = ({ editorState, setEditorState, infoImageInline }) => {


    // if (infoImageInline){
    //     return null
    // }
    //   const [view, setView] = useState(true);
    //   const [url,width,height,unit, styleImage] = infoImageInline
    //   const [objectFit] = styleImage

    //updateImageInline({ entityKey: infoImageInline.entityKey, imageInfo: infoImageInline.properties, editorState, setEditorState });
    console.log("infoImageInline",infoImageInline)
    const infoImage = infoImageInline.properties
    // const entityKey = infoImageInline.entityKey
    const ref = useRef();
    const [show, setShow] = useState(false);

   
    const [entityKey, setEntityKey] = useState(null);
    const [url, setUrl] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState();
    const [unit, setUnit] = useState('px');
    const [objectFit, setObjectFit] = useState('fill');
    
    const [aspectRatio, setAspectRatio] = useState(null); // Thêm state để lưu tỷ lệ gốc của ảnh
    const [keepRatio, setKeepRatio] = useState(true); // Thêm state để lưu tỷ lệ gốc của ảnh


    //   const currentBlocktype = getCurrentBlock({ editorState });

    //   useEffect(() => {

    //     if (notChangeBlock.includes(currentBlocktype)) {
    //       setView(false)
    //     } else {
    //       setView(true)
    //     }
    //   }, [currentBlocktype]);



        useEffect(() => {

        if (infoImage) {
            setEntityKey(infoImageInline.entityKey)
            setUrl(infoImage.url)
            setWidth(infoImage.width)
            setHeight(infoImage.height)
            setUnit(infoImage.unit)
            setObjectFit(infoImage.styleImage.objectFit || null)
        } else {
          
        }
      }, [infoImage]);


    useEffect(() => {
        if (infoImage) {
            setUrl(infoImage.url);
            setWidth(infoImage.width);
            setHeight(infoImage.height || '');
            setUnit(infoImage.unit || 'px');
            setObjectFit(infoImage.styleImage?.objectFit || 'fill');
        }

    }, [infoImage]);


    const handleUpdateImage = () => {
        const dataImage = {
                url,
                width: parseInt(width, 10),
                height: parseInt(height, 10),
                unit,
                styleImage: {
                    objectFit,
                },

        };

        
        updateImageInline({ entityKey, imageInfo: dataImage, editorState, setEditorState });
        // updateImageInline = ({ entityKey, imageInfo: dataImage, editorState, setEditorState })
    };


    const handleInsertImage = () => {
        const dataImage = {
            url,
            width: parseInt(width, 10),
            height: parseInt(height, 10),
            unit,
            styleImage: {
                objectFit,
            },
        };

        addImageInline({ editorState, setEditorState, imageInfo: dataImage });
    };

    const handleClick = () => {
        setShow(true);
    }


    useOnClickOutside(ref, () => {
        setShow(false);
    })


    const handleUrlChange = (e) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        const img = new Image();
        img.onload = () => {
            setWidth(img.width);
            setHeight(img.height);
            setUnit('px'); // Đặt đơn vị là px
            setAspectRatio(img.width / img.height); // Tính và lưu tỷ lệ gốc
        };
        img.src = newUrl; // Load ảnh từ URL
    }

    const handleWidthChange = (e) => {
        const newWidth = e.target.value;
        setWidth(newWidth);
        if (aspectRatio && keepRatio) {
            setHeight(newWidth / aspectRatio); // Cập nhật chiều cao dựa trên tỷ lệ gốc
        }
    }

    const handleHeightChange = (e) => {
        const newHeight = e.target.value;
        setHeight(newHeight);
        if (aspectRatio && keepRatio) {
            setWidth(newHeight * aspectRatio); // Cập nhật chiều rộng dựa trên tỷ lệ gốc
        }
    }

    const handleUnitChange = (e) => {
        setUnit(e.target.value)
    }

    const handleObjectFitChange = (e) => {
        setObjectFit(e.target.value);
    }

    const handleJustifyContentChange = (e) => {
        setJustifyContent(e.target.value)
    }

    const handleKeepRatioChange = (e) => {
        setKeepRatio(e.target.checked);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleUpload(file, (success, url) => {
            if (success) {
                setUrl(url);
                const img = new Image();
                img.onload = () => {
                    setWidth(img.width);
                    setHeight(img.height);
                    setUnit('px'); // Đặt đơn vị là px
                    setAspectRatio(img.width / img.height); // Tính và lưu tỷ lệ gốc
                };
                img.src = url; // Load ảnh từ URL
            } else {
                console.error('Upload failed');
            }
        });
    };

    return (
        <div ref={ref} className={style.container}>
            <button className={style.buttonclick} onClick={handleClick}>
                <img src={imageIcon} alt="Image" className={`${style.img} ${style.active}`} />
            </button>
            {show && <div className={style.option}>
                <table>
                    <tbody>
                        <tr>
                            <td>URL:</td>
                            <td><input type="text" value={url} onChange={handleUrlChange} /></td>
                        </tr>
                        <tr>
                            <td>Width:</td>
                            <td><input type="number" value={width} onChange={handleWidthChange} /></td>
                        </tr>
                        <tr>
                            <td>Height:</td>
                            <td><input type="number" value={height} onChange={handleHeightChange} /></td>
                        </tr>
                        <tr>
                            <td>Unit:</td>
                            <td>
                                <select value={unit} onChange={handleUnitChange}>
                                    <option value="px">px</option>
                                    <option value="mm">mm</option>
                                    <option value="cm">cm</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Keep Ratio:</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={keepRatio}
                                    onChange={handleKeepRatioChange}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Image Fill:</td>
                            <td>
                                <label>
                                    <input
                                        type="radio"
                                        value="contain"
                                        checked={objectFit === 'contain'}
                                        onChange={handleObjectFitChange}
                                    />
                                    Fix Ratio
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="fill"
                                        checked={objectFit === 'fill'}
                                        onChange={handleObjectFitChange}
                                    />
                                    Fill
                                </label>
                            </td>
                        </tr>
                        {/* <tr>
                            <td>Justify:</td>
                            <td>
                                <select value={justifyContent} onChange={handleJustifyContentChange}>
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
                <div className={style.buttonFunction}>
                    <button title='Insert' onClick={handleInsertImage}>
                        <img src={insertIcon} alt="Insert" className={`${style.img} ${style.active}`} />
                        <span>Insert</span>
                    </button>
                    <button title='Update' onClick={handleUpdateImage}>
                        <img src={updateIcon} alt="Update" className={`${style.img} ${style.active}`} />
                        <span>Update</span>
                    </button>
                </div>
                {/* <button onClick={()=>{ console.log("Da upload")}}>Upload BLOCK Image</button> */}
                <label className={style.uploadButton}>
                    <img src={uploadIcon} alt="Update" className={`${style.img} ${style.active}`} />
                    <span>Upload Image</span>
                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                </label>
                {/* <input type="file" onChange={handleFileChange} ></input> */}
            </div>}
        </div>
    );
};

export default ImageInlineToolBar;