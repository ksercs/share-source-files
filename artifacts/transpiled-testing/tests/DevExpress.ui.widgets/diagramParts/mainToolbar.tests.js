!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/diagramParts/mainToolbar.tests.js"], ["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js","../../../helpers/shadowDom.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/diagramParts/mainToolbar.tests.js", ["jquery", "ui/diagram", "devexpress-diagram", "../../../helpers/diagramHelpers.js", "../../../helpers/shadowDom.js"], function($__export) {
  "use strict";
  var $,
      test,
      DiagramCommand,
      Consts,
      getMainToolbarInstance,
      findMainToolbarItem,
      getToolbarIcon,
      findContextMenuItem,
      getActiveElement,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      DiagramCommand = $__m.DiagramCommand;
    }, function($__m) {
      Consts = $__m.Consts;
      getMainToolbarInstance = $__m.getMainToolbarInstance;
      findMainToolbarItem = $__m.findMainToolbarItem;
      getToolbarIcon = $__m.getToolbarIcon;
      findContextMenuItem = $__m.findContextMenuItem;
    }, function($__m) {
      getActiveElement = $__m.getActiveElement;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
      moduleConfig = {beforeEach: function() {
          this.onCustomCommand = sinon.spy();
          this.$element = $('#diagram').dxDiagram({
            onCustomCommand: this.onCustomCommand,
            mainToolbar: {visible: true}
          });
          this.instance = this.$element.dxDiagram('instance');
        }};
      QUnit.module('Main Toolbar', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          moduleConfig.beforeEach.apply(this, arguments);
        },
        afterEach: function() {
          this.clock.restore();
          this.clock.reset();
        }
      }, function() {
        test('should not render if toolbar.visible is false', function(assert) {
          this.instance.option('mainToolbar.visible', false);
          var $toolbar = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR);
          assert.equal($toolbar.length, 0);
        });
        test('should fill toolbar with default items', function(assert) {
          var toolbar = getMainToolbarInstance(this.$element);
          assert.ok(toolbar.option('dataSource').length > 10);
        });
        test('should fill toolbar with custom items', function(assert) {
          this.instance.option('mainToolbar.commands', ['exportSvg']);
          var toolbar = getMainToolbarInstance(this.$element);
          assert.equal(toolbar.option('dataSource').length, 1);
        });
        test('should enable items on diagram request', function(assert) {
          var undoButton = findMainToolbarItem(this.$element, 'undo').dxButton('instance');
          assert.ok(undoButton.option('disabled'));
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.PageLandscape).execute(true);
          assert.notOk(undoButton.option('disabled'));
        });
        test('should activate items on diagram request', function(assert) {
          assert.ok(findMainToolbarItem(this.$element, 'center').hasClass(Consts.TOOLBAR_ITEM_ACTIVE_CLASS));
          assert.notOk(findMainToolbarItem(this.$element, 'left').hasClass(Consts.TOOLBAR_ITEM_ACTIVE_CLASS));
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.TextLeftAlign).execute(true);
          assert.notOk(findMainToolbarItem(this.$element, 'center').hasClass(Consts.TOOLBAR_ITEM_ACTIVE_CLASS));
          assert.ok(findMainToolbarItem(this.$element, 'left').hasClass(Consts.TOOLBAR_ITEM_ACTIVE_CLASS));
        });
        test('button should raise diagram commands', function(assert) {
          assert.notOk(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.TextLeftAlign).getState().value);
          findMainToolbarItem(this.$element, 'left').trigger('dxclick');
          assert.ok(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.TextLeftAlign).getState().value);
        });
        test('button should raise custom commands', function(assert) {
          this.instance.option('mainToolbar.commands', [{
            name: 'custom1',
            text: 'custom1'
          }, {
            name: 'bold',
            text: 'custom bold'
          }, {
            text: 'sub menu',
            items: [{
              name: 'custom2',
              text: 'custom2'
            }, {
              name: 'italic',
              text: 'custom italic'
            }]
          }]);
          assert.notOk(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Bold).getState().value);
          assert.notOk(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Italic).getState().value);
          findMainToolbarItem(this.$element, 'custom1').trigger('dxclick');
          findMainToolbarItem(this.$element, 'custom bold').trigger('dxclick');
          findMainToolbarItem(this.$element, 'sub menu').trigger('dxclick');
          findContextMenuItem(this.$element, 'custom2').trigger('dxclick');
          findMainToolbarItem(this.$element, 'sub menu').trigger('dxclick');
          findContextMenuItem(this.$element, 'custom italic').trigger('dxclick');
          assert.ok(this.onCustomCommand.called);
          assert.equal(this.onCustomCommand.getCalls().length, 4);
          assert.equal(this.onCustomCommand.getCall(0).args[0]['name'], 'custom1');
          assert.equal(this.onCustomCommand.getCall(1).args[0]['name'], 'bold');
          assert.equal(this.onCustomCommand.getCall(2).args[0]['name'], 'custom2');
          assert.equal(this.onCustomCommand.getCall(3).args[0]['name'], 'italic');
          assert.ok(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Bold).getState().value);
          assert.ok(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Italic).getState().value);
        });
        test('selectBox should have items', function(assert) {
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial');
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          assert.ok(fontSelectBox.option('dataSource').length > 0);
        });
        test('selectBox should raise diagram commands', function(assert) {
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial');
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          fontSelectBox.option('value', 'Arial Black');
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontName).getState().value, 'Arial Black');
        });
        test('selectboxes with icon items should be replaced with select buttons', function(assert) {
          var $selectButtonTemplates = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-diagram-image-dropdown-item').find('.dx-dropdowneditor-field-template-wrapper');
          assert.ok($selectButtonTemplates.length > 0, 'select buttons are rendered');
          var selectButtonsCount = $selectButtonTemplates.length;
          assert.equal($selectButtonTemplates.find('.dx-diagram-i').length, selectButtonsCount, 'icons are rendered');
          assert.equal($selectButtonTemplates.find('.dx-textbox')[0].offsetWidth, 0, 'textbox is hidden');
        });
        test('colorboxes should be replaced with color buttons', function(assert) {
          var $selectButtonTemplates = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-diagram-color-edit-item').find('.dx-dropdowneditor-field-template-wrapper');
          assert.ok($selectButtonTemplates.length > 0, 'color buttons are rendered');
          var selectButtonsCount = $selectButtonTemplates.length;
          assert.equal($selectButtonTemplates.find('.dx-diagram-i, .dx-icon').length, selectButtonsCount, 'icons are rendered');
          assert.equal($selectButtonTemplates.find('.dx-textbox')[0].offsetWidth, 0, 'textbox is hidden');
        });
        test('colorbuttons should show an active color', function(assert) {
          var colorButton = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-diagram-color-edit-item').first();
          assert.equal(getToolbarIcon(colorButton).css('borderBottomColor'), 'rgb(0, 0, 0)');
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontColor).execute('rgb(255, 0, 0)');
          assert.equal(getToolbarIcon(colorButton).css('borderBottomColor'), 'rgb(255, 0, 0)', 'button changed via command');
          colorButton.find('.dx-dropdowneditor-button').trigger('dxclick');
          var $overlayContent = $('.dx-colorbox-overlay');
          $overlayContent.find('.dx-colorview-label-hex').find('.dx-textbox').dxTextBox('instance').option('value', '00ff00');
          $overlayContent.find('.dx-colorview-buttons-container .dx-colorview-apply-button').trigger('dxclick');
          assert.equal(this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.FontColor).getState().value, '#00ff00', 'color changed by color button');
          assert.equal(getToolbarIcon(colorButton).css('borderBottomColor'), 'rgb(0, 255, 0)', 'button changed via coloredit');
        });
        test('colorbutton should show dropdown on icon click', function(assert) {
          var colorButton = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-diagram-color-edit-item').first();
          var colorBox = colorButton.find('.dx-colorbox').dxColorBox('instance');
          getToolbarIcon(colorButton).trigger('dxclick');
          assert.ok(colorBox.option('opened'), true);
        });
        test('diagram should be focused after change font family', function(assert) {
          var fontSelectBox = this.$element.find(Consts.MAIN_TOOLBAR_SELECTOR).find('.dx-selectbox').eq(0).dxSelectBox('instance');
          fontSelectBox.focus();
          fontSelectBox.open();
          var item = $('.dx-list-item-content').filter(function() {
            return $(this).text().toLowerCase().indexOf('arial black') >= 0;
          });
          assert.notEqual(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
          item.trigger('dxclick');
          this.clock.tick(200);
          assert.equal(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
        });
        test('diagram should be focused after set font bold', function(assert) {
          var boldButton = findMainToolbarItem(this.$element, 'bold');
          assert.notEqual(document.activeElement, this.instance._diagramInstance.render.input.inputElement);
          boldButton.trigger('dxclick');
          this.clock.tick(200);
          assert.equal(getActiveElement(), this.instance._diagramInstance.render.input.inputElement);
        });
        test('Auto Layout button should be disabled in Read Only mode', function(assert) {
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.Import).execute(Consts.SIMPLE_DIAGRAM);
          this.instance._diagramInstance.commandManager.getCommand(DiagramCommand.SelectAll).execute(true);
          var button = findMainToolbarItem(this.$element, 'layout').dxButton('instance');
          assert.notOk(button.option('disabled'));
          this.instance.option('readOnly', true);
          assert.ok(button.option('disabled'));
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/diagram","devexpress-diagram","../../../helpers/diagramHelpers.js","../../../helpers/shadowDom.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/diagram"), require("devexpress-diagram"), require("../../../helpers/diagramHelpers.js"), require("../../../helpers/shadowDom.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mainToolbar.tests.js.map