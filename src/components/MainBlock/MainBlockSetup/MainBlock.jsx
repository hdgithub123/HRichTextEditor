import React, { useState, useEffect, useRef } from 'react';
import addAndUpdateMainBlock from '../function/addAndUpdateMainBlock';
import { defaultEditorStyle, _UNIT } from '../../_constant/_constant';
import getMainblockStyle from '../function/getMainblockStyle';
import styles from './MainBlock.module.scss';
import imageIcon from './pageSetup.svg';
import applyIcon from './pageSetup.svg';
import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';

const units = _UNIT

const MainBlock = ({ editorState, setEditorState }) => {
    const [style, setStyle] = useState(defaultEditorStyle);
    const [unit, setUnit] = useState('px'); // Đơn vị tính duy nhất
    const [show, setShow] = useState(false);
    const [marginShow, setMarginShow] = useState(false);
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
        if (blockStyle) {
            let foundUnit = null;
            const newBlockStyle = Object.keys(blockStyle).reduce((acc, key) => {
                const value = blockStyle[key];
                const unit = findUnit(value);
                if (!foundUnit && unit) {
                    foundUnit = unit;
                }
                acc[key] = removeUnit(value);
                return acc;
            }, {});
            setStyle(newBlockStyle);
            if (foundUnit) {
                setUnit(foundUnit);
            }
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
        const newContentState = addAndUpdateMainBlock({ editorState, style: newStyle });
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
                            {marginShow && <tr>
                                <td>Margin Left: </td>
                                <td>
                                    <input type="number" name="marginLeft" value={style.marginLeft} onChange={handleChange} disabled={style.marginLeft === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.marginLeft === 'auto' ? 'manual' : 'auto'} name="marginLeft" checked={style.marginLeft === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>}
                            {marginShow && <tr>
                                <td>Margin Top: </td>
                                <td>
                                    <input type="number" name="marginTop" value={style.marginTop} onChange={handleChange} disabled={style.marginTop === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.marginTop === 'auto' ? 'manual' : 'auto'} name="marginTop" checked={style.marginTop === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>}
                            {marginShow && <tr>
                                <td>Margin Right: </td>
                                <td>
                                    <input type="number" name="marginRight" value={style.marginRight} onChange={handleChange} disabled={style.marginRight === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.marginRight === 'auto' ? 'manual' : 'auto'} name="marginRight" checked={style.marginRight === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>}
                            {marginShow && <tr>
                                <td>Margin Bottom: </td>
                                <td>
                                    <input type="number" name="marginBottom" value={style.marginBottom} onChange={handleChange} disabled={style.marginBottom === 'auto'} />
                                </td>
                                <td>
                                    <input type="checkbox" title={style.marginBottom === 'auto' ? 'manual' : 'auto'} name="marginBottom" checked={style.marginBottom === 'auto'} onChange={handleAutoChange} />
                                </td>
                            </tr>}
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
                        <button title='Show' onClick={() => setMarginShow(!marginShow)}>
                            {/* <img src={applyIcon} alt="More" className={`${styles.img} ${styles.active}`} /> */}
                            <span> {marginShow ? '⯅' : '⯆'} </span>
                            <span>{marginShow ? 'Less' : 'More'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainBlock;

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