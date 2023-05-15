!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/keyboardMock.js"], ["ui/widget/selectors","jquery","inferno"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
let focused;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define("testing/helpers/keyboardMock.js", ["require", "exports", "module", "ui/widget/selectors", "jquery", "inferno"], function(require, exports, module) {
      focused = require('ui/widget/selectors').focused;
      root.keyboardMock = module.exports = factory(require('jquery'), require('inferno'));
    });
  } else {
    focused = DevExpress.require('ui/widget/selectors').focused;
    root.keyboardMock = factory(root.jQuery);
  }
}(window, function($, inferno) {
  let $element;
  let caret;
  const caretMock = {
    getPosition: function() {
      return $element.data('dxCaretPosition') || {
        start: 0,
        end: 0
      };
    },
    setPosition: function(position) {
      position = $.isPlainObject(position) ? position : {
        start: position || 0,
        end: position || 0
      };
      let start = position.start;
      let end = position.end;
      const textLength = $element.val().length;
      if (start < 0) {
        start = 0;
      }
      if (end < 0 || end > textLength) {
        end = textLength;
      }
      if (start > end) {
        start = end;
      }
      $element.data('dxCaretPosition', {
        start: start,
        end: end
      });
    }
  };
  const nativeCaretMock = {
    getPosition: function() {
      let start = 0;
      let end = 0;
      const input = $element.get(0);
      if (!input.setSelectionRange) {
        const range = document.selection.createRange();
        const rangeCopy = range.duplicate();
        range.move('character', -input.value.length);
        range.setEndPoint('EndToStart', rangeCopy);
        start = range.text.length;
        end = start + rangeCopy.text.length;
      } else {
        try {
          start = input.selectionStart;
          end = input.selectionEnd;
        } catch (e) {}
      }
      return {
        start: start,
        end: end
      };
    },
    setPosition: function(position) {
      position = $.isPlainObject(position) ? position : {
        start: position || 0,
        end: position || 0
      };
      const input = $element.get(0);
      let start = position.start;
      let end = position.end;
      const textLength = input.value.length;
      if (start < 0) {
        start = 0;
      }
      if (end < 0) {
        end = 0;
      }
      if (end > textLength) {
        end = textLength;
      }
      if (start > end) {
        start = end;
      }
      try {
        if (!input.setSelectionRange) {
          const range = input.createTextRange();
          range.collapse(true);
          range.moveStart('character', start);
          range.moveEnd('character', end - start);
          range.select();
        } else {
          input.setSelectionRange(start, end);
        }
      } catch (e) {}
    }
  };
  const KEYS_MAPS = {
    SPECIAL_KEYS: {
      'backspace': 'Backspace',
      'tab': 'Tab',
      'enter': 'Enter',
      'esc': 'Escape',
      'space': ' ',
      'pageup': 'PageUp',
      'pagedown': 'PageDown',
      'end': 'End',
      'home': 'Home',
      'left': 'ArrowLeft',
      'up': 'ArrowUp',
      'right': 'ArrowRight',
      'down': 'ArrowDown',
      'ins': 'Insert',
      'del': 'Delete'
    },
    SHIFT_MAP: {
      '~': '`',
      '!': '1',
      '@': '2',
      '#': '3',
      '$': '4',
      '%': '5',
      '^': '6',
      '&': '7',
      '*': '8',
      '(': '9',
      ')': '0',
      '_': '-',
      '+': '=',
      '{': '[',
      '}': ']',
      ':': ';',
      '"': '"',
      '|': '\\',
      '<': ',',
      '>': '.',
      '?': '/'
    }
  };
  const DEFAULT_OPTIONS = {
    timeStamp: 0,
    which: undefined,
    keyCode: undefined,
    keyChar: undefined
  };
  const isEditableElement = function() {
    const editableInputTypesRE = /^(date|datetime|datetime-local|email|month|number|password|search|tel|text|time|url|week)$/;
    return $element.is('input') && editableInputTypesRE.test($element.prop('type')) || $element.is('textarea') || ($element.prop('tabindex') >= 0);
  };
  const deleteSelection = function() {
    const caretPosition = caret.getPosition();
    const value = $element.val();
    $element.val(value.slice(0, caretPosition.start) + value.slice(caretPosition.end, value.length));
    caret.setPosition(caretPosition.start);
  };
  const typeChar = function(character) {
    if ($element.prop('readonly') || $element.prop('disabled')) {
      return;
    }
    deleteSelection();
    const value = $element.val();
    const caretPosition = caret.getPosition().start;
    $element.val(value.substring(0, caretPosition) + character + value.substring(caretPosition, value.length));
    caret.setPosition(caretPosition + 1);
  };
  const backspace = function() {
    const caretPosition = caret.getPosition();
    const caretStartPosition = caretPosition.start;
    const value = $element.val();
    if (caretPosition.start !== caretPosition.end) {
      deleteSelection();
    } else if (caretStartPosition > 0) {
      $element.val(value.substring(0, caretStartPosition - 1) + value.substring(caretStartPosition, value.length));
      caret.setPosition(caretStartPosition - 1);
    }
    return 'deleteContentBackward';
  };
  const del = function() {
    const caretPosition = caret.getPosition();
    const caretStartPosition = caretPosition.start;
    const value = $element.val();
    if (caretPosition.start !== caretPosition.end) {
      deleteSelection();
    } else if (caretStartPosition < value.length) {
      $element.val(value.substring(0, caretStartPosition) + value.substring(caretStartPosition + 1, value.length));
      caret.setPosition(caretStartPosition);
    }
  };
  const left = function() {
    const rtlCorrection = $element.css('direction') === 'rtl' ? -1 : 1;
    caret.setPosition(caret.getPosition().start - 1 * rtlCorrection);
  };
  const right = function() {
    const rtlCorrection = $element.css('direction') === 'rtl' ? -1 : 1;
    caret.setPosition(caret.getPosition().start + 1 * rtlCorrection);
  };
  const home = function() {
    caret.setPosition(0);
  };
  const end = function() {
    caret.setPosition($element.val().length);
  };
  const shortcuts = {
    'backspace': backspace,
    'del': del,
    'left': left,
    'right': right,
    'home': home,
    'end': end
  };
  const eventMock = function(type, options) {
    return $.extend(true, $.Event(type), DEFAULT_OPTIONS, options);
  };
  return function(element, useNativeSelection) {
    $element = $(element);
    caret = useNativeSelection ? nativeCaretMock : caretMock;
    if (!isEditableElement()) {
      throw Error('Unable to type text in non-editable element: ' + $element.get(0));
    }
    let clock = $.now();
    return {
      triggerEvent: function(eventName, options) {
        this.event = eventMock(eventName, $.extend({timeStamp: clock}, options));
        $element.trigger(this.event);
      },
      keyDown: function(rawKey, options) {
        const isKeyCodeString = typeof rawKey === 'string';
        const isCommandKey = rawKey && rawKey.length > 1 || !isKeyCodeString;
        const key = isCommandKey && KEYS_MAPS.SPECIAL_KEYS[rawKey] ? KEYS_MAPS.SPECIAL_KEYS[rawKey] : rawKey;
        this.triggerEvent('keydown', $.extend({key: key}, options));
        inferno.rerender();
        return this;
      },
      keyPress: function(rawKey) {
        const isKeyCodeString = typeof rawKey === 'string';
        const isCommandKey = rawKey && rawKey.length > 1 || !isKeyCodeString;
        const key = isCommandKey && KEYS_MAPS.SPECIAL_KEYS[rawKey] ? KEYS_MAPS.SPECIAL_KEYS[rawKey] : rawKey;
        this.triggerEvent('keypress', {key: key});
        return this;
      },
      beforeInput: function(data, inputType) {
        const params = {data: data};
        if (inputType !== null) {
          params.originalEvent = $.Event('beforeinput', {
            data: data,
            inputType: inputType || 'insertText'
          });
        }
        this.triggerEvent('beforeinput', params);
        return this;
      },
      input: function(data, inputType) {
        const params = {data: data};
        if (inputType !== null) {
          params.originalEvent = $.Event('input', {
            data: data,
            inputType: inputType || 'insertText'
          });
        }
        this.triggerEvent('input', params);
        return this;
      },
      keyUp: function(rawKey) {
        const isKeyCodeString = typeof rawKey === 'string';
        const isCommandKey = rawKey && rawKey.length > 1 || !isKeyCodeString;
        const key = isCommandKey && KEYS_MAPS.SPECIAL_KEYS[rawKey] ? KEYS_MAPS.SPECIAL_KEYS[rawKey] : rawKey;
        this.triggerEvent('keyup', {key: key});
        return this;
      },
      change: function() {
        this.triggerEvent('change');
        return this;
      },
      focus: function() {
        !focused($element) && this.triggerEvent('focus');
        return this;
      },
      blur: function() {
        this.triggerEvent('blur');
        return this;
      },
      wait: function(ms) {
        clock += ms;
        return this;
      },
      press: function(keysString, actionCallback) {
        this.focus();
        const keys = keysString.replace(/^\+/g, 'plus').replace(/\+\+/g, '+plus').split('+');
        $.map(keys, function(key, index) {
          keys[index] = key.replace('plus', '+');
        });
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key.toLowerCase() === 'shift') {
            const nextKey = keys[i + 1];
            if (!nextKey) {
              continue;
            }
            if (KEYS_MAPS.SHIFT_MAP[nextKey]) {
              keys[i + 1] = KEYS_MAPS.SHIFT_MAP[nextKey];
            }
          }
          if (KEYS_MAPS.SHIFT_MAP[key] && (!keys[i - 1] || keys[i - 1].toLowerCase() !== 'shift')) {
            keys[i] = KEYS_MAPS.SHIFT_MAP[key];
            keys.splice(i, 0, 'shift');
            i++;
          }
        }
        const that = this;
        $.each(keys, function(index, key) {
          const keyValue = key in KEYS_MAPS.SPECIAL_KEYS ? KEYS_MAPS.SPECIAL_KEYS[key] : key;
          that.keyDown(keyValue);
          if (!that.event.isDefaultPrevented()) {
            that.keyPress(keyValue);
            if (shortcuts[key]) {
              const oldValue = $element.val();
              that.beforeInput();
              const inputType = shortcuts[key](element) || 'insertText';
              const newValue = $element.val();
              if (newValue !== oldValue) {
                const data = inputType === 'deleteContentBackward' ? null : newValue;
                that.input(data, inputType);
              }
            }
          }
          if (!that.event.isDefaultPrevented()) {
            that.keyUp(keyValue);
          }
        });
        return this;
      },
      caret: function(position) {
        if (position === undefined) {
          return caret.getPosition();
        }
        this.focus();
        caret.setPosition(position);
        return this;
      },
      type: function(string) {
        this.focus();
        for (let i = 0; i < string.length; i++) {
          const char = string.charAt(i);
          this.keyDown(char);
          if (!this.event.isDefaultPrevented()) {
            this.keyPress(char);
          }
          if (!this.event.isDefaultPrevented()) {
            this.beforeInput(char);
            if (!this.event.isDefaultPrevented()) {
              typeChar(char);
              this.input(char);
            }
          }
          this.keyUp(char);
        }
        return this;
      },
      paste: function(string) {
        this.triggerEvent('paste', {originalEvent: $.Event('paste', {clipboardData: {getData: function() {
                return string;
              }}})});
        return this;
      }
    };
  };
}));

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/widget/selectors","jquery","inferno"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/widget/selectors"), require("jquery"), require("inferno"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardMock.js.map