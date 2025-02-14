import React, { useEffect, useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import insertVideo from '../function/insertVideo';
import updateVideo from '../function/updateVideo';
import style from './VideoBlockToolBar.module.scss';
import useOnClickOutside from '../../../utilities/useOnClickOutside';
import getCurrentBlockType from '../../../utilities/getCurrentBlockType';
import insertIcon from './videoInsert.svg'
import ResetIcon from './erase.svg'
import imageIcon from './videoAdd.svg'
import { _NOTCHANGEBLOCK } from '../../../_constant/_constant';


const notChangeBlock = _NOTCHANGEBLOCK
const defaultBlockStyle = {
  display: 'flex',
  justifyContent: 'center',
}
const VideoBlockToolBar = ({ editorState, setEditorState }) => {

  const [view, setView] = useState(true);
  const ref = useRef();
  const [show, setShow] = useState(false);

  const [url, setUrl] = useState('');
  const [width, setWidth] = useState( '800');
  const [height, setHeight] = useState('450');
  const [unit, setUnit] = useState('px');
  const [videoTag,SetVieoTag] = useState('iframe');
  const [justifyContent, setJustifyContent] = useState('center');
  const [aspectRatio, setAspectRatio] = useState(800/450); // Thêm state để lưu tỷ lệ gốc của ảnh
  const [keepRatio, setKeepRatio] = useState(true); // Thêm state để lưu tỷ lệ gốc của ảnh


  const currentBlocktype = getCurrentBlockType({ editorState });



  useEffect(() => {

    if (notChangeBlock.includes(currentBlocktype)) {
      setView(false)
    } else {
      setView(true)
    }
  }, [currentBlocktype]);


  const handleInsertImage = () => {
    const dataVideo = {
      url,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      unit,
      videoTag,
      styleVideo: {
        objectFit: 'fill',
      },
      blockStyle: {
        ...defaultBlockStyle,
        justifyContent,
      },
    };
    insertVideo({ editorState, setEditorState, dataVideo });

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

  const handleVideoTagChange = (e) => {
    SetVieoTag(e.target.value);
  }

  const handleJustifyContentChange = (e) => {
    setJustifyContent(e.target.value)
  }

  const handleKeepRatioChange = (e) => {
    setKeepRatio(e.target.checked);
    if (e.target.checked){
      setAspectRatio(width/height)
    }
  };


  const handleReset = () =>{
    setUrl('');
      setWidth('800');
      setHeight('450');
      setUnit('px');
      SetVieoTag('iframe')
      setJustifyContent('center');
  }

  return (
    <div ref={ref} className={style.container}>
     {view && <button className={style.buttonclick} onClick={handleClick}>
        <img src={imageIcon} alt="Image"  title='Image Block' className={`${style.img} ${style.active}`} />
      </button>}
      {show && <div className={style.option}>
        <table>
          <tbody>
            <tr>
              <td>URL:</td>
              <td><input type="text" placeholder='Enter Url' value={url} onChange={handleUrlChange} /></td>
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
              <td>Video Farme Type:</td>
              <td>
                <label>
                  <input
                    type="radio"
                    value="iframe"
                    checked={videoTag === 'iframe'}
                    onChange={handleVideoTagChange}
                  />
                  iframe
                </label>
                <label>
                  <input
                    type="radio"
                    value="video"
                    checked={videoTag === 'video'}
                    onChange={handleVideoTagChange}
                  />
                  video
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
          <button title='Reset' onClick={handleReset}>
            <img src={ResetIcon} alt="Reset" className={`${style.img} ${style.active}`} />
            <span>Reset</span>
          </button>
        </div>
      </div>}
    </div>
  );
};

export default VideoBlockToolBar;