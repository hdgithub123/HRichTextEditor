import React, { useState, useRef, useEffect } from 'react';
import imageIcon from './documentFooter.svg';
import deleteIcon from './delete.svg';
import applyIcon from './apply.svg';
import getFooterBlockStyle from '../function/getFooterBlockStyle'
import getUnit from '../../MainBlock/function/getUnit';
import getMainBlockStyle from '../../MainBlock/function/getMainblockStyle';
import addAndUpdateFooterBlock from '../function/addAndUpdateFooterBlock';
import deleteFooterBlock from '../function/deleteFooterBlock';
import styles from './FooterBlockToolBar.module.scss';
import { useOnClickOutside, ColorPicker, useAutoAdjustAbsolutePosition } from '../../utilities';

const FooterBlockToolBar = ({ editorState, setEditorState }) => {
    const [show, setShow] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false);
    const [footerStyle, setFooterStyle] = useState({});
    const [footerStyleInput, setFooterStyleInput] = useState({});
    const [unit, setUnit] = useState(false);
    const blockStyleRef = useRef();
    const ref = useRef();

    useEffect(() => {
        const mainBlockStyle = getMainBlockStyle({ editorState })
        const currentPageWidth = mainBlockStyle?.width ? mainBlockStyle.width : '0mm';
        const currentAutoWidth = `${splitValueUnit(currentPageWidth).value - footerStyle.marginLeft}${unit}`


        const updatedFooterStyleInput = footerStyle ? {
            height: footerStyle.height !== 0 && footerStyle.height !== '' ? `${footerStyle.height}${footerStyle.unit}` : 'auto',
            width: footerStyle.width !== 0 && footerStyle.width !== 'auto' ? `${footerStyle.width}${unit}` : currentAutoWidth,
            background: `${footerStyle.background}`,
            borderBottomWidth: `${footerStyle.borderBottomWidth}${unit}`,
            borderBottomStyle: `${footerStyle.borderBottomStyle}`,
            borderBottomColor: `${footerStyle.borderBottomColor}`,
            borderTopWidth: `${footerStyle.borderTopWidth}${unit}`,
            borderTopStyle: `${footerStyle.borderTopStyle}`,
            borderTopColor: `${footerStyle.borderTopColor}`,
            marginLeft: `${footerStyle.marginLeft}${unit}`,
            marginRight: `${footerStyle.marginRight}${unit}`,
            paddingTop: `${footerStyle.paddingTop}${unit}`,
            paddingBottom: `${footerStyle.paddingBottom}${unit}`,
        } : null;
        setFooterStyleInput(updatedFooterStyleInput);
    }, [footerStyle]);

    useEffect(() => {
        const footerBlockStyle = getFooterBlockStyle({ editorState })
        const currentUnit = getUnit({ editorState })
        setUnit(currentUnit ? currentUnit : 'mm')
        let newFooterStyle
        if (footerBlockStyle) {
            newFooterStyle = {
                height: footerBlockStyle?.height ? footerBlockStyle.height === 'auto' ? 'auto' : splitValueUnit(footerBlockStyle.height).value : '',
                width: footerBlockStyle.width ? splitValueUnit(footerBlockStyle.width).value : 'auto',
                background: footerBlockStyle.background ? footerBlockStyle.background : 'none',
                borderBottomWidth: footerBlockStyle.borderBottomWidth ? splitValueUnit(footerBlockStyle.borderBottomWidth).value : '0',
                borderBottomStyle: footerBlockStyle.borderBottomStyle ? footerBlockStyle.borderBottomStyle : '',
                borderBottomColor: footerBlockStyle.borderBottomColor ? footerBlockStyle.borderBottomColor : '',
                borderTopWidth: footerBlockStyle.borderTopWidth ? splitValueUnit(footerBlockStyle.borderTopWidth).value : '0',
                borderTopStyle: footerBlockStyle.borderTopStyle ? footerBlockStyle.borderTopStyle : '',
                borderTopColor: footerBlockStyle.borderTopColor ? footerBlockStyle.borderTopColor : '',
                marginLeft: footerBlockStyle.marginLeft ? splitValueUnit(footerBlockStyle.marginLeft).value : '',
                marginRight: footerBlockStyle.marginRight ? splitValueUnit(footerBlockStyle.marginRight).value : '',
                paddingTop: footerBlockStyle.paddingTop ? splitValueUnit(footerBlockStyle.paddingTop).value : '',
                paddingBottom: footerBlockStyle.paddingBottom ? splitValueUnit(footerBlockStyle.paddingBottom).value : '',
            }
        } else {
            newFooterStyle = {
                height: '',
                width: '',
                background: 'none',
                borderBottomWidth: '',
                borderBottomStyle: '',
                borderBottomColor: '',
                borderTopWidth: '',
                borderTopStyle: '',
                borderTopColor: '',
                marginLeft: '',
                marginRight: '',
                paddingTop: '',
                paddingBottom: '',
            };
        }
        setFooterStyle(newFooterStyle)
    }, [editorState]);




    const handleAddFooterBlock = () => {
        const newEditorState = addAndUpdateFooterBlock({ editorState, blockStyle: footerStyleInput });
        setEditorState(newEditorState);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        setFooterStyle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleBorderBottomColorChange = (color) => {
        if (color !== footerStyle.borderBottomColor) {
            setFooterStyle((prev) => ({
                ...prev,
                borderBottomColor: color,
            }));
        } else {
            setFooterStyle((prev) => ({
                ...prev,
                borderBottomColor: '',
            }));
        }

    };

    const handleBackgroundChange = (color) => {
        setFooterStyle((prev) => ({
            ...prev,
            background: color,
        }));
    };

    const handleBorderTopColorChange = (color) => {
        setFooterStyle((prev) => ({
            ...prev,
            borderTopColor: color,
        }));
    };


    const handleAutoHeightChange = (e) => {
        const { name, checked } = e.target;
        setFooterStyle((prevStyle) => ({
            ...prevStyle,
            [name]: checked ? 'auto' : '',
        }));
    }


    const caculateAutoWidth = () => {
        const mainBlockStyle = getMainBlockStyle({ editorState })
        const currentPageWidth = mainBlockStyle?.width ? mainBlockStyle.width : '0mm';
        const currentAutoWidth = splitValueUnit(currentPageWidth).value - footerStyle.marginLeft
        setFooterStyle((prevStyle) => ({
            ...prevStyle,
            width: currentAutoWidth ? currentAutoWidth : 'auto',
        }));
    }


    const handleDeleteFooterBlock = () => {
        const newEditorState = deleteFooterBlock({ editorState })
        setEditorState(newEditorState)
    };


    useOnClickOutside(ref, () => {
        setShow(false);
    });

    useAutoAdjustAbsolutePosition(blockStyleRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button onMouseDown={handleShow}>
                <img src={imageIcon} alt="Footer" title="Footer" className={`${styles.img} ${styles.active}`} />
            </button>
            {show && (
                <div ref={blockStyleRef} className={styles.formContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Height:</td>
                                <td>
                                    <div className={styles.detailContent}>
                                        <input
                                            type="number"
                                            name="height"
                                            value={footerStyle.height || ''}
                                            onChange={handleStyleChange}
                                        />
                                        <input type="checkbox" title={footerStyle.height === 'auto' ? 'manual' : 'auto'} name="height" checked={footerStyle.height === 'auto'} onChange={handleAutoHeightChange} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Width:</td>
                                <td>
                                    <div className={styles.detailContent}>
                                        <input
                                            type="number"
                                            name="width"
                                            value={footerStyle.width || ''}
                                            onChange={handleStyleChange}
                                        />
                                        <button
                                            onClick={caculateAutoWidth}
                                            title='Auto Caculate Width'
                                        >
                                            <div
                                                style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    border: '1px solid gray',
                                                    borderRadius: '2px',
                                                    boxSizing: 'border-box',
                                                    boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2) '
                                                }}>
                                            </div>
                                        </button>
                                    </div>

                                </td>
                            </tr>
                            {moreInfo && <tr>
                                <td>Background:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBackgroundChange}
                                            curentColor={footerStyle.background}
                                        >
                                        </ColorPicker>
                                    </div>
                                </td>
                            </tr>}

                            {moreInfo && <tr>
                                <td>Border Top:</td>
                                <td>
                                    <hr style={{ borderTopStyle: footerStyle.borderTopStyle, borderTopColor: footerStyle.borderTopColor, borderTopWidth: `${footerStyle.borderTopWidth}${unit}` }}></hr>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Top Width:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="borderTopWidth"
                                        value={footerStyle.borderTopWidth || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Top Style:</td>
                                <td>
                                    <select
                                        name="borderTopStyle"
                                        value={footerStyle.borderTopStyle || 'none'}
                                        onChange={handleStyleChange}
                                    >
                                        <option value="solid">Solid</option>
                                        <option value="dotted">Dotted</option>
                                        <option value="dashed">Dashed</option>
                                        <option value="double">Double</option>
                                        <option value="groove">Groove</option>
                                        <option value="ridge">Ridge</option>
                                        <option value="inset">Inset</option>
                                        <option value="outset">Outset</option>
                                        <option value="none">None</option>
                                        <option value="hidden">Hidden</option>
                                    </select>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Top Color:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBorderTopColorChange}
                                            curentColor={footerStyle.borderTopColor}
                                        >
                                        </ColorPicker>
                                    </div>

                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom:</td>
                                <td>
                                    <hr style={{ borderTopStyle: footerStyle.borderBottomStyle, borderTopColor: footerStyle.borderBottomColor, borderTopWidth: `${footerStyle.borderBottomWidth}${unit}` }}></hr>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom Width:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="borderBottomWidth"
                                        value={footerStyle.borderBottomWidth || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom Style:</td>
                                <td>
                                    <select
                                        name="borderBottomStyle"
                                        value={footerStyle.borderBottomStyle || 'none'}
                                        onChange={handleStyleChange}
                                    >
                                        <option value="solid">Solid</option>
                                        <option value="dotted">Dotted</option>
                                        <option value="dashed">Dashed</option>
                                        <option value="double">Double</option>
                                        <option value="groove">Groove</option>
                                        <option value="ridge">Ridge</option>
                                        <option value="inset">Inset</option>
                                        <option value="outset">Outset</option>
                                        <option value="none">None</option>
                                        <option value="hidden">Hidden</option>
                                    </select>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom Color:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBorderBottomColorChange}
                                            curentColor={footerStyle.borderBottomColor}
                                        >
                                        </ColorPicker>
                                    </div>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Margin Left:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="marginLeft"
                                        value={footerStyle.marginLeft || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Margin Right:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="marginRight"
                                        value={footerStyle.marginRight || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Padding Top:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="paddingTop"
                                        value={footerStyle.paddingTop || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Padding Bottom:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="paddingBottom"
                                        value={footerStyle.paddingBottom || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            <tr>
                                <td>Unit</td>
                                <td>
                                    <input
                                        type="value"
                                        name="unit"
                                        value={unit || ''}
                                        style={{ width: '30px' }}
                                        disabled={true}
                                    />

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.applyButton}>
                        <button onMouseDown={handleAddFooterBlock}>
                            <img src={applyIcon} alt="Footer" title="Footer" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>
                        <button onMouseDown={handleDeleteFooterBlock}>
                            <img src={deleteIcon} alt="Footer" title="Footer" className={`${styles.img} ${styles.active}`} />
                            <span>Delete</span>
                        </button>
                        <button title='Show' onClick={() => setMoreInfo(!moreInfo)}>
                            <span> {moreInfo ? '⯅' : '⯆'} </span>
                            <span>{moreInfo ? 'Less' : 'More'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FooterBlockToolBar;


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