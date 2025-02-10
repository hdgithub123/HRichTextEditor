import TableStructureComponent from '../Table/Component/tableStructure/TableStructureComponent';
import CellComponent from '../Table/Component/cellTable/CellComponent';
import ImageBlockComponent from '../Image/ImageBlock/ImageBlockComponent';

const getBlockRendererFn = ({ editorRef, getEditorState, onChange, isEditable }) => block => {
    const type = block.getType();
    switch (type) {
        case 'tableStructure':
            return {
                component: TableStructureComponent,
                editable: isEditable !== undefined ? isEditable : true,
                props: {
                    editorRef,
                    getEditorState,
                    onChange,
                },
            };
        case 'cellTable':
            return {
                component: CellComponent,
                editable: isEditable !== undefined ? isEditable : true,
                props: {
                    editorRef,
                },
            };

        case 'IMAGE_BLOCK':
            return {
                component: ImageBlockComponent,
                editable: false,
                props: {
                    editorRef,
                    getEditorState,
                    onChange,
                },
            };
        case 'unstyled':
        case 'paragraph':
        case 'header-one':
        case 'header-two':
        case 'header-three':
        case 'header-four':
        case 'header-five':
        case 'header-six':
        default: return null;
    }
}


export default getBlockRendererFn;
