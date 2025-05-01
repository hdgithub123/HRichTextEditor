import React, { useEffect, useState, useRef } from 'react';
import style from './Background.module.scss';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';
import backgroundIcon from './background.svg';

const Background = ({ editorState, setEditorState }) => {
  const ref = useRef();
  const tableRef = useRef();
  const [show, setShow] = useState(false);

  // State cho các thuộc tính background
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundSize, setBackgroundSize] = useState('cover');
  const [backgroundPosition, setBackgroundPosition] = useState('center');
  const [backgroundRepeat, setBackgroundRepeat] = useState('no-repeat');
  const [opacity, setOpacity] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  // Hàm xử lý cập nhật backgroundCss
  const handleUpdateBackground = () => {
    const backgroundCss = {
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundSize,
      backgroundPosition,
      backgroundRepeat,
      opacity,
      backgroundColor,
    };

    // addAndUpdateMainBlock({
    //   editorState,
    //   backgroundCss,
    // });


    const newContentState = addAndUpdateMainBlock({ editorState, backgroundCss: backgroundCss });
    setEditorState(newContentState);

  };

  // Xử lý khi click ngoài component
  useOnClickOutside(ref, () => setShow(false));

  // Xử lý hiển thị bảng tùy chọn
  const handleClick = () => {
    setShow(true);
  };

  return (
    <div ref={ref} className={style.container}>
      <button className={style.buttonclick} onClick={handleClick}>
        <img src={backgroundIcon} alt="Background" title="Background Block" className={style.img} />
      </button>
      {show && (
        <div ref={tableRef} className={style.option}>
          <table>
            <tbody>
              <tr>
                <td>Background Image:</td>
                <td>
                  <input
                    type="text"
                    value={backgroundImage}
                    onChange={(e) => setBackgroundImage(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Background Size:</td>
                <td>
                  <select
                    value={backgroundSize}
                    onChange={(e) => setBackgroundSize(e.target.value)}
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Background Position:</td>
                <td>
                  <select
                    value={backgroundPosition}
                    onChange={(e) => setBackgroundPosition(e.target.value)}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Background Repeat:</td>
                <td>
                  <select
                    value={backgroundRepeat}
                    onChange={(e) => setBackgroundRepeat(e.target.value)}
                  >
                    <option value="no-repeat">No Repeat</option>
                    <option value="repeat">Repeat</option>
                    <option value="repeat-x">Repeat X</option>
                    <option value="repeat-y">Repeat Y</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Opacity:</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td>Background Color:</td>
                <td>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={style.buttonFunction}>
            <button onClick={handleUpdateBackground}>Update Background</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Background;