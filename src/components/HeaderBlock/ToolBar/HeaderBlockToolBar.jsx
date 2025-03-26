// // viết 1 Component để tạo 1 HeaderBlock mới// viết 1 Component để tạo 1 HeaderBlock mới
// import React, { useState, useEffect, useRef } from 'react';
// import { EditorState } from 'draft-js';
// import imageIcon from './documentHeader.svg'
// import addAndUpdateHeaderBlock from '../function/addAndUpdateHeaderBlock';
// import styles from './HeaderBlockToolBar.module.scss';
// import { useOnClickOutside, useAutoAdjustAbsolutePosition } from '../../utilities';


// const HeaderBlockToolBar = ({ editorState, setEditorState }) => {
//     const [show, setShow] = useState(false);
//     const [headerStyle, setHeaderStyle] = useState(false);
//     const blockStyleRef = useRef();
//     const ref = useRef();

//     const style = {
//         height: '20mm',
//         width: '100%',
//         background: 'white',

//         // borderBottom: '',
//         borderBottomWidth: "5px",
//         borderBottomStyle: "dashed",
//         borderBottomColor: "blue",



//         // borderTop: '',
//         borderTopWidth: '5px',
//         borderTopStyle: 'dotted',
//         borderTopColor: 'red',



//         marginLeft: '10mm',
//         marginRight: '10mm',
//         paddingTop:'1mm',
//         paddingBottom: '1mm',
//     }
//     const handleAddHeaderBlock = () => {
//         const newEditorState = addAndUpdateHeaderBlock({ editorState, blockStyle: style });
//         setEditorState(newEditorState);
//     };

//     const handleShow = () => {
//         setShow(true);
//     };


//     useOnClickOutside(ref, () => {
//         setShow(false);
//     });

//     useAutoAdjustAbsolutePosition(blockStyleRef, show);

//     return (
//         <div ref={ref} className={styles.container}>
//             <button onMouseDown={handleShow}>
//                 <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
//             </button>
//             {show && (
//                 <div ref={blockStyleRef} className={styles.formContainer}>
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <td>Padding Top: </td>
//                                 <td>
//                                     <input type="number" name="paddingTop" value={style.paddingTop} disabled={style.paddingTop === 'auto'} />
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     <div className={styles.applyButton}>
//                         <button onMouseDown={handleAddHeaderBlock}>
//                             <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
//                             <span>Apply</span>
//                         </button>

//                     </div>
//                 </div>)}
//         </div>
//     );
// };

// export default HeaderBlockToolBar;


import React, { useState, useRef } from 'react';
import imageIcon from './documentHeader.svg';
import addAndUpdateHeaderBlock from '../function/addAndUpdateHeaderBlock';
import styles from './HeaderBlockToolBar.module.scss';
import { useOnClickOutside, useAutoAdjustAbsolutePosition, ColorPicker } from '../../utilities';


const HeaderBlockToolBar = ({ editorState, setEditorState }) => {
    const [show, setShow] = useState(false);
    const [headerStyle, setHeaderStyle] = useState({
        height: '20mm',
        width: '100%',
        background: 'white',
        borderBottomWidth: '5px',
        borderBottomStyle: 'dashed',
        borderBottomColor: 'blue',
        borderTopWidth: '5px',
        borderTopStyle: 'dotted',
        borderTopColor: 'red',
        marginLeft: '10mm',
        marginRight: '10mm',
        paddingTop: '1mm',
        paddingBottom: '1mm',
    });

    const blockStyleRef = useRef();
    const ref = useRef();

    const handleAddHeaderBlock = () => {
        const newEditorState = addAndUpdateHeaderBlock({ editorState, blockStyle: headerStyle });
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



    const handleBorderBottomColorChange = (color) => {
        setHeaderStyle((prev) => ({
            ...prev,
            borderBottomColor: color,
        }));
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

    

    useOnClickOutside(ref, () => {
        setShow(false);
    });

    // useAutoAdjustAbsolutePosition(blockStyleRef, show);

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
                                        type="text"
                                        name="height"
                                        value={headerStyle.height}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Width:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="width"
                                        value={headerStyle.width}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Background:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBackgroundChange}
                                            defaultColor={headerStyle.background}
                                        >
                                        </ColorPicker>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Border Bottom Width:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="borderBottomWidth"
                                        value={headerStyle.borderBottomWidth}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Border Bottom Style:</td>
                                <td>
                                    <select
                                        name="borderBottomStyle"
                                        value={headerStyle.borderBottomStyle}
                                        onChange={handleStyleChange}
                                    >
                                        <option value="solid">Solid</option>
                                        <option value="dashed">Dashed</option>
                                        <option value="dotted">Dotted</option>
                                        <option value="double">Double</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Border Bottom Color:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBorderBottomColorChange}
                                            defaultColor={headerStyle.borderBottomColor}
                                        >
                                        </ColorPicker>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Border Top Width:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="borderTopWidth"
                                        value={headerStyle.borderTopWidth}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Border Top Style:</td>
                                <td>
                                    <select
                                        name="borderTopStyle"
                                        value={headerStyle.borderTopStyle}
                                        onChange={handleStyleChange}
                                    >
                                        <option value="solid">Solid</option>
                                        <option value="dashed">Dashed</option>
                                        <option value="dotted">Dotted</option>
                                        <option value="double">Double</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Border Top Color:</td>
                                <td>
                                    <div className={styles.colorPicker}>
                                        <ColorPicker
                                            onChange={handleBorderTopColorChange}
                                            defaultColor={headerStyle.borderTopColor}
                                        >
                                        </ColorPicker>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>Margin Left:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="marginLeft"
                                        value={headerStyle.marginLeft}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Margin Right:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="marginRight"
                                        value={headerStyle.marginRight}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Padding Top:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="paddingTop"
                                        value={headerStyle.paddingTop}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Padding Bottom:</td>
                                <td>
                                    <input
                                        type="text"
                                        name="paddingBottom"
                                        value={headerStyle.paddingBottom}
                                        onChange={handleStyleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.applyButton}>
                        <button onMouseDown={handleAddHeaderBlock}>
                            <img src={imageIcon} alt="Header" title="Header" className={`${styles.img} ${styles.active}`} />
                            <span>Apply</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderBlockToolBar;