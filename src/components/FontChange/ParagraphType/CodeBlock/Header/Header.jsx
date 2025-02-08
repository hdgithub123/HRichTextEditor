import React from 'react';
import { RichUtils } from 'draft-js';
import CodeBlockTypeControl from '../utilities/CodeBlockTypeControl';
import getCurrentBlock from '../utilities/getCurrentBlock';
import headerIcon from './header.svg'
import header1Icon from './header1.svg'
import header2Icon from './header2.svg'
import header3Icon from './header3.svg'
import header4Icon from './header4.svg'
import header5Icon from './header5.svg'
import header6Icon from './header6.svg'

const Header = ({ editorState, setEditorState }) => {

    const currentBlock = getCurrentBlock({ editorState })

    const handleClickTypeOfBlock = (block) => {
        const newEditorState = RichUtils.toggleBlockType(editorState, block);
        setEditorState(newEditorState);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={header1Icon} altImage={"header-one"} onClick={() => handleClickTypeOfBlock('header-one')}></CodeBlockTypeControl>
            <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={header2Icon} altImage={"header-two"} onClick={() => handleClickTypeOfBlock('header-two')}></CodeBlockTypeControl>
            <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={header3Icon} altImage={"header-three"} onClick={() => handleClickTypeOfBlock('header-three')}></CodeBlockTypeControl>
            <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={header4Icon} altImage={"header-four"} onClick={() => handleClickTypeOfBlock('header-four')}></CodeBlockTypeControl>
            <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={header5Icon} altImage={"header-five"} onClick={() => handleClickTypeOfBlock('header-five')}></CodeBlockTypeControl>
            <CodeBlockTypeControl currentCodeBlock={currentBlock} ImageIcon={header6Icon} altImage={"header-six"} onClick={() => handleClickTypeOfBlock('header-six')}></CodeBlockTypeControl>
        </div>

    )
}

export default Header;