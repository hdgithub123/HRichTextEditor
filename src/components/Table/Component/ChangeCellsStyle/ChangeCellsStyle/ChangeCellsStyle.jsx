import React, { useState } from 'react';

const ChangeCellsStyle = ({ onChange }) => {
    const [positions, setPositions] = useState([]);
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
        <div style={{ width: '300px', height: '500px', padding: '20px' }}>
            <div>
                <label>Vị trí:</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="top"
                            checked={positions.includes('top')}
                            onChange={handlePositionChange}
                        />
                        Top
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="left"
                            checked={positions.includes('left')}
                            onChange={handlePositionChange}
                        />
                        Left
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="right"
                            checked={positions.includes('right')}
                            onChange={handlePositionChange}
                        />
                        Right
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="bottom"
                            checked={positions.includes('bottom')}
                            onChange={handlePositionChange}
                        />
                        Bottom
                    </label>
                </div>
            </div>
            <div>
                <label>
                    Màu sắc:
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Kiểu dòng kẻ:
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
                </label>
            </div>
            <div>
                <label>
                    Độ dày:
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
                </label>
            </div>
            <button onClick={handleOnClick}>Apply Style</button>
        </div>
    );
};

export default ChangeCellsStyle;