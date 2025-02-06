import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

// Định nghĩa các kiểu block tùy chỉnh
const blockRenderMap = Map({
  'header-one': {
    element: 'h1',
  },
  'header-two': {
    element: 'h2',
  },
  'header-three': {
    element: 'h3',
  },
  'header-four': {
    element: 'h4',
  },
  'header-five': {
    element: 'h5',
  },
  'header-six': {
    element: 'h6',
  },
  'blockquote': {
    element: 'blockquote',
    wrapper: <blockquote />,
  },
  'code-block': {
    element: 'pre',
    wrapper: <pre />,
  },
  'unordered-list-item': {
    element: 'li',
    wrapper: <ul />,
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: <ol />,
  },
});

// Kết hợp với blockRenderMap mặc định của draft-js
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export default extendedBlockRenderMap;