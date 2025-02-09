import { RichUtils } from 'draft-js';
import FontBackGroundColor from './FontBackGroundColor';
import { _COLORS } from '../../_constant/_constant'

const COLORS = _COLORS
const FontBackGroundColorView = ({ editorState, setEditorState }) => {
    const getCurrentBackGroundColor = () => {
        try {
            const currentStyle = editorState.getCurrentInlineStyle();
        const bgColorStyles = Array.from(currentStyle).filter(style => style.startsWith('backgroundColor.'));
        const lastBgColorStyle = bgColorStyles.length > 0 ? bgColorStyles[bgColorStyles.length - 1] : null;
        return lastBgColorStyle ? lastBgColorStyle.split('.')[1] : 'white'; // Default to white if no background color is selected
        } catch (error) {
            return 'white';
        }


        
    };

    const handleSelectBackGroundColor = (color) => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, `backgroundColor.${color}`);
        setEditorState(newEditorState);
    }


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FontBackGroundColor colors={COLORS} currentBackGroundColor={getCurrentBackGroundColor()} onSelectBackGroundColor={handleSelectBackGroundColor} />
        </div>
    )
}

export default FontBackGroundColorView;