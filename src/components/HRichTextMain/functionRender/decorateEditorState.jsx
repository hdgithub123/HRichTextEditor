import { Editor, EditorState, CompositeDecorator, Modifier } from 'draft-js';
import imageInlineDecorator from '../../Image/ImangeInline/decorator/createDecorator';
import linkifyCreateDecorator from '../../Linkify/decorator/linkifyCreateDecorator'

const createDecorator = ({ editorState, functionList }) => {
  return new CompositeDecorator([
    imageInlineDecorator({ editorState, onImagePropertiesChange: functionList?.onImagePropertiesChange? functionList.onImagePropertiesChange : null }),
    // imageInlineDecorator({ editorState }),
    linkifyCreateDecorator(),
  ]);
};




const decorateEditorState = ({ editorState, functionList= null }) => {
  const decorator = createDecorator({ editorState, functionList });
  const newEditorState = EditorState.set(editorState, { decorator });
  return newEditorState;
}

export default decorateEditorState;