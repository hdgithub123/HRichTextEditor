import React, { useState, useEffect, useRef } from 'react';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import getPageSetup from '../function/getPageSetup';
import getUnit from '../function/getUnit';
import styles from './PageLayout.module.scss';
import imageIcon from './printSetup.svg';
import applyIcon from './apply.svg';
import { useOnClickOutside, useAutoAdjustAbsolutePosition, ColorPicker } from '../../utilities';
import { _UNIT, _COMMONCOLOURS, _FONTFAMILY, _FONTSIZES } from '../../_constant/_constant';

const units = _UNIT

const fontFamilyOptions = ["not set", ..._FONTFAMILY];
const fontSizeOptions = ["not set", ..._FONTSIZES.map(size => `${size}pt`)];

const PageLayout = ({ editorState, setEditorState }) => {
    const [pageSetup, setPageSetup] = useState({
        pageHeight: '',
        isRepeatThead: false,
        pageNumber: { position: '', format: '', style: '' }
    });
    const [unit, setUnit] = useState(getUnit({ editorState }) || 'mm'); // Đơn vị mặc định
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
            setUnit(getUnit({ editorState }) || 'mm');
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
            display: checked ? ' ' : 'none'
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

    const handleFontColorChange = (color) => {
        setPageNumberStyle((prev) => ({
            ...prev,
            color: color
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
                                    <div className={styles.detailContent}>
                                        <input
                                            type="number"
                                            name="pageHeight"
                                            value={isNaN(pageHeight) || pageHeight === null || pageHeight === undefined ? "" : pageHeight}
                                            onChange={handlePageHeightChange}
                                            disabled={pageSetup.pageHeight === '100%'}
                                        />
                                        <input
                                            type="value"
                                            name="unit"
                                            value={unit || ''}
                                            style={{ width: '30px' }}
                                            disabled={true}
                                        />

                                        <input
                                            type="checkbox"
                                            name="pageHeight"
                                            checked={pageSetup.pageHeight === '100%'}
                                            onChange={handlePageHeightCheckboxChange}
                                            title='∞'
                                        />
                                    </div>
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
                                <td style={{ justifyContent: 'center', textAlign: 'center' }} colSpan={2}>
                                    <div className={styles.detailContent}>
                                        <span>Page number</span>
                                        <input
                                            type="checkbox"
                                            name="isPageNumber"
                                            checked={pageNumberStyle.display !== 'none'}
                                            onChange={handleIsPageNumberDisplayChange}
                                        />
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <td>Position:</td>
                                <td>
                                    <select name="position" value={pageSetup.pageNumber.position || "bottom-right"} onChange={handlePageNumberChange} disabled={pageNumberStyle.display === 'none'}>
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
                                    <input type="text" placeholder='Ex: Page: {page}/{pages}' name="format" value={pageSetup.pageNumber.format} onChange={handlePageNumberChange} disabled={pageNumberStyle.display === 'none'} />
                                </td>
                            </tr>


                            <tr>
                                <td>Font Family:</td>
                                <td>
                                    <select id="fontFamilySelect" value={pageNumberStyle.fontFamily} onChange={handleFontFamilyChange} style={{ fontFamily: pageNumberStyle.fontFamily, borderRadius: '3px' }} disabled={pageNumberStyle.display === 'none'}>
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
                                    <select id="fontSizeSelect" value={pageNumberStyle.fontSize} onChange={handleFontSizeChange} style={{ borderRadius: '3px' }} disabled={pageNumberStyle.display === 'none'}>
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
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleFontColorChange}
                                            curentColor={pageNumberStyle.color}
                                        >
                                        </ColorPicker>
                                    </div>

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