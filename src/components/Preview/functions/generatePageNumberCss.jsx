/*
Parameters:
style (object) // style inline Css

format (String)
  Defines the content displayed by the ::after pseudo-element.
    Default value: '{page}'.
  Example: 'Page {page} of total {pages}'

*/

function generateBottomRightPageNumber({ style = {}, format = '{page}' } = {}) {
  const defaultStyle = {
    fontFamily: 'inherit',
    paddingRight: '5mm',
    paddingBottom: '5mm',
    justifyContent: "flex-end",
    alignItems: "flex-end",
  }

  const applyStyle = {
    ...defaultStyle,
    ...style,
  }

  const newStyle = styleObjectToString(applyStyle);
  const newCotent = 'content:' + formatToCssContent(format)
  return `
.pagedjs_margin-bottom-right-corner-holder {
  position: relative;
}

.pagedjs_margin-bottom-right-corner-holder::after {
  ${newStyle}
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--pagedjs-pagebox-width);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  border: none;
  pointer-events: none; 
}
`;
}


function generateBottomLeftPageNumber({ style = {}, format = '{page}' } = {}) {
  const defaultStyle = {
    fontFamily: 'inherit',
    paddingLeft: '5mm',
    paddingBottom: '5mm',
    justifyContent: "flex-start",
    alignItems: "flex-end",
  }

  const applyStyle = {
    ...defaultStyle,
    ...style,
  }

  const newStyle = styleObjectToString(applyStyle);
  const newCotent = 'content:' + formatToCssContent(format)
  return `
.pagedjs_margin-bottom-right-corner-holder {
  position: relative;
}

.pagedjs_margin-bottom-right-corner-holder::after {
  ${newStyle}
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--pagedjs-pagebox-width);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  border: none;
  pointer-events: none; 
}
`;
}

function generateBottomCenterPageNumber({ style = {}, format = '{page}' } = {}) {
  const defaultStyle = {
    fontFamily: 'inherit',
    paddingBottom: '5mm',
    justifyContent: "center",
    alignItems: "flex-end",
  }

  const applyStyle = {
    ...defaultStyle,
    ...style,
  }

  const newStyle = styleObjectToString(applyStyle);
  const newCotent = 'content:' + formatToCssContent(format)
  return `
.pagedjs_margin-bottom-right-corner-holder {
  position: relative;
}

.pagedjs_margin-bottom-right-corner-holder::after {
  ${newStyle}
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--pagedjs-pagebox-width);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  border: none;
  pointer-events: none; 
}
`;
}



function generateTopRightPageNumber({ style = {}, format = '{page}' } = {}) {

  const defaultStyle = {
    fontFamily: 'inherit',
    paddingRight: '5mm',
    paddingTop: '5mm',
    justifyContent: "flex-end",
    alignItems: "flex-start",
  }

  const applyStyle = {
    ...defaultStyle,
    ...style,
  }

  const newStyle = styleObjectToString(applyStyle);
  const newCotent = 'content:' + formatToCssContent(format)
  return `
.pagedjs_margin-top-right-corner-holder {
  position: relative;
}

.pagedjs_margin-top-right-corner-holder::after {
  ${newStyle}
  position: absolute;
  top: 0;
  right: 0;
  width: var(--pagedjs-pagebox-width);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  border: none;
  pointer-events: none; 
}
`;
}
function generateTopLeftPageNumber({ style = {}, format = '{page}' } = {}) {

  const defaultStyle = {
    fontFamily: 'inherit',
    paddingLeft: '5mm',
    paddingTop: '5mm',
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }

  const applyStyle = {
    ...defaultStyle,
    ...style,
  }

  const newStyle = styleObjectToString(applyStyle);
  const newCotent = 'content:' + formatToCssContent(format)
  return `
.pagedjs_margin-top-right-corner-holder {
  position: relative;
}

.pagedjs_margin-top-right-corner-holder::after {
  ${newStyle}
  position: absolute;
  top: 0;
  right: 0;
  width: var(--pagedjs-pagebox-width);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  border: none;
  pointer-events: none; 
}
`;
}

function generateTopCenterPageNumber({ style = {}, format = '{page}' } = {}) {

  const defaultStyle = {
    fontFamily: 'inherit',
    paddingTop: '5mm',
    justifyContent: "center",
    alignItems: "flex-start",
  }

  const applyStyle = {
    ...defaultStyle,
    ...style,
  }

  const newStyle = styleObjectToString(applyStyle);
  const newCotent = 'content:' + formatToCssContent(format)
  return `
.pagedjs_margin-top-right-corner-holder {
  position: relative;
}

.pagedjs_margin-top-right-corner-holder::after {
  ${newStyle}
  position: absolute;
  top: 0;
  right: 0;
  width: var(--pagedjs-pagebox-width);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  border: none;
  pointer-events: none; 
}
`;
}


export {
  generateTopRightPageNumber,
  generateTopLeftPageNumber,
  generateTopCenterPageNumber,
  generateBottomRightPageNumber,
  generateBottomLeftPageNumber,
  generateBottomCenterPageNumber,
}



const generatePageNumberCss = ({ style = {}, format = '{page}', position = 'bottom-right' }) => {
  if (position && position !== 'none') {
    switch (position) {
      case 'bottom-right':
        return generateBottomRightPageNumber({ style, format, position })
      case 'bottom-left':
        return generateBottomLeftPageNumber({ style, format, position })
      case 'bottom-center':
        return generateBottomCenterPageNumber({ style, format, position })
      case 'top-left':
        return generateTopLeftPageNumber({ style, format, position })
      case 'top-center':
        return generateTopCenterPageNumber({ style, format, position })
      case 'top-right':
        return generateTopRightPageNumber({ style, format, position })
      default:
        return generateBottomRightPageNumber({ style, format, position })
    }


  } else {
    return null
  }
}

export default generatePageNumberCss




function formatToCssContent(format) {
  return format
    .replace("{page}", 'counter(page)') // Thay {page} bằng counter(page)
    .replace("{pages}", 'counter(pages)') // Thay {pages} bằng counter(pages)
    .split(/(counter\(page\)|counter\(pages\))/) // Tách chuỗi dựa trên các counter
    .map(part => {
      // Thêm dấu ngoặc kép vào các phần không phải counter(page) hoặc counter(pages)
      if (part === "counter(page)" || part === "counter(pages)") {
        return part;
      }
      return `"${part}"`;
    })
    .join(" "); // Kết hợp lại thành chuỗi hoàn chỉnh
}


function styleObjectToString(styleObject) {
  return Object.entries(styleObject)
    .map(([key, value]) => {
      // Chuyển đổi `camelCase` thành `kebab-case`
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value};`;
    })
    .join(" ");
}