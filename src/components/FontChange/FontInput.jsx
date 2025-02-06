import { RichUtils } from 'draft-js';
import FontFamilyPicker from './FontFamilyPicker/FontFamilyPicker';
import { FONTS, FONT_SIZES, COLORS} from './customStyleMap';

import FontSizePicker from './FontSizePicker/FontSizePicker';
import FontColorPicker from './FontColorPicker/FontColorPicker';
import FontBackGroundColor from './FontBackGroundColor/FontBackGroundColor';

import FontBold from './FontType/FontBold/FontBold';
import FontItalic from './FontType/FontItalic/FontItalic';
import FontUnderline from './FontType/FontUnderline/FontUnderline';
import FontStrikethrough from './FontType/FontStrikethrough/FontStrikethrough';
import FontSubscript from './FontType/FontSubscript/FontSubscript';
import FontSuperscript from './FontType/FontSuperscript/FontSuperscript';
import FontUppercase from './FontType/FontUppercase/FontUppercase';
import FontLowercase from './FontType/FontLowercase/FontLowercase';

import CodeBlockType from './ParagraphType/CodeBlockType/CodeBlockType';
import HeaderType from './ParagraphType/HeaderType/HeaderType';

import TextAlign from './ParagraphType/TextAlign/TextAlign';
import ListType from './ParagraphType/ListType/ListType';



const FontInput = ({ editorState, setEditorState }) => {
    
    const getCurrentFont = () => {
      const currentStyle = editorState.getCurrentInlineStyle();
      const fontStyles = Array.from(currentStyle).filter(style => style.startsWith('fontFamily.'));
      const lastFontStyle = fontStyles.length > 0 ? fontStyles[fontStyles.length - 1] : null;
      return lastFontStyle ? lastFontStyle.split('.')[1] : 'Arial'; // Default to Arial if no font is selected
    };


    const handleSelectFont = (font) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, `fontFamily.${font}`);
        setEditorState(newEditorState);
    };
    
    const handleSelectSize = (size) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, `fontSize.${size}`);
        setEditorState(newEditorState);
      };



      const getCurrentSize = () => {
        const currentStyle = editorState.getCurrentInlineStyle();
        const sizeStyles = Array.from(currentStyle).filter(style => style.startsWith('fontSize.'));
        const lastSizeStyle = sizeStyles.length > 0 ? sizeStyles[sizeStyles.length - 1] : null;
        return lastSizeStyle ? lastSizeStyle.split('.')[1] : '12'; // Default to 12pt if no size is selected
      };


      const getCurrentColor = () => {
        const currentStyle = editorState.getCurrentInlineStyle();
        const colorStyles = Array.from(currentStyle).filter(style => style.startsWith('color.'));
        const lastColorStyle = colorStyles.length > 0 ? colorStyles[colorStyles.length - 1] : null;
        return lastColorStyle ? lastColorStyle.split('.')[1] : 'black'; // Default to black if no color is selected
      };


      const handleSelectColor = (color) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, `color.${color}`);
        setEditorState(newEditorState);
      };


      const getCurrentBackGroundColor = () => {
        const currentStyle = editorState.getCurrentInlineStyle();
        const bgColorStyles = Array.from(currentStyle).filter(style => style.startsWith('backgroundColor.'));
        const lastBgColorStyle = bgColorStyles.length > 0 ? bgColorStyles[bgColorStyles.length - 1] : null;
        return lastBgColorStyle ? lastBgColorStyle.split('.')[1] : 'white'; // Default to white if no background color is selected
      };

        const handleSelectBackGroundColor = (color) => {
            const newEditorState = RichUtils.toggleInlineStyle(editorState, `backgroundColor.${color}`);
            setEditorState(newEditorState);
        }


        const getCurrentTypeOfStyle = (style) => {
          const currentStyle = editorState.getCurrentInlineStyle();
          return currentStyle.has(style);
        };

        const handleClickTypeOfStyle = (style) => {
          const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
          setEditorState(newEditorState);
        };

        const getCurrentBlockType = (style) => {
          const currentStyle = editorState.getCurrentInlineStyle();
          return currentStyle.has(style);
        }

        const handleClickTypeOfBlock = (block) => {
          const newEditorState = RichUtils.toggleBlockType(editorState, block);
          setEditorState(newEditorState);
        };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        <FontFamilyPicker Fonts={FONTS} currentFont={getCurrentFont()} onSelectFont={handleSelectFont} />
        <FontSizePicker sizes={FONT_SIZES} currentSize={getCurrentSize()} onSelectSize={handleSelectSize} />
        <FontColorPicker colors={COLORS} currentColor={getCurrentColor()} onSelectColor={handleSelectColor} />
        <FontBackGroundColor colors={COLORS} currentBackGroundColor={getCurrentBackGroundColor()} onSelectBackGroundColor={handleSelectBackGroundColor} />
        
        <FontBold currentBold={getCurrentTypeOfStyle('BOLD')} onClick={() =>handleClickTypeOfStyle('BOLD')} />
        <FontItalic currentItalic={getCurrentTypeOfStyle('ITALIC')} onClick={() =>handleClickTypeOfStyle('ITALIC')} />
        <FontUnderline currentUnderline={getCurrentTypeOfStyle('UNDERLINE')} onClick={() =>handleClickTypeOfStyle('UNDERLINE')} />
        <FontStrikethrough currentStrikethrough={getCurrentTypeOfStyle('STRIKETHROUGH')} onClick={() =>handleClickTypeOfStyle('STRIKETHROUGH')} />
        <FontSubscript currentSubscript={getCurrentTypeOfStyle('SUBSCRIPT')} onClick={() =>handleClickTypeOfStyle('SUBSCRIPT')} />
        <FontSuperscript currentSuperscript={getCurrentTypeOfStyle('SUPERSCRIPT')} onClick={() =>handleClickTypeOfStyle('SUPERSCRIPT')} />
        <FontUppercase currentUppercase={getCurrentTypeOfStyle('UPPERCASE')} onClick={() =>handleClickTypeOfStyle('UPPERCASE')} />
        <FontLowercase currentLowercase={getCurrentTypeOfStyle('LOWERCASE')} onClick={() =>handleClickTypeOfStyle('LOWERCASE')} />  
        
        <CodeBlockType currentCodeBlockType={getCurrentBlockType('code-block')} onClick={() =>handleClickTypeOfBlock('code-block')} /> 
        <CodeBlockType currentCodeBlockType={getCurrentBlockType('paragraph')} onClick={() =>handleClickTypeOfBlock('paragraph')} /> 
        <CodeBlockType currentCodeBlockType={getCurrentBlockType('blockquote')} onClick={() =>handleClickTypeOfBlock('blockquote')} /> 
        <CodeBlockType currentCodeBlockType={getCurrentBlockType('blockQuote')} onClick={() =>handleClickTypeOfBlock('blockQuote')} /> 
        
        <HeaderType currentHeaderType={getCurrentBlockType('header-two')} onClick={(headerType) => handleClickTypeOfBlock(headerType)} />
        <TextAlign editorState={editorState} setEditorState={setEditorState} />
        <ListType editorState={editorState} setEditorState={setEditorState} />

        </div>
    );
}
export default FontInput;