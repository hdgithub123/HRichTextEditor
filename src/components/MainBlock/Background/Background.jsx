import React, { useEffect, useState, useRef } from 'react';
import style from './Background.module.scss';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import { ColorPicker, useOnClickOutside, useAutoAdjustAbsolutePosition, pxToUnit } from '../../utilities';
import handleUpload from '../../Image/utilities/handleUpload';
import getBackgroundStyle from '../function/getBackgroundStyle';
import getUnit from '../function/getUnit';
import backgroundIcon from './background.svg';
import uploadIcon from './upload.svg';
import insertIcon from './update.svg';

const units = ['px', 'mm', 'cm', '%', 'vw', 'vh'];
const verticalPositions = ['top', 'center', 'bottom'];
const horizontalPositions = ['left', 'center', 'right'];

const Background = ({ editorState, setEditorState }) => {
  const ref = useRef();
  const tableRef = useRef();
  const [show, setShow] = useState(false);

  // State cho các thuộc tính background
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundSize, setBackgroundSize] = useState('set');
  const [backgroundRepeat, setBackgroundRepeat] = useState('no-repeat');
  const [opacity, setOpacity] = useState(1);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('px');
  const [aspectRatio, setAspectRatio] = useState(null); // Tỷ lệ gốc của ảnh
  const [keepRatio, setKeepRatio] = useState(true); // Giữ tỷ lệ gốc

  const [verticalPosition, setVerticalPosition] = useState('center');
  const [horizontalPosition, setHorizontalPosition] = useState('center');
  const [horizontalOffset, setHorizontalOffset] = useState(''); // Lưu giá trị số khi chọn "set"
  const [verticalOffset, setVerticalOffset] = useState('');

  // viết 1 useEffect để lấy dữ liệu background từ editorState và điền vào các state
  useEffect(() => {
    const backgroundCss = getBackgroundStyle({ editorState }) || {};

    // Điền dữ liệu vào các state
    setBackgroundColor(backgroundCss.backgroundColor || 'transparent');
    // Xử lý backgroundImage
    const backgroundImage = backgroundCss.backgroundImage || '';
    const gradientMatch = backgroundImage.match(/rgba\(255,255,255,([\d.]+)\)/); // Lấy giá trị opacity từ gradient
    const urlMatch = backgroundImage.match(/url\((.*?)\)/); // Lấy URL từ backgroundImage

    if (gradientMatch) {
      const extractedOpacity = 1 - parseFloat(gradientMatch[1]); // Tính lại opacity
      setOpacity(extractedOpacity);
    }

    if (urlMatch) {
      const extractedUrl = urlMatch[1]; // Lấy URL từ chuỗi
      setBackgroundImage(extractedUrl);
    }

    setBackgroundRepeat(backgroundCss.backgroundRepeat || 'no-repeat');

    const [vertical, horizontal] = (backgroundCss.backgroundPosition || 'center center').split(' ');
    // kiểm tra nếu vertical có giá trị thuộc verticalPositions thì setVerticalPosition = vertical và VerticalOffset = '0mm', nếu không thì setVerticalPosition = 'set' và VerticalOffset = vertical
    if (verticalPositions.includes(vertical)) {
      setVerticalPosition(vertical);
      setVerticalOffset('0');
    } else {
      setVerticalPosition('set');
      setVerticalOffset(vertical.replace(/[^\d.]/g, '')); // Chỉ giữ lại phần số (bao gồm cả số thập phân)
    };
    // kiểm tra nếu horizontal có giá trị thuộc horizontalPositions thì setHorizontalPosition = horizontal và HorizontalOffset = '0mm', nếu không thì setHorizontalPosition = 'set' và HorizontalOffset = horizontal    
    if (horizontalPositions.includes(horizontal)) {
      setHorizontalPosition(horizontal);
      setHorizontalOffset('0');
    } else {
      setHorizontalPosition('set');
      setHorizontalOffset(horizontal.replace(/[^\d.]/g, '')); // Chỉ giữ lại phần số (bao gồm cả số thập phân)
    }

    if (backgroundCss.backgroundSize?.includes(' ')) {
      const [width, height] = backgroundCss.backgroundSize.split(' ');
      setWidth(width.replace(/[^\d.]/g, '')); // Giữ lại cả số và dấu thập phân
      setHeight(height.replace(/[^\d.]/g, '')); // Giữ lại cả số và dấu thập phân
      setBackgroundSize('set');
    } else {
      setBackgroundSize(backgroundCss.backgroundSize || 'cover');

      const img = new Image();
      img.onload = () => {
        const convertedWidth = pxToUnit(img.width, unit); // Chuyển đổi width từ px sang unit
        const convertedHeight = pxToUnit(img.height, unit); // Chuyển đổi height từ px sang unit

        setWidth(convertedWidth);
        setHeight(convertedHeight);
        setAspectRatio(img.width / img.height); // Tính và lưu tỷ lệ gốc
      };
      img.src = urlMatch; // Load ảnh từ URL
    }

    const unit = getUnit({ editorState }) || 'px';
    setUnit(unit);
  }, [editorState]);


  useEffect(() => {
    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height; // Tính tỷ lệ gốc
        setAspectRatio(ratio); // Lưu tỷ lệ gốc vào state
      };
      img.src = backgroundImage; // Load ảnh từ URL
    }
  }, [backgroundImage, unit]); // Chạy lại khi backgroundImage hoặc unit thay đổi


  // Hàm xử lý cập nhật backgroundCss
  const handleUpdateBackground = () => {
    const computedBackgroundSize =
      backgroundSize === 'set' && width && height
        ? `${width}${unit} ${height}${unit}`
        : backgroundSize;

    const backgroundCss = {
      // backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundImage: backgroundImage
        ? `linear-gradient(rgba(255,255,255,${1 - opacity}), rgba(255,255,255,${1 - opacity})), url(${backgroundImage})`
        : 'none',
      backgroundSize: computedBackgroundSize,
      backgroundPosition: `${verticalPosition === 'set' ? `${verticalOffset}${unit}` : verticalPosition} ${horizontalPosition === 'set' ? `${horizontalOffset}${unit}` : horizontalPosition}`,
      backgroundRepeat,
      // opacity,
      backgroundColor,
      // margin: `${marginTop}${unit} ${marginRight}${unit} ${marginBottom}${unit} ${marginLeft}${unit}`,
    };

    const newContentState = addAndUpdateMainBlock({ editorState, backgroundCss });
    setEditorState(newContentState);
  };

  // Xử lý khi click ngoài component
  useOnClickOutside(ref, () => setShow(false));

  // Xử lý hiển thị bảng tùy chọn
  const handleClick = () => {
    setShow(true);
  };

  // Xử lý khi thay đổi URL
  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setBackgroundImage(newUrl);
    const img = new Image();
    img.onload = () => {
      const convertedWidth = pxToUnit(img.width, unit); // Chuyển đổi width từ px sang unit
      const convertedHeight = pxToUnit(img.height, unit); // Chuyển đổi height từ px sang unit

      setWidth(convertedWidth);
      setHeight(convertedHeight);
      setAspectRatio(img.width / img.height); // Tính và lưu tỷ lệ gốc
    };
    img.src = newUrl; // Load ảnh từ URL
  };

  // Xử lý khi thay đổi chiều rộng
  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setWidth(newWidth);
    if (aspectRatio && keepRatio) {
      setHeight(newWidth / aspectRatio); // Cập nhật chiều cao dựa trên tỷ lệ gốc
    }
  };

  // Xử lý khi thay đổi chiều cao
  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    if (aspectRatio && keepRatio) {
      setWidth(newHeight * aspectRatio); // Cập nhật chiều rộng dựa trên tỷ lệ gốc
    }
  };

  // Xử lý khi thay đổi đơn vị
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  // Xử lý khi thay đổi giữ tỷ lệ
  const handleKeepRatioChange = (e) => {
    setKeepRatio(e.target.checked);
  };

  // Xử lý upload ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file, (success, url) => {
      if (success) {
        setBackgroundImage(url);
        const img = new Image();
        img.onload = () => {
          const convertedWidth = pxToUnit(img.width, unit); // Chuyển đổi width từ px sang unit
          const convertedHeight = pxToUnit(img.height, unit); // Chuyển đổi height từ px sang unit

          setWidth(convertedWidth);
          setHeight(convertedHeight);

          setAspectRatio(img.width / img.height); // Tính và lưu tỷ lệ gốc
        };
        img.src = url; // Load ảnh từ URL
      } else {
        alert('Upload failed! The file is invalid.');
        console.error('Upload failed');
      }
    });
  };

  const handleHorizontalPositionChange = (e) => {
    const value = e.target.value;
    setHorizontalPosition(value);
  };

  const handleHorizontalOffsetChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
      setHorizontalOffset(value); // Cập nhật giá trị nhập
    }
  };


  const handleVerticalPositionChange = (e) => {
    const value = e.target.value;
    setVerticalPosition(value);
  };

  const handleVerticalOffsetChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
      setVerticalOffset(value); // Cập nhật giá trị nhập
    }
  };




  useAutoAdjustAbsolutePosition(tableRef, show);

  return (
    <div ref={ref} className={style.container}>
      <button className={style.buttonclick} onClick={handleClick}>
        <img src={backgroundIcon} alt="Background" title="Background" className={style.img} />
      </button>
      {show && (
        <div ref={tableRef} className={style.option}>
          <table>
            <tbody>
              <tr>
                <td>Background Color:</td>
                <td>
                  <div title='Background color' className={style.colorPicker}>
                    <ColorPicker
                      onChange={(color) => setBackgroundColor(color)}
                      curentColor={backgroundColor}
                      isUnlimitedColor={true}
                    >
                    </ColorPicker>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Background Image:</td>
                <td>
                  <input type="text" placeholder='enter url' value={backgroundImage} onChange={handleUrlChange} />
                </td>
              </tr>
              <tr>
                <td>Background Size:</td>
                <td>
                  <select value={backgroundSize} onChange={(e) => setBackgroundSize(e.target.value)}>
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                    <option value="set">Set</option>
                  </select>
                </td>
              </tr>
              {backgroundSize === 'set' && (

                <tr>
                  <td>Width:</td>
                  <td>
                    <input type="number" value={width} onChange={handleWidthChange} />
                  </td>
                </tr>)}
              {backgroundSize === 'set' && (<tr>
                <td>Height:</td>
                <td>
                  <input type="number" value={height} onChange={handleHeightChange} />
                </td>
              </tr>)}
              <tr>
                <td>Unit:</td>
                <td>
                  <select disabled={true} value={unit} onChange={handleUnitChange}>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              {backgroundSize === 'set' && (<tr>
                <td>Keep Origin Ratio:</td>
                <td>
                  <input type="checkbox" checked={keepRatio} onChange={handleKeepRatioChange} />
                </td>
              </tr>)}

              <tr>
                <td>Vertical Position:</td>
                <td>
                  <div className={style.position}>
                    <select
                      value={verticalPosition}
                      onChange={handleVerticalPositionChange}
                    >
                      {verticalPositions.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                      <option value="set">Set</option> {/* Thêm tùy chọn "set" */}
                    </select>
                    {verticalPosition === 'set' && (
                      <input
                        type="number"
                        min="0"
                        style={{ width: '100px' ,paddingLeft:'5px'}}
                        value={verticalOffset}
                        onChange={handleVerticalOffsetChange}
                        placeholder="Enter offset"
                      />
                    )}
                  </div>
                </td>

              </tr>
              <tr>
                <td>Horizontal Position:</td>
                <td>
                  <div className={style.position}>
                    <select
                      value={horizontalPosition}
                      onChange={handleHorizontalPositionChange}
                    >
                      {horizontalPositions.map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                      <option value="set">Set</option> {/* Thêm tùy chọn "set" */}
                    </select>
                    {horizontalPosition === 'set' && (
                      <input
                        type="number"
                        min="0"
                        style={{ width: '100px' ,paddingLeft:'5px'}}
                        value={horizontalOffset}
                        onChange={handleHorizontalOffsetChange}
                        placeholder="Enter offset"
                      />
                    )}
                  </div>
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
                <td>Image Opacity:</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={opacity * 100} // Chuyển giá trị từ 0-1 sang 0-100
                    onChange={(e) => setOpacity(parseFloat(e.target.value) / 100)} // Chuyển giá trị từ 0-100 về 0-1
                  />
                  <span>{Math.round(opacity * 100)}%</span> {/* Hiển thị giá trị phần trăm */}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={style.buttonArea}>
            <div className={style.buttonFunction}>
              <button onClick={handleUpdateBackground}>
                <img src={insertIcon} alt="Update" className={`${style.img} ${style.active}`} />
                <span>Update</span>
              </button>
            </div>

            <label className={style.uploadButton}>
              <img src={uploadIcon} alt="Upload" className={style.img} />
              <span>Upload Image</span>
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
          </div>

        </div>
      )}
    </div>
  );
};

export default Background;