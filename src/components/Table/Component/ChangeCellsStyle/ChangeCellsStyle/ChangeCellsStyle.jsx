import React, { useState } from 'react';
import styles from './ChangeCellsStyle.module.scss'
import applyIcon from './apply.svg'
import borderTopIcon from './borderTop.svg'
import borderBottomIcon from './borderBottom.svg'
import borderLeftIcon from './borderLeft.svg'
import borderRightIcon from './borderRight.svg'
import { ColorPicker } from '../../../../utilities';


const ChangeCellsStyle = ({ onChange }) => {
    const [positions, setPositions] = useState(['top', 'left', 'right', 'bottom']);
    const [color, setColor] = useState('black');
    const [style, setStyle] = useState('solid');
    const [width, setWidth] = useState('1pt');

    const handleOnClick = () => {
        const boxStyle = {};

        positions.forEach((position) => {
            if (position === 'top') {
                boxStyle.borderTopWidth = width;
                boxStyle.borderTopStyle = style;
                boxStyle.borderTopColor = color;
            }

            if (position === 'left') {
                boxStyle.borderLeftWidth = width;
                boxStyle.borderLeftStyle = style;
                boxStyle.borderLeftColor = color;
            }

            if (position === 'right') {
                boxStyle.borderRightWidth = width;
                boxStyle.borderRightStyle = style;
                boxStyle.borderRightColor = color;
            }

            if (position === 'bottom') {
                boxStyle.borderBottomWidth = width;
                boxStyle.borderBottomStyle = style;
                boxStyle.borderBottomColor = color;
            }
        });

        onChange(boxStyle);
    };

    const handlePositionChange = (e) => {
        const { value, checked } = e.target;
        setPositions((prev) =>
            checked ? [...prev, value] : prev.filter((position) => position !== value)
        );
    };

    return (
        <div className={styles.container}>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Border: </td>
                            <td>
                                <div className={styles.checkbox}>
                                    <label title="Top">
                                        <input
                                            type="checkbox"
                                            value="top"
                                            checked={positions.includes('top')}
                                            onChange={handlePositionChange}
                                        />
                                        <img src={borderTopIcon} title='Top' alt="Top" className={`${styles.img} ${positions.includes('top') ? styles.active : styles.unactive}`} />
                                    </label>
                                    <label title="Left">
                                        <input
                                            type="checkbox"
                                            value="left"
                                            checked={positions.includes('left')}
                                            onChange={handlePositionChange}
                                        />
                                        <img src={borderLeftIcon} title='Left' alt="Left" className={`${styles.img} ${positions.includes('left') ? styles.active : styles.unactive}`} />
                                    </label>
                                    <label title="Right">
                                        <input
                                            type="checkbox"
                                            value="right"
                                            checked={positions.includes('right')}
                                            onChange={handlePositionChange}
                                        />
                                        <img src={borderRightIcon} title='Right' alt="Right" className={`${styles.img} ${positions.includes('right') ? styles.active : styles.unactive}`} />
                                    </label>
                                    <label title="Bottom">
                                        <input
                                            type="checkbox"
                                            value="bottom"
                                            checked={positions.includes('bottom')}
                                            onChange={handlePositionChange}
                                        />
                                        <img src={borderBottomIcon} title='Bottom' alt="Bottom" className={`${styles.img} ${positions.includes('bottom') ? styles.active : styles.unactive}`} />
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Color:</td>
                            <td>
                                <div className={styles.colorPicker}>
                                    <ColorPicker
                                        onChange={(color) => setColor(color)}
                                        curentColor={color}
                                    >
                                    </ColorPicker>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>Line: </td>
                            <td>
                                <hr style={{ borderTopStyle: style, borderTopColor: color, borderTopWidth: width }}></hr>
                            </td>
                        </tr>
                        <tr>
                            <td>Type: </td>
                            <td>
                                <select value={style} onChange={(e) => setStyle(e.target.value)}>
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
                        </tr>
                        <tr>
                            <td>Thickness: </td>
                            <td>
                                <select value={width} onChange={(e) => setWidth(e.target.value)}>
                                    <option value="0.25pt">0.25 pt</option>
                                    <option value="0.5pt">0.5 pt</option>
                                    <option value="0.75pt">0.75 pt</option>
                                    <option value="1pt">1 pt</option>
                                    <option value="1.5pt">1.5 pt</option>
                                    <option value="2.25pt">2.25 pt</option>
                                    <option value="3pt">3 pt</option>
                                    <option value="4.5pt">4.5 pt</option>
                                    <option value="6pt">6 pt</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.applyButton}>
                <button title='Apply' onClick={handleOnClick}>
                    <img src={applyIcon} alt="Apply" className={`${styles.img} ${styles.active}`} />
                    <span>Apply</span>
                </button>
            </div>
        </div>
    );
};

export default ChangeCellsStyle;