// import React, { useState, useEffect, useRef } from 'react';
// import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
// import { defaultEditorStyle, _UNIT } from '../../_constant/_constant';
// import getMainblockStyle from '../function/getMainblockStyle';
// import styles from './PageLayout.module.scss';
// import imageIcon from './pageSetup.svg';
// import applyIcon from './pageSetup.svg';
// import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';

// const units = _UNIT

// const PageLayout = ({ editorState, setEditorState }) => {
//     const [pageSetup, setPageSetup] = useState({});
//     const [unit, setUnit] = useState('px'); // Đơn vị tính duy nhất
//     const [show, setShow] = useState(false);
//     const ref = useRef();
//     const blockSetupRef = useRef();

//     const handlePageHeightChange = (e) => {
//         const { name, value } = e.target;
//         setStyle((prevStyle) => ({
//             ...prevStyle,
//             [name]: value,
//         }));
//     };

//     const handleUnitChange = (e) => {
//         setUnit(e.target.value);
//     };


//     const handleIsRepeatTheadChange = (e) => {
//         const { value } = e.target;
//         setPageSetup((prevPageSetup) => ({
//             ...prevPageSetup,
//             isRepeatThead: value,
//         }));
//     };



//     const handlepageHeightCheckChange = (e) => {
//         const { name, checked } = e.target;
//         setStyle((prevStyle) => ({
//             ...prevStyle,
//             [name]: checked ? 'auto' : '',
//         }));
//     };

//     const handlePositonPageNumberChange = (e) => {
//         const { value } = e.target;
//         setPageSetup((prevPageSetup) => ({
//             ...prevPageSetup,
//             pageNumber: {
//                 ...prevPageSetup.pageNumber,
//                 position: value,
//             },
//         }));
//     };



//     const handlepageNumberfomatChange = (e) => {
//         const { value } = e.target;
//         setPageSetup((prevPageSetup) => ({
//             ...prevPageSetup,
//             pageNumber: {
//                 ...prevPageSetup.pageNumber,
//                 format: value,
//             },
//         }));
//     };


//     const handlepageNumberStyleChange = (e) => {
//         const { value } = e.target;
//         setPageSetup((prevPageSetup) => ({
//             ...prevPageSetup,
//             pageNumber: {
//                 ...prevPageSetup.pageNumber,
//                 style: value,
//             },
//         }));
//     };





//     useEffect(() => {
//         const blockStyle = getMainblockStyle({ editorState });
//         if (blockStyle) {
//             let foundUnit = null;
//             const newBlockStyle = Object.keys(blockStyle).reduce((acc, key) => {
//                 const value = blockStyle[key];
//                 const unit = findUnit(value);
//                 if (!foundUnit && unit) {
//                     foundUnit = unit;
//                 }
//                 acc[key] = removeUnit(value);
//                 return acc;
//             }, {});
//             setStyle(newBlockStyle);
//             if (foundUnit) {
//                 setUnit(foundUnit);
//             }
//         }
//     }, [editorState]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newStyle = Object.keys(style).reduce((acc, key) => {
//             const value = style[key];
//             // Kiểm tra nếu giá trị có chứa chữ số thì thêm đơn vị tính, nếu không thì giữ nguyên
//             acc[key] = /\d/.test(value) ? value + unit : value;
//             return acc;
//         }, {});
//         const newContentState = addAndUpdateMainBlock({ editorState, style: newStyle });
//         setEditorState(newContentState);
//     };

//     const handleClick = () => {
//         setShow(true);
//     };
//     useOnClickOutside(ref, () => {
//         setShow(false);
//     });

//     useAutoAdjustAbsolutePosition(blockSetupRef, show);

//     return (
//         <div ref={ref} className={styles.container}>
//             <button className={styles.button} onMouseDown={handleClick}>
//                 <img src={imageIcon} alt="Page Setup" title="Page Setup" className={`${styles.img} ${styles.active}`} />
//             </button>
//             {show && (
//                 <div ref={blockSetupRef} className={styles.formContainer}>
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <td>Page Height: </td>
//                                 <td>
//                                     <input type="number" name="pageHeight" value={pageSetup.pageHeight} onChange={handlePageHeightChange} disabled={pageSetup.pageHeight === '100%'}/>
//                                 </td>
//                                 <td colSpan={2}>
//                                     <select value={unit} onChange={handleUnitChange}>
//                                         {units.map((unit) => (
//                                             <option key={unit} value={unit}>
//                                                 {unit}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </td>
//                                 <td>
//                                     <input type="checkbox" title={pageSetup.pageHeight === '100%' ? 'manual' : '100%'} name="pageHeight" checked={pageSetup.pageHeight === '100%'} onChange={handlepageHeightCheckChange} />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>Table Header Repeat: </td>
//                                 <td>
//                                     <input type="checkbox" title={pageSetup.isRepeatThead === true ? 'Repeat' : 'Not Repeat'} name="isRepeatThead" checked={pageSetup.isRepeatThead === true} onChange={handleIsRepeatTheadChange} />
//                                 </td>
//                             </tr>

