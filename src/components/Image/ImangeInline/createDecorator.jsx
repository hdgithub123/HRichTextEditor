import findImageEntities from './findImageEntities';
import ImageInlineComponent from './ImageInlineComponent';
import { Editor, EditorState, CompositeDecorator, Modifier } from 'draft-js';

const createDecorator = ({editorState, onImageSizeChange}) => {
    return new CompositeDecorator([
      {
        strategy: findImageEntities,
        component: (props) => (
          <ImageInlineComponent {...props} editorState={editorState} onImageSizeChange={onImageSizeChange} />
        ),
      },
    ]);
  };

export default createDecorator;