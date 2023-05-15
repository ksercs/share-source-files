!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/diagram/diagram.commands_manager.js"], ["./diagram.importer","../../exporter/file_saver","../../core/utils/type","../../core/utils/window","../../core/utils/extend","../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/diagram/diagram.commands_manager.js", ["./diagram.importer", "../../exporter/file_saver", "../../core/utils/type", "../../core/utils/window", "../../core/utils/extend", "../../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _diagram = $__require("./diagram.importer");
  var _file_saver = $__require("../../exporter/file_saver");
  var _type = $__require("../../core/utils/type");
  var _window = $__require("../../core/utils/window");
  var _extend = $__require("../../core/utils/extend");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var SEPARATOR = 'separator';
  var SEPARATOR_COMMAND = {
    widget: SEPARATOR
  };
  var CSS_CLASSES = {
    SMALL_EDITOR_ITEM: 'dx-diagram-sm-edit-item',
    MEDIUM_EDITOR_ITEM: 'dx-diagram-md-edit-item',
    LARGE_EDITOR_ITEM: 'dx-diagram-lg-edit-item',
    IMAGE_DROPDOWN_ITEM: 'dx-diagram-image-dropdown-item',
    COLOR_EDITOR_ITEM: 'dx-diagram-color-edit-item',
    LARGE_ICON_ITEM: 'dx-diagram-lg-icon-item'
  };
  var DiagramCommandsManager = {
    SHOW_TOOLBOX_COMMAND_NAME: 'toolbox',
    SHOW_PROPERTIES_PANEL_COMMAND_NAME: 'propertiesPanel',
    getAllCommands: function getAllCommands() {
      var _this = this;
      var _getDiagram = (0, _diagram.getDiagram)(),
          DiagramCommand = _getDiagram.DiagramCommand;
      return this._allCommands || (this._allCommands = {
        separator: SEPARATOR_COMMAND,
        exportSvg: {
          command: DiagramCommand.ExportSvg,
          // eslint-disable-line spellcheck/spell-checker
          text: _message.default.format('dxDiagram-commandExportToSvg'),
          getParameter: function getParameter(widget) {
            return function (dataURI) {
              return _this._exportTo(widget, dataURI, 'SVG', 'image/svg+xml');
            };
          }
        },
        exportPng: {
          command: DiagramCommand.ExportPng,
          // eslint-disable-line spellcheck/spell-checker
          text: _message.default.format('dxDiagram-commandExportToPng'),
          getParameter: function getParameter(widget) {
            return function (dataURI) {
              return _this._exportTo(widget, dataURI, 'PNG', 'image/png');
            };
          }
        },
        exportJpg: {
          command: DiagramCommand.ExportJpg,
          // eslint-disable-line spellcheck/spell-checker
          text: _message.default.format('dxDiagram-commandExportToJpg'),
          getParameter: function getParameter(widget) {
            return function (dataURI) {
              return _this._exportTo(widget, dataURI, 'JPEG', 'image/jpeg');
            };
          }
        },
        undo: {
          command: DiagramCommand.Undo,
          hint: _message.default.format('dxDiagram-commandUndo'),
          text: _message.default.format('dxDiagram-commandUndo'),
          icon: 'undo',
          menuIcon: 'undo'
        },
        redo: {
          command: DiagramCommand.Redo,
          hint: _message.default.format('dxDiagram-commandRedo'),
          text: _message.default.format('dxDiagram-commandRedo'),
          icon: 'redo',
          menuIcon: 'redo'
        },
        cut: {
          command: DiagramCommand.Cut,
          hint: _message.default.format('dxDiagram-commandCut'),
          text: _message.default.format('dxDiagram-commandCut'),
          icon: 'cut',
          menuIcon: 'cut'
        },
        copy: {
          command: DiagramCommand.Copy,
          hint: _message.default.format('dxDiagram-commandCopy'),
          text: _message.default.format('dxDiagram-commandCopy'),
          icon: 'copy',
          menuIcon: 'copy'
        },
        paste: {
          command: DiagramCommand.PasteInPosition,
          hint: _message.default.format('dxDiagram-commandPaste'),
          text: _message.default.format('dxDiagram-commandPaste'),
          icon: 'paste',
          menuIcon: 'paste'
        },
        selectAll: {
          command: DiagramCommand.SelectAll,
          hint: _message.default.format('dxDiagram-commandSelectAll'),
          text: _message.default.format('dxDiagram-commandSelectAll'),
          icon: 'dx-diagram-i-button-select-all dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-select-all dx-diagram-i'
        },
        delete: {
          command: DiagramCommand.Delete,
          hint: _message.default.format('dxDiagram-commandDelete'),
          text: _message.default.format('dxDiagram-commandDelete'),
          icon: 'remove',
          menuIcon: 'remove'
        },
        fontName: {
          command: DiagramCommand.FontName,
          hint: _message.default.format('dxDiagram-commandFontName'),
          text: _message.default.format('dxDiagram-commandFontName'),
          widget: 'dxSelectBox',
          items: ['Arial', 'Arial Black', 'Helvetica', 'Times New Roman', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Comic Sans MS', 'Trebuchet MS'].map(function (item) {
            return {
              text: item,
              value: item
            };
          }),
          cssClass: CSS_CLASSES.MEDIUM_EDITOR_ITEM
        },
        fontSize: {
          command: DiagramCommand.FontSize,
          hint: _message.default.format('dxDiagram-commandFontSize'),
          text: _message.default.format('dxDiagram-commandFontSize'),
          widget: 'dxSelectBox',
          items: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(function (item) {
            return {
              text: item + 'pt',
              value: item + 'pt'
            };
          }),
          cssClass: CSS_CLASSES.SMALL_EDITOR_ITEM
        },
        bold: {
          command: DiagramCommand.Bold,
          hint: _message.default.format('dxDiagram-commandBold'),
          text: _message.default.format('dxDiagram-commandBold'),
          icon: 'bold',
          menuIcon: 'bold'
        },
        italic: {
          command: DiagramCommand.Italic,
          hint: _message.default.format('dxDiagram-commandItalic'),
          text: _message.default.format('dxDiagram-commandItalic'),
          icon: 'italic',
          menuIcon: 'italic'
        },
        underline: {
          command: DiagramCommand.Underline,
          hint: _message.default.format('dxDiagram-commandUnderline'),
          text: _message.default.format('dxDiagram-commandUnderline'),
          icon: 'underline',
          menuIcon: 'underline'
        },
        fontColor: {
          command: DiagramCommand.FontColor,
          text: _message.default.format('dxDiagram-commandTextColor'),
          hint: _message.default.format('dxDiagram-commandTextColor'),
          widget: 'dxColorBox',
          icon: 'dx-icon dx-icon-color',
          menuIcon: 'dx-icon dx-icon-color',
          cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
        },
        lineColor: {
          command: DiagramCommand.StrokeColor,
          text: _message.default.format('dxDiagram-commandLineColor'),
          hint: _message.default.format('dxDiagram-commandLineColor'),
          widget: 'dxColorBox',
          icon: 'dx-icon dx-icon-background',
          menuIcon: 'dx-icon dx-icon-background',
          cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
        },
        lineWidth: {
          command: DiagramCommand.StrokeWidth,
          text: _message.default.format('dxDiagram-commandLineWidth'),
          hint: _message.default.format('dxDiagram-commandLineWidth'),
          widget: 'dxSelectBox',
          items: [1, 2, 3, 4, 5, 6, 7, 8].map(function (item) {
            return {
              text: item + 'px',
              value: item.toString()
            };
          }),
          cssClass: CSS_CLASSES.SMALL_EDITOR_ITEM
        },
        lineStyle: {
          command: DiagramCommand.StrokeStyle,
          text: _message.default.format('dxDiagram-commandLineStyle'),
          hint: _message.default.format('dxDiagram-commandLineStyle'),
          widget: 'dxSelectBox',
          items: [{
            value: '',
            menuIcon: 'dx-diagram-i-line-solid dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandLineStyleSolid')
          }, {
            value: '2,2',
            menuIcon: 'dx-diagram-i-line-dotted dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandLineStyleDotted')
          }, {
            value: '6,2',
            menuIcon: 'dx-diagram-i-line-dashed dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandLineStyleDashed')
          }],
          cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
        },
        fillColor: {
          command: DiagramCommand.FillColor,
          text: _message.default.format('dxDiagram-commandFillColor'),
          hint: _message.default.format('dxDiagram-commandFillColor'),
          widget: 'dxColorBox',
          icon: 'dx-diagram-i dx-diagram-i-button-fill',
          menuIcon: 'dx-diagram-i dx-diagram-i-menu-fill',
          cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
        },
        textAlignLeft: {
          command: DiagramCommand.TextLeftAlign,
          hint: _message.default.format('dxDiagram-commandAlignLeft'),
          text: _message.default.format('dxDiagram-commandAlignLeft'),
          icon: 'alignleft',
          menuIcon: 'alignleft'
        },
        textAlignCenter: {
          command: DiagramCommand.TextCenterAlign,
          hint: _message.default.format('dxDiagram-commandAlignCenter'),
          text: _message.default.format('dxDiagram-commandAlignCenter'),
          icon: 'aligncenter',
          menuIcon: 'aligncenter'
        },
        textAlignRight: {
          command: DiagramCommand.TextRightAlign,
          hint: _message.default.format('dxDiagram-commandAlignRight'),
          text: _message.default.format('dxDiagram-commandAlignRight'),
          icon: 'alignright',
          menuIcon: 'alignright'
        },
        lock: {
          command: DiagramCommand.Lock,
          hint: _message.default.format('dxDiagram-commandLock'),
          text: _message.default.format('dxDiagram-commandLock'),
          icon: 'dx-diagram-i-button-lock dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-lock dx-diagram-i'
        },
        unlock: {
          command: DiagramCommand.Unlock,
          hint: _message.default.format('dxDiagram-commandUnlock'),
          text: _message.default.format('dxDiagram-commandUnlock'),
          icon: 'dx-diagram-i-button-unlock dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-unlock dx-diagram-i'
        },
        bringToFront: {
          command: DiagramCommand.BringToFront,
          hint: _message.default.format('dxDiagram-commandBringToFront'),
          text: _message.default.format('dxDiagram-commandBringToFront'),
          icon: 'dx-diagram-i-button-bring-to-front dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-bring-to-front dx-diagram-i'
        },
        sendToBack: {
          command: DiagramCommand.SendToBack,
          hint: _message.default.format('dxDiagram-commandSendToBack'),
          text: _message.default.format('dxDiagram-commandSendToBack'),
          icon: 'dx-diagram-i-button-send-to-back dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-send-to-back dx-diagram-i'
        },
        insertShapeImage: {
          command: DiagramCommand.InsertShapeImage,
          text: _message.default.format('dxDiagram-commandInsertShapeImage'),
          icon: 'dx-diagram-i-button-image-insert dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-image-insert dx-diagram-i'
        },
        editShapeImage: {
          command: DiagramCommand.EditShapeImage,
          text: _message.default.format('dxDiagram-commandEditShapeImage'),
          icon: 'dx-diagram-i-button-image-edit dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-image-edit dx-diagram-i'
        },
        deleteShapeImage: {
          command: DiagramCommand.DeleteShapeImage,
          text: _message.default.format('dxDiagram-commandDeleteShapeImage'),
          icon: 'dx-diagram-i-button-image-delete dx-diagram-i',
          menuIcon: 'dx-diagram-i-menu-image-delete dx-diagram-i'
        },
        connectorLineType: {
          command: DiagramCommand.ConnectorLineOption,
          widget: 'dxSelectBox',
          hint: _message.default.format('dxDiagram-commandConnectorLineType'),
          text: _message.default.format('dxDiagram-commandConnectorLineType'),
          items: [{
            value: 0,
            menuIcon: 'dx-diagram-i-connector-straight dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineStraight'),
            text: _message.default.format('dxDiagram-commandConnectorLineStraight')
          }, {
            value: 1,
            menuIcon: 'dx-diagram-i-connector-orthogonal dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineOrthogonal'),
            text: _message.default.format('dxDiagram-commandConnectorLineOrthogonal')
          }],
          cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
        },
        connectorLineStart: {
          command: DiagramCommand.ConnectorStartLineEnding,
          widget: 'dxSelectBox',
          items: [{
            value: 0,
            menuIcon: 'dx-diagram-i-connector-begin-none dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineNone'),
            text: _message.default.format('dxDiagram-commandConnectorLineNone')
          }, {
            value: 1,
            menuIcon: 'dx-diagram-i-connector-begin-arrow dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineArrow'),
            text: _message.default.format('dxDiagram-commandConnectorLineArrow')
          }, {
            value: 2,
            menuIcon: 'dx-diagram-i-connector-begin-outlined-triangle dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineArrow'),
            text: _message.default.format('dxDiagram-commandConnectorLineArrow')
          }, {
            value: 3,
            menuIcon: 'dx-diagram-i-connector-begin-filled-triangle dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineArrow'),
            text: _message.default.format('dxDiagram-commandConnectorLineArrow')
          }],
          hint: _message.default.format('dxDiagram-commandConnectorLineStart'),
          text: _message.default.format('dxDiagram-commandConnectorLineStart'),
          cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
        },
        connectorLineEnd: {
          command: DiagramCommand.ConnectorEndLineEnding,
          widget: 'dxSelectBox',
          items: [{
            value: 0,
            menuIcon: 'dx-diagram-i-connector-end-none dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineNone'),
            text: _message.default.format('dxDiagram-commandConnectorLineNone')
          }, {
            value: 1,
            menuIcon: 'dx-diagram-i-connector-end-arrow dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineArrow'),
            text: _message.default.format('dxDiagram-commandConnectorLineArrow')
          }, {
            value: 2,
            menuIcon: 'dx-diagram-i-connector-end-outlined-triangle dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineArrow'),
            text: _message.default.format('dxDiagram-commandConnectorLineArrow')
          }, {
            value: 3,
            menuIcon: 'dx-diagram-i-connector-end-filled-triangle dx-diagram-i',
            hint: _message.default.format('dxDiagram-commandConnectorLineArrow'),
            text: _message.default.format('dxDiagram-commandConnectorLineArrow')
          }],
          hint: _message.default.format('dxDiagram-commandConnectorLineEnd'),
          text: _message.default.format('dxDiagram-commandConnectorLineEnd'),
          cssClass: CSS_CLASSES.IMAGE_DROPDOWN_ITEM
        },
        layoutTreeTopToBottom: {
          command: DiagramCommand.AutoLayoutTreeVertical,
          text: _message.default.format('dxDiagram-commandLayoutTopToBottom'),
          hint: _message.default.format('dxDiagram-commandLayoutTopToBottom'),
          icon: 'dx-diagram-i-button-layout-tree-tb dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutTreeBottomToTop: {
          command: DiagramCommand.AutoLayoutTreeVerticalBottomToTop,
          text: _message.default.format('dxDiagram-commandLayoutBottomToTop'),
          hint: _message.default.format('dxDiagram-commandLayoutBottomToTop'),
          icon: 'dx-diagram-i-button-layout-tree-bt dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutTreeLeftToRight: {
          command: DiagramCommand.AutoLayoutTreeHorizontal,
          text: _message.default.format('dxDiagram-commandLayoutLeftToRight'),
          hint: _message.default.format('dxDiagram-commandLayoutLeftToRight'),
          icon: 'dx-diagram-i-button-layout-tree-lr dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutTreeRightToLeft: {
          command: DiagramCommand.AutoLayoutTreeHorizontalRightToLeft,
          text: _message.default.format('dxDiagram-commandLayoutRightToLeft'),
          hint: _message.default.format('dxDiagram-commandLayoutRightToLeft'),
          icon: 'dx-diagram-i-button-layout-tree-rl dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutLayeredTopToBottom: {
          command: DiagramCommand.AutoLayoutLayeredVertical,
          text: _message.default.format('dxDiagram-commandLayoutTopToBottom'),
          hint: _message.default.format('dxDiagram-commandLayoutTopToBottom'),
          icon: 'dx-diagram-i-button-layout-layered-tb dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutLayeredBottomToTop: {
          command: DiagramCommand.AutoLayoutLayeredVerticalBottomToTop,
          text: _message.default.format('dxDiagram-commandLayoutBottomToTop'),
          hint: _message.default.format('dxDiagram-commandLayoutBottomToTop'),
          icon: 'dx-diagram-i-button-layout-layered-bt dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutLayeredLeftToRight: {
          command: DiagramCommand.AutoLayoutLayeredHorizontal,
          text: _message.default.format('dxDiagram-commandLayoutLeftToRight'),
          hint: _message.default.format('dxDiagram-commandLayoutLeftToRight'),
          icon: 'dx-diagram-i-button-layout-layered-lr dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        layoutLayeredRightToLeft: {
          command: DiagramCommand.AutoLayoutLayeredHorizontalRightToLeft,
          text: _message.default.format('dxDiagram-commandLayoutRightToLeft'),
          hint: _message.default.format('dxDiagram-commandLayoutRightToLeft'),
          icon: 'dx-diagram-i-button-layout-layered-rl dx-diagram-i',
          cssClass: CSS_CLASSES.LARGE_ICON_ITEM
        },
        fullScreen: {
          command: DiagramCommand.Fullscreen,
          hint: _message.default.format('dxDiagram-commandFullscreen'),
          text: _message.default.format('dxDiagram-commandFullscreen'),
          icon: 'dx-diagram-i dx-diagram-i-button-fullscreen',
          menuIcon: 'dx-diagram-i dx-diagram-i-menu-fullscreen',
          cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
        },
        units: {
          command: DiagramCommand.ViewUnits,
          hint: _message.default.format('dxDiagram-commandUnits'),
          text: _message.default.format('dxDiagram-commandUnits'),
          widget: 'dxSelectBox'
        },
        simpleView: {
          command: DiagramCommand.ToggleSimpleView,
          hint: _message.default.format('dxDiagram-commandSimpleView'),
          text: _message.default.format('dxDiagram-commandSimpleView'),
          widget: 'dxCheckBox'
        },
        showGrid: {
          command: DiagramCommand.ShowGrid,
          hint: _message.default.format('dxDiagram-commandShowGrid'),
          text: _message.default.format('dxDiagram-commandShowGrid'),
          widget: 'dxCheckBox'
        },
        snapToGrid: {
          command: DiagramCommand.SnapToGrid,
          hint: _message.default.format('dxDiagram-commandSnapToGrid'),
          text: _message.default.format('dxDiagram-commandSnapToGrid'),
          widget: 'dxCheckBox'
        },
        gridSize: {
          command: DiagramCommand.GridSize,
          hint: _message.default.format('dxDiagram-commandGridSize'),
          text: _message.default.format('dxDiagram-commandGridSize'),
          widget: 'dxSelectBox'
        },
        pageSize: {
          command: DiagramCommand.PageSize,
          hint: _message.default.format('dxDiagram-commandPageSize'),
          text: _message.default.format('dxDiagram-commandPageSize'),
          widget: 'dxSelectBox',
          cssClass: CSS_CLASSES.LARGE_EDITOR_ITEM,
          getCommandValue: function getCommandValue(v) {
            return JSON.parse(v);
          },
          getEditorValue: function getEditorValue(v) {
            return JSON.stringify(v);
          }
        },
        pageOrientation: {
          command: DiagramCommand.PageLandscape,
          hint: _message.default.format('dxDiagram-commandPageOrientation'),
          text: _message.default.format('dxDiagram-commandPageOrientation'),
          widget: 'dxSelectBox',
          items: [{
            value: true,
            text: _message.default.format('dxDiagram-commandPageOrientationLandscape')
          }, {
            value: false,
            text: _message.default.format('dxDiagram-commandPageOrientationPortrait')
          }],
          cssClass: CSS_CLASSES.MEDIUM_EDITOR_ITEM
        },
        pageColor: {
          command: DiagramCommand.PageColor,
          hint: _message.default.format('dxDiagram-commandPageColor'),
          text: _message.default.format('dxDiagram-commandPageColor'),
          widget: 'dxColorBox',
          icon: 'dx-diagram-i dx-diagram-i-button-fill',
          menuIcon: 'dx-diagram-i dx-diagram-i-menu-fill',
          cssClass: CSS_CLASSES.COLOR_EDITOR_ITEM
        },
        zoomLevel: {
          command: DiagramCommand.ZoomLevel,
          hint: _message.default.format('dxDiagram-commandZoomLevel'),
          text: _message.default.format('dxDiagram-commandZoomLevel'),
          widget: 'dxTextBox',
          items: [SEPARATOR_COMMAND, {
            command: DiagramCommand.FitToScreen,
            hint: _message.default.format('dxDiagram-commandFitToContent'),
            text: _message.default.format('dxDiagram-commandFitToContent')
          }, {
            command: DiagramCommand.FitToWidth,
            hint: _message.default.format('dxDiagram-commandFitToWidth'),
            text: _message.default.format('dxDiagram-commandFitToWidth')
          }, SEPARATOR_COMMAND, {
            command: DiagramCommand.AutoZoomToContent,
            hint: _message.default.format('dxDiagram-commandAutoZoomByContent'),
            text: _message.default.format('dxDiagram-commandAutoZoomByContent')
          }, {
            command: DiagramCommand.AutoZoomToWidth,
            hint: _message.default.format('dxDiagram-commandAutoZoomByWidth'),
            text: _message.default.format('dxDiagram-commandAutoZoomByWidth')
          }],
          getEditorDisplayValue: function getEditorDisplayValue(v) {
            return Math.round(v * 100) + '%';
          },
          cssClass: CSS_CLASSES.SMALL_EDITOR_ITEM
        },
        // Custom commands
        toolbox: {
          command: this.SHOW_TOOLBOX_COMMAND_NAME,
          iconChecked: 'dx-diagram-i dx-diagram-i-button-toolbox-close',
          iconUnchecked: 'dx-diagram-i dx-diagram-i-button-toolbox-open',
          hint: _message.default.format('dxDiagram-uiShowToolbox'),
          text: _message.default.format('dxDiagram-uiShowToolbox')
        },
        propertiesPanel: {
          command: this.SHOW_PROPERTIES_PANEL_COMMAND_NAME,
          iconChecked: 'close',
          iconUnchecked: 'dx-diagram-i dx-diagram-i-button-properties-panel-open',
          hint: _message.default.format('dxDiagram-uiProperties'),
          text: _message.default.format('dxDiagram-uiProperties')
        }
      });
    },
    getMainToolbarCommands: function getMainToolbarCommands(commands, excludeCommands) {
      var allCommands = this.getAllCommands();
      var mainToolbarCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultMainToolbarCommands(allCommands);
      return this._prepareToolbarCommands(mainToolbarCommands, excludeCommands);
    },
    _getDefaultMainToolbarCommands: function _getDefaultMainToolbarCommands(allCommands) {
      return this._defaultMainToolbarCommands || (this._defaultMainToolbarCommands = [allCommands['undo'], allCommands['redo'], allCommands['separator'], allCommands['fontName'], allCommands['fontSize'], allCommands['bold'], allCommands['italic'], allCommands['underline'], allCommands['separator'], allCommands['lineWidth'], allCommands['lineStyle'], allCommands['separator'], allCommands['fontColor'], allCommands['lineColor'], allCommands['fillColor'], allCommands['separator'], allCommands['textAlignLeft'], allCommands['textAlignCenter'], allCommands['textAlignRight'], allCommands['separator'], allCommands['connectorLineType'], allCommands['connectorLineStart'], allCommands['connectorLineEnd'], allCommands['separator'], {
        text: _message.default.format('dxDiagram-uiLayout'),
        showText: 'always',
        items: [{
          text: _message.default.format('dxDiagram-uiLayoutTree'),
          items: [allCommands['layoutTreeTopToBottom'], allCommands['layoutTreeBottomToTop'], allCommands['layoutTreeLeftToRight'], allCommands['layoutTreeRightToLeft']]
        }, {
          text: _message.default.format('dxDiagram-uiLayoutLayered'),
          items: [allCommands['layoutLayeredTopToBottom'], allCommands['layoutLayeredBottomToTop'], allCommands['layoutLayeredLeftToRight'], allCommands['layoutLayeredRightToLeft']]
        }]
      }]);
    },
    getHistoryToolbarCommands: function getHistoryToolbarCommands(commands, excludeCommands) {
      var allCommands = this.getAllCommands();
      var historyToolbarCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultHistoryToolbarCommands(allCommands);
      return this._prepareToolbarCommands(historyToolbarCommands, excludeCommands);
    },
    _getDefaultHistoryToolbarCommands: function _getDefaultHistoryToolbarCommands(allCommands) {
      return this._defaultHistoryToolbarCommands || (this._defaultHistoryToolbarCommands = [allCommands['undo'], allCommands['redo'], allCommands['separator'], allCommands['toolbox']]);
    },
    getViewToolbarCommands: function getViewToolbarCommands(commands, excludeCommands) {
      var allCommands = this.getAllCommands();
      var viewToolbarCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultViewToolbarCommands(allCommands);
      return this._prepareToolbarCommands(viewToolbarCommands, excludeCommands);
    },
    _getDefaultViewToolbarCommands: function _getDefaultViewToolbarCommands(allCommands) {
      return this._defaultViewToolbarCommands || (this._defaultViewToolbarCommands = [allCommands['zoomLevel'], allCommands['separator'], allCommands['fullScreen'], allCommands['separator'], {
        widget: 'dxButton',
        icon: 'export',
        text: _message.default.format('dxDiagram-uiExport'),
        hint: _message.default.format('dxDiagram-uiExport'),
        items: [allCommands['exportSvg'], allCommands['exportPng'], allCommands['exportJpg']]
      }, {
        icon: 'preferences',
        hint: _message.default.format('dxDiagram-uiSettings'),
        text: _message.default.format('dxDiagram-uiSettings'),
        items: [allCommands['units'], allCommands['separator'], allCommands['showGrid'], allCommands['snapToGrid'], allCommands['gridSize'], allCommands['separator'], allCommands['simpleView'], allCommands['toolbox']]
      }]);
    },
    getPropertiesToolbarCommands: function getPropertiesToolbarCommands(commands, excludeCommands) {
      var allCommands = this.getAllCommands();
      var propertiesCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultPropertiesToolbarCommands(allCommands);
      return this._prepareToolbarCommands(propertiesCommands, excludeCommands);
    },
    _getDefaultPropertiesToolbarCommands: function _getDefaultPropertiesToolbarCommands(allCommands) {
      return this._defaultPropertiesToolbarCommands || (this._defaultPropertiesToolbarCommands = [allCommands['propertiesPanel']]);
    },
    _getDefaultPropertyPanelCommandGroups: function _getDefaultPropertyPanelCommandGroups() {
      return this._defaultPropertyPanelCommandGroups || (this._defaultPropertyPanelCommandGroups = [{
        title: _message.default.format('dxDiagram-uiStyle'),
        groups: [{
          title: _message.default.format('dxDiagram-uiText'),
          commands: ['fontName', 'fontSize', 'bold', 'italic', 'underline', 'textAlignLeft', 'textAlignCenter', 'textAlignRight', 'fontColor']
        }, {
          title: _message.default.format('dxDiagram-uiObject'),
          commands: ['lineStyle', 'lineWidth', 'lineColor', 'fillColor']
        }, {
          title: _message.default.format('dxDiagram-uiConnector'),
          commands: ['connectorLineType', 'connectorLineStart', 'connectorLineEnd']
        }]
      }, {
        title: _message.default.format('dxDiagram-uiLayout'),
        groups: [{
          title: _message.default.format('dxDiagram-uiLayoutLayered'),
          commands: ['layoutLayeredTopToBottom', 'layoutLayeredBottomToTop', 'layoutLayeredLeftToRight', 'layoutLayeredRightToLeft']
        }, {
          title: _message.default.format('dxDiagram-uiLayoutTree'),
          commands: ['layoutTreeTopToBottom', 'layoutTreeBottomToTop', 'layoutTreeLeftToRight', 'layoutTreeRightToLeft']
        }]
      }, {
        title: _message.default.format('dxDiagram-uiDiagram'),
        groups: [{
          title: _message.default.format('dxDiagram-uiPage'),
          commands: ['pageSize', 'pageOrientation', 'pageColor']
        }]
      }]);
    },
    _preparePropertyPanelGroups: function _preparePropertyPanelGroups(groups) {
      var _this2 = this;
      var allCommands = this.getAllCommands();
      var result = [];
      groups.forEach(function (g) {
        var commands = g.commands;
        if (commands) {
          commands = _this2._getPreparedCommands(allCommands, commands);
          commands = _this2._prepareToolbarCommands(commands);
        }
        var subGroups;
        if (g.groups) {
          subGroups = [];
          g.groups.forEach(function (sg) {
            var subCommands = sg.commands;
            if (subCommands) {
              subCommands = _this2._getPreparedCommands(allCommands, subCommands);
              subCommands = _this2._prepareToolbarCommands(subCommands);
            }
            subGroups.push({
              title: sg.title,
              commands: subCommands
            });
          });
        }
        result.push({
          title: g.title,
          commands: commands,
          groups: subGroups
        });
      });
      return result;
    },
    getPropertyPanelCommandTabs: function getPropertyPanelCommandTabs(commandGroups) {
      commandGroups = commandGroups || this._getDefaultPropertyPanelCommandGroups();
      return this._preparePropertyPanelGroups(commandGroups);
    },
    getContextMenuCommands: function getContextMenuCommands(commands) {
      var allCommands = this.getAllCommands();
      var contextMenuCommands = commands ? this._getPreparedCommands(allCommands, commands) : this._getDefaultContextMenuCommands(allCommands);
      return this._prepareContextMenuCommands(contextMenuCommands);
    },
    _getDefaultContextMenuCommands: function _getDefaultContextMenuCommands(allCommands) {
      return this._defaultContextMenuCommands || (this._defaultContextMenuCommands = [allCommands['cut'], allCommands['copy'], allCommands['paste'], allCommands['delete'], allCommands['separator'], allCommands['selectAll'], allCommands['separator'], allCommands['bringToFront'], allCommands['sendToBack'], allCommands['separator'], allCommands['lock'], allCommands['unlock'], allCommands['separator'], allCommands['insertShapeImage'], allCommands['editShapeImage'], allCommands['deleteShapeImage']]);
    },
    _getPreparedCommands: function _getPreparedCommands(allCommands, commands) {
      var _this3 = this;
      return commands.map(function (c) {
        if (c.widget && c.widget === SEPARATOR) {
          var command = {
            command: c,
            location: c.location
          };
          return command;
        } else if (allCommands[c]) {
          return allCommands[c];
        } else if (c.text || c.icon || c.name) {
          var internalCommand = c.name && allCommands[c.name];
          var _command = {
            command: internalCommand && internalCommand.command,
            name: c.name,
            location: c.location,
            text: c.text || internalCommand && internalCommand.text,
            hint: c.text || internalCommand && internalCommand.hint,
            icon: c.icon || internalCommand && internalCommand.icon,
            menuIcon: c.icon || internalCommand && internalCommand.menuIcon,
            widget: internalCommand && internalCommand.widget,
            cssClass: internalCommand && internalCommand.cssClass,
            getParameter: internalCommand && internalCommand.getParameter,
            getCommandValue: internalCommand && internalCommand.getCommandValue,
            getEditorValue: internalCommand && internalCommand.getEditorValue,
            getEditorDisplayValue: internalCommand && internalCommand.getEditorDisplayValue,
            iconChecked: internalCommand && internalCommand.iconChecked,
            iconUnchecked: internalCommand && internalCommand.iconUnchecked
          };
          if (Array.isArray(c.items)) {
            _command.items = _this3._getPreparedCommands(allCommands, c.items);
          } else {
            _command.items = internalCommand && internalCommand.items;
          }
          return _command;
        }
      }).filter(function (c) {
        return c;
      });
    },
    _prepareContextMenuCommands: function _prepareContextMenuCommands(commands, excludeCommands, rootCommand) {
      var _this4 = this;
      var beginGroup = false;
      return commands.map(function (c) {
        if (!_this4._isValidCommand(c, excludeCommands)) return;
        if (c.widget && c.widget === SEPARATOR) {
          beginGroup = true;
        } else {
          var command = _this4._cloneCommand(c, excludeCommands);
          command.icon = command.menuIcon;
          command.beginGroup = beginGroup;
          command.rootCommand = !command.command ? rootCommand && rootCommand.command : undefined;
          beginGroup = false;
          return command;
        }
      }).filter(function (c) {
        return c;
      });
    },
    _prepareToolbarCommands: function _prepareToolbarCommands(commands, excludeCommands) {
      var _this5 = this;
      return commands.map(function (c) {
        if (_this5._isValidCommand(c, excludeCommands)) {
          return _this5._cloneCommand(c, excludeCommands);
        }
      }).filter(function (c) {
        return c;
      }).filter(function (c, index, arr) {
        if (c.widget === SEPARATOR && index === arr.length - 1) {
          return false;
        }
        return c;
      });
    },
    _cloneCommand: function _cloneCommand(c, excludeCommands) {
      var command = (0, _extend.extend)({}, c);
      if (Array.isArray(c.items)) {
        command.items = this._prepareContextMenuCommands(c.items, excludeCommands, command);
      }
      return command;
    },
    _isValidCommand: function _isValidCommand(c, excludeCommands) {
      excludeCommands = excludeCommands || [];
      return excludeCommands.indexOf(c.command) === -1;
    },
    _exportTo: function _exportTo(widget, dataURI, format, mimeString) {
      var window = (0, _window.getWindow)();
      if (window && window.atob && (0, _type.isFunction)(window.Blob)) {
        var blob = this._getBlobByDataURI(window, dataURI, mimeString);
        var options = widget.option('export');
        _file_saver.fileSaver.saveAs(options.fileName || 'foo', format, blob);
      }
    },
    _getBlobByDataURI: function _getBlobByDataURI(window, dataURI, mimeString) {
      var byteString = window.atob(dataURI.split(',')[1]);
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new window.Blob([ia.buffer], {
        type: mimeString
      });
    }
  };
  var _default = DiagramCommandsManager;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./diagram.importer","../../exporter/file_saver","../../core/utils/type","../../core/utils/window","../../core/utils/extend","../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./diagram.importer"), require("../../exporter/file_saver"), require("../../core/utils/type"), require("../../core/utils/window"), require("../../core/utils/extend"), require("../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=diagram.commands_manager.js.map