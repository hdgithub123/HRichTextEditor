import styles from './blockStyleFn.module.scss';


const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    const contentBlockToJSBlockStyle = contentBlock.toJS().data.blockStyle
    const marginLeft = contentBlockToJSBlockStyle?.marginLeft || undefined
    const listType = contentBlockToJSBlockStyle?.listType || undefined
    const fontFamily = contentBlockToJSBlockStyle?.fontFamily || undefined
    const fontSize = contentBlockToJSBlockStyle?.fontSize || undefined
    const fontColor = contentBlockToJSBlockStyle?.color || undefined
    const backgroundColor = contentBlockToJSBlockStyle?.backgroundColor || undefined
    const lineHeight = contentBlockToJSBlockStyle?.lineHeight || undefined
    const textAlign = contentBlockToJSBlockStyle?.textAlign || undefined
    const verticalAlign = contentBlockToJSBlockStyle?.verticalAlign || undefined
    
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


    if (verticalAlign) {
        console.log("verticalAlign", verticalAlign)
        switch (verticalAlign) {
            case 'top':
                className += ` ${styles.verticalAlignTop}`;
                break;
            case 'middle':
                className += ` ${styles.verticalAlignMiddle}`;
                break;
            case 'bottom':
                className += ` ${styles.verticalAlignBottom}`;
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