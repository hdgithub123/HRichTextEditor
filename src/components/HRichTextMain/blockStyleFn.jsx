import styles from './blockStyleFn.module.scss';


const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    const depth = contentBlock.getDepth();

    // const marginLeft = contentBlock.getData().get('marginLeft');
    // const listType = contentBlock.getData().get('listType');
    // const fontFamily = contentBlock.getData().get('fontFamily');
    // const fontSize = contentBlock.getData().get('fontSize');
    // const fontColor = contentBlock.getData().get('fontColor');
    // const backgroundColor = contentBlock.getData().get('backgroundColor');
    // const lineHeight = contentBlock.getData().get('lineHeight');

    const marginLeft = contentBlock.getData().getIn(['blockStyle', 'marginLeft']);
    const listType = contentBlock.getData().getIn(['blockStyle', 'listType']);
    const fontFamily = contentBlock.getData().getIn(['blockStyle', 'fontFamily']);
    const fontSize = contentBlock.getData().getIn(['blockStyle', 'fontSize']);
    const fontColor = contentBlock.getData().getIn(['blockStyle', 'color']);
    const backgroundColor = contentBlock.getData().getIn(['blockStyle', 'backgroundColor']);
    const lineHeight = contentBlock.getData().getIn(['blockStyle', 'lineHeight']);


    let className = '';

    // switch (type) {
    //     case 'unordered-list-item':
    //     case 'ordered-list-item':
    //         className = styles[`depth-${depth}`]; // Sửa lại cú pháp để gán đúng giá trị từ styles
    //         if (listType) {
    //             className += ` ${styles[`custom${listType.charAt(0).toUpperCase() + listType.slice(1)}`]}`;

    //             if (marginLeft) {
    //                 const sanitizedMarginLeft = String(marginLeft).replace('.', '-');
    //                 className += ` ${styles[`margin-left-${sanitizedMarginLeft}`]}`;
    //             }

    //             if (fontFamily) {
    //                 const sanitizedFontFamily = fontFamily.replace(/\s+/g, '-');
    //                 className += ` ${styles[`font-${sanitizedFontFamily}`]}`;
    //             }

    //             if (fontSize) {
    //                 const sanitizedFontSize = String(fontSize).replace('.', '-');
    //                 className += ` ${styles[`font-size-${sanitizedFontSize.replace('pt', '')}pt`]}`;
    //             }

    //             if (fontColor) {
    //                 className += ` ${styles[`font-color-${fontColor}`]}`;
    //             }

    //             if (backgroundColor) {
    //                 className += ` ${styles[`background-color-${backgroundColor}`]}`;
    //             }
    //         }
    //         break;
    //     default:
    //         break;
    // }

    if (listType) {
        className += ` ${styles[`custom${listType.charAt(0).toUpperCase() + listType.slice(1)}`]}`;
    }


    if (marginLeft) {
        const sanitizedMarginLeft = String(marginLeft).replace('.', '-');
        className += ` ${styles[`margin-left-${sanitizedMarginLeft}`]}`;
    }

    if (fontFamily) {
        const sanitizedFontFamily = fontFamily.replace(/\s+/g, '-');
        className += ` ${styles[`font-${sanitizedFontFamily}`]}`;
    }

    if (fontSize) {
        const sanitizedFontSize = String(fontSize).replace('.', '-');
        className += ` ${styles[`font-size-${sanitizedFontSize.replace('pt', '')}pt`]}`;
    }

    if (fontColor) {
        className += ` ${styles[`font-color-${fontColor}`]}`;
    }

    if (backgroundColor) {
        className += ` ${styles[`background-color-${backgroundColor}`]}`;
    }




    // const type = contentBlock.getType();
    // const textAlign = contentBlock.getData().get('textAlign');
    const textAlign = contentBlock.getData().getIn(['blockStyle', 'textAlign']);

    // let className = '';

    switch (type) {
        case 'blockquote':
            className = styles.superFancyBlockquote;
            break;
        case 'code-block':
            className = styles.codeBlock;
            break;
        default:
            break;
    }

    if (textAlign) {
        switch (textAlign) {
            case 'left':
                className += ` ${styles.leftAlign}`;
                break;
            case 'right':
                className += ` ${styles.rightAlign}`;
                break;
            case 'center':
                className += ` ${styles.centerAlign}`;
                break;
            case 'justify':
                className += ` ${styles.justifyAlign}`;
                break;
            default:
                break;
        }
    }

    if (lineHeight) {
        const sanitizedLineHeight = String(lineHeight).replace('.', '-');
        className += ` ${styles[`line-height-${sanitizedLineHeight}`]}`;
    }

    if (type === 'cellTable') {
        return styles.cellTableStyle
    }


    return className;
};




export default blockStyleFn;