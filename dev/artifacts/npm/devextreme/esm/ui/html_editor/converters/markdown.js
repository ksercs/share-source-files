/**
* DevExtreme (esm/ui/html_editor/converters/markdown.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import TurnDown from 'turndown';
import ShowDown from 'devextreme-showdown';
import { getWindow } from '../../../core/utils/window';
import Errors from '../../widget/ui.errors';
import converterController from '../converterController';
class MarkdownConverter {
  constructor() {
    var _this$_html2Markdown;
    var window = getWindow();
    var turndown = window && window.TurndownService || TurnDown;
    var showdown = window && window.showdown || ShowDown;
    if (!turndown) {
      throw Errors.Error('E1041', 'Turndown');
    }
    if (!showdown) {
      throw Errors.Error('E1041', 'DevExtreme-Showdown');
    }
    this._html2Markdown = new turndown();
    if ((_this$_html2Markdown = this._html2Markdown) !== null && _this$_html2Markdown !== void 0 && _this$_html2Markdown.addRule) {
      this._html2Markdown.addRule('emptyLine', {
        filter: element => {
          return element.nodeName.toLowerCase() === 'p' && element.innerHTML === '<br>';
        },
        replacement: function replacement() {
          return '<br>';
        }
      });
      this._html2Markdown.keep(['table']);
    }
    this._markdown2Html = new showdown.Converter({
      simpleLineBreaks: true,
      strikethrough: true,
      tables: true
    });
  }
  toMarkdown(htmlMarkup) {
    return this._html2Markdown.turndown(htmlMarkup || '');
  }
  toHtml(markdownMarkup) {
    var markup = this._markdown2Html.makeHtml(markdownMarkup);
    if (markup) {
      markup = markup.replace(new RegExp('\\r?\\n', 'g'), '');
    }
    return markup;
  }
}
converterController.addConverter('markdown', MarkdownConverter);
export default MarkdownConverter;