//                             <tr>
//                                 <td>PageNumber Position: </td>
//                                 <td>
//                                     <select value={pageSetup.pageNumber.position} onChange={handlePositonPageNumberChange}>
//                                         <option value="top-left">Top Left</option>
//                                         <option value="top-center">Top Center</option>
//                                         <option value="top-right">Top Right</option>
//                                         <option value="bottom-left">Bottom Left</option>
//                                         <option value="bottom-center">Bottom Center</option>
//                                         <option value="bottom-right">Bottom Right</option>
//                                     </select>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>PageNumber format: </td>
//                                 <td>
//                                     <input type="text" name="format" value={pageSetup.pageNumber.format} onChange={handlepageNumberfomatChange} />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>PageNumber style: </td>
//                                 <td>
//                                     <input type="text" name="pageNumberStyle" value={pageSetup.pageNumber.style} onChange={handlepageNumberStyleChange} />
//                                 </td>
//                             </tr>

//                         </tbody>
//                     </table>
//                     <div className={styles.applyButton}>
//                         <button title='Apply' onClick={handleSubmit}>
//                             <img src={applyIcon} alt="Apply" className={`${styles.img} ${styles.active}`} />
//                             <span>Apply</span>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PageLayout;

// const removeUnit = (value) => {
//     for (let unit of units) {
//         if (value.endsWith(unit)) {
//             return value.slice(0, -unit.length);
//         }
//     }
//     return value;
// };

// const findUnit = (value) => {
//     for (let unit of units) {
//         if (value.endsWith(unit)) {
//             return unit;
//         }
//     }
//     return null;
// };



import React, { useState, useEffect, useRef } from 'react';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import getPageSetup from '../function/getPageSetup';
import styles from './PageLayout.module.scss';
import imageIcon from './printSetup.svg';
import applyIcon from './printSetup.svg';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';
import { _UNIT, _COLORS, _FONTFAMILY, _FONTSIZES } from '../../_constant/_constant';

const units = _UNIT
const colorOptions = ['not set', ..._COLORS];
const fontFamilyOptions = ["not set",..._FONTFAMILY];
const fontSizeOptions = ["not set",..._FONTSIZES.map(size => `${size}pt`)];

