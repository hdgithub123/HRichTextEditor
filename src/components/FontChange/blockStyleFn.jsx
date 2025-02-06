import styles from './blockStyleFn.module.scss';


const blockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    const depth = contentBlock.getDepth();
    const listType = contentBlock.getData().get('listType');
    const fontFamily = contentBlock.getData().get('fontFamily');
    const fontSize = contentBlock.getData().get('fontSize');
    const fontColor = contentBlock.getData().get('fontColor');
    const backgroundColor = contentBlock.getData().get('backgroundColor');

    let className = '';

    switch (type) {
        case 'unordered-list-item':
        case 'ordered-list-item':
            className = styles[`depth-${depth}`]; // Sửa lại cú pháp để gán đúng giá trị từ styles
            if (listType) {
                className += ` ${styles[`custom${listType.charAt(0).toUpperCase() + listType.slice(1)}`]}`;

                if (fontFamily) {
                    const sanitizedFontFamily = fontFamily.replace(/\s+/g, '-');
                    className += ` ${styles[`font-${sanitizedFontFamily}`]}`;
                  }

                if (fontSize) {
                    className += ` ${styles[`font-size-${fontSize.replace('pt', '')}pt`]}`;
                }

                if (fontColor) {
                    className += ` ${styles[`font-color-${fontColor}`]}`;
                }

                if (backgroundColor) {
                    className += ` ${styles[`background-color-${backgroundColor}`]}`;
                }
            }
            break;
        default:
            break;
    }

    // const type = contentBlock.getType();
    const textAlign = contentBlock.getData().get('textAlign');

    // let className = '';

    switch (type) {
        case 'blockQuote':
            className = styles.superFancyBlockquote;
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
    return className;
};




export default blockStyleFn;