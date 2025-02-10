import { RichUtils } from 'draft-js';
import FontFamilyPickerView from './FontFamilyPicker/FontFamilyPickerView';
import FontSizePickerView from './FontSizePicker/FontSizePickerView';
import FontColorPickerView from './FontColorPicker/FontColorPickerView';
import FontBackGroundColorView from './FontBackGroundColor/FontBackGroundColorView';
import FontType from './FontType/FontType'
import TextAlign from './ParagraphType/TextAlign/TextAlign';




import CodeBlockType from './ParagraphType/CodeBlock/CodeBlockType/CodeBlockType';
import Blockquote from './ParagraphType/CodeBlock/Blockquote/Blockquote';
import Paragraph from './ParagraphType/CodeBlock/Paragraph/Paragraph';

import Header from './ParagraphType/CodeBlock/Header/Header';
import Unstyled from './ParagraphType/CodeBlock/Unstyled/Unstyled';

import ListTypeView from './ParagraphType/ListType/ListTypeView';
import LineHeightView from './ParagraphType/LineHeight/LineHeightView';
import DeleteBlockStyle from './ParagraphType/DeleteBlockStyle/DeleteBlockStyle';

const FontInput = ({ editorState, setEditorState }) => {

  const getCurrentBlockType = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  }

  const handleClickTypeOfBlock = (block) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, block);
    setEditorState(newEditorState);
  };


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

      <FontFamilyPickerView editorState={editorState} setEditorState={setEditorState}></FontFamilyPickerView>
      <FontSizePickerView editorState={editorState} setEditorState={setEditorState}></FontSizePickerView>
      <FontColorPickerView editorState={editorState} setEditorState={setEditorState} ></FontColorPickerView>
      <FontBackGroundColorView editorState={editorState} setEditorState={setEditorState} ></FontBackGroundColorView>
      {/* Bold, Italic, Underline, StrikeThought, Supercrip, Subscript */}
      <FontType editorState={editorState} setEditorState={setEditorState} ></FontType>
      {/* TextAlign */}
      <TextAlign editorState={editorState} setEditorState={setEditorState} />
      <LineHeightView editorState={editorState} setEditorState={setEditorState}  ></LineHeightView>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
        <Unstyled editorState={editorState} setEditorState={setEditorState}></Unstyled>
        <CodeBlockType editorState={editorState} setEditorState={setEditorState}></CodeBlockType>
        <Blockquote editorState={editorState} setEditorState={setEditorState}></Blockquote>
        <Paragraph editorState={editorState} setEditorState={setEditorState}></Paragraph>
      </div>
      <Header editorState={editorState} setEditorState={setEditorState}></Header>
      <ListTypeView editorState={editorState} setEditorState={setEditorState} />
      <DeleteBlockStyle editorState={editorState} setEditorState={setEditorState} />

    </div>
  );
}
export default FontInput;