import React, { useEffect, useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import insertImage from '../function/insertImage';
import updateImage from '../function/updateImage';
import style from './ImageBlockToolBar.module.scss';
import { useOnClickOutside,useAutoAdjustAbsolutePosition } from '../../../utilities';
import getCurrentBlockType from '../../../utilities/getCurrentBlockType';
import handleUpload from '../../utilities/handleUpload'
import insertIcon from './insertImage.svg'
import updateIcon from './update.svg'
import uploadIcon from './upload.svg'
import imageIcon from './image.svg'
import { _NOTCHANGEBLOCK } from '../../../_constant/_constant';


const notChangeBlock = _NOTCHANGEBLOCK
const defaultBlockStyle = {
  display: 'flex',
  justifyContent: 'center',
}
const ImageBlockToolBar = ({ editorState, setEditorState }) => {

  const [view, setView] = useState(true);
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockKey = selectionState.getStartKey();
  const currentBlock = contentState.getBlockForKey(blockKey);
  let dataImage ={}
  // try {
  //    dataImage = currentBlock.getData().toJS();
  // } catch (error) {
  //    dataImage = currentBlock.getData();
  // }


  try {
    if (currentBlock && currentBlock.getData) {
      dataImage = currentBlock.getData().toJS ? currentBlock.getData().toJS() : currentBlock.getData();
    }
  } catch (error) {
    console.error('Error getting data from current block:', error);
  }

  const ref = useRef();
  const tableRef = useRef();
  const [show, setShow] = useState(false);

  const [url, setUrl] = useState(dataImage.url || '');
  const [width, setWidth] = useState(dataImage.width || '');
  const [height, setHeight] = useState(dataImage.height || '');
  const [unit, setUnit] = useState(dataImage.unit || 'px');
  const [objectFit, setObjectFit] = useState(dataImage.styleImage?.objectFit || 'fill');
  const [justifyContent, setJustifyContent] = useState(dataImage.blockStyle?.justifyContent || 'center');
  const [aspectRatio, setAspectRatio] = useState(null); // Thêm state để lưu tỷ lệ gốc của ảnh
  const [keepRatio, setKeepRatio] = useState(true); // Thêm state để lưu tỷ lệ gốc của ảnh


  const currentBlocktype = getCurrentBlockType({ editorState });



  useEffect(() => {

    if (notChangeBlock.includes(currentBlocktype)) {
      setView(false)
    } else {
      setView(true)
    }
  }, [currentBlocktype]);


  useEffect(() => {
    if (currentBlock) {
      setUrl(dataImage.url || '');
      setWidth(dataImage.width || '');
      setHeight(dataImage.height || '');
      setUnit(dataImage.unit || 'px');
      setObjectFit(dataImage.styleImage?.objectFit || 'fill');
      setJustifyContent(dataImage.blockStyle?.justifyContent || 'center');
    }

  }, [currentBlock]);


  const handleUpdateImage = () => {
    const dataImage = {
      url,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      unit,
      styleImage: {
        objectFit,
      },
      blockStyle: {
        ...defaultBlockStyle,
        justifyContent,
      },
    };

    updateImage({ editorState, setEditorState, dataImage })
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
      blockStyle: {
        ...defaultBlockStyle,
        justifyContent,
      },
    };
    insertImage({ editorState, setEditorState, dataImage });
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
        alert("Upload failed! The file is invalid.")
        console.error('Upload failed');
      }
    });
  };

  useAutoAdjustAbsolutePosition(tableRef,show)


  return (
    <div ref={ref} className={style.container}>
     {view && <button className={style.buttonclick} onClick={handleClick}>
        <img src={imageIcon} alt="Image"  title='Image Block' className={`${style.img} ${style.active}`} />
      </button>}
      {show && <div ref={tableRef} className={style.option}>
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
            <tr>
              <td>Justify:</td>
              <td>
                <select value={justifyContent} onChange={handleJustifyContentChange}>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </td>
            </tr>
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

export default ImageBlockToolBar;