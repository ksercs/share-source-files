import Quill from 'devextreme-quill';
import { ensureDefined } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
var Variable = {};
if (Quill) {
  var Embed = Quill.import('blots/embed');
  var VARIABLE_CLASS = 'dx-variable';
  Variable = class Variable extends Embed {
    static create(data) {
      var node = super.create();
      var startEscapeChar;
      var endEscapeChar;
      var text = data.value;
      if (Array.isArray(data.escapeChar)) {
        startEscapeChar = ensureDefined(data.escapeChar[0], '');
        endEscapeChar = ensureDefined(data.escapeChar[1], '');
      } else {
        startEscapeChar = endEscapeChar = data.escapeChar;
      }
      node.innerText = startEscapeChar + text + endEscapeChar;
      node.dataset.varStartEscChar = startEscapeChar;
      node.dataset.varEndEscChar = endEscapeChar;
      node.dataset.varValue = data.value;
      return node;
    }
    static value(node) {
      return extend({}, {
        value: node.dataset.varValue,
        escapeChar: [node.dataset.varStartEscChar || '', node.dataset.varEndEscChar || '']
      });
    }
  };
  Variable.blotName = 'variable';
  Variable.tagName = 'span';
  Variable.className = VARIABLE_CLASS;
}
export default Variable;