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
import { PrintDocument, PrintPreview } from '../../Print/index'

const ToolbarsEditor = ({
    editorState,
    setEditorState,
    editorStatePreview,
    setEditorStatePreview,
    handlePrintPreview,
    setIsPrint,
    handleisPrinted,
    // setMainBlockStyle,
    contentView,
    setContentView,
    variable,
    data,
    functionList,
    listRef,
    onChange
}) => {

    const { documentView, previewContent, printPreview, rawContentView } = contentView
    const allnonedisplay = !previewContent && !rawContentView

    return (
        <div className={style.container}>
            {documentView && <UndoRedoToolBar editorState={editorState} setEditorState={setEditorState}></UndoRedoToolBar>}
            {documentView && <OpenDocument setEditorState={setEditorState} functionList={functionList}></OpenDocument>}
            {documentView && <CreateEmptyEditor editorState={editorState} setEditorState={setEditorState}></CreateEmptyEditor>}
            {documentView && <CreateExampleEditor setEditorState={setEditorState} functionList={functionList} ></CreateExampleEditor>}

            {(documentView || previewContent)  && <InsertDynamic
                editorState={editorState}
                setEditorState={setEditorStatePreview}
                contentView={contentView}
                setContentView={setContentView}
                dynamicTexts={data.dynamicTexts}
                dynamicTables={data.dynamicTables}
                editorRef={listRef.editorPrevewRef}
                functionList={functionList}
            ></InsertDynamic>}
            {(documentView || printPreview) && <PrintPreview setIsPrint={setIsPrint} contentView={contentView} setContentView={setContentView} handlePrintPreview={handlePrintPreview}></PrintPreview>}
            {printPreview && <PrintDocument setIsPrint={setIsPrint} handleisPrinted={handleisPrinted}></PrintDocument>}
            {documentView && <MainBlock editorState={editorState} setEditorState={setEditorState}></MainBlock>}
            {documentView && <DownloadDocument editorState={editorState} setEditorState={setEditorState}></DownloadDocument>}
            {(documentView || rawContentView) && <RawContentView contentView={contentView} setContentView={setContentView}></RawContentView>}


            {documentView && <FontFamilyPickerView editorState={editorState} setEditorState={setEditorState}></FontFamilyPickerView>}
            {documentView && <FontSizePickerView editorState={editorState} setEditorState={setEditorState}></FontSizePickerView>}
            {documentView && <FontColorPickerView editorState={editorState} setEditorState={setEditorState} ></FontColorPickerView>}
            {documentView && <FontBackGroundColorView editorState={editorState} setEditorState={setEditorState} ></FontBackGroundColorView>}
            {/* Bold, Italic, Underline, StrikeThought, Supercrip, Subscript */}
            {documentView && <FontType editorState={editorState} setEditorState={setEditorState} ></FontType>}
            {/* TextAlign */}
            {documentView && <TextAlign editorState={editorState} setEditorState={setEditorState} />}
            {/* VerticalAlign chua cho vao table duoc
            {allnonedisplay && <VerticalAlign editorState={editorState} setEditorState={setEditorState} />} */}

            {documentView && <LineHeightView editorState={editorState} setEditorState={setEditorState}  ></LineHeightView>}
            {documentView && <Unstyled editorState={editorState} setEditorState={setEditorState}></Unstyled>}
            {documentView && <CodeBlockType editorState={editorState} setEditorState={setEditorState}></CodeBlockType>}
            {documentView && <Blockquote editorState={editorState} setEditorState={setEditorState}></Blockquote>}
            {documentView && <Paragraph editorState={editorState} setEditorState={setEditorState}></Paragraph>}
            {documentView && <Header editorState={editorState} setEditorState={setEditorState}></Header>}
            {documentView && <BlockStyleView editorState={editorState} setEditorState={setEditorState} />}
            {documentView && <DeleteBlockStyle editorState={editorState} setEditorState={setEditorState} />}

            {documentView && <TableToolbar editorState={editorState} setEditorState={setEditorState} onChange={onChange} listRef={listRef}></TableToolbar>}
            {documentView && <ImageToolBar editorState={editorState} setEditorState={setEditorState} variable={variable}></ImageToolBar>}
            {documentView && <LinkifyToolBar editorState={editorState} setEditorState={setEditorState}></LinkifyToolBar>}
            {documentView && <EmojiToolBar editorState={editorState} setEditorState={setEditorState}></EmojiToolBar>}
            {documentView && <VideoBlockToolBar editorState={editorState} setEditorState={setEditorState}></VideoBlockToolBar>}
            {documentView && <DynamicText editorState={editorState} setEditorState={setEditorState} dynamicTexts={data.dynamicTexts}></DynamicText>}
            {documentView && <DynamicTable editorState={editorState} setEditorState={setEditorState} dynamicTables={data.dynamicTables}></DynamicTable>}
            {documentView && <HeaderBlockToolBar editorState={editorState} setEditorState={setEditorState}></HeaderBlockToolBar>}
            {documentView && <FooterBlockToolBar editorState={editorState} setEditorState={setEditorState}></FooterBlockToolBar>}

        </div>
    );
}

export default ToolbarsEditor;