const PageLayout = ({ editorState, setEditorState }) => {
    const [pageSetup, setPageSetup] = useState({
        pageHeight: '',
        isRepeatThead: false,
        pageNumber: { position: '', format: '', style: '' }
    });
    const [unit, setUnit] = useState('px'); // Đơn vị mặc định
    const [pageHeight, setPageHeight] = useState(''); // Đơn vị mặc định
    
    const [pageNumberStyle, setPageNumberStyle] = useState({
        display: '',
        fontFamily: '',
        fontSize: '',
        color: '',
       
    });


    const [show, setShow] = useState(false);
    const ref = useRef();
    const blockSetupRef = useRef();
  

    // 🎯 Cập nhật pageSetup từ editorState
    useEffect(() => {
        const pageSetup = getPageSetup({ editorState });
        if (pageSetup) {
            setPageSetup(pageSetup);
            setPageHeight(removeUnit(pageSetup.pageHeight) || '');
            setUnit(findUnit(pageSetup.pageHeight) || 'px');
            setPageNumberStyle(pageSetup.pageNumber.style)
        }
    }, [editorState]);

    // 🎯 Xử lý tất cả các thay đổi form
    const handleTableHeaderRepeatChange = (e) => {
        const { name, value, checked, type } = e.target;
        setPageSetup((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePageHeightChange = (e) => {
        const { name, value } = e.target;
        setPageHeight(value);
        setPageSetup((prev) => ({
            ...prev,
            pageHeight: value + unit
        }));

    };
     
    const handlePageHeightCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setPageSetup((prev) => ({
                ...prev,
                pageHeight: '100%',
            }))
        } else {
            setPageSetup((prev) => ({
                ...prev,
                pageHeight: pageHeight + unit
            }));
        }
        
    };


    const handlePageNumberChange = (e) => {
        const { name, value } = e.target;
        setPageSetup((prev) => ({
            ...prev,
            pageNumber: { ...prev.pageNumber, [name]: value }
        }));
    };

    
    
    
    const handleIsPageNumberDisplayChange = (e) => {
        const { name, checked } = e.target;
        setPageNumberStyle((prev) => ({
            ...prev,
            display: checked? ' ' : 'none'
        }));
    };


    const handleFontFamilyChange = (e) => {
        const { value } = e.target;
        setPageNumberStyle((prev) => ({
            ...prev,
            fontFamily: value
        }));
    };

    const handleFontSizeChange = (e) => {
        const { value } = e.target;
        setPageNumberStyle((prev) => ({
            ...prev,
            fontSize: value
        }));
    }

    const handleFontColorChange = (e) => {
        const { value } = e.target;
        setPageNumberStyle((prev) => ({
            ...prev,
            color: value
        }));
    }

    // 🎯 Gửi dữ liệu khi nhấn Apply
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPageSetup = {
            ...pageSetup,
            pageNumber: {
                ...pageSetup.pageNumber,
                style: pageNumberStyle
            }
        };
        const newContentState = addAndUpdateMainBlock({ editorState, pageSetup: newPageSetup });
        setEditorState(newContentState);
    };

    useOnClickOutside(ref, () => setShow(false));
    useAutoAdjustAbsolutePosition(blockSetupRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button className={styles.button} onMouseDown={() => setShow(true)}>
                <img src={imageIcon} alt="Print Setup" title='Print Setup' className={`${styles.img} ${styles.active}`} />
            </button>

            {show && (
                <div ref={blockSetupRef} className={styles.formContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Page Height:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="pageHeight"
                                        value={pageHeight}
                                        onChange={handlePageHeightChange}
                                        disabled={pageSetup.pageHeight === '100%'}
                                    />
                                    <select name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} disabled={pageSetup.pageHeight === '100%'}>
                                        {_UNIT.map((u) => (
                                            <option key={u} value={u}>
                                                {u}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="checkbox"
                                        name="pageHeight"
                                        checked={pageSetup.pageHeight === '100%'}
                                        onChange={handlePageHeightCheckboxChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Table Header Repeat:</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        name="isRepeatThead"
                                        checked={pageSetup.isRepeatThead}
                                        onChange={handleTableHeaderRepeatChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                            <td style={{justifyContent:'center', textAlign:'center'}} colSpan={2}>
                                <span>Page number</span> 
                                <input
                                        type="checkbox"
                                        name="isPageNumber"
                                        checked={pageNumberStyle.display !== 'none'}
                                        onChange={handleIsPageNumberDisplayChange}
                                    />

                                </td>
                                
                            </tr>
                            <tr>
                                <td>Position:</td>
                                <td>
                                    <select name="position" value={pageSetup.pageNumber.position} onChange={handlePageNumberChange} disabled={pageNumberStyle.display==='none'}>
                                        <option value="top-left">Top Left</option>
                                        <option value="top-center">Top Center</option>
                                        <option value="top-right">Top Right</option>
                                        <option value="bottom-left">Bottom Left</option>
                                        <option value="bottom-center">Bottom Center</option>
                                        <option value="bottom-right">Bottom Right</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Format:</td>
                                <td>
                                    <input type="text" placeholder='Ex: Page: {page}/{Pages}' name="format" value={pageSetup.pageNumber.format} onChange={handlePageNumberChange} disabled={pageNumberStyle.display==='none'}/>
                                </td>
                            </tr>


                            <tr>
                                <td>Font Family:</td>
                                <td>
                                    <select id="fontFamilySelect" value={pageNumberStyle.fontFamily} onChange={handleFontFamilyChange} style={{ fontFamily: pageNumberStyle.fontFamily, borderRadius: '3px' }} disabled={pageNumberStyle.display==='none'}>
                                        {fontFamilyOptions.map((font, index) => (
                                            <option key={index} value={font} style={{ fontFamily: font }}>
                                                {font}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Font Size: </td>
                                <td>
                                    <select id="fontSizeSelect" value={pageNumberStyle.fontSize} onChange={handleFontSizeChange} style={{ borderRadius: '3px' }} disabled={pageNumberStyle.display==='none'}>
                                        {fontSizeOptions.map((size, index) => (
                                            <option key={index} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>Font Color:</td>
                                <td>
                                    <select
                                        id="fontColor"
                                        value={pageNumberStyle.color}
                                        onChange={handleFontColorChange}
                                        style={{
                                            backgroundColor: pageNumberStyle.color !== 'none' ? pageNumberStyle.color : 'transparent',
                                            borderRadius: '3px',
                                            color: pageNumberStyle.color === 'black' ? 'white' : 'black'
                                        }}
                                        disabled={pageNumberStyle.display==='none'}
                                    >
                                        {colorOptions.map((color, index) => (
                                            <option key={index} value={color} style={{ backgroundColor: color, color: color === 'black' ? 'white' : 'black' }}>
                                                {color}
                                            </option>
                                        ))} 
                                    </select>
                                </td>
                            </tr>



                        </tbody>
                    </table>
                    <div className={styles.applyButton}>
                        <button onClick={handleSubmit}>
                            <img src={applyIcon} alt="Apply" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageLayout;


const removeUnit = (value) => {
    for (let unit of units) {
        if (value.endsWith(unit)) {
            return value.slice(0, -unit.length);
        }
    }
    return value;
};

const findUnit = (value) => {
    for (let unit of units) {
        if (value.endsWith(unit)) {
            return unit;
        }
    }
    return null;
};