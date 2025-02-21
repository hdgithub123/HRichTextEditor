import React, { useState,useEffect } from 'react';
import addAndUpdateMainBlockStyle from './addAndUpdateMainBlockStyle';
import { defaultEditorStyle } from '../_constant/_constant'
import getMainblockStyle from './getMainblockStyle'

const MainBlock = ({ editorState, setEditorState, setMainBlockStyle }) => {
    const [style, setStyle] = useState(defaultEditorStyle);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStyle((prevStyle) => ({
            ...prevStyle,
            [name]: value,
        }));
    };
     // sử dụng useEffect để khi editorState thay đổi sẽ update cho style
     useEffect(() => {
        const blockStyle = getMainblockStyle({ editorState });
        if (blockStyle) {
            setStyle(blockStyle);
        }
    }, [editorState]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContentState = addAndUpdateMainBlockStyle({ editorState, style: style });
        // const newMainBlockStyle = getMainblockStyle({ editorState:newContentState })
        // setMainBlockStyle(newMainBlockStyle)
        setEditorState(newContentState)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Width:
                    <input type="text" name="width" value={style.width} onChange={handleChange} />
                </label>
                <label>
                    Height:
                    <input type="text" name="height" value={style.height} onChange={handleChange} />
                </label>
                <label>
                    Margin Left:
                    <input type="text" name="marginLeft" value={style.marginLeft} onChange={handleChange} />
                </label>
                <label>
                    Margin Top:
                    <input type="text" name="marginTop" value={style.marginTop} onChange={handleChange} />
                </label>
                <label>
                    Margin Right:
                    <input type="text" name="marginRight" value={style.marginRight} onChange={handleChange} />
                </label>
                <label>
                    Margin Bottom:
                    <input type="text" name="marginBottom" value={style.marginBottom} onChange={handleChange} />
                </label>
                <label>
                    Padding Left:
                    <input type="text" name="paddingLeft" value={style.paddingLeft} onChange={handleChange} />
                </label>
                <label>
                    Padding Top:
                    <input type="text" name="paddingTop" value={style.paddingTop} onChange={handleChange} />
                </label>
                <label>
                    Padding Right:
                    <input type="text" name="paddingRight" value={style.paddingRight} onChange={handleChange} />
                </label>
                <label>
                    Padding Bottom:
                    <input type="text" name="paddingBottom" value={style.paddingBottom} onChange={handleChange} />
                </label>
                <button type="submit">Add Main Block</button>
            </form>
        </div>
    );
};

export default MainBlock;