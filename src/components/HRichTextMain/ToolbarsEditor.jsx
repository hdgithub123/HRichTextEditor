import style from './ToolbarsEditor.module.scss'
import TableToolbar from '../Table/TableToolBar/TableToolbar';
import ImageToolBar from '../Image/ImageToolBar/ImageToolBar'
import LinkifyToolBar from '../Linkify/ToolBar/LinkifyToolBar'
import EmojiToolBar from '../Emoji/ToolBar/EmojiToolBar'
import UndoRedoToolBar from '../UndoRedoToolBar/UndoRedoToolBar'
import VideoBlockToolBar from '../Video/VideoBlock/VideoBlockToolBar/VideoBlockToolBar'
import {
    FontFamilyPickerView,
    FontSizePickerView,
    FontColorPickerView,
    FontBackGroundColorView,
    FontType,
    TextAlign,
    VerticalAlign,
    CodeBlockType,
    Blockquote,
    Paragraph,
    Header,
    Unstyled,
    BlockStyleView,
    LineHeightView,
    DeleteBlockStyle,
} from '../FontChange'

import {DynamicText,DynamicTable} from '../DynamicInsert'


const ToolbarsEditor = ({ editorState, setEditorState, variable, onChange }) => {
    return (
        <div className={style.container}>
            <UndoRedoToolBar editorState={editorState} setEditorState={setEditorState}></UndoRedoToolBar>
            <FontFamilyPickerView editorState={editorState} setEditorState={setEditorState}></FontFamilyPickerView>
            <FontSizePickerView editorState={editorState} setEditorState={setEditorState}></FontSizePickerView>
            <FontColorPickerView editorState={editorState} setEditorState={setEditorState} ></FontColorPickerView>
            <FontBackGroundColorView editorState={editorState} setEditorState={setEditorState} ></FontBackGroundColorView>
            {/* Bold, Italic, Underline, StrikeThought, Supercrip, Subscript */}
            <FontType editorState={editorState} setEditorState={setEditorState} ></FontType>
            {/* TextAlign */}
            <TextAlign editorState={editorState} setEditorState={setEditorState} />
            {/* VerticalAlign chua cho vao table duoc
            <VerticalAlign editorState={editorState} setEditorState={setEditorState} /> */}




            <LineHeightView editorState={editorState} setEditorState={setEditorState}  ></LineHeightView>
            <Unstyled editorState={editorState} setEditorState={setEditorState}></Unstyled>
            <CodeBlockType editorState={editorState} setEditorState={setEditorState}></CodeBlockType>
            <Blockquote editorState={editorState} setEditorState={setEditorState}></Blockquote>
            <Paragraph editorState={editorState} setEditorState={setEditorState}></Paragraph>
            <Header editorState={editorState} setEditorState={setEditorState}></Header>
            <BlockStyleView editorState={editorState} setEditorState={setEditorState} />
            <DeleteBlockStyle editorState={editorState} setEditorState={setEditorState} />


       
                <TableToolbar editorState={editorState} setEditorState={setEditorState} onChange={onChange}></TableToolbar>
                <ImageToolBar editorState={editorState} setEditorState={setEditorState} variable={variable}></ImageToolBar>
                <LinkifyToolBar editorState={editorState} setEditorState={setEditorState}></LinkifyToolBar>
                <EmojiToolBar editorState={editorState} setEditorState={setEditorState}></EmojiToolBar>
                <VideoBlockToolBar editorState={editorState} setEditorState={setEditorState}></VideoBlockToolBar>
                <DynamicText editorState={editorState} setEditorState={setEditorState}></DynamicText>
                <DynamicTable editorState={editorState} setEditorState={setEditorState}></DynamicTable>
        </div>
    );
}

export default ToolbarsEditor;