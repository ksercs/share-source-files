/**
* DevExtreme (esm/core/utils/html_parser.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../dom_adapter';
var isTagName = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
var tagWrappers = {
  default: {
    tagsCount: 0,
    startTags: '',
    endTags: ''
  },
  thead: {
    tagsCount: 1,
    startTags: '<table>',
    endTags: '</table>'
  },
  td: {
    tagsCount: 3,
    startTags: '<table><tbody><tr>',
    endTags: '</tr></tbody></table>'
  },
  col: {
    tagsCount: 2,
    startTags: '<table><colgroup>',
    endTags: '</colgroup></table>'
  },
  tr: {
    tagsCount: 2,
    startTags: '<table><tbody>',
    endTags: '</tbody></table>'
  }
};
tagWrappers.tbody = tagWrappers.colgroup = tagWrappers.caption = tagWrappers.tfoot = tagWrappers.thead;
tagWrappers.th = tagWrappers.td;
export var parseHTML = function parseHTML(html) {
  if (typeof html !== 'string') {
    return null;
  }
  var fragment = domAdapter.createDocumentFragment();
  var container = fragment.appendChild(domAdapter.createElement('div'));
  var tags = isTagName.exec(html);
  var firstRootTag = tags && tags[1].toLowerCase();
  var tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
  container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
  for (var i = 0; i < tagWrapper.tagsCount; i++) {
    container = container.lastChild;
  }
  return [...container.childNodes];
};
export var isTablePart = function isTablePart(html) {
  var tags = isTagName.exec(html);
  return tags && tags[1] in tagWrappers;
};
