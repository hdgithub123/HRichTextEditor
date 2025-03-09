/*
Parameters:
style (object) // style inline Css

format (String)
  Defines the content displayed by the ::after pseudo-element.
    Default value: '{page}'.
  Example: 'Page {page} of total {pages}'

*/

function generateBottomPageNumber({ style = {}, format = '{page}' } = {}) {
  const defaultBottomPageStyle = {
    fontFamily: 'inherit',
    paddingRight: '5mm',
    paddingBottom: '5mm',
    justifyContent: "flex-end",
    alignItems: "flex-end",
  }

  const applyStyle = {
    ...defaultBottomPageStyle,
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
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  pointer-events: none; 
}
`;
}


const defaultTopStyle = {
  fontFamily: 'inherit',
  paddingRight: '5mm',
  paddingTop: '5mm',
  justifyContent: "flex-end",
  alignItems: "flex-start",
}


function generateTopPageNumber({ style = {}, format = '{page}' } = {}) {

  const defaultTopStyle = {
    fontFamily: 'inherit',
    paddingRight: '5mm',
    paddingTop: '5mm',
    justifyContent: "flex-end",
    alignItems: "flex-start",
  }

  const applyStyle = {
    ...defaultTopStyle,
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
  display: flex;
  ${newCotent};
  z-index: 10;
  background: none;
  pointer-events: none; 
}
`;
}


export {
  generateTopPageNumber,
  generateBottomPageNumber,
}



const generatePageNumber = ({ style = {}, format = '{page}', isBottomPosition = true }) =>{
  if(isBottomPosition) {
    return generateBottomPageNumber({ style, format , isBottomPosition })
  } else {
    return generateTopPageNumber({ style, format , isBottomPosition })
  }
}

export default generatePageNumber




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