import React, { useState, useEffect, useRef } from 'react';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import { defaultEditorStyle, _UNIT } from '../../_constant/_constant';
import getMainblockStyle from '../function/getMainblockStyle';
import getUnit from '../function/getUnit';
import PaperSizePickerToolBar from '../PaperSizePicker/PaperSizePickerToolBar';
import styles from './MainBlock.module.scss';
import imageIcon from './pageSetup.svg';
import applyIcon from './pageSetup.svg';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';

const units = _UNIT

const MainBlock = ({ editorState, setEditorState }) => {
    const [style, setStyle] = useState(defaultEditorStyle);
    const [unit, setUnit] = useState(getUnit({ editorState }) || 'mm'); // Đơn vị tính duy nhất
    const [show, setShow] = useState(false);
    const ref = useRef();
    const blockStyleRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStyle((prevStyle) => ({
            ...prevStyle,
            [name]: value,
        }));
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const handleAutoChange = (e) => {
        const { name, checked } = e.target;
        setStyle((prevStyle) => ({
            ...prevStyle,
            [name]: checked ? 'auto' : '',
        }));
    };

    useEffect(() => {
        const blockStyle = getMainblockStyle({ editorState });
        const newUnit = getUnit({ editorState });
        if (newUnit) {
            setUnit(newUnit)
        }

        if (blockStyle) {
            // dựa vào blockStyle và hàm splitValueUnit lấy ra từ blockStyle phần key = value đã loại bỏ unit để gán vào setStyle
            const updatedStyle = Object.keys(blockStyle).reduce((acc, key) => {
                const { value } = splitValueUnit(blockStyle[key]); // Lấy giá trị đã loại bỏ đơn vị
                acc[key] = value; // Gán giá trị vào object mới
                return acc;
            }, {});

            setStyle(updatedStyle);
        }
    }, [editorState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStyle = Object.keys(style).reduce((acc, key) => {
            const value = style[key];
            // Kiểm tra nếu giá trị có chứa chữ số thì thêm đơn vị tính, nếu không thì giữ nguyên
            acc[key] = /\d/.test(value) ? value + unit : value;
            return acc;
        }, {});
        const newContentState = addAndUpdateMainBlock({ editorState, style: newStyle, unit:unit });
        setEditorState(newContentState);
    };

    const handleClick = () => {
        setShow(true);
    };
    useOnClickOutside(ref, () => {
        setShow(false);
    });

    useAutoAdjustAbsolutePosition(blockStyleRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button className={styles.button} onMouseDown={handleClick}>
                <img src={imageIcon} alt="Page Setup" title="Page Setup" className={`${styles.img} ${styles.active}`} />
            </button>
            {show && (
                <div ref={blockStyleRef} className={styles.formContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Width: </td>
                                <td>
                                    <input type="number" name="width" value={style.width} onChange={handleChange} disabled={style.width === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.width === 'auto' ? 'manual' : 'auto'} name="width" checked={style.width === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Height: </td>
                                <td>
                                    <input type="number" name="height" value={style.height} onChange={handleChange} disabled={style.height === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.height === 'auto' ? 'manual' : 'auto'} name="height" checked={style.height === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>

                            <tr>
                                <td>Padding Left: </td>
                                <td>
                                    <input type="number" name="paddingLeft" value={style.paddingLeft} onChange={handleChange} disabled={style.paddingLeft === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.paddingLeft === 'auto' ? 'manual' : 'auto'} name="paddingLeft" checked={style.paddingLeft === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Padding Top: </td>
                                <td>
                                    <input type="number" name="paddingTop" value={style.paddingTop} onChange={handleChange} disabled={style.paddingTop === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.paddingTop === 'auto' ? 'manual' : 'auto'} name="paddingTop" checked={style.paddingTop === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Padding Right: </td>
                                <td>
                                    <input type="number" name="paddingRight" value={style.paddingRight} onChange={handleChange} disabled={style.paddingRight === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.paddingRight === 'auto' ? 'manual' : 'auto'} name="paddingRight" checked={style.paddingRight === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Padding Bottom: </td>
                                <td>
                                    <input type="number" name="paddingBottom" value={style.paddingBottom} onChange={handleChange} disabled={style.paddingBottom === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.paddingBottom === 'auto' ? 'manual' : 'auto'} name="paddingBottom" checked={style.paddingBottom === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Unit</td>
                                <td colSpan={2}>
                                    <select value={unit} onChange={handleUnitChange}>
                                        {units.map((unit) => (
                                            <option key={unit} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.applyButton}>
                        <button title='Apply' onClick={handleSubmit}>
                            <img src={applyIcon} alt="Apply" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainBlock;


function splitValueUnit(input) {
    if (!input) {
        return {
            value: '',
            unit: null,
        };
    }
    const match = input.match(/^(\d+)([a-zA-Z%]+)$/); // Regex to match number and unit
    if (match) {
        return {
            value: parseFloat(match[1]), // Extract numeric value
            unit: match[2]              // Extract unit
        };
    }
    return {
        value: '',
        unit: null,
    };
}