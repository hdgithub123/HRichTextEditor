import style from './ToolbarsEditor.module.scss'
import TableToolbar from '../../Table/TableToolBar/TableToolbar';
import ImageToolBar from '../../Image/ImageToolBar/ImageToolBar'
import LinkifyToolBar from '../../Linkify/ToolBar/LinkifyToolBar'
import EmojiToolBar from '../../Emoji/ToolBar/EmojiToolBar'
import UndoRedoToolBar from '../../UndoRedoToolBar/UndoRedoToolBar'
import VideoBlockToolBar from '../../Video/VideoBlock/VideoBlockToolBar/VideoBlockToolBar'
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
} from '../../FontChange'
import CreateEmptyEditor from '../../Document/CreateEmptyEditor/CreateEmptyEditor'
import CreateExampleEditor from '../../Document/ExampleEditor/CreateExampleEditor'


import { DynamicText, DynamicTable, InsertDynamic } from '../../DynamicInsert'
import RawContentView from '../../RawContentView/RawContentView'
import DownloadDocument from '../../Document/DownloadDocument/DownloadDocument'
import OpenDocument from '../../Document/OpenDocument/OpenDocument'
import MainBlock from '../../MainBlockStyle/MainBlock'
import HeaderBlockToolBar from '../../HeaderBlock/ToolBar/HeaderBlockToolBar'
import FooterBlockToolBar from '../../FooterBlock/ToolBar/FooterBlockToolBar'


const ToolbarsEditor = ({
    editorState,
    setEditorState,
    editorStatePreview,
    setEditorStatePreview,
    // setMainBlockStyle,
    contentView,
    setContentView,
    variable,
    data,
    functionList,
    listRef,
    onChange
}) => {

    const { previewContent, rawContentView } = contentView
    const allnonedisplay = !previewContent && !rawContentView

    return (
        <div className={style.container}>
            {allnonedisplay && <UndoRedoToolBar editorState={editorState} setEditorState={setEditorState}></UndoRedoToolBar>}
            {allnonedisplay &&<OpenDocument setEditorState={setEditorState} functionList={functionList}></OpenDocument>}
            {allnonedisplay && <CreateEmptyEditor editorState={editorState} setEditorState={setEditorState}></CreateEmptyEditor>}
            {allnonedisplay && <CreateExampleEditor setEditorState={setEditorState} functionList={functionList} ></CreateExampleEditor>}
            
            {!rawContentView && <InsertDynamic
                editorState={editorState}
                setEditorState={setEditorStatePreview}
                contentView={contentView}
                setContentView={setContentView}
                dynamicTexts={data.dynamicTexts}
                dynamicTables={data.dynamicTables}
                editorRef={listRef.editorPrevewRef}
                functionList={functionList}
            ></InsertDynamic>}

            {allnonedisplay &&<MainBlock editorState={editorState} setEditorState={setEditorState}></MainBlock>}
            {allnonedisplay && <DownloadDocument editorState={editorState} setEditorState={setEditorState}></DownloadDocument>}
            <RawContentView contentView={contentView} setContentView={setContentView}></RawContentView>
            

            {allnonedisplay && <FontFamilyPickerView editorState={editorState} setEditorState={setEditorState}></FontFamilyPickerView>}
            {allnonedisplay && <FontSizePickerView editorState={editorState} setEditorState={setEditorState}></FontSizePickerView>}
            {allnonedisplay && <FontColorPickerView editorState={editorState} setEditorState={setEditorState} ></FontColorPickerView>}
            {allnonedisplay && <FontBackGroundColorView editorState={editorState} setEditorState={setEditorState} ></FontBackGroundColorView>}
            {/* Bold, Italic, Underline, StrikeThought, Supercrip, Subscript */}
            {allnonedisplay && <FontType editorState={editorState} setEditorState={setEditorState} ></FontType>}
            {/* TextAlign */}
            {allnonedisplay && <TextAlign editorState={editorState} setEditorState={setEditorState} />}
            {/* VerticalAlign chua cho vao table duoc
            {allnonedisplay && <VerticalAlign editorState={editorState} setEditorState={setEditorState} />} */}

            {allnonedisplay && <LineHeightView editorState={editorState} setEditorState={setEditorState}  ></LineHeightView>}
            {allnonedisplay && <Unstyled editorState={editorState} setEditorState={setEditorState}></Unstyled>}
            {allnonedisplay && <CodeBlockType editorState={editorState} setEditorState={setEditorState}></CodeBlockType>}
            {allnonedisplay && <Blockquote editorState={editorState} setEditorState={setEditorState}></Blockquote>}
            {allnonedisplay && <Paragraph editorState={editorState} setEditorState={setEditorState}></Paragraph>}
            {allnonedisplay && <Header editorState={editorState} setEditorState={setEditorState}></Header>}
            {allnonedisplay && <BlockStyleView editorState={editorState} setEditorState={setEditorState} />}
            {allnonedisplay && <DeleteBlockStyle editorState={editorState} setEditorState={setEditorState} />}

            {allnonedisplay && <TableToolbar editorState={editorState} setEditorState={setEditorState} onChange={onChange}></TableToolbar>}
            {allnonedisplay && <ImageToolBar editorState={editorState} setEditorState={setEditorState} variable={variable}></ImageToolBar>}
            {allnonedisplay && <LinkifyToolBar editorState={editorState} setEditorState={setEditorState}></LinkifyToolBar>}
            {allnonedisplay && <EmojiToolBar editorState={editorState} setEditorState={setEditorState}></EmojiToolBar>}
            {allnonedisplay && <VideoBlockToolBar editorState={editorState} setEditorState={setEditorState}></VideoBlockToolBar>}
            {allnonedisplay && <DynamicText editorState={editorState} setEditorState={setEditorState} dynamicTexts={data.dynamicTexts}></DynamicText>}
            {allnonedisplay && <DynamicTable editorState={editorState} setEditorState={setEditorState} dynamicTables={data.dynamicTables}></DynamicTable>}
           <HeaderBlockToolBar editorState={editorState} setEditorState={setEditorState}></HeaderBlockToolBar>
            <FooterBlockToolBar editorState={editorState} setEditorState={setEditorState}></FooterBlockToolBar>
        </div>
    );
}

export default ToolbarsEditor;