import React, { useState, useRef, useEffect } from 'react';
import imageIcon from './documentHeader.svg';
import deleteIcon from './delete.svg';
import applyIcon from './apply.svg';
import getHeaderBlockStyle from '../function/getHeaderBlockStyle'
import addAndUpdateHeaderBlock from '../function/addAndUpdateHeaderBlock';
import deleteHeaderBlock from '../function/deleteHeaderBlock';
import styles from './HeaderBlockToolBar.module.scss';
import { useOnClickOutside, ColorPicker, useAutoAdjustAbsolutePosition } from '../../utilities';
import { _UNIT } from '../../_constant/_constant';

const units = _UNIT
const defaultHeaderBlock = {
    height: '20',
    width: '200',
    background: 'white',
    borderBottomWidth: '1',
    borderBottomStyle: 'dashed',
    borderBottomColor: '1',
    borderTopWidth: '0.5',
    borderTopStyle: 'dotted',
    borderTopColor: '0.2',
    marginLeft: '1',
    marginRight: '1',
    paddingTop: '1',
    paddingBottom: '1',
    unit: 'mm',
}

const HeaderBlockToolBar = ({ editorState, setEditorState }) => {
    const [show, setShow] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false);
    const [headerStyle, setHeaderStyle] = useState({});
    const [headerStyleInput, setHeaderStyleInput] = useState({});
    const blockStyleRef = useRef();
    const ref = useRef();

    useEffect(() => {
        const updatedHeaderStyleInput = headerStyle ? {
            height:headerStyle.height !== 0 && headerStyle.height !== ''? `${headerStyle.height}${headerStyle.unit}`:'auto',
            width:headerStyle.width !==0? `${headerStyle.width}${headerStyle.unit}`:'',
            background: `${headerStyle.background}`,
            borderBottomWidth: `${headerStyle.borderBottomWidth}${headerStyle.unit}`,
            borderBottomStyle: `${headerStyle.borderBottomStyle}`,
            borderBottomColor: `${headerStyle.borderBottomColor}`,
            borderTopWidth: `${headerStyle.borderTopWidth}${headerStyle.unit}`,
            borderTopStyle: `${headerStyle.borderTopStyle}`,
            borderTopColor: `${headerStyle.borderTopColor}`,
            marginLeft: `${headerStyle.marginLeft}${headerStyle.unit}`,
            marginRight: `${headerStyle.marginRight}${headerStyle.unit}`,
            paddingTop: `${headerStyle.paddingTop}${headerStyle.unit}`,
            paddingBottom: `${headerStyle.paddingBottom}${headerStyle.unit}`,
        } : null;
        setHeaderStyleInput(updatedHeaderStyleInput);
    }, [headerStyle]);

    useEffect(() => {
        const headerBlockStyle = getHeaderBlockStyle({ editorState })
        let newHeaderStyle
        if (headerBlockStyle) {
            newHeaderStyle = {
                height: headerBlockStyle.height ? splitValueUnit(headerBlockStyle.height).value : '',
                width: headerBlockStyle.width? splitValueUnit(headerBlockStyle.width).value : '',
                background: headerBlockStyle.background ? headerBlockStyle.background : 'none',
                borderBottomWidth: headerBlockStyle.borderBottomWidth ? splitValueUnit(headerBlockStyle.borderBottomWidth).value : '0',
                borderBottomStyle: headerBlockStyle.borderBottomStyle ? headerBlockStyle.borderBottomStyle : '',
                borderBottomColor: headerBlockStyle.borderBottomColor ? headerBlockStyle.borderBottomColor : '',
                borderTopWidth: headerBlockStyle.borderTopWidth ? splitValueUnit(headerBlockStyle.borderTopWidth).value : '0',
                borderTopStyle: headerBlockStyle.borderTopStyle ? headerBlockStyle.borderTopStyle : '',
                borderTopColor: headerBlockStyle.borderTopColor ? headerBlockStyle.borderTopColor : '',
                marginLeft: headerBlockStyle.marginLeft ? splitValueUnit(headerBlockStyle.marginLeft).value : '',
                marginRight: headerBlockStyle.marginRight ? splitValueUnit(headerBlockStyle.marginRight).value : '',
                paddingTop: headerBlockStyle.paddingTop ? splitValueUnit(headerBlockStyle.paddingTop).value : '',
                paddingBottom: headerBlockStyle.paddingBottom ? splitValueUnit(headerBlockStyle.paddingBottom).value : '',
                unit:
                    headerBlockStyle.height &&
                        splitValueUnit(headerBlockStyle.height).unit
                        ? splitValueUnit(headerBlockStyle.height).unit
                        : 'mm', // Default to 'mm' if no unit is found

            }
        } else {
            newHeaderStyle = {
                height: '',
                width:'',
                background: 'none',
                borderBottomWidth: '',
                borderBottomStyle: '',
                borderBottomColor: '',
                borderTopWidth: '',
                borderTopStyle: '',
                borderTopColor: '',
                marginLeft:'',
                marginRight:'',
                paddingTop:'',
                paddingBottom:'',
                unit: 'mm'
            };
        }
        setHeaderStyle(newHeaderStyle)
    }, [editorState]);




    const handleAddHeaderBlock = () => {
        const newEditorState = addAndUpdateHeaderBlock({ editorState, blockStyle: headerStyleInput });
        setEditorState(newEditorState);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        setHeaderStyle((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUnitChange = (e) => {
        const newUnit = e.target.value;
        setHeaderStyle((prev) => ({
            ...prev,
            unit: newUnit,
        }));
    };

    const handleBorderBottomColorChange = (color) => {
        if (color !== headerStyle.borderBottomColor) {
            setHeaderStyle((prev) => ({
                ...prev,
                borderBottomColor: color,
            }));
        } else {
            setHeaderStyle((prev) => ({
                ...prev,
                borderBottomColor: '',
            }));
        }

    };

    const handleBackgroundChange = (color) => {
        setHeaderStyle((prev) => ({
            ...prev,
            background: color,
        }));
    };

    const handleBorderTopColorChange = (color) => {
        setHeaderStyle((prev) => ({
            ...prev,
            borderTopColor: color,
        }));
    };




    const handleDeleteHeaderBlock = () => {
        const newEditorState = deleteHeaderBlock({ editorState })
        setEditorState(newEditorState)
    };


    useOnClickOutside(ref, () => {
        setShow(false);
    });

    useAutoAdjustAbsolutePosition(blockStyleRef, show);

    return (
        <div ref={ref} className={styles.container}>
            <button onMouseDown={handleShow}>
                <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
            </button>
            {show && (
                <div ref={blockStyleRef} className={styles.formContainer}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Height:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="height"
                                        value={headerStyle.height || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Width:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="width"
                                        value={headerStyle.width || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            {moreInfo && <tr>
                                <td>Background:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBackgroundChange}
                                            curentColor={headerStyle.background}
                                        >
                                        </ColorPicker>
                                    </div>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom:</td>
                                <td>
                                    <hr style={{ borderTopStyle: headerStyle.borderBottomStyle, borderTopColor: headerStyle.borderBottomColor, borderTopWidth: `${headerStyle.borderBottomWidth}${headerStyle.unit}` }}></hr>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom Width:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="borderBottomWidth"
                                        value={headerStyle.borderBottomWidth || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Bottom Style:</td>
                                <td>
                                    <select
                                        name="borderBottomStyle"
                                        value={headerStyle.borderBottomStyle || 'none'}
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
                                            curentColor={headerStyle.borderBottomColor}
                                        >
                                        </ColorPicker>
                                    </div>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Top:</td>
                                <td>
                                    <hr style={{ borderTopStyle: headerStyle.borderTopStyle, borderTopColor: headerStyle.borderTopColor, borderTopWidth: `${headerStyle.borderTopWidth}${headerStyle.unit}` }}></hr>
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Top Width:</td>
                                <td>
                                    <input
                                        type="number"
                                        name="borderTopWidth"
                                        value={headerStyle.borderTopWidth || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            {moreInfo && <tr>
                                <td>Border Top Style:</td>
                                <td>
                                    <select
                                        name="borderTopStyle"
                                        value={headerStyle.borderTopStyle || 'none'}
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
                                            curentColor={headerStyle.borderTopColor}
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
                                        value={headerStyle.marginLeft || ''}
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
                                        value={headerStyle.marginRight || ''}
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
                                        value={headerStyle.paddingTop || ''}
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
                                        value={headerStyle.paddingBottom || ''}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>}
                            <tr>
                                <td>Unit</td>
                                <td colSpan={2}>
                                    <select value={headerStyle.unit || ''} onChange={handleUnitChange}>
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
                        <button onMouseDown={handleAddHeaderBlock}>
                            <img src={applyIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>
                        <button onMouseDown={handleDeleteHeaderBlock}>
                            <img src={deleteIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
                            <span>Delete</span>
                        </button>
                        <button title='Show' onClick={() => setMoreInfo(!moreInfo)}>
                            {/* <img src={applyIcon} alt="More" className={`${styles.img} ${styles.active}`} /> */}
                            <span> {moreInfo ? '⯅' : '⯆'} </span>
                            <span>{moreInfo ? 'Less' : 'More'}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderBlockToolBar;


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